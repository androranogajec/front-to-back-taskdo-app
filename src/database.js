require("dotenv").config();
const mongoose = require("mongoose");

/* async connection to the database */
const connection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERNAME}:${process.env.DBPASS}@cluster0.shbxeue.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Database connection succedeed");
  } catch (error) {
    console.log("Database connection ", error);
  }
};

module.exports = connection;
