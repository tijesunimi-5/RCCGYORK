import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Writeup from "../../../lib/models/Writeup";

// GET: Fetch content
export async function GET() {
  await connectDB();
  const doc = await Writeup.findOne();
  return NextResponse.json({ text: doc?.text || "" });
}

// PUT: Update content
export async function PUT(req: Request) {
  await connectDB();
  const { text } = await req.json();

  let doc = await Writeup.findOne();
  if (!doc) {
    doc = new Writeup({ text });
  } else {
    doc.text = text;
  }
  await doc.save();

  return NextResponse.json({ message: "Write-up updated" });
}
