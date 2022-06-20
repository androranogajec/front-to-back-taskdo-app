const UserModel = require("../models/userModel");
const express = require("express");
const userRouter = express();

userRouter.get("/getAllUsers", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (error) {
    console.log(error);
    res.end();
  }
});

userRouter.post("/createUser", async (req, res) => {
  console.log(req.body);
  const user = new UserModel(req.body);
  try {
    await user.save();
    res.send(user);
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

userRouter.patch("/:id", async (req, res) => {
  const id = req.params.id;
  let body = req.body;
  try {
    await UserModel.findByIdAndUpdate(id, body);
   res.send(body)
  } catch (error) {
    console.log(error);
    res.end();
  }
});

module.exports = userRouter;
