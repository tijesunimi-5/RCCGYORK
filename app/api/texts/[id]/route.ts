// app/api/texts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Text from "@/lib/models/Text";
import jwt from "jsonwebtoken";

// Define the params type properly for Next.js 16
type Params = { params: Promise<{ id: string }> };

// GET text by id
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params; // ← await here!

    const record = await Text.findOne({ id });
    return NextResponse.json({ text: record?.text || "" });
  } catch (err) {
    console.error("GET /api/texts/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT (update) text
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params; // ← await here too!

    // Auth check
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify JWT
    jwt.verify(token, process.env.JWT_SECRET!);

    const { text } = await req.json();

    let record = await Text.findOne({ id });
    if (!record) {
      record = new Text({ id, text });
    } else {
      record.text = text;
    }

    await record.save();

    return NextResponse.json({ message: "Text updated successfully" });
  } catch (err: any) {
    console.error("PUT /api/texts/[id] error:", err);

    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
