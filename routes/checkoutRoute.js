const express = require("express");
const router = express.Router();

const checkoutController = require(`./../controllers/checkoutController`);

// router.route("/").get(checkoutController.testMiddleware);
router.route("/").post(checkoutController.mercadoPagoCheckout);

module.exports = router;
