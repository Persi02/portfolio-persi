"use client";

import { Moon, Sun } from "lucide-react";
import { useRef } from "react";
import { gsap } from "gsap";

import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const iconRef = useRef<HTMLSpanElement>(null);

  const handleClick = () => {
    const icon = iconRef.current;
    if (
      icon &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      gsap.fromTo(
        icon,
        { rotate: 0, scale: 0.75 },
        {
          rotate: 360,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.6)",
        }
      );
    }
    toggleTheme();
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      onClick={handleClick}
    >
      <span ref={iconRef} className="inline-flex">
        {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </span>
    </Button>
  );
}
