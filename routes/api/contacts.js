const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody,isValidId,authentificate } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const router = express.Router();

router.get("/", authentificate, ctrl.getAll);

router.get("/:id", authentificate, isValidId, ctrl.getById);

router.post("/", authentificate, validateBody(schemas.addSchema), ctrl.add);

router.put(
  "/:id",
  authentificate, isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:id/favorite",
  authentificate, isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);



router.delete("/:id", authentificate, isValidId, ctrl.deleteById);


module.exports = router;
