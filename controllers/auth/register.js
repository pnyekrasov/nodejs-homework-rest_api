const bcrypt = require("bcrypt");

const { User } = require("../../models/user/user");

const { HttpError } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const contact = await User.findOne({ email }).exec();
  if (contact) {
    throw HttpError(409, `Email in use`);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({...req.body, password: hashPassword});

  res.status(201).send({
    name: newUser.name,
    email: newUser.email,
  });
};

module.exports = register;
