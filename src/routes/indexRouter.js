const express = require("express");
const indexRouter = express();
const userRouter = require("./userRouter");
const taskRouter = require("./taskRouter");



indexRouter.use("/tasks", taskRouter);
indexRouter.use('/users', userRouter);

module.exports = indexRouter;