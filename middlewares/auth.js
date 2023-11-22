const jwt = require("jsonwebtoken");

const { User } = require("../models/user/user");

const { HttpError } = require("../helpers");

const { JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ", 2);
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id).exec();
    if (!user) {
      next(HttpError(401, "User not found"));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = auth;
