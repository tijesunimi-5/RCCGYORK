import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const result = await pool.query("SELECT id, text FROM page_content");

    const mapped: any = {};
    result.rows.forEach((row) => {
      mapped[row.id] = row.text;
    });

    return NextResponse.json(mapped);
  } catch (err) {
    console.error("GET ERROR:", err);
    return NextResponse.json(
      { error: "Failed to load content" },
      { status: 500 }
    );
  }
}
