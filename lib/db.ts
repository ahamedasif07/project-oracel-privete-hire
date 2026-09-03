import { connectDB } from "./mongodb";
import { Booking } from "@/models/Booking";
import { ContactMessage } from "@/models/ContactMessage";
import { Vehicle } from "@/models/Vehicle";
import { AdminUser } from "@/models/AdminUser";
import { SystemSetting } from "@/models/SystemSetting";

export { connectDB, Booking, ContactMessage, Vehicle, AdminUser, SystemSetting };
export default connectDB;
