const express = require("express");
const router = express.Router();

const eventController = require(`./../controllers/eventController`);
const authController = require(`./../controllers/authController`);

router
  .route("/")
  .get(authController.protectRoutes, eventController.allCreatedEventsByUser);

router.route("/all").get(eventController.allEvents);

router.route("/all/grouped").get(eventController.allEventsGroupedByDate);

router.route("/detail/:id").get(eventController.eventDetails);

router
  .route("/registration")
  .get(authController.protectRoutes, eventController.eventsPerUser)
  .post(authController.protectRoutes, eventController.eventRegistration);

router
  .route("/user")
  .get(authController.protectRoutes, eventController.fetchEventById)
  .post(authController.protectRoutes, eventController.createEvent)
  .patch(authController.protectRoutes, eventController.fetchEventById);

module.exports = router;
