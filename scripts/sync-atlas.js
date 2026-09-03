const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const uri =
  "mongodb+srv://oracel-privete-hire:Un6IveMUYlhluWYr@cluster0.tzvnomp.mongodb.net/oracle_private_hire?retryWrites=true&w=majority&appName=Cluster0";

async function syncToAtlas() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(uri);
  console.log("✅ Successfully connected to MongoDB Atlas Database: oracle_private_hire");

  const db = mongoose.connection.db;

  // 1. Admin Users
  const adminCol = db.collection("adminusers");
  const existingAdmin = await adminCol.findOne({ email: "rxasif31@gmail.com" });
  if (!existingAdmin) {
    const hash = await bcrypt.hash("123456", 10);
    await adminCol.insertOne({
      name: "Oracle Admin",
      username: "admin",
      email: "rxasif31@gmail.com",
      passwordHash: hash,
      role: "SUPER_ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(" Created admin user in Atlas: admin / rxasif31@gmail.com");
  }

  // 2. Vehicles
  const fleetCol = db.collection("vehicles");
  const fleetCount = await fleetCol.countDocuments();
  if (fleetCount === 0) {
    const defaultFleet = [
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
        features:
          "Leather Seats,Dual Climate Control,High-Speed Wi-Fi,USB-C Chargers,Bottled Mineral Water",
        order: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
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
        features:
          "Conference Seating,Extra Luggage Capacity,Privacy Glass,Climate Control,Wi-Fi & Device Charging",
        order: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
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
        features:
          "Panoramic Glass Roof,Heated Leather Seats,Surround Sound,Executive Refreshments,All-Terrain Stability",
        order: 3,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await fleetCol.insertMany(defaultFleet);
    console.log(" Inserted default fleet vehicles into Atlas.");
  }

  // 3. Bookings
  const bookingCol = db.collection("bookings");
  const localBookingsPath = path.join(process.cwd(), ".data", "bookings.json");
  if (fs.existsSync(localBookingsPath)) {
    const localBookings = JSON.parse(fs.readFileSync(localBookingsPath, "utf8"));
    for (const b of localBookings) {
      const exists = await bookingCol.findOne({ bookingRef: b.bookingRef });
      if (!exists) {
        const { id, ...doc } = b;
        doc.createdAt = new Date(b.createdAt || Date.now());
        doc.updatedAt = new Date(b.updatedAt || Date.now());
        await bookingCol.insertOne(doc);
        console.log(" Synced booking to Atlas:", b.bookingRef);
      }
    }
  }

  const collections = await db.listCollections().toArray();
  console.log("Collections in oracle_private_hire:", collections.map((c) => c.name));

  const totalBookings = await bookingCol.countDocuments();
  const totalVehicles = await fleetCol.countDocuments();
  const totalAdmins = await adminCol.countDocuments();

  console.log(
    `✅ Done! MongoDB Atlas has: ${totalBookings} Bookings, ${totalVehicles} Vehicles, ${totalAdmins} Admin Users.`
  );

  await mongoose.disconnect();
  process.exit(0);
}

syncToAtlas().catch((e) => {
  console.error("❌ Sync error:", e);
  process.exit(1);
});
