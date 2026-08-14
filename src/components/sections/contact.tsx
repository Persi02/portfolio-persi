import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/animations/section-heading";

export function Contact() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading eyebrow="Contact" title="Vous avez un projet&nbsp;? Parlons-en.">
          Décrivez votre besoin via le formulaire, ou écrivez-moi directement
          sur mes réseaux.
        </SectionHeading>

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
