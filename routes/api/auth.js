const express = require("express");

const router = express.Router();

const jsonParser = express.json();

const authCtrl = require("../../controllers/auth");

const { validateBody } = require("../../middlewares");

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

module.exports = router;
