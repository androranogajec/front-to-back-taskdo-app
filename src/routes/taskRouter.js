const TaskModel = require("../models/taskModel");
const express = require("express");
const taskRouter = express();

taskRouter.get("/", async (req, res) => {
try {
  const tasks = await TaskModel.find({});
  res.send(tasks);
} catch (error) {
  console.log(error);
  res.end();
}
});

/* get all tasks by user id */
taskRouter.get("/:id", async (req, res) => {
    const userId = req.params.id;
  try {
    const tasks = await TaskModel.find({userId});
    res.send(tasks);
  } catch (error) {
    console.log(error);
    res.end();
  }
});

taskRouter.post("/createTask", async (req, res) => {
  const task = new TaskModel(req.body);
  try {
    await task.save();
    res.send(task);
  } catch (error) {
    console.log(error);
    res.end();
  }
});

taskRouter.delete("/deleteTaskById/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await TaskModel.findByIdAndDelete(id);
    console.log(`Task with id: ${id} was deleted`);
    res.end();
  } catch (error) {
    console.log(error);
    res.end();
  }
});

taskRouter.delete("/deleteAllTasksByUserId/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await TaskModel.deleteMany({userId: id});
    res.end();
  } catch (error) {
    console.log(error);
    res.end();
  }
});

/* patch a task by id */
taskRouter.patch("/patchTask/:id", async (req, res) => {
  const id = req.params.id;
  let body = req.body;
  try {
    await TaskModel.findByIdAndUpdate(id, body);
   res.send(body)
  } catch (error) {
    console.log(error);
    res.end();
  }
});

module.exports = taskRouter;
