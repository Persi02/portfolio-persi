import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
    </main>
  );
}
