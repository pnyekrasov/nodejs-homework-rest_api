const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const contactsRouter = require("./routes/api");

const app = express();

app.use(express.urlencoded({ extended: false }));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());

app.use("/api/contacts", contactsRouter);

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send({ code: err.status, message: err.message });
});

module.exports = app;
