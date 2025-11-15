import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/lib/pg"; 
import { NextRequest } from "next/server";


const SECRET = process.env.JWT_SECRET!;

// Define the specific interface for the context object
interface RouteContext {
  params: {
    slug: string;
  };
}

// --- 1. ADMIN AUTHENTICATION HELPER ---
// Checks if the request contains a valid, unexpired admin cookie.
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
    // Check for token expiry
    if (decoded.exp < now) return false;

    return true;
  } catch (error) {
    return false;
  }
}
// ------------------------------------------------------------------

// --- 2. GET: FETCH CONTENT SNIPPET ---
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const result = await pool.query(
      "SELECT content FROM content_snippets WHERE key_slug = $1",
      [params.slug]
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

// --- 3. PUT: UPDATE/CREATE CONTENT SNIPPET ---
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  // CRITICAL FIX: Authenticate the admin user before saving
  if (!(await checkAdminAuth(request))) {
    // If auth fails, return 401 Unauthorized immediately.
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { content } = await request.json();
    const contentToSave = String(content || "");

    // FIX: Explicitly include 'content_type' and its value 'text' in the INSERT statement.
    await pool.query(
      `
    INSERT INTO content_snippets (key_slug, content, content_type)
    VALUES ($1, $2, $3)
    ON CONFLICT (key_slug)
    DO UPDATE SET 
      content = $2,
      updated_at = CURRENT_TIMESTAMP
    `,
      [params.slug, contentToSave, "text"] // Pass 'text' as the third parameter ($3)
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("CONTENT UPDATE FATAL ERROR (500):", err);
    return NextResponse.json(
      { error: "Failed to update snippet" },
      { status: 500 }
    );
  }
}
