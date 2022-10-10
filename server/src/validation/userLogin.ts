import Joi from "joi";

const userLoginValidation = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .trim(),
  password: Joi.string().required().trim().min(6),
});

export default userLoginValidation;
