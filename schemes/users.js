const Joi = require("joi");

const userJoiSchema = Joi.object({
  email: Joi.string()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/)
    .required("Set email for user"),
  password: Joi.string().min(4).required("Set password for contact"),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
  token: Joi.string().default(null),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/)
    .required("Set email for user"),
});

module.exports = {
  userJoiSchema,
  emailSchema,
};
