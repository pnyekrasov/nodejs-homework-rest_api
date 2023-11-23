const { User } = require("../../models/user/user");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).send({message: "LogOut success"});
};

module.exports = logout;
