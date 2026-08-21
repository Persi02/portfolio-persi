"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs, { type EmailJSResponseStatus } from "@emailjs/browser";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  contactDefaultValues,
  contactSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: contactDefaultValues,
  });

  const onSubmit = async (values: ContactFormValues) => {
    setError(null);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        values,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! },
      );
      setSubmitted(true);
} catch (err) {
    const error = err as EmailJSResponseStatus;
    console.error(
      "EmailJS error:",
      `${error.status} — ${error.text}`,
    );
    setError(
      "Une erreur est survenue lors de l'envoi. Merci de réessayer ou m'écrire directement.",
    );
  }
  };

  if (submitted) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
        <div className="flex size-10 items-center justify-center rounded-full border border-border bg-card">
          <CheckCircle2 className="size-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="mt-4 text-base font-medium">Merci pour votre message</h3>
        <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
          Votre message a bien été envoyé. Je vous répondrai au plus vite.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Nom</Label>
          <Input
            id="name"
            placeholder="Votre nom"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name ? (
            <p
              id="name-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="vous@exemple.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email ? (
            <p
              id="email-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="subject">Sujet</Label>
          <Input
            id="subject"
            placeholder="Le sujet de votre message"
            aria-invalid={errors.subject ? true : undefined}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            {...register("subject")}
          />
          {errors.subject ? (
            <p
              id="subject-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.subject.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            rows={6}
            placeholder="Décrivez votre projet…"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            {...register("message")}
          />
          {errors.message ? (
            <p
              id="message-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.message.message}
            </p>
          ) : null}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Envoi en cours…" : "Envoyer le message"}
        <Send
          className="size-4"
          data-icon="inline-end"
          aria-hidden="true"
        />
      </Button>

      {error ? (
        <p
          role="alert"
          className="mt-4 flex items-start gap-2 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </form>
  );
}
