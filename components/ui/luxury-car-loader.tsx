"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";

interface LuxuryCarLoaderProps {
  message?: string;
  subMessage?: string;
  variant?: "fullscreen" | "card" | "inline";
  className?: string;
}

export function LuxuryCarLoader({
  message = "Dispatching VIP Chauffeur...",
  subMessage = "Securing 256-bit encrypted reservation & live radar sync",
  variant = "card",
  className = "",
}: LuxuryCarLoaderProps) {
  const content = (
    <div
      className={`relative z-10 flex flex-col items-center justify-center text-center p-8 md:p-10 rounded-3xl glass-card border border-gold/40 shadow-[0_0_60px_rgba(212,175,55,0.2)] max-w-md w-full mx-4 backdrop-blur-2xl bg-[#0D0D11]/90 ${className}`}
    >
      {/* Ambient Pulsing Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-44 w-44 rounded-full bg-gold/20 blur-3xl pointer-events-none animate-pulse" />

      {/* Top Branding Crest */}
      <div className="flex items-center gap-2 text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
        <Sparkles className="h-3.5 w-3.5 text-gold animate-spin-slow" />
        <span>Oracle Private Hire</span>
      </div>

      {/* SVG Animated Luxury Chauffeur Limousine Graphic */}
      <div className="relative w-72 h-32 my-2 flex items-center justify-center overflow-hidden">
        {/* Road Speed Lines (Moving Leftwards) */}
        <div className="absolute bottom-6 left-0 right-0 h-1 overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="w-[200%] h-full flex gap-3"
          >
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                className="h-[2px] w-6 bg-gradient-to-r from-transparent via-gold to-transparent opacity-60 rounded-full shrink-0"
              />
            ))}
          </motion.div>
        </div>

        {/* Headlight Beam Effect */}
        <div className="absolute top-10 right-2 w-28 h-12 bg-gradient-to-r from-amber-200/40 via-yellow-400/15 to-transparent blur-md transform -rotate-6 pointer-events-none" />

        {/* The Luxury Car Vector Artwork */}
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <svg
            className="w-64 h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
            viewBox="0 0 340 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="goldChassis" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F4E0A5" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#8A690F" />
              </linearGradient>
              <linearGradient id="glassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1A202C" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0B0D13" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="rimGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#66500A" />
              </linearGradient>
            </defs>

            {/* Aerodynamic Luxury Saloon Body Silhouette */}
            <path
              d="M20 78 C20 78 30 75 45 74 C52 74 65 52 90 42 C120 30 215 30 255 45 C275 53 295 62 315 70 C328 75 332 80 330 84 C325 90 305 92 280 92 C275 92 270 78 250 78 C230 78 225 92 110 92 C105 92 100 78 80 78 C60 78 55 92 25 92 C15 92 10 86 20 78 Z"
              fill="url(#goldChassis)"
              stroke="#D4AF37"
              strokeWidth="1.5"
            />

            {/* Executive Privacy Cabin Windows */}
            <path
              d="M96 45 C118 35 160 33 190 33 L190 62 L82 62 C86 54 91 48 96 45 Z"
              fill="url(#glassGradient)"
              stroke="#D4AF37"
              strokeWidth="1"
              strokeOpacity="0.6"
            />
            <path
              d="M198 33 C228 33 248 44 260 52 L268 62 L198 62 Z"
              fill="url(#glassGradient)"
              stroke="#D4AF37"
              strokeWidth="1"
              strokeOpacity="0.6"
            />

            {/* Pillar Chrome Accents */}
            <line x1="194" y1="33" x2="194" y2="62" stroke="#D4AF37" strokeWidth="2" />
            <line x1="82" y1="62" x2="270" y2="62" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4" />

            {/* Front Headlight (Laser LED) */}
            <path
              d="M312 70 L328 73 L318 78 Z"
              fill="#FFF"
              className="animate-pulse"
              style={{ filter: "drop-shadow(0 0 6px #FFE58F)" }}
            />

            {/* Rear Tail Lamp (Ruby Crystal) */}
            <path
              d="M20 78 L26 77 L24 83 Z"
              fill="#FF4D4F"
              style={{ filter: "drop-shadow(0 0 5px #FF4D4F)" }}
            />

            {/* Chrome Door Handles */}
            <rect x="145" y="66" width="16" height="2.5" rx="1" fill="#FFF" />
            <rect x="215" y="66" width="16" height="2.5" rx="1" fill="#FFF" />

            {/* Front Multi-Spoke Alloy Wheel (Rotates continuously) */}
            <g transform="translate(250, 84)">
              <circle cx="0" cy="0" r="16" fill="#0A0A0C" stroke="#D4AF37" strokeWidth="2" />
              <g className="animate-spin" style={{ animationDuration: "1s" }}>
                <circle cx="0" cy="0" r="10" fill="none" stroke="url(#rimGold)" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="-12" y1="0" x2="12" y2="0" stroke="url(#rimGold)" strokeWidth="1.5" />
                <line x1="0" y1="-12" x2="0" y2="12" stroke="url(#rimGold)" strokeWidth="1.5" />
                <line x1="-8" y1="-8" x2="8" y2="8" stroke="url(#rimGold)" strokeWidth="1.5" />
                <line x1="-8" y1="8" x2="8" y2="-8" stroke="url(#rimGold)" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="3.5" fill="#D4AF37" />
              </g>
            </g>

            {/* Rear Multi-Spoke Alloy Wheel (Rotates continuously) */}
            <g transform="translate(80, 84)">
              <circle cx="0" cy="0" r="16" fill="#0A0A0C" stroke="#D4AF37" strokeWidth="2" />
              <g className="animate-spin" style={{ animationDuration: "1s" }}>
                <circle cx="0" cy="0" r="10" fill="none" stroke="url(#rimGold)" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="-12" y1="0" x2="12" y2="0" stroke="url(#rimGold)" strokeWidth="1.5" />
                <line x1="0" y1="-12" x2="0" y2="12" stroke="url(#rimGold)" strokeWidth="1.5" />
                <line x1="-8" y1="-8" x2="8" y2="8" stroke="url(#rimGold)" strokeWidth="1.5" />
                <line x1="-8" y1="8" x2="8" y2="-8" stroke="url(#rimGold)" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="3.5" fill="#D4AF37" />
              </g>
            </g>
          </svg>
        </motion.div>
      </div>

      {/* Progress Bar with Gold Shimmer */}
      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden my-4 relative">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-1/2 h-full bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </div>

      {/* Dynamic Status Typography */}
      <h3 className="font-display text-lg md:text-xl font-bold text-white tracking-wide">
        {message}
      </h3>
      <p className="text-xs text-muted-foreground mt-1 max-w-xs leading-relaxed">
        {subMessage}
      </p>

      {/* Security Footer */}
      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-center gap-1.5 text-[10px] text-white/50 uppercase tracking-widest font-mono">
        <ShieldCheck className="h-3.5 w-3.5 text-gold" />
        <span>Licensed TfL VIP Dispatch</span>
      </div>
    </div>
  );

  if (variant === "fullscreen") {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-xl animate-fade-up">
        {content}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className="flex items-center justify-center p-4">
        {content}
      </div>
    );
  }

  return content;
}
