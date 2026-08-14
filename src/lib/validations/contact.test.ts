import "@testing-library/jest-dom";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";

describe("contact validation schema", () => {
  const validData: ContactFormValues = {
    name: "Jean Dupont",
    email: "jean@example.com",
    subject: "Projet",
    message: "Bonjour, je souhaite vous contacter pour un projet.",
  };

  describe("valid data", () => {
    it("passes with all valid fields", () => {
      const result = contactSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("accepts minimum length name (2 chars)", () => {
      const data = { ...validData, name: "Ab" };
      expect(contactSchema.safeParse(data).success).toBe(true);
    });

    it("accepts minimum length subject (3 chars)", () => {
      const data = { ...validData, subject: "Abc" };
      expect(contactSchema.safeParse(data).success).toBe(true);
    });

    it("accepts minimum length message (10 chars)", () => {
      const data = { ...validData, message: "1234567890" };
      expect(contactSchema.safeParse(data).success).toBe(true);
    });

    it("accepts valid email formats", () => {
      const emails = [
        "test@example.com",
        "user.name@domain.org",
        "user+tag@example.co.uk",
        "user123@test-domain.com",
      ];
      emails.forEach((email) => {
        const data = { ...validData, email };
        expect(contactSchema.safeParse(data).success).toBe(true);
      });
    });
  });

  describe("name validation", () => {
    it("fails when name is empty", () => {
      const data = { ...validData, name: "" };
      const result = contactSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("2 caractères");
      }
    });

    it("fails when name is only 1 character", () => {
      const data = { ...validData, name: "A" };
      const result = contactSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("2 caractères");
      }
    });
  });

  describe("email validation", () => {
    it("fails when email is empty", () => {
      const data = { ...validData, email: "" };
      const result = contactSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("email valide");
      }
    });

    it("fails with invalid email format", () => {
      const invalidEmails = ["not-an-email", "missing@domain", "@no-local.com", "spaces in@email.com"];
      invalidEmails.forEach((email) => {
        const data = { ...validData, email };
        expect(contactSchema.safeParse(data).success).toBe(false);
      });
    });
  });

  describe("subject validation", () => {
    it("fails when subject is empty", () => {
      const data = { ...validData, subject: "" };
      const result = contactSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("3 caractères");
      }
    });

    it("fails when subject is less than 3 characters", () => {
      const data = { ...validData, subject: "Ab" };
      const result = contactSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("3 caractères");
      }
    });
  });

  describe("message validation", () => {
    it("fails when message is empty", () => {
      const data = { ...validData, message: "" };
      const result = contactSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("10 caractères");
      }
    });

    it("fails when message is less than 10 characters", () => {
      const data = { ...validData, message: "123456789" };
      const result = contactSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("10 caractères");
      }
    });
  });

  describe("multiple errors", () => {
    it("returns all errors when multiple fields are invalid", () => {
      const data = { name: "A", email: "invalid", subject: "Ab", message: "short" };
      const result = contactSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBe(4);
      }
    });
  });
});