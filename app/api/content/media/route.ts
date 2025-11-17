import { NextResponse } from "next/server";
import pool from "@/lib/pg";

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, key_slug, data, list_order, updated_at
       FROM dynamic_content
       WHERE key_type = 'media'
       ORDER BY list_order ASC, id ASC`
    );

    // parse JSONB data (already as JS object from pg)
    const items = result.rows.map((r) => ({
      id: r.id,
      key_slug: r.key_slug,
      data: r.data, // expected { imageUrl: string, alt?: string }
      list_order: r.list_order,
      updated_at: r.updated_at,
    }));

    return NextResponse.json({ success: true, items });
  } catch (err) {
    console.error("GET MEDIA ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch media" },
      { status: 500 }
    );
  }
}
