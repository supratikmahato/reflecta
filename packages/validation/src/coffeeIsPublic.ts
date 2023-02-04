import Joi from "joi";

const coffeeIsPublicValidation = Joi.object().keys({
  isPublic: Joi.boolean().required().label("Is Public"),
});

export default coffeeIsPublicValidation;
