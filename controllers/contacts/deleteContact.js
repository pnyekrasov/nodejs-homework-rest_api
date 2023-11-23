const { Contact } = require("../../models/contact/contact");

const { HttpError } = require("../../helpers");

const deleteContact = async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.contactId).exec();
  if (!contact) {
    throw HttpError(404);
  }
  res.send({ message: "contact deleted" });
};

module.exports = deleteContact;
