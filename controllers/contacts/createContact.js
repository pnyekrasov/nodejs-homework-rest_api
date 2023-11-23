const { Contact } = require("../../models/contact/contact");

// const { HttpError } = require("../../helpers");

const createContact = async (req, res) => {
  // const { name } = req.body;
  // const contact = await Contact.findOne({ name }).exec();
  // if (contact) {
  //   throw HttpError(409, `Contact ${name} already exists`);
  // }

  const { _id: owner } = req.user;
  
  const result = await Contact.create({...req.body, owner});

  res.status(201).send(result);
};

module.exports = createContact;
