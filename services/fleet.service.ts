import { connectDB } from "@/lib/mongodb";
import { Vehicle } from "@/models/Vehicle";
import { readJsonFile, writeJsonFile } from "@/lib/storage";
import type { Vehicle as IVehicleType } from "@/types";

const STORAGE_FILE = "fleet.json";

const DEFAULT_FLEET: IVehicleType[] = [
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

export interface CreateVehicleDTO {
  name: string;
  tag: string;
  slug?: string;
  seats: number;
  luggage: number;
  basePrice: number;
  perMileRate: number;
  image?: string;
  description?: string;
  features?: string;
  order?: number;
  isActive?: boolean;
}

export interface UpdateVehicleDTO {
  name?: string;
  tag?: string;
  slug?: string;
  basePrice?: number;
  perMileRate?: number;
  isActive?: boolean;
  description?: string;
  features?: string;
  image?: string;
  seats?: number;
  luggage?: number;
}

class FleetService {
  private getLocalFleet(): IVehicleType[] {
    return readJsonFile<IVehicleType[]>(STORAGE_FILE, DEFAULT_FLEET);
  }

  private saveLocalFleet(fleet: IVehicleType[]): void {
    writeJsonFile<IVehicleType[]>(STORAGE_FILE, fleet);
  }

  /**
   * Ensures default fleet vehicles exist in MongoDB if collection is empty
   */
  public async ensureDefaultFleet(): Promise<void> {
    try {
      const count = await Vehicle.countDocuments();
      if (count === 0) {
        for (const v of DEFAULT_FLEET) {
          const { id, ...fleetData } = v;
          await Vehicle.create(fleetData);
        }
        console.log(" Initialized default fleet vehicles in MongoDB.");
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
    } catch {
      // Fallback
    }

    return this.getLocalFleet();
  }

  /**
   * Creates a new vehicle in fleet
   */
  public async createVehicle(dto: CreateVehicleDTO): Promise<IVehicleType> {
    if (!dto.name || !dto.tag) {
      throw new Error("Vehicle name and tag are required.");
    }

    const slug =
      dto.slug ||
      dto.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const newVehicle: IVehicleType = {
      id: `vh_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      name: dto.name,
      slug,
      tag: dto.tag,
      seats: Number(dto.seats) || 4,
      luggage: Number(dto.luggage) || 2,
      basePrice: Number(dto.basePrice) || 50,
      perMileRate: Number(dto.perMileRate) || 2.5,
      image: dto.image || "/images/fleet-executive.jpg",
      description: dto.description || "",
      features: dto.features || "Climate Control,Leather Seats,Wi-Fi",
      order: Number(dto.order) || 99,
      isActive: dto.isActive !== undefined ? Boolean(dto.isActive) : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    let savedVehicle: IVehicleType = newVehicle;

    try {
      await connectDB();
      const doc = await Vehicle.create({
        name: newVehicle.name,
        slug: newVehicle.slug,
        tag: newVehicle.tag,
        seats: newVehicle.seats,
        luggage: newVehicle.luggage,
        basePrice: newVehicle.basePrice,
        perMileRate: newVehicle.perMileRate,
        image: newVehicle.image,
        description: newVehicle.description,
        features: newVehicle.features,
        order: newVehicle.order,
        isActive: newVehicle.isActive,
      });
      savedVehicle = doc.toJSON() as unknown as IVehicleType;
    } catch {
      // Save locally
    }

    const local = this.getLocalFleet();
    local.push(newVehicle);
    this.saveLocalFleet(local);

    return savedVehicle;
  }

  /**
   * Updates vehicle parameters
   */
  public async updateVehicle(id: string, dto: UpdateVehicleDTO): Promise<IVehicleType | null> {
    let updated: IVehicleType | null = null;

    try {
      await connectDB();
      const updateData: Record<string, unknown> = {};
      if (dto.name !== undefined) updateData.name = dto.name;
      if (dto.tag !== undefined) updateData.tag = dto.tag;
      if (dto.slug !== undefined) updateData.slug = dto.slug;
      if (dto.basePrice !== undefined) updateData.basePrice = Number(dto.basePrice);
      if (dto.perMileRate !== undefined) updateData.perMileRate = Number(dto.perMileRate);
      if (dto.isActive !== undefined) updateData.isActive = Boolean(dto.isActive);
      if (dto.description !== undefined) updateData.description = dto.description;
      if (dto.features !== undefined) updateData.features = dto.features;
      if (dto.image !== undefined) updateData.image = dto.image;
      if (dto.seats !== undefined) updateData.seats = Number(dto.seats);
      if (dto.luggage !== undefined) updateData.luggage = Number(dto.luggage);

      const dbUpdated = await Vehicle.findByIdAndUpdate(id, updateData, { new: true });
      if (dbUpdated) {
        updated = dbUpdated.toJSON() as unknown as IVehicleType;
      }
    } catch {
      // Fallback
    }

    const local = this.getLocalFleet();
    const idx = local.findIndex((v) => v.id === id || v.slug === id);
    if (idx !== -1) {
      local[idx] = {
        ...local[idx],
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.tag !== undefined && { tag: dto.tag }),
        ...(dto.basePrice !== undefined && { basePrice: Number(dto.basePrice) }),
        ...(dto.perMileRate !== undefined && { perMileRate: Number(dto.perMileRate) }),
        ...(dto.isActive !== undefined && { isActive: Boolean(dto.isActive) }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.features !== undefined && { features: dto.features }),
        ...(dto.image !== undefined && { image: dto.image }),
        ...(dto.seats !== undefined && { seats: Number(dto.seats) }),
        ...(dto.luggage !== undefined && { luggage: Number(dto.luggage) }),
        updatedAt: new Date().toISOString(),
      };
      this.saveLocalFleet(local);
      if (!updated) updated = local[idx];
    }

    return updated;
  }

  /**
   * Deletes a vehicle from fleet
   */
  public async deleteVehicle(id: string): Promise<boolean> {
    let deleted = false;

    try {
      await connectDB();
      const res = await Vehicle.findByIdAndDelete(id);
      if (res) deleted = true;
    } catch {
      // Fallback
    }

    const local = this.getLocalFleet();
    const filtered = local.filter((v) => v.id !== id && v.slug !== id);
    if (filtered.length !== local.length) {
      this.saveLocalFleet(filtered);
      deleted = true;
    }

    return deleted;
  }
}

export const fleetService = new FleetService();
