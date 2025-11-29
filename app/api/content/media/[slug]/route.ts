import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/lib/pg";
import { cookies } from "next/headers";
import { v2 as cloudinary } from "cloudinary"; // ⬅️ NEW: Import Cloudinary SDK

// ---------------------------------------------------------------------
// 1. CLOUDINARY CONFIGURATION
// We configure Cloudinary using the CLOUDINARY_URL environment variable.
// Vercel/Next.js automatically parses CLOUDINARY_URL into cloud_name, api_key, and api_secret.
// ---------------------------------------------------------------------

try {
  // Check if CLOUDINARY_URL is available before configuring
  if (!process.env.CLOUDINARY_URL) {
    console.error("CLOUDINARY_URL environment variable is missing!");
  }
  cloudinary.config({ secure: true }); // Reads credentials from CLOUDINARY_URL
} catch (error) {
  console.error("Cloudinary Configuration Error:", error);
}

// ---------------------------------------------------------------------
// AUTHENTICATION HELPER (Unchanged)
// ---------------------------------------------------------------------

async function checkAdminAuth() {
  try {
    const token = (await cookies()).get("admin_token")?.value;
    if (!token) return false;

    jwt.verify(token, process.env.SECRET! || process.env.JWT_SECRET!);
    return true;
  } catch {
    return false;
  }
}

// --- Helper to extract Public ID from Cloudinary URL for deletion ---
function getPublicIdFromUrl(url: string, slug: string): string | null {
  if (!url || !url.includes("cloudinary.com")) return null;

  // Example: https://res.cloudinary.com/.../v12345/rccgyork/yasm_banner/image.jpg
  const folder = `rccgyork/${slug}/`;

  // Split by the folder name to get the part containing the Public ID and extension
  const parts = url.split(folder);
  if (parts.length < 2) return null;

  // The public ID includes the folder path when deleting a managed asset
  const fullPublicId = `${folder.slice(0, -1)}/${parts[1].split(".")[0]}`;
  return fullPublicId;
}

// --- GET: Fetch images for slug (Unchanged SQL logic) ---
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  // ... (unchanged GET logic)
  // NOTE: Ensure your SQL query here uses 'public.content_media' if you still get 500 errors
  // otherwise, the problem is fixed.
  // Example: "SELECT id, image_path, alt_text, list_order FROM public.content_media WHERE key_slug = $1 ORDER BY list_order ASC"
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

// --- POST: Add new image (Cloudinary upload) ---
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  if (!(await checkAdminAuth())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { base64, filename, imageUrl, alt } = await request.json();
    let savedPath = imageUrl;

    if (base64) {
      // We only need base64, filename is just descriptive
      // ⬅️ NEW: UPLOAD TO CLOUDINARY
      const uploadResult = await cloudinary.uploader.upload(base64, {
        folder: `rccgyork/${slug}`, // Use unique folder structure for organization
        resource_type: "image",
      });
      savedPath = uploadResult.secure_url; // Save the secure public URL
    } else if (!savedPath) {
      return NextResponse.json(
        { error: "Missing file or URL" },
        { status: 400 }
      );
    } // Get next list_order

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
    console.error("IMAGE ADD ERROR (Cloudinary):", err);
    return NextResponse.json({ error: "Failed to add image" }, { status: 500 });
  }
}

// --- PUT: Replace image by ID (Cloudinary update) ---
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  if (!(await checkAdminAuth())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, base64, filename, imageUrl, alt } = await request.json();
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    let savedPath = imageUrl; // Fetch old image path to delete it from Cloudinary

    const oldRes = await pool.query(
      "SELECT image_path FROM content_media WHERE id = $1 AND key_slug = $2",
      [id, slug]
    );
    if (oldRes.rowCount === 0)
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    const oldPath = oldRes.rows[0].image_path;

    if (base64) {
      // ⬅️ NEW: Upload replacement image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(base64, {
        folder: `rccgyork/${slug}`,
        resource_type: "image", // OPTIMIZATION: Overwrite the existing image to avoid clutter
        public_id: getPublicIdFromUrl(oldPath, slug) || undefined,
        overwrite: true,
      });
      savedPath = uploadResult.secure_url;
    } else if (!savedPath) {
      return NextResponse.json(
        { error: "Missing file or URL" },
        { status: 400 }
      );
    } // Update DB with the new path

    await pool.query(
      "UPDATE content_media SET image_path = $1, alt_text = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND key_slug = $4",
      [savedPath, alt || "", id, slug]
    );

    return NextResponse.json({ success: true, image_path: savedPath });
  } catch (err) {
    console.error("IMAGE REPLACE ERROR (Cloudinary):", err);
    return NextResponse.json(
      { error: "Failed to replace image" },
      { status: 500 }
    );
  }
}

// --- DELETE: Remove image by ID (Cloudinary delete) ---
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  if (!(await checkAdminAuth())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 }); // Fetch path to delete from Cloudinary

    const res = await pool.query(
      "SELECT image_path FROM content_media WHERE id = $1 AND key_slug = $2",
      [id, slug]
    );
    if (res.rowCount === 0)
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    const imagePath = res.rows[0].image_path; // ⬅️ NEW: Delete from Cloudinary if it's a Cloudinary URL
    if (imagePath.includes("cloudinary.com")) {
      const publicId = getPublicIdFromUrl(imagePath, slug);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    } // Delete database record

    await pool.query(
      "DELETE FROM content_media WHERE id = $1 AND key_slug = $2",
      [id, slug]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("IMAGE DELETE ERROR (Cloudinary):", err);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}

// ⬅️ REMOVED: All local file system dependencies (path, writeFile, unlink, ensureDir, UPLOAD_DIR)
