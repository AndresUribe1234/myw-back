const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

// App creation
const app = express();
const PORT = 9000;

dotenv.config({ path: `./config.env` });

app.use(cors({ origin: "*" }));

// Connection to DB
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
).replace("<DBNAME>", process.env.DATABASE_NAME);

mongoose.set("strictQuery", false);

mongoose.connect(DB).then((con) => {
  console.log("DB connection successful to myw back...");
});

// Middleware

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Development
app.use(morgan("dev"));

// Backend routes
const checkoutRouter = require("./routes/checkoutRoute");

app.use("/api/checkout", checkoutRouter);
app.get("/", (req, res) => {
  res.send("Express JS on Vercel for myw app :)");
});

const server = app.listen(PORT, () =>
  console.log(`Server running on PORT ${PORT}`)
);
