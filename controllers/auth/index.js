const { ctrlWrap } = require("../../helpers");

const register = require("./register");
const login = require("./login");

module.exports = {
  register: ctrlWrap(register),
  login: ctrlWrap(login),
};
