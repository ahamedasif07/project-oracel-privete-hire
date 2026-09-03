"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Plane,
  Clock,
  ArrowRight,
  ArrowLeft,
  Users,
  Briefcase,
  CheckCircle2,
  MapPin,
  CreditCard,
  Banknote,
  Loader2,
  Sparkles,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { calculateEstimatedFare } from "@/lib/pricing";
import type { Booking } from "@/types";

interface VehicleOption {
  name: string;
  tag: string;
  seats: number;
  bags: number;
  basePrice: number;
  image: string;
  desc: string;
}

const VEHICLES: VehicleOption[] = [
  {
    name: "Executive Saloon",
    tag: "Mercedes-Benz E-Class",
    seats: 3,
    bags: 2,
    basePrice: 45,
    image: "/images/fleet-executive.jpg",
    desc: "Refined, whisper-quiet luxury. Perfect for business travel & airport transfers.",
  },
  {
    name: "Luxury MPV",
    tag: "Mercedes-Benz V-Class",
    seats: 7,
    bags: 7,
    basePrice: 65,
    image: "/images/fleet-mpv.jpg",
    desc: "Spacious conference seating & generous luggage room for families and delegations.",
  },
  {
    name: "Prestige SUV",
    tag: "Range Rover",
    seats: 4,
    bags: 4,
    basePrice: 85,
    image: "/images/fleet-suv.jpg",
    desc: "Commanding road presence, elevated luxury, and first-class leather interior.",
  },
];

