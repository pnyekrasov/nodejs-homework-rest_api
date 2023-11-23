const {  Contact } = require("../../models/contact/contact");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const {page = 1, limit = 20} = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({owner}, '-createdAt -updatedAt', {skip, limit}).exec();
  res.send(result);
};

module.exports = getContacts;
