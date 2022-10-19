import Joi from "joi";

const coffeePostValidation = Joi.object().keys({
  content: Joi.string().required().trim().min(1).max(100),
});

export default coffeePostValidation;
