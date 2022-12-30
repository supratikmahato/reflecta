import Joi from "joi";

const coffeeIsPublicValidation = Joi.object().keys({
  isPublic: Joi.boolean().required(),
});

export default coffeeIsPublicValidation;
