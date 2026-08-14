import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { PageTransition } from "@/components/animations/page-transition";
import { Providers } from "@/app/providers";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { site } from "@/data/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: site.url ? new URL(site.url) : undefined,
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: site.url || undefined,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    title: site.name,
    description: site.tagline,
    url: site.url || undefined,
  },
  twitter: {
    card: "summary",
    title: site.name,
    description: site.tagline,
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||t===null;document.documentElement.classList.toggle('dark',d);}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Aller au contenu
        </a>
        <Providers>
          <Header />
          <div id="contenu" className="flex flex-1 flex-col">
            <PageTransition>{children}</PageTransition>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
