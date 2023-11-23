const { Contact } = require("../../models/contact/contact");

const { HttpError, ctrlWrap } = require("../../helpers");

const createContact = ctrlWrap(async (req, res) => {
  const { name, email, phone } = req.body;
  const result = await Contact.findOne({ name }).exec();
  if (result) {
    throw HttpError(409, `Contact ${name} already exists`);
  }

  if (!name || !email || !phone) {
    throw HttpError(400);
  }

  const { _id: owner } = req.user;
  const contact = await Contact.create({ ...req.body, owner });

  res.status(201).send({ code: 201, contact });
});

module.exports = createContact;
