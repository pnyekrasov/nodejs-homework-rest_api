const { connect } = require("mongoose");

const connectDb = async () => {
  try {
    await connect(process.env.DB_URI);
        console.info("Database connection successful".blue.italic.bold)   
  } catch (error) {
    console.log(error.message.red.bold);
    process.exit(1);
  }
};

module.exports = connectDb;