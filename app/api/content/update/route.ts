import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: Request) {
  try {
    const { id, value } = await req.json();

    await pool.query("UPDATE page_content SET text = $1 WHERE id = $2", [
      value,
      id,
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
