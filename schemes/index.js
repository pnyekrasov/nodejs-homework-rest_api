const { addSchema, updateFavoriteSchema } = require("./contacts");
const { userJoiSchema, emailSchema } = require("./users");

module.exports = {
  addSchema,
  updateFavoriteSchema,
  userJoiSchema,
  emailSchema,
};
