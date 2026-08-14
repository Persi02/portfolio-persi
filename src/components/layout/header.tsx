"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { navigationItems } from "@/data/navigation";
import { site } from "@/data/site";
import { isPathActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const prevPathRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const place = (animate: boolean) => {
      const active = nav.querySelector<HTMLElement>("[data-nav-active]");
      if (!active) return;
      const navRect = nav.getBoundingClientRect();
      const rect = active.getBoundingClientRect();
      if (rect.width === 0) return;
      const vars = {
        x: rect.left - navRect.left,
        width: rect.width,
        opacity: 1,
      };
      if (animate) {
        gsap.to(indicator, {
          ...vars,
          duration: 0.45,
          ease: "power3.inOut",
          overwrite: "auto",
        });
      } else {
        gsap.set(indicator, vars);
      }
    };

    place(prevPathRef.current !== null && prevPathRef.current !== pathname);
    prevPathRef.current = pathname;

    const onResize = () => place(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label={`${site.name} — accueil`}
        >
          <span className="flex size-8 items-center justify-center rounded-lg border border-border bg-muted font-mono text-xs font-semibold">
            H.
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:inline">
            {site.name}
          </span>
        </Link>

        <nav
          ref={navRef}
          className="relative hidden items-center gap-1 md:flex"
          aria-label="Navigation principale"
        >
          <span
            ref={indicatorRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-1 left-0 w-0 rounded-md bg-muted opacity-0 transition-opacity duration-300 motion-reduce:transition-none"
          />
          {navigationItems.map((item) => {
            const active = isPathActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                data-nav-active={active ? "" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "font-medium text-foreground"
                    : "text-muted-foreground after:absolute after:inset-x-3 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-primary/60 after:transition-transform after:duration-300 after:ease-out after:motion-reduce:transition-none hover:text-foreground hover:after:scale-x-100"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
