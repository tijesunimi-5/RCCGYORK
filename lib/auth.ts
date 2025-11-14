import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Define the expected shape of the user payload inside the JWT
export interface AdminPayload {
  id: number;
  username: string;
  role: "admin";
}

/**
 * Authenticates the request using the Bearer token in the Authorization header.
 * @param req The NextRequest object.
 * @returns The decoded user payload if authentication is successful, otherwise null.
 */
export const authenticateAdmin = (req: NextRequest): AdminPayload | null => {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET is not set!");
    return null;
  }

  try {
    // Verify the token using the secret and cast the payload to AdminPayload
    const payload = jwt.verify(token, secret) as AdminPayload;

    // Optional: Check if the role is explicitly 'admin'
    if (payload.role !== "admin") {
      return null;
    }

    return payload;
  } catch (error) {
    // Token is expired, invalid signature, or other JWT error
    return null;
  }
};
