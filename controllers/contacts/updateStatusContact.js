const { Contact } = require("../../models/contact/contact");

const { HttpError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  ).exec();
  if (!contact) {
    throw HttpError(404);
  }
  res.status(200).send({ code: 200, contact });
};

module.exports = updateStatusContact;
