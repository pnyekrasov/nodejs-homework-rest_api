const express = require("express");

const router = express.Router();

const jsonParser = express.json();

const contactsCtrl = require("../../controllers/contacts");

const {
  validateBody,
  validateId,
  auth,
} = require("../../middlewares");

const schemes = require("../../schemes/contact");

router.get("/", auth, contactsCtrl.getContacts);

router.get("/:contactId", auth, validateId, contactsCtrl.getContact);

router.post(
  "/",
  auth, 
  jsonParser,
  validateBody(schemes.addSchema),
  contactsCtrl.createContact
);

router.delete("/:contactId", auth, validateId, contactsCtrl.deleteContact);

router.put(
  "/:contactId",
  auth, 
  jsonParser,
  validateBody(schemes.addSchema),
  validateId,
  contactsCtrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  auth, 
  jsonParser,
  validateBody(schemes.updateFavoriteSchema),
  validateId,
  contactsCtrl.updateStatusContact
);

module.exports = router;
