import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/pg";
import { authenticateAdmin } from "@/lib/auth"; // Import the new auth helper

// POST handler (for contact form submission - unchanged)
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { firstName, lastName, email, phone, message } = data;
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO contact_messages (first_name, last_name, email, phone, message_body)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;

    const values = [firstName, lastName, email, phone || null, message];

    const result = await pool.query(query, values);

    return NextResponse.json(
      {
        message: "Message sent successfully!",
        id: result.rows[0].id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 500 }
    );
  }
}

// GET handler (for admin dashboard to view messages - NEW)
export async function GET(req: NextRequest) {
  // 1. Authentication Check: Protect the route
  const admin = authenticateAdmin(req);
  if (!admin) {
    return NextResponse.json(
      { message: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    // 2. Fetch all messages, ordered by newest first
    const query = `
            SELECT 
                id, 
                first_name AS "firstName", 
                last_name AS "lastName", 
                email, 
                phone, 
                message_body AS message,
                received_at AS "receivedAt",
                is_read AS "isRead"
            FROM contact_messages
            ORDER BY received_at DESC;
        `;

    const result = await pool.query(query);

    // 3. Return the messages
    return NextResponse.json({ messages: result.rows }, { status: 200 });
  } catch (error) {
    console.error("Database GET Error:", error);
    return NextResponse.json(
      { message: "Failed to retrieve messages" },
      { status: 500 }
    );
  }
}
