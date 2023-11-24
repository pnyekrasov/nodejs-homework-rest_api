const Contact = require("../models");

const { HttpError, ctrlWrap } = require("../helpers");

class ContactsController {
  getAll = ctrlWrap(async (req, res) => {
    const contacts = await Contact.find({}, "-createdAt -updatedAt").exec();
    res.status(200).send({code: 200, contacts, qty: contacts.length});
  });

  getById = ctrlWrap(async (req, res) => {
    const contact = await Contact.findById(
      req.params.contactId,
      "-createdAt -updatedAt"
    ).exec();
    if (!contact) {
      throw HttpError(404);
    }
    res.send(contact);
  });

  add = ctrlWrap(async (req, res) => {
    const { name, email, phone } = req.body;
    const result = await Contact.findOne({ name }).exec();
    if (result) {
      throw HttpError(409, `Contact ${name} already exists`);
    }
  
    if (!name || !email || !phone) {
      throw HttpError(400);
    }  

    const contact = await Contact.create({ ...req.body });
  
    res.status(201).send({ code: 201, contact });
  });

  remove = ctrlWrap(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.contactId).exec();
    if (!contact) {
      throw HttpError(404);
    }
    res.send({code: 200, message: "contact deleted" });
  });

  updateByID = ctrlWrap(async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true }
    ).exec();  
    if (!contact) {
      throw HttpError(404);
    }
    res.status(200).send({ code: 200, contact });
  });


  updateStatusContact = ctrlWrap(async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true }
    ).exec();
    if (!contact) {
      throw HttpError(404);
    }
    res.status(200).send({ code: 200, contact });
  });
}


module.exports = new ContactsController;
