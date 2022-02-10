const express = require("express");
const {
  getAllContact,
  deleteContact,
  createContact,
} = require("../controllers/contactController");
const { isAuthenticatedUser, authorizaRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/admin/contact/create").post(createContact);
router
  .route("/admin/contact")
  .get(isAuthenticatedUser, authorizaRoles("admin"), getAllContact);
router
  .route("/admin/contact/:id")
  .delete(isAuthenticatedUser, authorizaRoles("admin"), deleteContact);

module.exports = router;
