import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/lib/pg";

const SECRET = process.env.JWT_SECRET!;

// --- AUTH CHECK ---
async function checkAdminAuth(req: Request): Promise<boolean> {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return false;

  const token = cookieHeader
    .split("; ")
    .find((row) => row.startsWith("admin_token="))
    ?.split("=")[1];

  if (!token) return false;

  try {
    const decoded: any = jwt.verify(token, SECRET);
    const now = Date.now() / 1000;
    return decoded.exp >= now;
  } catch {
    return false;
  }
}

// --- GET ---
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    const result = await pool.query(
      "SELECT content FROM content_snippets WHERE key_slug = $1",
      [slug]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ content: null });
    }

    return NextResponse.json({ content: result.rows[0].content });
  } catch (err) {
    console.error("CONTENT FETCH ERROR:", err);
    return NextResponse.json(
      { error: "Failed to load snippet" },
      { status: 500 }
    );
  }
}

// --- PUT ---
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  if (!(await checkAdminAuth(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { content } = await request.json();
    const contentToSave = String(content || "");

    await pool.query(
      `
      INSERT INTO content_snippets (key_slug, content, content_type)
      VALUES ($1, $2, $3)
      ON CONFLICT (key_slug)
      DO UPDATE SET 
        content = $2,
        updated_at = CURRENT_TIMESTAMP
      `,
      [slug, contentToSave, "text"]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("CONTENT UPDATE FATAL ERROR:", err);
    return NextResponse.json(
      { error: "Failed to update snippet" },
      { status: 500 }
    );
  }
}
