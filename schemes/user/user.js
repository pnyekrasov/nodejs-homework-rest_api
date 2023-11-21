const Joi = require("joi");

const registerUserSchema = Joi.object({
  name: Joi.string()
    .required("Name is required")
    .pattern(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    ),
  email: Joi.string()
    .required("Email is required")
    // index: true,
    // unique: true,
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/),
  password: Joi.string().required("Password is required").min(8),
});

const logInUserSchema = Joi.object({
  email: Joi.string()
    .required("Email is required")
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/),
  password: Joi.string().required("Password is required").min(8),
});

module.exports = { registerUserSchema, logInUserSchema };
