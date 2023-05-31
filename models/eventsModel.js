const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nameOrganizer: { type: String, required: true },
    suscriptionType: {
      type: String,
      enum: ["Gratuita", "Pagada"],
      required: true,
    },
    modalityType: {
      type: String,
      enum: ["Virtual", "Presencial"],
      required: true,
    },
    eventType: {
      type: String,
      enum: [
        "Running",
        "Hiking",
        "Cycling",
        "Swimming",
        "Other",
        "Carrera",
        "Senderismo",
        "Ciclismo",
        "Natación",
        "Otro",
      ],
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
      min: Date.now,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: false,
      },
      coordinates: {
        type: [Number],
        required: false,
      },
    },
    registrationFee: {
      type: Number,
      required: false,
      min: 0,
    },
    currency: {
      type: String,
      enum: ["COP"],
      default: "COP",
      required: false,
    },
    maxParticipants: {
      type: Number,
      required: true,
      min: 1,
    },
    registeredParticipants: {
      type: [
        {
          userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
          },
          registrationDate: {
            type: Date,
            required: true,
            default: Date.now,
          },
          priceRegistration: {
            type: Number,
            required: true,
            min: 0,
          },
          mp_ref: {
            type: Number,
          },
          result: {
            type: Number,
            required: false,
          },
        },
      ],
      // select: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
