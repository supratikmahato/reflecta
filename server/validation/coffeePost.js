const Joi = require("joi");

const coffeePostValidation = Joi.object().keys({
  "coffee-type": Joi.string()
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
  content: Joi.string().required().min(1).max(100),
});

module.exports = coffeePostValidation;
