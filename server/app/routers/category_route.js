const express = require("express");
const cayegoryRouter = express.Router();
const categoryController = require("../controller/category_controller");

const authJwt = require("../middleware/validators/authJwt");

// Create new category
cayegoryRouter.post(
  "/category",
  authJwt.verifyToken,
  categoryController.categoryStore
);

// // Update  User
cayegoryRouter.patch(
  "/category/:id",
  authJwt.verifyToken,
  categoryController.categoryEdit
);
cayegoryRouter.get(
  "/category",
  authJwt.verifyToken,
  categoryController.getAllCategory
);

module.exports = cayegoryRouter;
