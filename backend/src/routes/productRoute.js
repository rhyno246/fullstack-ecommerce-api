const express = require("express");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProduct,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizaRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProduct);

//admin
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizaRoles("admin"), getAdminProduct);
router
  .route("/admin/products/new")
  .post(isAuthenticatedUser, authorizaRoles("admin"), createProduct);
router
  .route("/admin/products/:id")
  .put(isAuthenticatedUser, authorizaRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizaRoles("admin"), deleteProduct);

router.route("/products/:id").get(getProductDetail);
router
  .route("/review")
  .put(isAuthenticatedUser, createProductReview)
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
