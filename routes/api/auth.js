const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authentificate } = require("../../middlewares");
const { schemas } = require("../../models/users");

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// signin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/current", authentificate, ctrl.getCurrent);

router.post("/logout", authentificate, ctrl.logout);

router.patch(
  "/",
  authentificate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateUserSubscription
);

module.exports = router;