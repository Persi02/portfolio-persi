"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ThemeProvider } from "@/components/theme-provider";

gsap.registerPlugin(ScrollTrigger);

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
