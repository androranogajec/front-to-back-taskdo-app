import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({path:`${__dirname}/.env`})

/* async connection to the database */
async function connection(): Promise<void> {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERNAME}:${process.env.DBPASS}@cluster0.shbxeue.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Database connection succedeed");
  } catch (error) {
    console.log(error);
  }
};

export default connection
