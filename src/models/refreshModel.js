const mongoose = require("mongoose");
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
module.exports = RefreshModel;
