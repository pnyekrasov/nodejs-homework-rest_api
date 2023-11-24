const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string()
    .required("Email is required")
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/),
  password: Joi.string().required("Password is required").min(4),
  
});

module.exports = userSchema;
