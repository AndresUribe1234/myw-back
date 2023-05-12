const User = require("../models/userModel");
const Event = require("../models/eventsModel");
const moment = require("moment");
const tz = require("moment-timezone");
const mongoose = require("mongoose");

exports.createEvent = async (req, res) => {
  try {
    // 1)Get event information from request data
    const {
      title,
      description,
      email,
      eventType,
      eventDate,
      registrationFee,
      maxParticipants,
    } = req.body;

    // 2)Check if information is missing
    if (
      !title ||
      !description ||
      !email ||
      !eventType ||
      !eventDate ||
      !maxParticipants
    ) {
      throw new Error("Information needed to create event is missing!");
    }

    const eventOrganizerId = await User.findOne({ email: email });

    // 3)Check if event organizar exist in db
    if (!eventOrganizerId) {
      throw new Error("User who wants to create the event does not exist!");
    }

    const newEvent = await Event.create({
      title,
      description,
      organizer: eventOrganizerId._id,
      eventType,
      eventDate,
      registrationFee,
      maxParticipants,
    });

    // 5)Send response to client
    res.status(200).json({
      status: "Success: Event was created!",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Failed: Evenet could not be created!",
      err: err.message,
    });
  }
};

exports.allCreatedEvents = async (req, res) => {
  try {
    // 1)Get user email from protection middleware
    const id = req.user._id;

    //2)Find all user created events
    const allCreatedEvents = await Event.find({ organizer: id });

    // 3)Send response to client
    res.status(200).json({
      status: "Success: All created events where fetched!",
      data: { events: allCreatedEvents },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Failed: Could not fetch events!",
      err: err.message,
    });
  }
};

exports.allEvents = async (req, res) => {
  try {
    //1)Find all user created events
    const allCreatedEvents = await Event.find();

    // 2)Send response to client
    res.status(200).json({
      status: "Success: All created events where fetched!",
      data: { events: allCreatedEvents },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Failed: Could not fetch events!",
      err: err.message,
    });
  }
};

exports.allEventsGroupedByDate = async (req, res) => {
  try {
    //1)Find all user created events
    const allCreatedEventsGroupedByDate = await Event.aggregate([
      {
        $addFields: {
          dateAsString: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: {
                $toDate: { $subtract: ["$eventDate", { $toLong: 0 }] },
              },
              timezone: "America/Bogota",
            },
          },
        },
      },
      {
        $group: {
          _id: "$dateAsString",
          eventIds: { $push: "$_id" },
          activityTypes: { $addToSet: "$eventType" },
          events: {
            $push: {
              eventId: "$_id",
              eventType: "$eventType",
              eventTitle: "$title",
              eventDate: "$eventDate",
            },
          },
        },
      },
      {
        $project: {
          dateAsString: "$_id",
          eventIds: 1,
          activityTypes: 1,
          events: 1,
          _id: 1,
        },
      },
    ]);

    // 2)Send response to client
    res.status(200).json({
      status: "Success: All created events where fetched!",
      data: { eventsGroupedByDate: allCreatedEventsGroupedByDate },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Failed: Could not fetch events!",
      err: err.message,
    });
  }
};

exports.eventDetails = async (req, res) => {
  try {
    //1)Get id from params
    const id = req.params.id;
    //2)Find all user created events
    const event = await Event.findById(id);
    // 3)Throw error if theres no event with this id
    if (!event) {
      throw new Error("Theres no event with the id provided!");
    }

    // 4)Send response to client
    res.status(200).json({
      status: "Success: Event details where fetched!",
      data: { eventDetails: event },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Failed: Could not fetch event details!",
      err: err.message,
    });
  }
};
