import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "@/lib/pg"; // Import PG pool

// 1 hour in seconds
const TOKEN_MAX_AGE = 3600;

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Missing username or password" },
        { status: 400 }
      );
    }

    // 1. Fetch Admin User from PostgreSQL
    const userQuery =
      "SELECT id, username, hashed_password, role FROM admin_users WHERE username = $1";
    const result = await pool.query(userQuery, [username]);

    const admin = result.rows[0];

    if (!admin) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    // 2. Compare Password Hash
    const validPassword = await bcrypt.compare(password, admin.hashed_password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    // 3. Generate JWT Token (1 hour expiry)
    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET!,
      { expiresIn: TOKEN_MAX_AGE }
    );

    // 4. Create Response and Set Secure Cookie
    const response = NextResponse.json(
      {
        message: "Login successful",
        token: token, // Sending token back for client-side use (EditableText)
      },
      { status: 200 }
    );

    response.cookies.set("admin_token", token, {
      httpOnly: true, // Prevents client-side JavaScript access (security)
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "strict", // Protects against CSRF
      path: "/",
      maxAge: TOKEN_MAX_AGE, // 1 hour session
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Server error during login" },
      { status: 500 }
    );
  }
}
