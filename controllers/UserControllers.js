const crypto = require("node:crypto");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("node:path");
const fs = require("node:fs/promises");
const Jimp = require("jimp");

const { JWT_SECRET, BASE_URL } = process.env;

const User = require("../models/user");

const avatarsDir = path.join(__dirname, "..", "public", "avatars");

const { HttpError, ctrlWrap, sendEmail } = require("../helpers");

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
    const avatarURL = gravatar.url(email);
    const verificationToken = crypto.randomUUID();

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    await sendEmail({
      to: email,
      subject: "Welcome to Phonebook manager",
      html: `To confirm your registration please click on the <a href="${BASE_URL}/users/verify/${verificationToken}">link</a>`,
      text: `To confirm your registration please open the link ${BASE_URL}/users/verify/${verificationToken}`,
    });

    res.status(201).send({
      code: 201,
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  });

  verifyEmail = ctrlWrap(async (req, res) => {
    const { verificationToken } = req.params;
 
    const user = await User.findOne({verificationToken}).exec();
    if (!user) {
      throw HttpError(404, "User not found");
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });
    res.status(200).send({ code: 200, message: "OK" });
  });

  login = ctrlWrap(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw HttpError(400);
    }

    const user = await User.findOne({ email }).exec();
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    if (!user.verify) {
      throw HttpError(401, "Your account is not verified");
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
    res.status(200).send({ code: 200, email, subscription });
  });

  changeAvatar = ctrlWrap(async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const filename = `${originalname}_${_id}`;
    const resultUpload = path.join(avatarsDir, filename);

    await fs.rename(tempUpload, resultUpload);

    Jimp.read(resultUpload)
      .then((image) => {
        image.resize(250, 250).write(resultUpload);
      })
      .catch((err) => {
        console.log(message.err);
      });

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(
      _id,
      { ...req.body, avatarURL },
      {
        new: true,
      }
    ).exec();

    res.status(200).send({ code: 200, avatarURL });
  });
}

module.exports = new UserController();
