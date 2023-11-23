const express = require("express");

const router = express.Router();

const jsonParser = express.json();

const authCtrl = require("../../controllers/auth");

const { validateBody, auth } = require("../../middlewares");

const schemes = require("../../schemes/user");

router.post(
  "/register",
  jsonParser,
  validateBody(schemes.registerUserSchema),
  authCtrl.register
);

router.post(
  "/login",
  jsonParser,
  validateBody(schemes.logInUserSchema),
  authCtrl.login
);

router.post("/logout", auth, authCtrl.logout);

router.get("/current", auth, authCtrl.getCurrent);

module.exports = router;
