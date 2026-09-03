import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdminUser extends Document {
  username?: string;
  email: string;
  passwordHash: string;
  name: string;
  role: string;
  resetPasswordOtp?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema: Schema = new Schema(
  {
    username: { type: String, unique: true, sparse: true, index: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: "Admin" },
    role: { type: String, default: "ADMIN" },
    resetPasswordOtp: { type: String, select: false },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret: any) {
        ret.id = ret._id.toString();
        delete ret.__v;
        delete ret.passwordHash;
        delete ret.resetPasswordOtp;
        delete ret.resetPasswordToken;
        delete ret.resetPasswordExpires;
        return ret;
      },
    },
  }
);

export const AdminUser: Model<IAdminUser> =
  mongoose.models.AdminUser ||
  mongoose.model<IAdminUser>("AdminUser", AdminUserSchema);

export default AdminUser;
