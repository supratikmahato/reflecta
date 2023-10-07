import isAlphanumeric from "validator/lib/isAlphanumeric";
import isStrongPassword from "validator/lib/isStrongPassword";
import { z } from "zod";

export const coffeeIsPublicValidation = z.object({
  isPublic: z.boolean(),
});

export const coffeePatchValidation = z.object({
  content: z.string().trim().min(1).max(1000),
});

export const coffeePostValidation = z.object({
  coffeeType: z.enum([
    "black",
    "americano",
    "latte",
    "cappuccino",
    "espresso",
    "doppio",
    "cortado",
    "red-eye",
    "galao",
    "lungo",
    "macchiato",
    "mocha",
    "ristretto",
    "flat-white",
    "affogato",
    "cafe-au-lait",
    "irish",
  ]),
  content: z.string().trim().min(1).max(1000),
});

export const userLoginValidation = z.object({
  email: z.string().trim().email(),
  password: z.string().trim(),
});

export const userRegisterValidation = z
  .object({
    username: z.string().trim().refine(isAlphanumeric),
    email: z.string().trim().email(),
    password: z.string().trim().refine(isStrongPassword, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string().trim(),
  })
  .superRefine(({ confirmPassword, password }, context) => {
    if (confirmPassword !== password) {
      context.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });
