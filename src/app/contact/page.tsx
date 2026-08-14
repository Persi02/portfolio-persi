import type { Metadata } from "next";

import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Herinjaka Andriamananandro pour votre projet Web : application, boutique en ligne, site vitrine.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-5xl px-4 pt-12 sm:px-6 lg:pt-16">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Contact
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Contact
        </h1>
      </div>
      <Contact />
    </main>
  );
}
