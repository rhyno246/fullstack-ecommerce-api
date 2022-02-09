const express = require("express");
const {
  getAllSlideShow,
  createSlider,
  deleteSlider,
  updateSlider,
  getDetailSlider,
} = require("../controllers/sliderController");
const { isAuthenticatedUser, authorizaRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/admin/slider").get(getAllSlideShow);
router
  .route("/admin/slider/new")
  .post(isAuthenticatedUser, authorizaRoles("admin"), createSlider);

router
  .route("/admin/slider/:id")
  .get(isAuthenticatedUser, authorizaRoles("admin"), getDetailSlider)
  .put(isAuthenticatedUser, authorizaRoles("admin"), updateSlider)
  .delete(isAuthenticatedUser, authorizaRoles("admin"), deleteSlider);

module.exports = router;
