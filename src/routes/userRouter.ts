import UserModel from "../models/userModel";
import express from "express";
const userRouter = express();
import userController from "../controllers/userController";
import refreshController from "../controllers/refreshController";
import dotenv from "dotenv";
import { Type } from "typescript";
import RefreshModel from "../models/refreshModel";
dotenv.config({ path: `${__dirname}/.env` });

/* get all users */
userRouter.get("", refreshController.verify, async (req: express.Request, res: express.Response) => {
  try {
    const users: Array<Type> = await UserModel.find({});
    res.send(users);
  } catch (error) {
    console.log(error);
    res.end();
  }
});

/* refresh */
userRouter.post("/refresh", async (req: express.Request, res: express.Response) => {
  let userId: string = req.body.userId;
  let accessToken: string = "";
  let refreshToken: any = await refreshController.getById(res, userId);
  if (!refreshToken) {
    res.end();
    return;
  }
  try {
    await refreshController.deleteById(userId, res);
    console.log(refreshToken);
    accessToken = userController.all.generateAccessToken(userId);
    refreshToken = userController.all.generateRefreshToken(userId);
    refreshController.save(req, res, refreshToken, userId);
    accessToken = `Bearer ${accessToken}`;
    res.send({ accessToken });
  } catch (error) {
    res.send(error);
  }
});

/* logout */
userRouter.post("/logout", refreshController.verify, async (req: express.Request, res: express.Response) => {
  let userId: string = req.body.userId;
  refreshController.deleteById(userId, res);
  res.send("you have been logged out");

});

/* login */
userRouter.post("/login", async (req: express.Request, res: express.Response) => {
  let userId: string = "";
  let accessToken: string = "";
  let refreshToken: string = "";
  try {
    if (await userController.post.isUser(req, res)) {
      userId = await userController.post.getUserId(req, res);
      accessToken = userController.all.generateAccessToken(userId);
      refreshToken = userController.all.generateRefreshToken(userId);
      refreshController.save(req, res, refreshToken, userId);
      accessToken = `Bearer ${accessToken}`;
      res.send({ userId, accessToken });
    } else {
      res.status(500).send(`no user found`);
    }
  } catch (error) {
    res.send(error);
  }
});

/* get user by id */
userRouter.get("/user/:id", async (req: express.Request, res: express.Response) => {
  const id: string = req.params.id;
  try {
    const user = await UserModel.findById(id);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.end();
  }
});

/* post a user */
userRouter.post("/postUser", async (req: express.Request, res: express.Response) => {
  const user = new UserModel(req.body);
  let userId: string = "";
  let accessToken: string = "";
  let refreshToken: string = "";
  /* save to the db */
  try {
    await user.save();
    console.log(`Posted a new user `, user);
    userId = await userController.post.getUserId(req, res);
    accessToken = userController.all.generateAccessToken(userId);
    refreshToken = userController.all.generateRefreshToken(userId);
    refreshController.save(req, res, refreshToken, userId);
    let bearer: string = `Bearer ${accessToken}`;
    res.send({ userId, bearer });
    /* add token and send it*/
  } catch (error) {
    res.send(error);
  }
});

userRouter.delete("/deleteUser/:id", async (req: express.Request, res: express.Response) => {
  const _id: string = req.params.id;
  try {
    await UserModel.findByIdAndDelete(_id);
    console.log(`User with id: ${_id} was deleted`);
    res.end();
  } catch (error) {
    console.log(error);
    res.end();
  }
});

userRouter.patch("/patchUser/:id", async (req: express.Request, res: express.Response) => {
  const id: string = req.params.id;
  let body = req.body;
  try {
    await UserModel.findByIdAndUpdate(id, body);
    res.send(body);
  } catch (error) {
    console.log(error);
    res.end();
  }
});

export default userRouter;
