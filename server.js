const app = require("./app");

const mongoose = require("mongoose");

  const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.info("Database connection successful");
    app.listen(5000, () => {
      console.info("Server running. Use our API on port: 5000");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
