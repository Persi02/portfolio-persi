import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <About />
    </main>
  );
}
