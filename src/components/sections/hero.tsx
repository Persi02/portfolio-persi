"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";

import { GitHubIcon } from "@/components/icons";
import { HeroVisual } from "@/components/sections/hero-visual";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:pb-24 lg:pt-20">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          <motion.p
            variants={itemVariants}
            className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
          >
            {site.name}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]"
          >
            Web Developer
            <span className="mt-1.5 block text-muted-foreground">
              <span aria-hidden="true" className="text-primary">
                /{" "}
              </span>
              Full-Stack JavaScript Developer
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button size="lg" asChild>
              <Link href="/projects">
                Voir les projets
                <ArrowRight
                  className="size-4"
                  data-icon="inline-end"
                  aria-hidden="true"
                />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Me contacter</Link>
            </Button>
            {site.githubUrl ? (
              <Button size="icon-lg" variant="outline" asChild>
                <Link
                  href={site.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Profil GitHub"
                >
                  <GitHubIcon className="size-4" />
                </Link>
              </Button>
            ) : null}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mx-auto w-full max-w-md lg:max-w-none"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
