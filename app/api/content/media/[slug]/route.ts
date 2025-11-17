import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/lib/pg";
import path from "path";
import { writeFile, unlink, mkdir } from "fs/promises"; // For saving/deleting files
// import fs from "fs";

const SECRET = process.env.JWT_SECRET!;
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

// Ensure dir exists
async function ensureDir(dir: string) {
  try {
    await mkdir(dir, { recursive: true });
  } catch {} // Ignore if exists
}

// Auth check (copy from your texts route)
async function checkAdminAuth(req: NextRequest): Promise<boolean> {
  try {
    const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
    if (!authHeader) return false;
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
    const decoded = jwt.verify(token, SECRET) as any;
    // Accept if token present and indicates admin (flexible keys)
    return !!(decoded && (decoded.role === "admin" || decoded.isAdmin || decoded.admin));
  } catch {
    return false;
  }
}

// --- GET: Fetch images for slug (array even for singles) ---
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    const result = await pool.query(
      "SELECT id, image_path, alt_text, list_order FROM content_media WHERE key_slug = $1 ORDER BY list_order ASC",
      [slug]
    );
    return NextResponse.json({ images: result.rows });
  } catch (err) {
    console.error("IMAGES FETCH ERROR:", err);
    return NextResponse.json(
      { error: "Failed to load images" },
      { status: 500 }
    );
  }
}

// --- POST: Add new image (base64 or URL) ---
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  if (!(await checkAdminAuth(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { base64, filename, imageUrl, alt } = await request.json();
    let savedPath = imageUrl; // Use provided URL if no file

    if (base64 && filename) {
      // Decode and save local file
      const buffer = Buffer.from(base64.split(",")[1] || base64, "base64");
      const ext = path.extname(filename).slice(1) || "jpg";
      const uniqueName = `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}.${ext}`;
      const dir = path.join(UPLOAD_DIR, slug);
      await ensureDir(dir);
      const filePath = path.join(dir, uniqueName);
      await writeFile(filePath, buffer);
      savedPath = `/uploads/${slug}/${uniqueName}`;
    } else if (!savedPath) {
      return NextResponse.json(
        { error: "Missing file or URL" },
        { status: 400 }
      );
    }

    // Get next list_order
    const maxOrderRes = await pool.query(
      "SELECT MAX(list_order) as max_order FROM content_media WHERE key_slug = $1",
      [slug]
    );
    const listOrder = (maxOrderRes.rows[0].max_order || 0) + 1;

    const insertRes = await pool.query(
      "INSERT INTO content_media (key_slug, image_path, alt_text, list_order) VALUES ($1, $2, $3, $4) RETURNING id",
      [slug, savedPath, alt || "", listOrder]
    );

    return NextResponse.json({
      success: true,
      id: insertRes.rows[0].id,
      image_path: savedPath,
    });
  } catch (err) {
    console.error("IMAGE ADD ERROR:", err);
    return NextResponse.json({ error: "Failed to add image" }, { status: 500 });
  }
}

// --- PUT: Replace image by ID (base64 or URL) ---
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  if (!(await checkAdminAuth(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, base64, filename, imageUrl, alt } = await request.json();
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    let savedPath = imageUrl; // Use provided URL if no file

    // Fetch old image to delete if local
    const oldRes = await pool.query(
      "SELECT image_path FROM content_media WHERE id = $1 AND key_slug = $2",
      [id, slug]
    );
    if (oldRes.rowCount === 0)
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    const oldPath = oldRes.rows[0].image_path;
    if (oldPath.startsWith("/")) {
      const fullOldPath = path.join(process.cwd(), "public", oldPath);
      await unlink(fullOldPath).catch(() => {}); // Delete old local file
    }

    if (base64 && filename) {
      // Save new local file
      const buffer = Buffer.from(base64.split(",")[1] || base64, "base64");
      const ext = path.extname(filename).slice(1) || "jpg";
      const uniqueName = `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}.${ext}`;
      const dir = path.join(UPLOAD_DIR, slug);
      await ensureDir(dir);
      const filePath = path.join(dir, uniqueName);
      await writeFile(filePath, buffer);
      savedPath = `/uploads/${slug}/${uniqueName}`;
    } else if (!savedPath) {
      return NextResponse.json(
        { error: "Missing file or URL" },
        { status: 400 }
      );
    }

    await pool.query(
      "UPDATE content_media SET image_path = $1, alt_text = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND key_slug = $4",
      [savedPath, alt || "", id, slug]
    );

    return NextResponse.json({ success: true, image_path: savedPath });
  } catch (err) {
    console.error("IMAGE REPLACE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to replace image" },
      { status: 500 }
    );
  }
}

// --- DELETE: Remove image by ID ---
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  if (!(await checkAdminAuth(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    // Fetch path to delete if local
    const res = await pool.query(
      "SELECT image_path FROM content_media WHERE id = $1 AND key_slug = $2",
      [id, slug]
    );
    if (res.rowCount === 0)
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    const imagePath = res.rows[0].image_path;
    if (imagePath.startsWith("/")) {
      const fullPath = path.join(process.cwd(), "public", imagePath);
      await unlink(fullPath).catch(() => {});
    }

    await pool.query(
      "DELETE FROM content_media WHERE id = $1 AND key_slug = $2",
      [id, slug]
    );

    // Optional: Reorder remaining list_orders if needed
    // But skip for simplicity; can add if gaps matter

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("IMAGE DELETE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
