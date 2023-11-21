const express = require("express");

const router = express.Router();

const { validateBody } = require("../../middlewares");

const schemes = require("../../schemes/user");

// router.post('/register')

module.exports = router;
