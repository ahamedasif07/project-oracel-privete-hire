import { connectDB } from "@/lib/mongodb";
import { Vehicle } from "@/models/Vehicle";
import type { Vehicle as IVehicleType } from "@/types";

const DEFAULT_FLEET = [
  {
    id: "fleet-executive",
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
    id: "fleet-mpv",
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
    id: "fleet-suv",
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

export interface UpdateVehicleDTO {
  basePrice?: number;
  perMileRate?: number;
  isActive?: boolean;
  description?: string;
  tag?: string;
  seats?: number;
  luggage?: number;
}

class FleetService {
  /**
   * Ensures default fleet vehicles exist if collection is empty
   */
  public async ensureDefaultFleet(): Promise<void> {
    try {
      const count = await Vehicle.countDocuments();
      if (count === 0) {
        for (const v of DEFAULT_FLEET) {
          const { id, ...fleetData } = v;
          await Vehicle.create(fleetData);
        }
        console.log(" Initialized default fleet vehicles.");
      }
    } catch (err: any) {
      console.warn("⚠️ [FleetService] Could not sync default fleet to MongoDB:", err.message);
    }
  }

  /**
   * Fetches all vehicles in order
   */
  public async getFleetVehicles(): Promise<IVehicleType[]> {
    try {
      await connectDB();
      await this.ensureDefaultFleet();

      const vehicles = await Vehicle.find({}).sort({ order: 1 });
      if (vehicles.length > 0) {
        return vehicles.map((v) => v.toJSON()) as unknown as IVehicleType[];
      }
    } catch (err: any) {
      console.warn("⚠️ [FleetService] Using default fleet items due to DB status:", err.message);
    }

    return DEFAULT_FLEET as unknown as IVehicleType[];
  }

  /**
   * Updates vehicle parameters
   */
  public async updateVehicle(id: string, dto: UpdateVehicleDTO): Promise<IVehicleType | null> {
    await connectDB();

    const updateData: Record<string, unknown> = {};
    if (dto.basePrice !== undefined) updateData.basePrice = Number(dto.basePrice);
    if (dto.perMileRate !== undefined) updateData.perMileRate = Number(dto.perMileRate);
    if (dto.isActive !== undefined) updateData.isActive = Boolean(dto.isActive);
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.tag !== undefined) updateData.tag = dto.tag;
    if (dto.seats !== undefined) updateData.seats = Number(dto.seats);
    if (dto.luggage !== undefined) updateData.luggage = Number(dto.luggage);

    const updated = await Vehicle.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) return null;
    return updated.toJSON() as unknown as IVehicleType;
  }
}

export const fleetService = new FleetService();
