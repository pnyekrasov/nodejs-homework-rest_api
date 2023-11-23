const { ctrlWrap } = require("../../helpers");

const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");

module.exports = {
  register: ctrlWrap(register),
  login: ctrlWrap(login),
  logout: ctrlWrap(logout),
  getCurrent: ctrlWrap(getCurrent),
};
