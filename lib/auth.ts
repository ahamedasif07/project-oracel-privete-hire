import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectDB, AdminUser } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "oracle-private-hire-super-secret-key-2025";
const COOKIE_NAME = "oracle_admin_session";

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function getCurrentAdmin() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  try {
    await connectDB();
    const user = await AdminUser.findById(payload.userId).select("email name role");
    if (!user) return null;
    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
