const express = require("express");

const router = express.Router();

const jsonParser = express.json();

const contactsCtrl = require("../../controllers/ContactsController");

const { validateBody, validateId } = require("../../middlewares");

const schemes = require("../../schemes");

router.get("/", contactsCtrl.getAll);

router.get("/:contactId", validateId, contactsCtrl.getById);

router.post("/", jsonParser, validateBody(schemes.addSchema), contactsCtrl.add);

router.delete("/:contactId", validateId, contactsCtrl.remove);

router.put(
  "/:contactId",
  jsonParser,
  validateBody(schemes.addSchema),
  validateId,
  contactsCtrl.updateByID
);

router.patch(
  "/:contactId/favorite",
  jsonParser,
  validateBody(schemes.updateFavoriteSchema),
  validateId,
  contactsCtrl.updateStatusContact
);

module.exports = router;
