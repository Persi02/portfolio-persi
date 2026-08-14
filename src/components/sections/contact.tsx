import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { FadeIn } from "@/components/animations/fade-in";

export function Contact() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Contact
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Vous avez un projet&nbsp;? Parlons-en.
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            Décrivez votre besoin via le formulaire, ou écrivez-moi directement
            sur mes réseaux.
          </p>
        </FadeIn>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
          <FadeIn delay={0.05} className="min-w-0">
            <ContactForm />
          </FadeIn>
          <FadeIn delay={0.1}>
            <ContactInfo />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
