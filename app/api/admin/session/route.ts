import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!; // Make sure you have this in your .env

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie");
    if (!cookieHeader) {
      return NextResponse.json({ authenticated: false });
    }

    const token = cookieHeader
      .split("; ")
      .find((row) => row.startsWith("admin_token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ authenticated: false });
    }

    // Verify token
    const decoded: any = jwt.verify(token, SECRET);

    // Check token expiry (10 minutes)
    const now = Date.now() / 1000;
    if (decoded.exp < now) {
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({ authenticated: true, admin: decoded.email });
  } catch (error) {
    return NextResponse.json({ authenticated: false });
  }
}
