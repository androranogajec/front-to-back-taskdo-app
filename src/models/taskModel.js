const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  task: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
    required: true,
  },
});

const TaskModel = mongoose.model("Task", taskSchema);
module.exports = TaskModel;
