import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Text from "../../../../lib/models/Text";
import jwt from "jsonwebtoken";

// GET text
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const record = await Text.findOne({ id: params.id });
  return NextResponse.json({ text: record?.text || "" });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    jwt.verify(token, process.env.JWT_SECRET!); // throws if invalid/expired

    const { text } = await req.json();

    let record = await Text.findOne({ id: params.id });
    if (!record) record = new Text({ id: params.id, text });
    else record.text = text;

    await record.save();

    return NextResponse.json({ message: "Text updated" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Unauthorized or server error" },
      { status: 401 }
    );
  }
}