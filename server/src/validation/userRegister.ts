import Joi from "joi";

const userRegisterValidation = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .trim(),
  username: Joi.string().required().trim(),
  password: Joi.string().required().trim().min(6),
  confirmPassword: Joi.string()
    .required()
    .min(6)
    .trim()
    .valid(Joi.ref("password"))
    .label("Confirm Password"),
});

export default userRegisterValidation;
