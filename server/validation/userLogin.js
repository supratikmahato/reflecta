const Joi = require("joi");

const userLoginValidation = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required().min(6),
});

module.exports = userLoginValidation;
