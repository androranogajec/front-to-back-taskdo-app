import mongoose from "mongoose";
const { Schema } = mongoose;

const refreshSchema = new Schema({
  refreshToken: {
    type: String
  },
  userId: {
    type:String
  }
});

const RefreshModel = mongoose.model("RefreshToken", refreshSchema);
export default RefreshModel;
