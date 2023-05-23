const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Input needs to be an email",
    },
    trim: true,
  },
  name: String,
  password: {
    type: String,
    minLength: 8,
    select: false,
    required: [true, "User must enter a password!"],
  },
  passwordConfirm: {
    type: String,
    minLength: 8,
    select: false,
    required: [true, "User must enter a password!"],
  },
  passwordChangedAt: { type: Date },
  userCreationDate: { type: Date, default: Date.now },
  newEmailRequest: {
    type: String,
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Input needs to be an email",
    },
    trim: true,
  },
  verificationToken: { type: String, unique: true },
  temporalEmailBeforeVerification: {
    type: String,
    unique: false,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Input needs to be an email",
    },
    trim: true,
  },
  accountVerified: { type: Boolean, default: false },
  lastModified: { type: Date },
  registeredEvents: {
    type: [
      {
        eventId: {
          type: Schema.Types.ObjectId,
          ref: "Event",
          required: true,
        },
        priceRegistration: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    default: [],
  },
});

// Crypt password
userSchema.pre("save", async function cryptPassword(next) {
  // Check so this ONLY runs when making a change to the password. This guard clause returns if other field is being modified.
  if (!this.isModified("password")) return next();
  //   Hash de password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  //   Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// Save last time profile was changed
userSchema.pre("save", async function addModify(next) {
  //   Add timestamp in UTC
  this.lastModified = new Date();
  next();
});

// Correct password function, returns true if same
userSchema.methods.correctPassword = async function (
  dbPassword,
  enteredPassword
) {
  return await bcrypt.compare(enteredPassword, dbPassword);
};

// Crypt verification token in db
userSchema.pre("save", async function cryptVerification(next) {
  // Check so this ONLY runs when making a change to the password. This guard clause returns if other field is being modified.
  if (!this.isModified("verificationToken")) return next();
  //   Hash de password with cost of 12
  this.verificationToken = await bcrypt.hash(this.verificationToken, 12);

  next();
});

// Correct verification token function, returns true if same
userSchema.methods.correctToken = async function (dbToken, enteredToken) {
  return await bcrypt.compare(enteredToken, dbToken);
};

// Changes duplicate email error message
userSchema.post("save", function (error, doc, next) {
  if (error.code === 11000) {
    next(new Error("User with this email already existes!"));
  } else {
    next(error);
  }
});

// Return if password was changed after token creation to see if its valid
userSchema.methods.changedPasswordAfter = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const passwordChangedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000
    );
    return jwtTimestamp < passwordChangedTimestamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
