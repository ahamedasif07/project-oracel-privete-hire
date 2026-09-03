import { NextRequest, NextResponse } from "next/server";
import { authService, COOKIE_NAME } from "@/services/auth.service";
import { getCurrentAdmin } from "@/lib/auth";

class AuthController {
  /**
   * Handles admin login via username or email, creates session cookie
   */
  public async login(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json().catch(() => ({}));
      const identifier = (body.identifier || body.username || body.email || "").trim();
      const password = (body.password || "").trim();

      if (!identifier || !password) {
        return NextResponse.json(
          { error: "Username/Email and password are required." },
          { status: 400 }
        );
      }

      const { token, user } = await authService.loginAdmin(identifier, password);

      const response = NextResponse.json({
        success: true,
        user,
      });

      response.cookies.set({
        name: COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Authentication failed.";
      console.error("Login controller error:", errorMessage);
      return NextResponse.json(
        { error: errorMessage },
        { status: 401 }
      );
    }
  }

  /**
   * Handles admin logout, clears session cookie
   */
  public async logout(): Promise<NextResponse> {
    const response = NextResponse.json({ success: true, message: "Logged out successfully." });
    response.cookies.set({
      name: COOKIE_NAME,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });
    return response;
  }

  /**
   * Returns current authenticated admin session
   */
  public async getSession(): Promise<NextResponse> {
    try {
      const admin = await getCurrentAdmin();
      if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.json({ user: admin });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to retrieve session.";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }

  /**
   * Returns all admin users (Admin Only)
   */
  public async getAdmins(): Promise<NextResponse> {
    try {
      const admin = await getCurrentAdmin();
      if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const admins = await authService.getAllAdmins();
      return NextResponse.json({ admins });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch admin accounts.";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }

  /**
   * Creates a new admin user (Admin Only)
   */
  public async createAdmin(req: NextRequest): Promise<NextResponse> {
    try {
      const admin = await getCurrentAdmin();
      if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const body = await req.json().catch(() => ({}));
      const newAdmin = await authService.createAdmin(body);

      return NextResponse.json({ success: true, admin: newAdmin }, { status: 201 });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create admin user.";
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
  }

  /**
   * Deletes an admin user (Admin Only)
   */
  public async deleteAdmin(req: NextRequest, id: string): Promise<NextResponse> {
    try {
      const admin = await getCurrentAdmin();
      if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const deleted = await authService.deleteAdmin(id);
      if (!deleted) {
        return NextResponse.json({ error: "Admin user not found." }, { status: 404 });
      }

      return NextResponse.json({ success: true });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete admin user.";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }
}

export const authController = new AuthController();
