import express from "express";
const indexRouter = express();
import userRouter from "./userRouter";
const taskRouter = require("./taskRouter");
const refreshRouter = require("./refreshRouter");



indexRouter.use("/tasks", taskRouter);
indexRouter.use('/users', userRouter);
indexRouter.use('/refresh', refreshRouter);

export default indexRouter;