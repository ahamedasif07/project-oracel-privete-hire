export type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
export type PaymentStatus = "UNPAID" | "PAID";
export type PaymentMethod = "cash_to_driver" | "card_pay" | "pay_online" | "invoice";

export interface Booking {
  id: string;
  bookingRef: string;
  status: BookingStatus | string;
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
  paymentMethod: PaymentMethod | string;
  paymentStatus: PaymentStatus | string;
  adminNotes?: string | null;
  assignedDriver?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  isRead: boolean;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export interface Vehicle {
  id: string;
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
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  unreadMessages: number;
  totalRevenue: number;
}

export interface AdminUserSession {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface SystemSettingsMap {
  [key: string]: string;
}
