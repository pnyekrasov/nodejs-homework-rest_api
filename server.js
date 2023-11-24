require("colors");

const app = require("./app");
const { connectDb } = require("./config");

connectDb();

const { PORT = 5000 } = process.env;

app.listen(PORT, () => {
  console.info(
    `Server running. Use our API on port: ${PORT}`.green.italic.bold
  );
});
