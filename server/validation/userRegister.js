const Joi = require("joi");

const userRegisterValidation = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  username: Joi.string().required(),
  password: Joi.string().required().min(6),
});

module.exports = userRegisterValidation;
