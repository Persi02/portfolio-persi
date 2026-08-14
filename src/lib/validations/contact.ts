import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Veuillez indiquer votre nom (2 caractères minimum)."),
  email: z.email("Veuillez saisir une adresse email valide."),
  subject: z.string().min(3, "Veuillez indiquer un sujet (3 caractères minimum)."),
  message: z.string().min(10, "Votre message doit contenir au moins 10 caractères."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const contactDefaultValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};
