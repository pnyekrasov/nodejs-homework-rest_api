const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const validateId = (req, res, next) => {
  const {id} = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not a valid id`));
  }
  next();
};

module.exports = validateId;
