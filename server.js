const mongoose = require("mongoose");
require("colors");

const app = require("./app");

const { DB_URI, PORT = 5000 } = process.env;

mongoose
.connect(DB_URI)
.then(() => {
  console.info("Database connection successful");
  app.listen(PORT, () => {
    console.info(
      `Server running. Use our API on port: ${PORT}`.green.italic.bold
    );
  });
})
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