export function BookingWizard() {
  const searchParams = useSearchParams();

  // Wizard Steps: 1: Route & Dates, 2: Vehicle, 3: Passenger & Extras, 4: Summary & Payment, 5: Confirmation
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [serviceType, setServiceType] = useState(searchParams.get("service") || "airport");
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState(searchParams.get("dropoff") || "");
  const [viaAddress, setViaAddress] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [isReturn, setIsReturn] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [hours, setHours] = useState(3);

  const [selectedVehicle, setSelectedVehicle] = useState(
    searchParams.get("vehicle") || "Executive Saloon"
  );
  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState(1);
  const [childSeats, setChildSeats] = useState(0);

  const [passengerName, setPassengerName] = useState("");
  const [passengerEmail, setPassengerEmail] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash_to_driver" | "card_pay">("card_pay");

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<Booking | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [verifyingPayment, setVerifyingPayment] = useState(false);

  // Initialize today's date and check Stripe payment return status
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setPickupDate(today);
    setPickupTime("12:00");

    // Handle return from Stripe checkout
    const paymentStatus = searchParams.get("payment");
    const sessionId = searchParams.get("session_id");

    if (paymentStatus === "success" && sessionId) {
      setVerifyingPayment(true);
      fetch(`/api/stripe/verify?session_id=${encodeURIComponent(sessionId)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.booking) {
            setSubmittedBooking(data.booking);
            setCurrentStep(5);
          } else {
            setErrorMessage("Payment verification is processing. Your booking reference will arrive via email shortly.");
          }
        })
        .catch((err) => {
          console.error("Verification error:", err);
          setErrorMessage("Payment completed. Our team will verify your receipt shortly.");
        })
        .finally(() => {
          setVerifyingPayment(false);
        });
    } else if (paymentStatus === "cancelled") {
      setErrorMessage("Stripe payment was cancelled. You can choose to pay with Hand Cash or retry with Card.");
      setCurrentStep(4);
    }
  }, [searchParams]);

  // Calculated live fare
  const estimatedFare = calculateEstimatedFare({
    serviceType,
    vehicleType: selectedVehicle,
    pickupAddress,
    dropoffAddress,
    isReturn,
    childSeats,
    hours,
  });

  const nextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    // Step 1 Validation
    if (currentStep === 1) {
      if (!pickupAddress.trim() || !dropoffAddress.trim()) {
        setErrorMessage("Please enter both Pickup and Destination addresses.");
        return;
      }
      if (!pickupDate || !pickupTime) {
        setErrorMessage("Please choose a pickup date and time.");
        return;
      }
    }

    // Step 3 Validation
    if (currentStep === 3) {
      if (!passengerName.trim() || !passengerEmail.trim() || !passengerPhone.trim()) {
        setErrorMessage("Please enter passenger full name, email, and phone number.");
        return;
      }
    }

    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setErrorMessage(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      serviceType,
      pickupAddress,
      dropoffAddress,
      viaAddress: viaAddress || null,
      pickupDate,
      pickupTime,
      isReturn,
      returnDate: isReturn ? returnDate : null,
      returnTime: isReturn ? returnTime : null,
      flightNumber: flightNumber || null,
      vehicleType: selectedVehicle,
      passengers: Number(passengers),
      luggage: Number(luggage),
      childSeats: Number(childSeats),
      passengerName,
      passengerEmail,
      passengerPhone,
      specialRequests: specialRequests || null,
      estimatedFare,
      paymentMethod,
    };

    try {
      // 1. If Card Pay (Stripe) is selected -> Create Stripe Checkout session and redirect
      if (paymentMethod === "card_pay") {
        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to initialize Stripe payment.");
        }

        if (data.sessionUrl) {
          window.location.href = data.sessionUrl;
          return;
        }
      }

      // 2. If Hand Cash is selected -> Place booking directly
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to confirm booking.");
      }

      setSubmittedBooking(data.booking);
      setCurrentStep(5);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred while placing your reservation.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (verifyingPayment) {
    return (
      <div className="glass-card rounded-3xl p-12 text-center max-w-lg mx-auto border border-gold/30">
        <Loader2 className="h-10 w-10 animate-spin text-gold mx-auto mb-4" />
        <h3 className="font-display text-xl text-white font-bold">Verifying Stripe Payment</h3>
        <p className="text-xs text-muted-foreground mt-2">
          Please wait while we confirm your card transaction and generate your booking voucher...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Progress Stepper (Visible on steps 1-4) */}
      {currentStep < 5 && (
        <div className="mb-12">
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
            {[
              { num: 1, title: "1. Journey" },
              { num: 2, title: "2. Vehicle" },
              { num: 3, title: "3. Passenger" },
              { num: 4, title: "4. Payment" },
            ].map((s) => (
              <div
                key={s.num}
                className={`py-3 rounded-xl border transition-all ${
                  currentStep === s.num
                    ? "border-gold bg-gold/15 text-gold font-bold shadow-sm"
                    : currentStep > s.num
                    ? "border-gold/40 bg-onyx text-gold/70"
                    : "border-white/5 bg-onyx/40 text-muted-foreground"
                }`}
              >
                <span>{s.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-sm animate-fade-up flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* STEP 1: ROUTE & TIMING */}
      {currentStep === 1 && (
        <div className="glass-card rounded-3xl p-8 md:p-10 border border-gold/20 shadow-2xl animate-fade-up space-y-8">
          <div>
            <span className="text-xs uppercase tracking-[0.24em] text-gold font-semibold">
              Step 1 of 4
            </span>
            <h2 className="mt-1 font-display text-2xl md:text-3xl text-white font-semibold">
              Journey Specifications
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Select your service type and journey details for an accurate quote.
            </p>
          </div>

          {/* Service Selector */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-3 font-medium">
              Service Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: "airport", label: "Airport Transfer", icon: Plane },
                { id: "oneway", label: "Point-to-Point", icon: MapPin },
                { id: "hourly", label: "Hourly Chauffeur", icon: Clock },
                { id: "wedding", label: "Wedding / Event", icon: Sparkles },
              ].map((s) => {
                const Icon = s.icon;
                const isSelected = serviceType === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setServiceType(s.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? "border-gold bg-gold/15 text-gold shadow-sm font-semibold"
                        : "border-white/5 bg-onyx/60 text-muted-foreground hover:border-white/20"
                    }`}
                  >
                    <Icon className="h-5 w-5 mb-2 text-gold" />
                    <span className="text-xs">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Route inputs */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                Pick-up Location *
              </label>
              <Input
                placeholder="Address, Hotel, Airport Terminal, Postcode"
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                Destination *
              </label>
              <Input
                placeholder="Drop-off Address, Airport, Venue, Postcode"
                value={dropoffAddress}
                onChange={(e) => setDropoffAddress(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                Pick-up Date *
              </label>
              <Input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                Pick-up Time *
              </label>
              <Input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Airport specific: Flight number */}
          {serviceType === "airport" && (
            <div className="p-5 rounded-2xl bg-onyx/60 border border-gold/20 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-gold uppercase tracking-wider">
                <Plane className="h-4 w-4" />
                <span>Flight Monitoring Details</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Provide your flight number so our dispatch team can monitor your radar in real time and automatically adjust your pickup.
              </p>
              <Input
                placeholder="Flight Number (e.g. BA114, EK005, VS24)"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
              />
            </div>
          )}

          {/* Hourly specific */}
          {serviceType === "hourly" && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                Required Hours (Min. 3 Hours)
              </label>
              <Input
                type="number"
                min="3"
                max="24"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
              />
            </div>
          )}

          {/* Return Journey Toggle */}
          <div className="p-5 rounded-2xl border border-white/10 bg-onyx/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-white font-medium">Include Return Journey?</p>
              <p className="text-xs text-muted-foreground">
                Enjoy a round-trip discount and pre-scheduled return chauffeur.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsReturn(!isReturn)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                isReturn
                  ? "bg-gold text-ink"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {isReturn ? "Return Included ✓" : "+ Add Return"}
            </button>
          </div>

          {isReturn && (
            <div className="grid gap-5 sm:grid-cols-2 p-5 rounded-2xl bg-gold/5 border border-gold/20 animate-fade-up">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gold mb-2 font-medium">
                  Return Date *
                </label>
                <Input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gold mb-2 font-medium">
                  Return Time *
                </label>
                <Input
                  type="time"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={nextStep}
              className="rounded-full btn-gold px-8 py-4 text-sm font-semibold shadow-gold inline-flex items-center gap-2"
            >
              <span>Choose Vehicle</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: FLEET SELECTION */}
      {currentStep === 2 && (
        <div className="glass-card rounded-3xl p-8 md:p-10 border border-gold/20 shadow-2xl animate-fade-up space-y-8">
          <div>
            <span className="text-xs uppercase tracking-[0.24em] text-gold font-semibold">
              Step 2 of 4
            </span>
            <h2 className="mt-1 font-display text-2xl md:text-3xl text-white font-semibold">
              Select Your Chauffeur Vehicle
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              All vehicles are valeted, air-conditioned, and chauffeured by licensed career drivers.
            </p>
          </div>

          <div className="space-y-4">
            {VEHICLES.map((v) => {
              const isSelected = selectedVehicle === v.name;
              const vehicleFare = calculateEstimatedFare({
                serviceType,
                vehicleType: v.name,
                pickupAddress,
                dropoffAddress,
                isReturn,
                childSeats,
                hours,
              });

              return (
                <div
                  key={v.name}
                  onClick={() => setSelectedVehicle(v.name)}
                  className={`cursor-pointer rounded-2xl border p-6 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                    isSelected
                      ? "border-gold bg-gold/10 shadow-gold"
                      : "border-white/5 bg-onyx/60 hover:border-white/20"
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="relative h-28 w-44 shrink-0 rounded-xl overflow-hidden bg-black">
                      <Image
                        src={v.image}
                        alt={v.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-gold font-semibold">
                        {v.tag}
                      </span>
                      <h3 className="font-display text-xl text-white font-semibold mt-0.5">
                        {v.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 max-w-md leading-relaxed">
                        {v.desc}
                      </p>
                      <div className="flex gap-4 mt-3 text-xs text-foreground/80">
                        <span className="inline-flex items-center gap-1">
                          <Users className="h-3.5 w-3.5 text-gold" /> {v.seats} Seats
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Briefcase className="h-3.5 w-3.5 text-gold" /> {v.bags} Bags
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-white/5">
                    <div className="text-right">
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                        Fixed Quote
                      </p>
                      <p className="font-display text-2xl md:text-3xl text-gradient-gold font-bold">
                        £{vehicleFare.toFixed(2)}
                      </p>
                    </div>
                    <div className="mt-2">
                      <span
                        className={`inline-block h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? "border-gold bg-gold text-ink font-bold text-xs"
                            : "border-white/20"
                        }`}
                      >
                        {isSelected ? "✓" : ""}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={prevStep}
              className="rounded-full btn-ghost-gold px-7 py-3.5 text-sm font-semibold inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="rounded-full btn-gold px-8 py-3.5 text-sm font-semibold shadow-gold inline-flex items-center gap-2"
            >
              <span>Passenger Details</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PASSENGER & EXTRAS */}
      {currentStep === 3 && (
        <div className="glass-card rounded-3xl p-8 md:p-10 border border-gold/20 shadow-2xl animate-fade-up space-y-8">
          <div>
            <span className="text-xs uppercase tracking-[0.24em] text-gold font-semibold">
              Step 3 of 4
            </span>
            <h2 className="mt-1 font-display text-2xl md:text-3xl text-white font-semibold">
              Passenger &amp; Journey Preferences
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Please enter the lead passenger details for SMS and email dispatch.
            </p>
          </div>

          {/* Passenger Info */}
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                Lead Passenger Name *
              </label>
              <Input
                placeholder="Full Name"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                Email Address *
              </label>
              <Input
                type="email"
                placeholder="Confirmation will be sent here"
                value={passengerEmail}
                onChange={(e) => setPassengerEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                Mobile Phone *
              </label>
              <Input
                type="tel"
                placeholder="For driver SMS / Call"
                value={passengerPhone}
                onChange={(e) => setPassengerPhone(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Capacities */}
          <div className="grid gap-5 sm:grid-cols-3 pt-4 border-t border-white/5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                Passengers
              </label>
              <Input
                type="number"
                min="1"
                max="8"
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                Suitcases / Luggage
              </label>
              <Input
                type="number"
                min="0"
                max="10"
                value={luggage}
                onChange={(e) => setLuggage(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                Child / Booster Seats
              </label>
              <Input
                type="number"
                min="0"
                max="3"
                value={childSeats}
                onChange={(e) => setChildSeats(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
              Special Requests or Notes for Chauffeur
            </label>
            <Textarea
              rows={3}
              placeholder="e.g. Extra luggage assistance, child seat age, preferred route, quiet ride, meet & greet nameboard name..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={prevStep}
              className="rounded-full btn-ghost-gold px-7 py-3.5 text-sm font-semibold inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="rounded-full btn-gold px-8 py-3.5 text-sm font-semibold shadow-gold inline-flex items-center gap-2"
            >
              <span>Payment &amp; Review</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: SUMMARY & 2 PAYMENT OPTIONS */}
      {currentStep === 4 && (
        <div className="glass-card rounded-3xl p-8 md:p-10 border border-gold/20 shadow-2xl animate-fade-up space-y-8">
          <div>
            <span className="text-xs uppercase tracking-[0.24em] text-gold font-semibold">
              Step 4 of 4
            </span>
            <h2 className="mt-1 font-display text-2xl md:text-3xl text-white font-semibold">
              Review &amp; Select Payment Option
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Please choose how you wish to settle your fare and confirm your chauffeur booking.
            </p>
          </div>

          {/* Review breakdown card */}
          <div className="p-6 rounded-2xl bg-onyx/80 border border-white/5 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                  {selectedVehicle}
                </span>
                <p className="font-display text-xl text-white font-semibold">{serviceType.toUpperCase()}</p>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Total Fare (GBP)
                </span>
                <p className="font-display text-3xl text-gradient-gold font-bold">
                  £{estimatedFare.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 text-xs md:text-sm">
              <div>
                <span className="text-muted-foreground uppercase text-[10px] tracking-wider block">
                  Pickup Location
                </span>
                <span className="text-white font-medium">{pickupAddress}</span>
              </div>
              <div>
                <span className="text-muted-foreground uppercase text-[10px] tracking-wider block">
                  Destination
                </span>
                <span className="text-white font-medium">{dropoffAddress}</span>
              </div>
              <div>
                <span className="text-muted-foreground uppercase text-[10px] tracking-wider block">
                  Pickup Date &amp; Time
                </span>
                <span className="text-white font-medium">{pickupDate} at {pickupTime}</span>
              </div>
              {flightNumber && (
                <div>
                  <span className="text-muted-foreground uppercase text-[10px] tracking-wider block">
                    Flight Number
                  </span>
                  <span className="text-gold font-semibold">{flightNumber}</span>
                </div>
              )}
              {isReturn && (
                <div>
                  <span className="text-muted-foreground uppercase text-[10px] tracking-wider block">
                    Return Date &amp; Time
                  </span>
                  <span className="text-white font-medium">{returnDate} at {returnTime}</span>
                </div>
              )}
              <div>
                <span className="text-muted-foreground uppercase text-[10px] tracking-wider block">
                  Lead Passenger
                </span>
                <span className="text-white font-medium">{passengerName} ({passengerPhone})</span>
              </div>
            </div>
          </div>

          {/* Exactly 2 Payment Options: Hand Cash vs Stripe Card Pay */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gold mb-3 font-semibold">
              Select Payment Method *
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Option 1: Stripe Card Pay */}
              <div
                onClick={() => setPaymentMethod("card_pay")}
                className={`cursor-pointer rounded-2xl border p-5 transition-all relative overflow-hidden ${
                  paymentMethod === "card_pay"
                    ? "border-gold bg-gold/15 shadow-gold ring-1 ring-gold"
                    : "border-white/10 bg-onyx/40 hover:border-white/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/20 text-gold">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>Card Pay (Stripe)</span>
                        <span className="text-[10px] bg-gold text-ink font-bold px-1.5 py-0.5 rounded">Instant</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Credit / Debit Card, Apple Pay, Google Pay
                      </p>
                    </div>
                  </div>
                  <span
                    className={`h-5 w-5 rounded-full border-2 flex items-center justify-center text-xs ${
                      paymentMethod === "card_pay"
                        ? "border-gold bg-gold text-ink font-bold"
                        : "border-white/30"
                    }`}
                  >
                    {paymentMethod === "card_pay" ? "✓" : ""}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>256-bit Encrypted Stripe Checkout</span>
                  </span>
                  <span className="text-white/60 font-mono">Visa / MC / Amex</span>
                </div>
              </div>

              {/* Option 2: Hand Cash to Chauffeur */}
              <div
                onClick={() => setPaymentMethod("cash_to_driver")}
                className={`cursor-pointer rounded-2xl border p-5 transition-all relative overflow-hidden ${
                  paymentMethod === "cash_to_driver"
                    ? "border-gold bg-gold/15 shadow-gold ring-1 ring-gold"
                    : "border-white/10 bg-onyx/40 hover:border-white/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white">
                      <Banknote className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Hand Cash</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Pay chauffeur directly (Cash or Contactless)
                      </p>
                    </div>
                  </div>
                  <span
                    className={`h-5 w-5 rounded-full border-2 flex items-center justify-center text-xs ${
                      paymentMethod === "cash_to_driver"
                        ? "border-gold bg-gold text-ink font-bold"
                        : "border-white/30"
                    }`}
                  >
                    {paymentMethod === "cash_to_driver" ? "✓" : ""}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Pay upon arrival at destination</span>
                  <span className="text-gold font-medium">No Pre-Payment Required</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={prevStep}
              className="rounded-full btn-ghost-gold px-7 py-3.5 text-sm font-semibold inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleFinalSubmit}
              className="rounded-full btn-gold px-9 py-4 text-sm font-semibold shadow-gold inline-flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>
                    {paymentMethod === "card_pay"
                      ? "Redirecting to Stripe Gateway..."
                      : "Processing Reservation..."}
                  </span>
                </>
              ) : (
                <>
                  <span>
                    {paymentMethod === "card_pay"
                      ? `Pay £${estimatedFare.toFixed(2)} with Card (Stripe)`
                      : "Confirm Booking (Hand Cash)"}
                  </span>
                  <CheckCircle2 className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: INSTANT CONFIRMATION */}
      {currentStep === 5 && submittedBooking && (
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-gold/40 shadow-2xl text-center animate-fade-up max-w-2xl mx-auto">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-gold text-ink mx-auto mb-6 shadow-gold">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold">
            Reservation Confirmed
          </span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl text-white font-bold">
            Booking Received!
          </h2>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="rounded-2xl border border-gold/40 bg-gold/10 px-6 py-3">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Booking Reference</p>
              <p className="font-display text-2xl md:text-3xl text-gradient-gold font-bold tracking-wider">
                {submittedBooking.bookingRef}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-onyx/80 px-6 py-3">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Payment Status</p>
              <p
                className={`text-lg font-bold ${
                  submittedBooking.paymentStatus === "PAID"
                    ? "text-emerald-400"
                    : "text-amber-400"
                }`}
              >
                {submittedBooking.paymentStatus === "PAID" ? "PAID (Stripe Card) ✓" : "HAND CASH (Unpaid)"}
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            A confirmation receipt and journey voucher have been dispatched to{" "}
            <strong className="text-white">{submittedBooking.passengerEmail}</strong>.
            Our 24/7 operations team is assigning your chauffeur.
          </p>

          <div className="mt-8 p-6 rounded-2xl bg-onyx/80 border border-white/5 text-left text-xs space-y-2.5">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-muted-foreground">Vehicle</span>
              <span className="text-white font-semibold">{submittedBooking.vehicleType}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-muted-foreground">Pickup</span>
              <span className="text-white font-medium">{submittedBooking.pickupAddress}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-muted-foreground">Destination</span>
              <span className="text-white font-medium">{submittedBooking.dropoffAddress}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-muted-foreground">Date &amp; Time</span>
              <span className="text-white font-medium">
                {submittedBooking.pickupDate} at {submittedBooking.pickupTime}
              </span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="text-white font-medium">
                {submittedBooking.paymentMethod === "card_pay"
                  ? "Stripe Card Online"
                  : "Hand Cash to Chauffeur"}
              </span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-gold font-semibold uppercase">Total Fare</span>
              <span className="text-gold font-bold text-sm">
                £{Number(submittedBooking.estimatedFare).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={() => {
                setCurrentStep(1);
                setSubmittedBooking(null);
                setPickupAddress("");
                setDropoffAddress("");
              }}
              className="rounded-full btn-gold px-8 py-3.5 text-xs font-semibold"
            >
              Book Another Journey
            </button>
            <a
              href="tel:07456714214"
              className="rounded-full btn-ghost-gold px-8 py-3.5 text-xs font-semibold"
            >
              Call 07456714214
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
