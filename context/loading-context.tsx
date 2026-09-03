"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { LuxuryCarLoader } from "@/components/ui/luxury-car-loader";
import { AnimatePresence, motion } from "framer-motion";

interface LoadingContextType {
  isLoading: boolean;
  showLoader: (message?: string, subMessage?: string) => void;
  hideLoader: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  showLoader: () => {},
  hideLoader: () => {},
});

function RouteListener({ onRouteComplete }: { onRouteComplete: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    onRouteComplete();
  }, [pathname, searchParams, onRouteComplete]);

  return null;
}

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Preparing Chauffeur Desk...");
  const [subMessage, setSubMessage] = useState("Live encryption & VIP fleet sync");
  const pathname = usePathname();

  const showLoader = (
    msg = "Processing VIP Request...",
    subMsg = "Please wait while our dispatch system connects"
  ) => {
    setMessage(msg);
    setSubMessage(subMsg);
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  // Dismiss any loader on route changes
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      <Suspense fallback={null}>
        <RouteListener onRouteComplete={hideLoader} />
      </Suspense>

      {children}

      {/* Global Animated Luxury Car Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 backdrop-blur-xl"
          >
            <LuxuryCarLoader
              message={message}
              subMessage={subMessage}
              variant="card"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </LoadingContext.Provider>
  );
}

export function useGlobalLoader() {
  return useContext(LoadingContext);
}

