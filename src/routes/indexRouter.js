const express = require("express");
const indexRouter = express();
const userRouter = require("./userRouter");
const taskRouter = require("./taskRouter");
const refreshRouter = require("./refreshRouter");



indexRouter.use("/tasks", taskRouter);
indexRouter.use('/users', userRouter);
indexRouter.use('/refresh', refreshRouter);
module.exports = indexRouter;