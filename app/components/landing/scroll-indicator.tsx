"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
      <div className="flex flex-col items-center text-gray-600">
        <span className="text-sm font-medium mb-2">Role para baixo</span>
        <ChevronDown className="w-6 h-6 animate-pulse" />
      </div>
    </div>
  );
};
