const express = require("express");
const router = express.Router();

const authController = require(`./../controllers/authController`);

router
  .route("/account")
  .post(authController.signup)
  .patch(authController.protectRoutes, authController.updateUserProfile)
  .get(authController.protectRoutes, authController.getUserByID);

router.route("/account/post-token").post(authController.createAccountPostToken);

router.route("/account/login").post(authController.login);

router
  .route("/account/forgot-password")
  .post(authController.forgotPasswordEmailToken);

router
  .route("/account/forgot-password/post-token")
  .post(authController.forgotPasswordPostToken);

module.exports = router;
