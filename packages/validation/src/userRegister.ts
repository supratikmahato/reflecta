import Joi from "joi";

const userRegisterValidation = Joi.object().keys({
  username: Joi.string().alphanum().required().trim().label("Username"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .trim()
    .label("Email"),
  password: Joi.string().required().min(6).trim().label("Password"),
  confirmPassword: Joi.string()
    .required()
    .min(6)
    .trim()
    .valid(Joi.ref("password"))
    .label("Confirm Password"),
});

export default userRegisterValidation;
