import Joi from "joi";

const coffeePatchValidation = Joi.object().keys({
  content: Joi.string().required().trim().min(1).max(1000),
});

export default coffeePatchValidation;
