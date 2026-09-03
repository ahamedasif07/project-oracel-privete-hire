import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  bookingRef: string;
  status: string; // PENDING, CONFIRMED, COMPLETED, CANCELLED
  serviceType: string;
  pickupAddress: string;
  dropoffAddress: string;
  viaAddress?: string | null;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string | null;
  returnTime?: string | null;
  isReturn: boolean;
  flightNumber?: string | null;
  airportName?: string | null;
  terminal?: string | null;
  vehicleType: string;
  passengers: number;
  luggage: number;
  childSeats: number;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  specialRequests?: string | null;
  estimatedFare: number;
  paymentMethod: string;
  paymentStatus: string;
  adminNotes?: string | null;
  assignedDriver?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    bookingRef: { type: String, required: true, unique: true, index: true },
    status: { type: String, default: "PENDING", index: true },
    serviceType: { type: String, default: "airport" },
    pickupAddress: { type: String, required: true },
    dropoffAddress: { type: String, required: true },
    viaAddress: { type: String, default: null },
    pickupDate: { type: String, required: true },
    pickupTime: { type: String, required: true },
    returnDate: { type: String, default: null },
    returnTime: { type: String, default: null },
    isReturn: { type: Boolean, default: false },
    flightNumber: { type: String, default: null },
    airportName: { type: String, default: null },
    terminal: { type: String, default: null },
    vehicleType: { type: String, default: "Executive Saloon" },
    passengers: { type: Number, default: 1 },
    luggage: { type: Number, default: 1 },
    childSeats: { type: Number, default: 0 },
    passengerName: { type: String, required: true },
    passengerEmail: { type: String, required: true },
    passengerPhone: { type: String, required: true },
    specialRequests: { type: String, default: null },
    estimatedFare: { type: Number, default: 0 },
    paymentMethod: { type: String, default: "cash_to_driver" },
    paymentStatus: { type: String, default: "UNPAID" },
    adminNotes: { type: String, default: null },
    assignedDriver: { type: String, default: null },
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

export const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
