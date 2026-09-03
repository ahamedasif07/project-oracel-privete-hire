import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVehicle extends Document {
  name: string;
  slug: string;
  tag: string;
  seats: number;
  luggage: number;
  basePrice: number;
  perMileRate: number;
  image: string;
  description: string;
  features: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const VehicleSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    tag: { type: String, required: true },
    seats: { type: Number, default: 4 },
    luggage: { type: Number, default: 2 },
    basePrice: { type: Number, default: 45 },
    perMileRate: { type: Number, default: 2.5 },
    image: { type: String, required: true },
    description: { type: String, default: "" },
    features: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret: any) {
        ret.id = ret._id.toString();
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Vehicle: Model<IVehicle> =
  mongoose.models.Vehicle || mongoose.model<IVehicle>("Vehicle", VehicleSchema);

export default Vehicle;
