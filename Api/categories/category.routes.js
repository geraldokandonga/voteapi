const express = require("express");
const categoryController = require("./categories.controller");
const auth = require("../_middleware/auth");

const router = express.Router({
  mergeParams: true
});

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(
    auth.protect,
    auth.restrictTo("admin"),
    categoryController.createCategory
  );

router
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(
    auth.protect,
    auth.restrictTo("admin"),
    categoryController.updateCategory
  )
  .delete(
    auth.protect,
    auth.restrictTo("admin"),
    categoryController.deleteCategory
  );

module.exports = router;
