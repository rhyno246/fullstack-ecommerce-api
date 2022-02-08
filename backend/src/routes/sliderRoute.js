const express = require("express");
const {
  getAllSlideShow,
  createSlider,
  deleteSlider,
  updateSlider,
} = require("../controllers/sliderController");
const { isAuthenticatedUser, authorizaRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/admin/slider/new")
  .post(isAuthenticatedUser, authorizaRoles("admin"), createSlider);

router
  .route("/admin/slider")
  .get(isAuthenticatedUser, authorizaRoles("admin"), getAllSlideShow);
router
  .route("/admin/slider/:id")
  .put(isAuthenticatedUser, authorizaRoles("admin"), updateSlider)
  .delete(isAuthenticatedUser, authorizaRoles("admin"), deleteSlider);

module.exports = router;
