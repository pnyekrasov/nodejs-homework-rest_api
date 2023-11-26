const express = require("express");

const router = express.Router();

const jsonParser = express.json();

const userCtrl = require("../controllers/UserControllers");

const { validateBody, auth } = require("../middlewares");

const schemes = require("../schemes/users");

router.post(
  "/register",
  jsonParser,
  validateBody(schemes.userJoiSchema),
  userCtrl.register
);

router.post(
  "/login",
  jsonParser,
  validateBody(schemes.userJoiSchema),
  userCtrl.login
);

router.post("/logout", auth, userCtrl.logout);

router.get("/current", auth, userCtrl.getCurrent);

router.patch(
  "/",
  auth,
  jsonParser,
  userCtrl.changeSubscription
);

module.exports = router;
