const express = require("express");

const router = express.Router();

const jsonParser = express.json();

const userCtrl = require("../controllers/UserControllers");

const { validateBody, auth, upload } = require("../middlewares");

const schemes = require("../schemes/users");

router.post(
  "/register",
  jsonParser,
  validateBody(schemes.userJoiSchema),
  userCtrl.register
);

router.get("/verify/:verificationToken", userCtrl.verifyEmail);

router.post("/verify/:verificationToken", userCtrl.verifyEmail);

router.post(
  "/login",
  jsonParser,
  validateBody(schemes.userJoiSchema),
  userCtrl.login
);

router.post("/logout", auth, userCtrl.logout);

router.get("/current", auth, userCtrl.getCurrent);

router.patch("/", auth, jsonParser, userCtrl.changeSubscription);

router.patch("/avatars", auth, upload.single("avatar"), userCtrl.changeAvatar);

module.exports = router;
