const UserModel = require("../models/userModel");
const express = require("express");
const userRouter = express();
const userController = require("../controllers/userController");
require("dotenv").config();

userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (error) {
    console.log(error);
    res.end();
  }
});
userRouter.get("/isSemiGetTokenAndUserId", async (req, res) => {
  if (await userController.get.isUser(req)) {
    let token = userController.all.generateToken(req);
    let userId = await userController.get.getUserId(req);
    res.send({ token, userId });
  } else {
    res.send(false);
  }
});
userRouter.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.end();
  }
});

userRouter.post("/postUser", async (req, res) => {
  const user = new UserModel(req.body);

  /* encrypt password */
  /*   userContoller.postUser.saltAndHashPassword(user); */

  try {
    await user.save();
    console.log(`Posted a new user `, user);
  } catch (error) {
    console.log(error);
    res.end();
  }

  /* add token */
  userController.all.generateToken(user);

  /* send */
  res.send(user);
});

userRouter.delete("/deleteUser/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    await UserModel.findByIdAndDelete(_id);
    console.log(`User with id: ${_id} was deleted`);
    res.end();
  } catch (error) {
    console.log(error);
    res.end();
  }
});

userRouter.patch("/patchUser/:id", async (req, res) => {
  const id = req.params.id;
  let body = req.body;
  try {
    await UserModel.findByIdAndUpdate(id, body);
    res.send(body);
  } catch (error) {
    console.log(error);
    res.end();
  }
});

module.exports = userRouter;
