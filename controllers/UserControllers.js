const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {JWT_SECRET} = process.env;

const User = require("../models/user");

const { HttpError, ctrlWrap } = require("../helpers");

class UserController {
  register = ctrlWrap(async (req, res) => {
    const { email, password } = req.body;

    const result = await User.findOne({ email }).exec();
        if (result) {
      throw HttpError(409, `Email ${email} in use`);
    }
    if (!email || !password) {
      throw HttpError(400);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).send({
      code: 201,
      email: newUser.email,
      subscription: newUser.subscription,
    });
  });

  login = ctrlWrap(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "16h" });

    await User.findByIdAndUpdate(user._id, { token });
    res.send({ token });
  });

  // getCurrent = ctrlWrap(async (req, res) => {
  //   const { email, subscription } = req.user;
  //   res.send({ email, subscription, });
  // });

  // logout = ctrlWrap(async (req, res) => {
  //     const { _id } = req.user;
  //     await User.findByIdAndUpdate(_id, { token: null });

  //     res.status(204).send({message: "LogOut success"});
  //   });
}

module.exports = new UserController();
