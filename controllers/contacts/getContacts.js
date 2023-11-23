const {  Contact } = require("../../models/contact/contact");

const { ctrlWrap } = require("../../helpers");

const getContacts = ctrlWrap(async (req, res) => {
  const { _id: owner } = req.user;
  const {page = 1, limit = 20} = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({owner}, '-createdAt -updatedAt', {skip, limit}).exec();

  res.status(200).send({code: 200, contacts, qty: contacts.length});
});

module.exports = getContacts;
