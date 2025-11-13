import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    // Check if admin already exists
    const existing = await Admin.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Admin already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    await Admin.create({ email, password: hashedPassword });

    return NextResponse.json(
      { message: "Admin created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
