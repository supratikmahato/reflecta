import Joi from "joi";

const coffeePostValidation = Joi.object().keys({
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

export default coffeePostValidation;
