import { cookies } from "next/headers";
import { authService, COOKIE_NAME, TokenPayload, AdminProfile } from "@/services/auth.service";

export { COOKIE_NAME, type TokenPayload, type AdminProfile };

export function signToken(payload: TokenPayload): string {
  return authService.signToken(payload);
}

export function verifyToken(token: string): TokenPayload | null {
  return authService.verifyToken(token);
}

export async function getCurrentAdmin(): Promise<AdminProfile | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  return authService.getAdminFromToken(token);
}
