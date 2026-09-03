"use client";

import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Plane,
  Building2,
  Train,
  Anchor,
  Navigation,
  Loader2,
  X,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchUKAddress, UKLocationItem } from "@/lib/uk-locations";

interface AddressAutocompleteProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string, coords?: { lat: number; lng: number }) => void;
  required?: boolean;
  isPickup?: boolean;
}

export function AddressAutocomplete({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  isPickup = true,
}: AddressAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<UKLocationItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync internal state when external value changes
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchUKAddress(query);
        setSuggestions(results);
        if (results.length > 0) setIsOpen(true);
      } catch (err) {
        console.error("Autocomplete search error:", err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (item: UKLocationItem) => {
    const fullAddress = `${item.name}${item.detail ? ` (${item.detail})` : ""}`;
    setQuery(fullAddress);
    onChange(fullAddress, { lat: item.lat, lng: item.lng });
    setIsOpen(false);
  };

  const handleQuickAirportSelect = (terminalName: string, lat: number, lng: number) => {
    setQuery(terminalName);
    onChange(terminalName, { lat, lng });
    setIsOpen(false);
  };

  const getIcon = (category: string) => {
    switch (category) {
      case "airport":
        return <Plane className="h-4 w-4 text-gold shrink-0" />;
      case "hotel":
        return <Building2 className="h-4 w-4 text-amber-400 shrink-0" />;
      case "station":
        return <Train className="h-4 w-4 text-blue-400 shrink-0" />;
      case "port":
        return <Anchor className="h-4 w-4 text-cyan-400 shrink-0" />;
      default:
        return <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />;
    }
  };

  return (
    <div ref={wrapperRef} className="relative space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs uppercase tracking-wider text-muted-foreground font-medium flex items-center gap-1.5">
          <span
            className={`h-2 w-2 rounded-full ${
              isPickup ? "bg-gold" : "bg-emerald-400"
            }`}
          />
          <span>{label}</span>
          {required && <span className="text-gold font-bold">*</span>}
        </label>

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              onChange("");
            }}
            className="text-[10px] text-muted-foreground hover:text-white flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="relative">
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          onBlur={() => {
            // Give 250ms for clicks on dropdown items, then auto-geocode top suggestion if available
            setTimeout(() => {
              if (suggestions.length > 0 && query.trim().length >= 3) {
                const top = suggestions[0];
                onChange(query, { lat: top.lat, lng: top.lng });
              }
            }, 250);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && suggestions.length > 0) {
              e.preventDefault();
              handleSelect(suggestions[0]);
            }
          }}
          required={required}
          className="pr-10 bg-[#0E0E12] border-white/10 focus:border-gold text-white text-xs md:text-sm h-12 rounded-2xl"
        />

        <div className="absolute right-3.5 top-3.5 flex items-center gap-2 pointer-events-none">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-gold" />
          ) : (
            <Navigation
              className={`h-4 w-4 ${
                isPickup ? "text-gold/70" : "text-emerald-400/70"
              }`}
            />
          )}
        </div>
      </div>

      {/* Autocomplete Dropdown List */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1.5 max-h-72 overflow-y-auto rounded-2xl border border-gold/30 bg-[#0D0D10] p-1.5 shadow-2xl backdrop-blur-2xl animate-fade-up">
          <div className="px-3 py-1.5 border-b border-white/5 flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
            <span className="flex items-center gap-1 text-gold font-semibold">
              <Sparkles className="h-3 w-3" />
              <span>UK Locations &amp; Terminals</span>
            </span>
            <span>{suggestions.length} suggestions</span>
          </div>

          <div className="py-1 space-y-1">
            {suggestions.map((item, idx) => (
              <button
                key={`${item.name}-${idx}`}
                type="button"
                onClick={() => handleSelect(item)}
                className="w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 hover:bg-gold/15 group border border-transparent hover:border-gold/30"
              >
                <div className="mt-0.5 p-1.5 rounded-lg bg-white/5 group-hover:bg-gold/20">
                  {getIcon(item.category)}
                </div>
                <div className="overflow-hidden flex-1">
                  <p className="text-xs font-bold text-white group-hover:text-gold truncate">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate leading-snug">
                    {item.detail}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Airport Terminals Shortcut Chips */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {[
          { label: "Heathrow T5", name: "Heathrow Airport Terminal 5, London TW6 2GA", lat: 51.4700, lng: -0.4842 },
          { label: "Heathrow T2/3", name: "Heathrow Airport Terminal 2 & 3, London TW6 1EW", lat: 51.4696, lng: -0.4497 },
          { label: "Gatwick North", name: "Gatwick Airport North Terminal, RH6 0PJ", lat: 51.1578, lng: -0.1772 },
          { label: "The Ritz Mayfair", name: "The Ritz London, 150 Piccadilly, W1J 9BR", lat: 51.5071, lng: -0.1416 },
        ].map((quick) => (
          <button
            key={quick.label}
            type="button"
            onClick={() => handleQuickAirportSelect(quick.name, quick.lat, quick.lng)}
            className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:border-gold/40 hover:text-gold transition-all"
          >
            + {quick.label}
          </button>
        ))}
      </div>
    </div>
  );
}
