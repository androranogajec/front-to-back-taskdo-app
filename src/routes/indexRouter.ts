import express from "express";
const indexRouter = express();
import userRouter from "./userRouter";
const taskRouter = require("./taskRouter");



indexRouter.use("/tasks", taskRouter);
indexRouter.use('/users', userRouter);


export default indexRouter;