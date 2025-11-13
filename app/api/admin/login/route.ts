// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import {connectDB} from "@/lib/mongodb";
// import Admin from "../../../../lib/models/Admin";

// const SECRET = process.env.JWT_SECRET!;

// export async function POST(req: Request) {
//   try {
//     await connectDB();
//     const { email, password } = await req.json();

//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return NextResponse.json(
//         { message: "Invalid email or password" },
//         { status: 401 }
//       );
//     }

//     const validPassword = await bcrypt.compare(password, admin.password);
//     if (!validPassword) {
//       return NextResponse.json(
//         { message: "Invalid email or password" },
//         { status: 401 }
//       );
//     }

//     // Create JWT token with 10 minutes expiry
//     const token = jwt.sign(
//       { email: admin.email },
//       SECRET,
//       { expiresIn: "10m" } // <--- 10 minutes
//     );

//     const response = NextResponse.json({ message: "Login successful" });

//     // Set cookie for session tracking
//     response.cookies.set("admin_token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       path: "/",
//       maxAge: 600, // 10 minutes
//     });

//     return response;
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

// /app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const admin = await Admin.findOne({ email });
    if (!admin) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

    // Generate JWT (expires in 10 minutes)
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "10m" });

    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
