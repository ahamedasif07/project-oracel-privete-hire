import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import { AdminUser } from "@/models/AdminUser";

const JWT_SECRET = process.env.JWT_SECRET || "oracle-private-hire-super-secret-key-2025";
export const COOKIE_NAME = "oracle_admin_session";

export interface TokenPayload {
  userId: string;
  email: string;
  username?: string;
  role: string;
}

export interface AdminProfile {
  id: string;
  email: string;
  username?: string;
  name: string;
  role: string;
}

class AuthService {
  /**
   * Generates a signed JWT token for an admin
   */
  public signToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
  }

  /**
   * Verifies and decodes a JWT token
   */
  public verifyToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch {
      return null;
    }
  }

  /**
   * Automatically ensures the primary admin user exists in MongoDB and is up to date
   */
  public async ensureDefaultAdmin(): Promise<void> {
    try {
      const defaultEmail = (process.env.ADMIN_EMAIL || "rxasif31@gmail.com").toLowerCase().trim();
      const defaultUsername = (process.env.ADMIN_USERNAME || "admin").toLowerCase().trim();
      const defaultPassword = process.env.ADMIN_PASSWORD || "123456";

      const existingAdmin = await AdminUser.findOne({
        $or: [{ email: defaultEmail }, { username: defaultUsername }],
      });

      if (!existingAdmin) {
        const passwordHash = await bcrypt.hash(defaultPassword, 10);
        await AdminUser.create({
          email: defaultEmail,
          username: defaultUsername,
          name: "Oracle Admin",
          passwordHash,
          role: "SUPER_ADMIN",
        });
        console.log(` Created default admin: username=${defaultUsername}, email=${defaultEmail}`);
      } else {
        let needsUpdate = false;
        if (!existingAdmin.username || existingAdmin.username !== defaultUsername) {
          existingAdmin.username = defaultUsername;
          needsUpdate = true;
        }
        if (existingAdmin.email !== defaultEmail) {
          existingAdmin.email = defaultEmail;
          needsUpdate = true;
        }

        const isPasswordValid = await bcrypt.compare(defaultPassword, existingAdmin.passwordHash);
        if (!isPasswordValid) {
          existingAdmin.passwordHash = await bcrypt.hash(defaultPassword, 10);
          needsUpdate = true;
        }

        if (needsUpdate) {
          await existingAdmin.save();
          console.log(` Synced admin credentials: username=${defaultUsername}, email=${defaultEmail}`);
        }
      }
    } catch (err: any) {
      console.warn("⚠️ [AuthService] Could not sync default admin to MongoDB:", err.message);
    }
  }

  /**
   * Authenticates an admin user with username OR email and password
   */
  public async loginAdmin(identifier: string, password: string): Promise<{ token: string; user: AdminProfile }> {
    const rawId = identifier.toLowerCase().trim();
    const cleanIdentifier = rawId === "asmin" ? "admin" : rawId;

    const envEmail = (process.env.ADMIN_EMAIL || "rxasif31@gmail.com").toLowerCase().trim();
    const envUsername = (process.env.ADMIN_USERNAME || "admin").toLowerCase().trim();
    const envPassword = process.env.ADMIN_PASSWORD || "123456";

    // 1. Try DB Authentication
    let dbConnected = false;
    try {
      await connectDB();
      dbConnected = true;
      await this.ensureDefaultAdmin();

      const admin = await AdminUser.findOne({
        $or: [{ email: cleanIdentifier }, { username: cleanIdentifier }],
      });

      if (admin) {
        const isValidPassword = await bcrypt.compare(password, admin.passwordHash);
        if (isValidPassword) {
          const token = this.signToken({
            userId: admin._id.toString(),
            email: admin.email,
            username: admin.username,
            role: admin.role,
          });

          const user: AdminProfile = {
            id: admin._id.toString(),
            email: admin.email,
            username: admin.username,
            name: admin.name,
            role: admin.role,
          };

          return { token, user };
        }
      }
    } catch (dbErr: any) {
      console.warn("⚠️ [AuthService DB Warning]:", dbErr.message);
    }

    // 2. Direct Environment Credential Check (Reliable Fallback)
    const matchesEnv =
      (cleanIdentifier === envEmail || cleanIdentifier === envUsername || cleanIdentifier === "admin") &&
      password === envPassword;

    if (matchesEnv) {
      const token = this.signToken({
        userId: "admin_master_session",
        email: envEmail,
        username: envUsername,
        role: "SUPER_ADMIN",
      });

      const user: AdminProfile = {
        id: "admin_master_session",
        email: envEmail,
        username: envUsername,
        name: "Oracle Admin",
        role: "SUPER_ADMIN",
      };

      return { token, user };
    }

    throw new Error("Invalid username/email or password.");
  }

  /**
   * Retrieves the current admin profile from a JWT token
   */
  public async getAdminFromToken(token: string): Promise<AdminProfile | null> {
    const payload = this.verifyToken(token);
    if (!payload || !payload.userId) {
      return null;
    }

    const envEmail = (process.env.ADMIN_EMAIL || "rxasif31@gmail.com").toLowerCase().trim();
    const envUsername = (process.env.ADMIN_USERNAME || "admin").toLowerCase().trim();

    if (payload.userId === "admin_master_session") {
      return {
        id: "admin_master_session",
        email: payload.email || envEmail,
        username: payload.username || envUsername,
        name: "Oracle Admin",
        role: payload.role || "SUPER_ADMIN",
      };
    }

    try {
      await connectDB();
      const admin = await AdminUser.findById(payload.userId).select("email username name role");
      if (admin) {
        return {
          id: admin._id.toString(),
          email: admin.email,
          username: admin.username,
          name: admin.name,
          role: admin.role,
        };
      }
    } catch {
      // Fallback from token payload
    }

    return {
      id: payload.userId,
      email: payload.email || envEmail,
      username: payload.username || envUsername,
      name: "Oracle Admin",
      role: payload.role || "SUPER_ADMIN",
    };
  }
}

export const authService = new AuthService();
