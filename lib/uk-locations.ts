export interface UKLocationItem {
  name: string;
  category: "airport" | "hotel" | "station" | "landmark" | "port" | "address";
  detail: string;
  lat: number;
  lng: number;
}

// Curated Instant Database for Top UK Airports, Terminals, 5-Star Hotels & Stations
export const CURATED_UK_PLACES: UKLocationItem[] = [
  // --- HEATHROW AIRPORT TERMINALS ---
  {
    name: "Heathrow Airport Terminal 2 (The Queen's Terminal)",
    category: "airport",
    detail: "Inner Ring E, Hounslow, London TW6 1EW",
    lat: 51.4696,
    lng: -0.4497,
  },
  {
    name: "Heathrow Airport Terminal 3",
    category: "airport",
    detail: "Inner Ring W, Hounslow, London TW6 1QG",
    lat: 51.4722,
    lng: -0.4566,
  },
  {
    name: "Heathrow Airport Terminal 4",
    category: "airport",
    detail: "Stratton Way, Hounslow, London TW6 3XA",
    lat: 51.4585,
    lng: -0.4452,
  },
  {
    name: "Heathrow Airport Terminal 5",
    category: "airport",
    detail: "Wallis Road, Longford, Hounslow TW6 2GA",
    lat: 51.4700,
    lng: -0.4842,
  },
  {
    name: "Heathrow VIP Windsor Suite (Private Terminal)",
    category: "airport",
    detail: "Exclusive VIP Suite, Heathrow Airport, TW6 2GA",
    lat: 51.4690,
    lng: -0.4780,
  },

  // --- GATWICK AIRPORT TERMINALS ---
  {
    name: "Gatwick Airport North Terminal",
    category: "airport",
    detail: "Horley, Gatwick RH6 0PJ",
    lat: 51.1578,
    lng: -0.1772,
  },
  {
    name: "Gatwick Airport South Terminal",
    category: "airport",
    detail: "Horley, Gatwick RH6 0NP",
    lat: 51.1568,
    lng: -0.1611,
  },

  // --- STANSTED AIRPORT ---
  {
    name: "London Stansted Airport (Main Terminal)",
    category: "airport",
    detail: "Bassingbourn Rd, Stansted CM24 1QW",
    lat: 51.8860,
    lng: 0.2389,
  },
  {
    name: "Harrods Aviation FBO (Stansted Private Jet)",
    category: "airport",
    detail: "First Avenue, Stansted Airport, CM24 1QQ",
    lat: 51.8820,
    lng: 0.2450,
  },

  // --- LUTON AIRPORT ---
  {
    name: "London Luton Airport (LTN)",
    category: "airport",
    detail: "Airport Way, Luton LU2 9LY",
    lat: 51.8763,
    lng: -0.3717,
  },
  {
    name: "Signature Flight Support FBO (Luton Private Jet)",
    category: "airport",
    detail: "Percival Way, London Luton Airport, LU2 9PA",
    lat: 51.8745,
    lng: -0.3680,
  },

  // --- LONDON CITY & PRIVATE AIRPORTS ---
  {
    name: "London City Airport (LCY)",
    category: "airport",
    detail: "Hartmann Rd, London E16 2PX",
    lat: 51.5048,
    lng: 0.0495,
  },
  {
    name: "Farnborough Airport (TAG VIP Jet Terminal)",
    category: "airport",
    detail: "Farnborough, Hampshire GU14 6XA",
    lat: 51.2758,
    lng: -0.7763,
  },
  {
    name: "London Biggin Hill Airport (VIP Aviation)",
    category: "airport",
    detail: "Main Road, Biggin Hill, Bromley TN16 3BN",
    lat: 51.3308,
    lng: 0.0325,
  },
  {
    name: "Manchester Airport (MAN) Terminals 1, 2, 3",
    category: "airport",
    detail: "Manchester M90 1QX",
    lat: 53.3588,
    lng: -2.2727,
  },
  {
    name: "Birmingham Airport (BHX)",
    category: "airport",
    detail: "Birmingham B26 3QJ",
    lat: 52.4539,
    lng: -1.7480,
  },

  // --- LUXURY 5-STAR LONDON HOTELS ---
  {
    name: "The Ritz London",
    category: "hotel",
    detail: "150 Piccadilly, St. James's, London W1J 9BR",
    lat: 51.5071,
    lng: -0.1416,
  },
  {
    name: "The Dorchester Hotel",
    category: "hotel",
    detail: "53 Park Lane, Mayfair, London W1K 1QA",
    lat: 51.5073,
    lng: -0.1524,
  },
  {
    name: "Claridge's Hotel",
    category: "hotel",
    detail: "Brook Street, Mayfair, London W1K 4HR",
    lat: 51.5126,
    lng: -0.1485,
  },
  {
    name: "The Savoy Hotel",
    category: "hotel",
    detail: "Strand, London WC2R 0EZ",
    lat: 51.5101,
    lng: -0.1205,
  },
  {
    name: "The Connaught Hotel",
    category: "hotel",
    detail: "Carlos Place, Mayfair, London W1K 2AL",
    lat: 51.5098,
    lng: -0.1499,
  },
  {
    name: "Corinthia London",
    category: "hotel",
    detail: "Whitehall Place, Westminster, London SW1A 2BD",
    lat: 51.5065,
    lng: -0.1246,
  },
  {
    name: "Shangri-La The Shard, London",
    category: "hotel",
    detail: "31 St Thomas Street, London SE1 9QU",
    lat: 51.5045,
    lng: -0.0865,
  },
  {
    name: "Mandarin Oriental Hyde Park",
    category: "hotel",
    detail: "66 Knightsbridge, London SW1X 7LA",
    lat: 51.5022,
    lng: -0.1600,
  },
  {
    name: "The Bulgari Hotel London",
    category: "hotel",
    detail: "171 Knightsbridge, London SW7 1DW",
    lat: 51.5015,
    lng: -0.1633,
  },
  {
    name: "Rosewood London",
    category: "hotel",
    detail: "252 High Holborn, London WC1V 7EN",
    lat: 51.5173,
    lng: -0.1179,
  },

  // --- FAMOUS LANDMARKS, VENUES & STATIONS ---
  {
    name: "Buckingham Palace",
    category: "landmark",
    detail: "London SW1A 1AA",
    lat: 51.5014,
    lng: -0.1419,
  },
  {
    name: "Canary Wharf (One Canada Square)",
    category: "landmark",
    detail: "Canary Wharf, London E14 5AA",
    lat: 51.5050,
    lng: -0.0198,
  },
  {
    name: "St Pancras International (Eurostar Terminal)",
    category: "station",
    detail: "Euston Road, London N1C 4QP",
    lat: 51.5314,
    lng: -0.1261,
  },
  {
    name: "London Paddington Station",
    category: "station",
    detail: "Praed St, London W2 1HQ",
    lat: 51.5154,
    lng: -0.1755,
  },
  {
    name: "Harrods Knightsbridge",
    category: "landmark",
    detail: "87-135 Brompton Rd, Knightsbridge, London SW1X 7XL",
    lat: 51.4994,
    lng: -0.1632,
  },
  {
    name: "Blenheim Palace",
    category: "landmark",
    detail: "Woodstock, Oxfordshire OX20 1PP",
    lat: 51.8415,
    lng: -1.3614,
  },
  {
    name: "Wembley Stadium",
    category: "landmark",
    detail: "London HA9 0WS",
    lat: 51.5560,
    lng: -0.2795,
  },
  {
    name: "Ascot Racecourse",
    category: "landmark",
    detail: "High St, Ascot SL5 7JX",
    lat: 51.4116,
    lng: -0.6781,
  },
  {
    name: "Southampton Cruise Port (Mayflower / Horizon Terminals)",
    category: "port",
    detail: "Southampton SO15 1HJ",
    lat: 50.8970,
    lng: -1.4140,
  },
];

/**
 * High-speed UK Address & Location Search Engine
 * Merges instant curated UK points with real-time OpenStreetMap/Photon UK geocoding
 */
export async function searchUKAddress(query: string): Promise<UKLocationItem[]> {
  const clean = query.trim().toLowerCase();
  if (!clean || clean.length < 2) return [];

  // 1. Check instant local curated database
  const localMatches = CURATED_UK_PLACES.filter(
    (p) =>
      p.name.toLowerCase().includes(clean) ||
      p.detail.toLowerCase().includes(clean) ||
      (clean.includes("heathrow") && p.name.includes("Heathrow")) ||
      (clean.includes("gatwick") && p.name.includes("Gatwick")) ||
      (clean.includes("stansted") && p.name.includes("Stansted")) ||
      (clean.includes("luton") && p.name.includes("Luton")) ||
      (clean.includes("terminal") && (p.name.includes("Terminal") || p.name.includes("Airport")))
  );

  // 2. Fetch live online results from Photon UK Geocoding API
  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(
      query + " UK"
    )}&limit=8&bbox=-8.65,49.8,1.76,60.85`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const onlineResults: UKLocationItem[] = (data.features || [])
        .map((f: any) => {
          const p = f.properties || {};
          const coords = f.geometry?.coordinates || [0, 0];
          const name = p.name || p.street || p.city || query;
          const parts = [
            p.housenumber ? `${p.housenumber} ${p.street || ""}` : p.street,
            p.district,
            p.city,
            p.postcode,
            p.state || "United Kingdom",
          ].filter(Boolean);

          const detail = parts.join(", ");
          const isAirport =
            p.osm_value === "aerodrome" ||
            name.toLowerCase().includes("airport") ||
            name.toLowerCase().includes("terminal");

          return {
            name,
            category: isAirport ? "airport" : "address",
            detail: detail || "United Kingdom",
            lat: coords[1],
            lng: coords[0],
          };
        })
        .filter((item: UKLocationItem) => item.lat !== 0 && item.lng !== 0);

      // Merge and deduplicate
      const seen = new Set<string>();
      const combined: UKLocationItem[] = [];

      for (const item of [...localMatches, ...onlineResults]) {
        const key = `${item.name.toLowerCase()}_${item.detail.toLowerCase()}`;
        if (!seen.has(key)) {
          seen.add(key);
          combined.push(item);
        }
      }

      return combined.slice(0, 8);
    }
  } catch {
    // If online API is slow or offline, return instant local matches
  }

  return localMatches.slice(0, 8);
}
