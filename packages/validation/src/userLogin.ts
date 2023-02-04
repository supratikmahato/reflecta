import Joi from "joi";

const userLoginValidation = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .trim()
    .label("Email"),
  password: Joi.string().required().trim().min(6).label("Password"),
});

export default userLoginValidation;
