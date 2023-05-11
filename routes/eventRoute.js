const express = require("express");
const router = express.Router();

const eventController = require(`./../controllers/eventController`);
const authController = require(`./../controllers/authController`);

router
  .route("/")
  .post(authController.protectRoutes, eventController.createEvent)
  .get(authController.protectRoutes, eventController.allCreatedEvents);

router.route("/all").get(eventController.allEvents);

router.route("/all/grouped").get(eventController.allEventsGroupedByDate);

module.exports = router;
