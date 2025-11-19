import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "@/lib/pg";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // 1. Check if admin already exists
    const existingQuery = "SELECT id FROM admin_users WHERE username = $1";
    const existingResult = await pool.query(existingQuery, [username]);

    if (existingResult.rows.length > 0) {
      return NextResponse.json(
        { error: "Admin username already exists" },
        { status: 400 }
      );
    }

    // 2. Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create admin user
    const insertQuery = `
      INSERT INTO admin_users (username, hashed_password, role)
      VALUES ($1, $2, 'admin')
      RETURNING id, username
    `;
    const insertResult = await pool.query(insertQuery, [
      username,
      hashedPassword,
    ]);

    const admin = insertResult.rows[0];

    // 4. Generate JWT token
    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        role: "admin",
      },
      SECRET,
      { expiresIn: "7d" }
    );

    // 5. Return token so frontend can log in immediately
    return NextResponse.json(
      {
        message: "Admin created successfully",
        token,
        adminId: admin.id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Registration Error:", err);
    return NextResponse.json(
      { error: "Server error during registration" },
      { status: 500 }
    );
  }
}
