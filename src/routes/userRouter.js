const UserModel = require("../models/userModel");
const express = require("express");
const userRouter = express();
const userController = require("../controllers/userController");
const refreshController = require("../controllers/refreshController");
const jwt = require("jsonwebtoken");

require("dotenv").config();

/* get all users */
userRouter.get("", refreshController.verify, async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send({ users });
  } catch (error) {
    console.log(error);
    res.end();
  }
});

/* refresh */
userRouter.post("/refresh", async (req, res) => {
  let userId = "test";
  try {
    let refreshToken = await refreshController.get();
    await refreshController.delete();
    if (!refreshToken[0].refreshToken) {
      res.status(401).send("your are not authenticated");
    } else {
      accessToken = userController.all.generateAccessToken(userId);
      refreshToken = userController.all.generateRefreshToken(userId);
      refreshController.save(req, refreshToken, userId);
      res.send({ accessToken });
    }
  } catch (error) {
    res.send(error);
  }
});

/* logout */
userRouter.post("/logout", refreshController.verify, async (req, res) => {
  let userId = req.body.userId;
  refreshController.delete();
  res.send("you have been logged out");
});
  
/* login */
userRouter.post("/login", async (req, res) => {
  let userId = "";
  let accessToken = "";
  let refreshToken = "";
  try {
    if (await userController.post.isUser(req)) {
      userId = await userController.post.getUserId(req);
      accessToken = userController.all.generateAccessToken(userId);
      refreshToken = userController.all.generateRefreshToken(userId);
      refreshController.save(req, refreshToken, userId);
      req.headers.accessToken = accessToken;
      res.send({ userId, accessToken });
    } else {
      res.status(500).send(`no user found`);
    }
  } catch (error) {
    res.send(error);
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
  /* save to the db */
  try {
    await user.save();
    console.log(`Posted a new user `, user);
    /* add token and send it*/
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
