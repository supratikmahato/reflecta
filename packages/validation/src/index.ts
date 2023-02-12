import Joi from "joi";

export const coffeeIsPublicValidation = Joi.object().keys({
  isPublic: Joi.boolean().required().label("Is Public"),
});

export const coffeePatchValidation = Joi.object().keys({
  content: Joi.string().required().trim().min(1).max(1000),
});

export const coffeePostValidation = Joi.object().keys({
  coffeeType: Joi.string()
    .valid(
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
      "irish"
    )
    .required(),
  content: Joi.string().required().trim().min(1).max(1000),
});

export const userLoginValidation = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .trim()
    .label("Email"),
  password: Joi.string().required().trim().min(6).label("Password"),
});

export const userRegisterValidation = Joi.object().keys({
  username: Joi.string().alphanum().required().trim().label("Username"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .trim()
    .label("Email"),
  password: Joi.string().required().min(6).trim().label("Password"),
  confirmPassword: Joi.string()
    .required()
    .min(6)
    .trim()
    .valid(Joi.ref("password"))
    .label("Confirm Password"),
});
