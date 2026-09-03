const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");

// Load .env manually if not in next environment
const envPath = path.resolve(__dirname, "../.env");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf8");
  envConfig.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...values] = trimmed.split("=");
      if (key && values.length > 0) {
        const val = values.join("=").replace(/^["']|["']$/g, "").trim();
        process.env[key.trim()] = val;
      }
    }
  });
}

const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL;

if (!MONGODB_URI) {
  console.error("❌ Error: MONGODB_URI is not defined in .env");
  process.exit(1);
}

// Schemas
const AdminUserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: "Admin" },
    role: { type: String, default: "ADMIN" },
  },
  { timestamps: true }
);

const VehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
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
  { timestamps: true }
);

const SystemSettingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: String, required: true },
  },
  { timestamps: true }
);

const AdminUser = mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);
const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle", VehicleSchema);
const SystemSetting = mongoose.models.SystemSetting || mongoose.model("SystemSetting", SystemSettingSchema);

async function seed() {
  console.log("Connecting to MongoDB:", MONGODB_URI.replace(/:([^:@]+)@/, ":****@"));
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB database.");

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "admin@oracleprivatehire.co.uk";
  const rawPassword = process.env.ADMIN_PASSWORD || "admin123456";
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  await AdminUser.findOneAndUpdate(
    { email: adminEmail },
    {
      email: adminEmail,
      name: "Oracle Admin",
      passwordHash: hashedPassword,
      role: "SUPER_ADMIN",
    },
    { upsert: true, new: true }
  );
  console.log(`Admin user seeded: ${adminEmail} (password: ${rawPassword})`);

  // 2. Seed Fleet Vehicles
  const vehicles = [
    {
      name: "Executive Saloon",
      slug: "executive-saloon",
      tag: "Mercedes-Benz E-Class",
      seats: 3,
      luggage: 2,
      basePrice: 45.0,
      perMileRate: 2.5,
      image: "/images/fleet-executive.jpg",
      description:
        "The gold standard of executive travel — refined, whisper-quiet and effortlessly smooth for business and personal travel.",
      features: "Leather Seats,Dual Climate Control,High-Speed Wi-Fi,USB-C Chargers,Bottled Mineral Water",
      order: 1,
      isActive: true,
    },
    {
      name: "Luxury MPV",
      slug: "luxury-mpv",
      tag: "Mercedes-Benz V-Class",
      seats: 7,
      luggage: 7,
      basePrice: 65.0,
      perMileRate: 3.2,
      image: "/images/fleet-mpv.jpg",
      description:
        "Spacious luxury for groups, families and larger luggage requirements without compromising elegance or comfort.",
      features: "Conference Seating,Extra Luggage Capacity,Privacy Glass,Climate Control,Wi-Fi & Device Charging",
      order: 2,
      isActive: true,
    },
    {
      name: "Prestige SUV",
      slug: "prestige-suv",
      tag: "Range Rover",
      seats: 4,
      luggage: 4,
      basePrice: 85.0,
      perMileRate: 3.8,
      image: "/images/fleet-suv.jpg",
      description:
        "Commanding presence with limousine-grade comfort inside, elevated ride height and unmatched British luxury.",
      features: "Panoramic Glass Roof,Heated Leather Seats,Surround Sound,Executive Refreshments,All-Terrain Stability",
      order: 3,
      isActive: true,
    },
  ];

  for (const v of vehicles) {
    await Vehicle.findOneAndUpdate({ slug: v.slug }, v, { upsert: true, new: true });
  }
  console.log("Fleet vehicles seeded.");

  // 3. Seed System Settings
  const defaultSettings = [
    { key: "company_name", value: "Oracle Private Hire" },
    { key: "company_phone", value: "07456714214" },
    { key: "company_email", value: "bookings@oracleprivatehire.co.uk" },
    { key: "company_whatsapp", value: "07456714214" },
    { key: "company_address", value: "United Kingdom — nationwide 24/7 service" },
    { key: "smtp_host", value: process.env.SMTP_HOST || "smtp.gmail.com" },
    { key: "smtp_port", value: process.env.SMTP_PORT || "587" },
    { key: "smtp_secure", value: process.env.SMTP_SECURE || "false" },
    { key: "smtp_user", value: process.env.SMTP_USER || "bookings@oracleprivatehire.co.uk" },
    { key: "smtp_pass", value: process.env.SMTP_PASS || "" },
    { key: "smtp_from", value: process.env.SMTP_FROM || '"Oracle Private Hire" <bookings@oracleprivatehire.co.uk>' },
    { key: "notification_email", value: process.env.NOTIFICATION_EMAIL || "bookings@oracleprivatehire.co.uk" },
  ];

  for (const s of defaultSettings) {
    await SystemSetting.findOneAndUpdate({ key: s.key }, s, { upsert: true, new: true });
  }
  console.log("System settings seeded.");

  await mongoose.disconnect();
  console.log("Done.");
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
