const UserModel = require("../models/userModel");
const express = require("express");
const userRouter = express();
const userController = require("../controllers/userController");
const refreshController = require("../controllers/refreshController");
const jwt = require("jsonwebtoken");

require("dotenv").config();

/* get all users */
userRouter.get("", verify, async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (error) {
    console.log(error);
    res.end();
  }
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
      refreshController.save(req, refreshToken);
      res.send({ userId, accessToken });
    } else {
      res.status(500).send(`user doesn't exist`);
    }
  } catch (error) {
    res.send(error);
  }
});

function verify(req, res, next) {
  let token = req.headers.authorization;
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (error, payload) => {
      if (error) {
        return res.status(403).send("token is not valid");
      }
      req.payload = payload;
      next();
    });
  } else {
    res.status(401).send("your are not authenticated");
  }
}

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
