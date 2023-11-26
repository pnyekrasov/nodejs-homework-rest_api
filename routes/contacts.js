const express = require("express");

const router = express.Router();

const jsonParser = express.json();

const contactsCtrl = require("../controllers/ContactsController");

const { validateBody, validateId, auth } = require("../middlewares");

const schemes = require("../schemes/contacts");

router.get("/", auth, contactsCtrl.getAll);

router.get("/:contactId", auth, validateId, contactsCtrl.getById);

router.post(
  "/",
  auth,
  jsonParser,
  validateBody(schemes.addSchema),
  contactsCtrl.add
);

router.delete("/:contactId", auth, validateId, contactsCtrl.remove);

router.put(
  "/:contactId",
  auth,
  jsonParser,
  validateBody(schemes.addSchema),
  validateId,
  contactsCtrl.updateByID
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
