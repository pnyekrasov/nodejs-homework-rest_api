<<<<<<< HEAD
=======
const mongoose = require("mongoose");
>>>>>>> ef165777a75e809d5f26929a7b4f2d861f3eeb6c
require("colors");

const app = require("./app");
const { connectDb } = require("./config");

<<<<<<< HEAD
connectDb();

const { PORT = 5000 } = process.env;

app.listen(PORT, () => {
  console.info(
    `Server running. Use our API on port: ${PORT}`.green.italic.bold
  );
});
=======
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
>>>>>>> ef165777a75e809d5f26929a7b4f2d861f3eeb6c
