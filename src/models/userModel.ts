import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  pendingTasks: {
    type: Number,
    default: 0
  },
  avatar: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now()
  },
  isOnline: {
    type: Boolean,
    default: true
  }
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
