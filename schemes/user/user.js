const Joi = require("joi");

const registerUserSchema = Joi.object({
  email: Joi.string()
    .required("Email is required")
    // index: true,
    // unique: true,
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/),
  password: Joi.string().required("Password is required").min(4),
});

const logInUserSchema = Joi.object({
  email: Joi.string()
    .required("Email is required")
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/),
  password: Joi.string().required("Password is required").min(4),
});

module.exports = {
  registerUserSchema,
  logInUserSchema,
};
