import { NextResponse } from "next/server";
import pool from "@/lib/pg";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

function saveBase64ToFile(base64: string, filename: string) {
  // base64 like "data:image/png;base64,......"
  const matches = base64.match(/^data:(.+);base64,(.+)$/);
  if (!matches) throw new Error("Invalid base64 data");
  const buffer = Buffer.from(matches[2], "base64");
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  const unique = `${Date.now()}-${filename.replace(/\s+/g, "-")}`;
  const filePath = path.join(uploadDir, unique);
  fs.writeFileSync(filePath, buffer);
  // return web path
  return `/uploads/${unique}`;
}

export async function POST(req: Request) {
  try {
    // admin check via cookie token
    const cookieHeader = req.headers.get("cookie") || "";
    const token = cookieHeader
      .split("; ")
      .find((c) => c.startsWith("admin_token="))
      ?.split("=")[1];
    if (!token)
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    // either imageUrl or base64+filename
    let imageUrl = body.imageUrl as string | undefined;
    const alt = body.alt ?? null;

    if (!imageUrl && body.base64 && body.filename) {
      imageUrl = saveBase64ToFile(body.base64, body.filename);
    }

    if (!imageUrl)
      return NextResponse.json(
        { success: false, error: "No image provided" },
        { status: 400 }
      );

    // create unique slug
    const slug = `media_${Date.now()}`;

    const insertRes = await pool.query(
      `INSERT INTO dynamic_content (key_type, key_slug, data, list_order)
       VALUES ($1, $2, $3::jsonb, $4)
       RETURNING id, key_slug`,
      ["media", slug, JSON.stringify({ imageUrl, alt }), 0]
    );

    return NextResponse.json({
      success: true,
      item: {
        id: insertRes.rows[0].id,
        key_slug: insertRes.rows[0].key_slug,
        imageUrl,
        alt,
      },
    });
  } catch (err) {
    console.error("ADD MEDIA ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Failed to add media" },
      { status: 500 }
    );
  }
}
