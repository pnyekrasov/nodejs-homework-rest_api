require("./config");

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: false }));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.static("public"));

app.use("/api/contacts", require("./routes/contacts"));
app.use("/users", require("./routes/users"));

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send({ code: err.status, message: err.message });
});

module.exports = app;
