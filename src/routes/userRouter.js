const UserModel = require("../models/userModel");
const express = require("express");
const userRouter = express();
const userContoller = require("../controllers/userController");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

  /* 
  encrypt password 
  */
  userContoller.postUser.saltAndHashPassword(user);

  try {
    await user.save();
    console.log(`Posted a new user `, user);
   
  } catch (error) {
    console.log(error);
    res.end();
  }

  /* 
    token
  */
    let token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET,
      {
        expiresIn: "2h",
      }
    );

  /* 
   add the token to the current user object send the user
  */
  user.token = token;
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
