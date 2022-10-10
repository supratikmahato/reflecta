import Joi from "joi";

const userRegisterValidation = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .trim(),
  username: Joi.string().required().trim(),
  password: Joi.string().required().trim().min(6),
});

export default userRegisterValidation;
