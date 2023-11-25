const express = require("express");

const router = express.Router();

const jsonParser = express.json();

const userCtrl = require("../controllers/UserControllers");

const { validateBody } = require("../middlewares");
// const { validateBody, auth } = require("../middlewares");

const schemes = require("../schemes/users");

router.post(
  "/register",
  jsonParser,
  validateBody(schemes.userSchema),
  userCtrl.register
);

// router.post(
//   "/login",
//   jsonParser,
//   validateBody(schemes.userSchema),
//   authCtrl.login
// );

// router.get("/logout", auth, authCtrl.logout);

// router.get("/current", auth, authCtrl.getCurrent);

module.exports = router;