// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import isAlphanumeric from "validator/lib/isAlphanumeric";
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
  password: z.string().trim().min(6),
});

export const userRegisterValidation = z
  .object({
    username: z.string().trim().superRefine(isAlphanumeric).innerType(),
    email: z.string().trim().email(),
    password: z.string().trim().min(6),
    confirmPassword: z.string().trim().min(6),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });
