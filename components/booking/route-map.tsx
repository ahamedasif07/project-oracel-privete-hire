"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Clock, RefreshCw } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface Coordinates {
  lat: number;
  lng: number;
}

interface RouteMapProps {
  pickupCoords?: Coordinates | null;
  dropoffCoords?: Coordinates | null;
  pickupAddress: string;
  dropoffAddress: string;
  onRouteChange?: (distanceMiles: number, durationMins: number) => void;
}

export function RouteMap({
  pickupCoords,
  dropoffCoords,
  pickupAddress,
  dropoffAddress,
  onRouteChange,
}: RouteMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const routeLayerRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);

  const [routeInfo, setRouteInfo] = useState<{
    distanceMiles: number;
    durationMins: number;
  } | null>(null);
  const [loadingRoute, setLoadingRoute] = useState(false);

  // Initialize Map safely
  useEffect(() => {
    let isCancelled = false;

    async function initMap() {
      // Guard against null ref or already initialized map
      if (!mapContainerRef.current) return;
      if (mapInstanceRef.current) return;
      if ((mapContainerRef.current as any)._leaflet_id) {
        delete (mapContainerRef.current as any)._leaflet_id;
      }

      try {
        const L = await import("leaflet");

        // Check if component unmounted while awaiting Leaflet import
        if (isCancelled || !mapContainerRef.current) return;

        // Double check container is not already initialized
        if ((mapContainerRef.current as any)._leaflet_id) {
          return;
        }

        // Default center on Central London
        const map = L.map(mapContainerRef.current, {
          center: [51.5074, -0.1278],
          zoom: 11,
          zoomControl: false,
          attributionControl: false,
        });

        // OpenStreetMap Crisp High-Resolution Light Tile Layer (No watermark, clean Google-like view)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          subdomains: ["a", "b", "c"],
        }).addTo(map);

        // Custom Zoom control
        L.control.zoom({ position: "bottomright" }).addTo(map);

        mapInstanceRef.current = map;
        markersLayerRef.current = L.layerGroup().addTo(map);
        routeLayerRef.current = L.layerGroup().addTo(map);

        // Trigger initial markers if coordinates already exist
        drawMarkersAndRoute();
      } catch (err) {
        console.warn("Leaflet init error:", err);
      }
    }

    initMap();

    return () => {
      isCancelled = true;
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch {}
        mapInstanceRef.current = null;
      }
      if (mapContainerRef.current && (mapContainerRef.current as any)._leaflet_id) {
        delete (mapContainerRef.current as any)._leaflet_id;
      }
    };
  }, []);

  // Update Markers & Driving Route safely
  const drawMarkersAndRoute = async () => {
    if (!mapInstanceRef.current || !markersLayerRef.current || !routeLayerRef.current || !mapContainerRef.current) {
      return;
    }

    try {
      const L = await import("leaflet");
      const map = mapInstanceRef.current;
      const markersLayer = markersLayerRef.current;
      const routeLayer = routeLayerRef.current;

      markersLayer.clearLayers();
      routeLayer.clearLayers();

      // Custom Google Maps Style Pins
      const createGooglePin = (title: string, subtitle: string, isPickup: boolean) =>
        L.divIcon({
          className: "google-style-pin",
          html: `
            <div style="
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
              filter: drop-shadow(0 4px 10px rgba(0,0,0,0.35));
            ">
              <div style="
                background: ${isPickup ? "#1A73E8" : "#1E8E3E"};
                color: #FFFFFF;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 11px;
                font-weight: 700;
                padding: 4px 10px;
                border-radius: 20px;
                border: 2px solid #FFFFFF;
                white-space: nowrap;
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                gap: 4px;
                letter-spacing: 0.3px;
              ">
                <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #FFF;"></span>
                ${isPickup ? "PICK-UP" : "DROP-OFF"}
              </div>
              <div style="
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 8px solid ${isPickup ? "#1A73E8" : "#1E8E3E"};
                margin-top: -1px;
              "></div>
              <div style="
                width: 8px;
                height: 3px;
                border-radius: 50%;
                background: rgba(0,0,0,0.25);
                margin-top: 2px;
              "></div>
            </div>
          `,
          iconSize: [80, 42],
          iconAnchor: [40, 36],
        });

      // Add Pickup Pin
      if (pickupCoords) {
        const markerA = L.marker([pickupCoords.lat, pickupCoords.lng], {
          icon: createGooglePin("PICK-UP", pickupAddress, true),
        });
        markerA.bindPopup(`
          <div style="font-family: sans-serif; padding: 2px 4px;">
            <b style="color: #1A73E8; font-size: 12px;">📍 Pick-up Location</b>
            <p style="margin: 4px 0 0 0; font-size: 11px; color: #333;">${pickupAddress || "Selected origin"}</p>
          </div>
        `);
        markersLayer.addLayer(markerA);
      }

      // Add Dropoff Pin
      if (dropoffCoords) {
        const markerB = L.marker([dropoffCoords.lat, dropoffCoords.lng], {
          icon: createGooglePin("DROP-OFF", dropoffAddress, false),
        });
        markerB.bindPopup(`
          <div style="font-family: sans-serif; padding: 2px 4px;">
            <b style="color: #1E8E3E; font-size: 12px;">🏁 Destination Drop-off</b>
            <p style="margin: 4px 0 0 0; font-size: 11px; color: #333;">${dropoffAddress || "Selected destination"}</p>
          </div>
        `);
        markersLayer.addLayer(markerB);
      }

      // If both coordinates exist -> Fetch OSRM road driving route
      if (pickupCoords && dropoffCoords) {
        setLoadingRoute(true);
        try {
          const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${pickupCoords.lng},${pickupCoords.lat};${dropoffCoords.lng},${dropoffCoords.lat}?overview=full&geometries=geojson`;
          const res = await fetch(osrmUrl);
          const data = await res.json();

          if (data.code === "Ok" && data.routes && data.routes[0]) {
            const route = data.routes[0];
            const distanceMeters = route.distance;
            const durationSecs = route.duration;

            const distanceMiles = Number((distanceMeters / 1609.34).toFixed(1));
            const durationMins = Math.round(durationSecs / 60);

            setRouteInfo({ distanceMiles, durationMins });
            if (onRouteChange) {
              onRouteChange(distanceMiles, durationMins);
            }

            // Draw clean Google Maps style navigation route:
            const routeShadow = L.geoJSON(route.geometry, {
              style: {
                color: "#185ABC",
                weight: 8,
                opacity: 0.6,
                lineCap: "round",
                lineJoin: "round",
              },
            });
            routeLayer.addLayer(routeShadow);

            const routeCore = L.geoJSON(route.geometry, {
              style: {
                color: "#4285F4",
                weight: 5,
                opacity: 1,
                lineCap: "round",
                lineJoin: "round",
              },
            });
            routeLayer.addLayer(routeCore);

            const bounds = L.latLngBounds([
              [pickupCoords.lat, pickupCoords.lng],
              [dropoffCoords.lat, dropoffCoords.lng],
            ]);
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
          }
        } catch (err) {
          console.error("OSRM route fetch error:", err);
        } finally {
          setLoadingRoute(false);
        }
      } else if (pickupCoords) {
        map.setView([pickupCoords.lat, pickupCoords.lng], 13);
      } else if (dropoffCoords) {
        map.setView([dropoffCoords.lat, dropoffCoords.lng], 13);
      }
    } catch (e) {
      console.warn("Route rendering error:", e);
    }
  };

  useEffect(() => {
    drawMarkersAndRoute();
  }, [pickupCoords, dropoffCoords, pickupAddress, dropoffAddress]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-[#0E0E12] shadow-2xl">
      {/* Route Status Header */}
      <div className="p-4 bg-[#141418] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
            <Navigation className="h-4 w-4 text-blue-400" />
            <span>UK Live Driving Navigation &amp; Route</span>
          </div>
          <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono font-semibold">
            Google View
          </span>
        </div>

        {routeInfo && (
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-white bg-black/40 px-3 py-1 rounded-full border border-white/10">
              <MapPin className="h-3.5 w-3.5 text-blue-400" />
              <span>{routeInfo.distanceMiles} Miles</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 bg-black/40 px-3 py-1 rounded-full border border-emerald-500/20">
              <Clock className="h-3.5 w-3.5" />
              <span>~{routeInfo.durationMins} Mins Travel</span>
            </span>
          </div>
        )}
      </div>

      {/* Clean Light Google Map Canvas */}
      <div
        ref={mapContainerRef}
        className="h-80 sm:h-96 w-full bg-[#E5E3DF] z-10"
        style={{ minHeight: "320px" }}
      />

      {/* Loading Overlay */}
      {loadingRoute && (
        <div className="absolute inset-0 z-20 bg-black/50 backdrop-blur-sm flex items-center justify-center gap-2 text-xs font-semibold text-white">
          <RefreshCw className="h-4 w-4 animate-spin text-blue-400" />
          <span>Calculating live UK driving route &amp; traffic distance...</span>
        </div>
      )}

      {/* Footer Info */}
      <div className="p-3 bg-[#141418] border-t border-white/10 flex items-center justify-between text-[11px] text-muted-foreground px-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span>Pick-up Pin</span>
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Drop-off Pin</span>
          </span>
        </div>
        <span className="text-gold font-mono font-medium">Guaranteed Fixed Fare</span>
      </div>
    </div>
  );
}
