import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import { AdminUser } from "@/models/AdminUser";
import { readJsonFile, writeJsonFile } from "@/lib/storage";
import type { AdminUserItem } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET || "oracle-private-hire-super-secret-key-2025";
export const COOKIE_NAME = "oracle_admin_session";
const STORAGE_FILE = "admins.json";

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

export interface CreateAdminDTO {
  name: string;
  username: string;
  email: string;
  password: string;
  role?: string;
}

class AuthService {
  private getLocalAdmins(): (AdminUserItem & { passwordHash?: string })[] {
    const defaultAdmin: (AdminUserItem & { passwordHash?: string }) = {
      id: "admin_master_1",
      name: "Oracle Master Admin",
      username: (process.env.ADMIN_USERNAME || "admin").toLowerCase().trim(),
      email: (process.env.ADMIN_EMAIL || "rxasif31@gmail.com").toLowerCase().trim(),
      role: "SUPER_ADMIN",
      createdAt: new Date().toISOString(),
    };
    return readJsonFile<(AdminUserItem & { passwordHash?: string })[]>(STORAGE_FILE, [defaultAdmin]);
  }

  private saveLocalAdmins(admins: (AdminUserItem & { passwordHash?: string })[]): void {
    writeJsonFile<(AdminUserItem & { passwordHash?: string })[]>(STORAGE_FILE, admins);
  }

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
        console.log(` Created default admin in MongoDB: username=${defaultUsername}, email=${defaultEmail}`);
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
    try {
      await connectDB();
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
    } catch {
      // Fallback to local or env check
    }

    // 2. Check Local Stored Admins
    const localAdmins = this.getLocalAdmins();
    const matchedLocal = localAdmins.find(
      (a) =>
        a.email.toLowerCase() === cleanIdentifier ||
        (a.username && a.username.toLowerCase() === cleanIdentifier)
    );

    if (matchedLocal) {
      let isMatch = false;
      if (matchedLocal.passwordHash) {
        isMatch = await bcrypt.compare(password, matchedLocal.passwordHash);
      } else if (password === envPassword) {
        isMatch = true;
      }

      if (isMatch) {
        const token = this.signToken({
          userId: matchedLocal.id,
          email: matchedLocal.email,
          username: matchedLocal.username,
          role: matchedLocal.role,
        });

        return {
          token,
          user: {
            id: matchedLocal.id,
            email: matchedLocal.email,
            username: matchedLocal.username,
            name: matchedLocal.name,
            role: matchedLocal.role,
          },
        };
      }
    }

    // 3. Direct Environment Credential Check (Reliable Fallback)
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
   * Retrieves all admin accounts
   */
  public async getAllAdmins(): Promise<AdminUserItem[]> {
    try {
      await connectDB();
      await this.ensureDefaultAdmin();
      const users = await AdminUser.find({}, "email username name role createdAt").sort({ createdAt: -1 });
      if (users.length > 0) {
        return users.map((u) => ({
          id: u._id.toString(),
          email: u.email,
          username: u.username,
          name: u.name,
          role: u.role,
          createdAt: u.createdAt,
        }));
      }
    } catch {
      // Fallback to local
    }

    return this.getLocalAdmins().map(({ passwordHash, ...rest }) => rest);
  }

  /**
   * Creates a new admin account
   */
  public async createAdmin(dto: CreateAdminDTO): Promise<AdminUserItem> {
    if (!dto.email || !dto.password || !dto.name) {
      throw new Error("Name, email and password are required.");
    }

    const email = dto.email.toLowerCase().trim();
    const username = (dto.username || email.split("@")[0]).toLowerCase().trim();
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const role = dto.role || "ADMIN";

    const newAdmin: AdminUserItem & { passwordHash: string } = {
      id: `adm_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      name: dto.name.trim(),
      username,
      email,
      role,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    let resultUser: AdminUserItem = {
      id: newAdmin.id,
      name: newAdmin.name,
      username: newAdmin.username,
      email: newAdmin.email,
      role: newAdmin.role,
      createdAt: newAdmin.createdAt,
    };

    try {
      await connectDB();
      const doc = await AdminUser.create({
        name: newAdmin.name,
        username: newAdmin.username,
        email: newAdmin.email,
        passwordHash,
        role: newAdmin.role,
      });

      resultUser = {
        id: doc._id.toString(),
        name: doc.name,
        username: doc.username,
        email: doc.email,
        role: doc.role,
        createdAt: doc.createdAt,
      };
    } catch {
      // Fallback local save
    }

    const local = this.getLocalAdmins();
    local.push(newAdmin);
    this.saveLocalAdmins(local);

    return resultUser;
  }

  /**
   * Deletes an admin account
   */
  public async deleteAdmin(id: string): Promise<boolean> {
    let deleted = false;

    try {
      await connectDB();
      const res = await AdminUser.findByIdAndDelete(id);
      if (res) deleted = true;
    } catch {
      // Fallback
    }

    const local = this.getLocalAdmins();
    const filtered = local.filter((a) => a.id !== id);
    if (filtered.length !== local.length) {
      this.saveLocalAdmins(filtered);
      deleted = true;
    }

    return deleted;
  }

  /**
   * Retrieves current admin profile from token
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
      // Fallback
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
