// app/api/service/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Service from "@/lib/models/Service";

// This tells TypeScript exactly what params look like
type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    // Await the async params – this is the key fix for Next.js 16
    const { id } = await params;

    const body = await req.json();

    const updated = await Service.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true, // optional but recommended
    });

    if (!updated) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("PATCH /api/service/[id] error:", err);
    return NextResponse.json(
      { error: "Update failed", details: err.message },
      { status: 500 }
    );
  }
}

// Optional: Add other handlers (GET, DELETE) with the same pattern
export async function GET(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;

    const service = await Service.findById(id);
    if (!service) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch service" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;

    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
