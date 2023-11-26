const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

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
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
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
    const { subscription } = user;
    res.status(200).send({ code: 200, token, user: { email, subscription } });
  });

  getCurrent = ctrlWrap(async (req, res) => {
    const { email, subscription } = req.user;
    res.status(200).send({ code: 200, email, subscription });
  });

  logout = ctrlWrap(async (req, res) => {
    await User.findByIdAndUpdate(req.user.id, { token: null });

    res.status(204).send({ message: "No Content" });
  });

  changeSubscription = ctrlWrap(async (req, res) => {
    const validSubscription = ["starter", "pro", "business"];
    if (!validSubscription.includes(req.body.subscription)) {
      throw HttpError(400);
    }

    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    }).exec();
    if (!user) {
      throw HttpError(404);
    }

    const { email, subscription } = req.user;
    res.status(200).send({ code: 200, code: 200, email, subscription });
  });
}

module.exports = new UserController();
