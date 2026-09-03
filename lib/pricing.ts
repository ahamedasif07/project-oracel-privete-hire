export interface JourneyCalculationParams {
  serviceType: string;
  vehicleType: string;
  pickupAddress: string;
  dropoffAddress: string;
  isReturn?: boolean;
  childSeats?: number;
  hours?: number;
}

export function calculateEstimatedFare(params: JourneyCalculationParams): number {
  const { serviceType, vehicleType, isReturn = false, childSeats = 0, hours = 3 } = params;

  // Base rates per vehicle tier
  let baseRate = 45;
  let multiplier = 1.0;

  if (vehicleType.toLowerCase().includes("mpv") || vehicleType.toLowerCase().includes("v-class")) {
    baseRate = 65;
    multiplier = 1.45;
  } else if (
    vehicleType.toLowerCase().includes("suv") ||
    vehicleType.toLowerCase().includes("range rover") ||
    vehicleType.toLowerCase().includes("prestige")
  ) {
    baseRate = 85;
    multiplier = 1.85;
  }

  let total = baseRate;

  if (serviceType === "hourly") {
    // Hourly chauffeur hire (£45-85/hr min 3 hrs)
    const hourlyRate = 45 * multiplier;
    total = hourlyRate * Math.max(hours, 2);
  } else if (serviceType === "airport") {
    // Airport transfer base + meet & greet included
    total = baseRate * 1.15;
  } else if (serviceType === "wedding") {
    // Wedding bespoke package min £180
    total = 180 * multiplier;
  } else if (serviceType === "corporate") {
    total = baseRate * 1.2;
  }

  // Child seat fee (free for first, £5 each subsequent)
  if (childSeats > 1) {
    total += (childSeats - 1) * 5;
  }

  // Return journey (two legs with 10% roundtrip discount)
  if (isReturn) {
    total = total * 1.9;
  }

  return Math.round(total * 100) / 100;
}
