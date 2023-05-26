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

router.route("/detail/:id").get(eventController.eventDetails);

router
  .route("/registration")
  .post(authController.protectRoutes, eventController.eventRegistration);

router
  .route("/user")
  .get(authController.protectRoutes, eventController.eventsPerUser);

module.exports = router;
