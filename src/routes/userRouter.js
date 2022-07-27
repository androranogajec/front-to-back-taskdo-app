const UserModel = require("../models/userModel");
const express = require("express");
const userRouter = express();
const userController = require("../controllers/userController");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* get all users */
userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (error) {
    console.log(error);
    res.end();
  }
});

/* get user by verifying the token */
userRouter.get("/login", async (req, res) => {
  const token = req.headers.token;
  try {
    const verify = jwt.verify(token, process.env.SECRET);
    const user = await userController.get.userByUsernameAndPassword(verify);
    res.send(user);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

/* when auth if user exists return token or false */
userRouter.post("/authentication", async (req, res) => {
  const user = req.body;
  if (await userController.get.isUser(req)) {
    userController.all.sendToken(user, res);
  } else {
    res.send(false);
  }
});

/* get user by id */
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

/* post a user */
userRouter.post("/postUser", async (req, res) => {
  const user = new UserModel(req.body);
  console.log(user);
  /* encrypt password */
  /*  userController.post.saltAndHashPassword(user); */

  /* save to the db */
  try {
    await user.save();
    console.log(`Posted a new user `, user);
    /* add token and send it*/
    userController.all.sendToken(user, res);
  } catch (error) {
    console.log(error);
    res.end();
  }
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
