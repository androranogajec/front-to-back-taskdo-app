import RefreshModel from "../models/refreshModel";
import jwt from "jsonwebtoken";
import express from 'express';


export default {
  save: async function (req: express.Request, res: express.Response, refreshToken: string, userId: string) {
    req.body.refreshToken = refreshToken;
    req.body.userId = userId;
    if (await RefreshModel.findOne({ userId })) {
      return
    }
    try {
      const refresh = await new RefreshModel(req.body);
      await refresh.save();
      console.log("Refresh token has been saved");
    } catch (error) {
      res.send(error);
    }
  },
  get: async function (res: express.Response) {
    try {
      const refreshToken: any = await RefreshModel.find({});
      console.log("Refresh token has been retrieved");
      return refreshToken;
    } catch (error) {
      res.send(error);
    }
  },
  getById: async function (res: express.Response, id: string) {
    try {
      const refreshToken = await RefreshModel.findOne({ userId: id });
      if (!refreshToken) {
        res.send('for this userId no refresh token was found in the db');
        return
      } else {
        console.log("Refresh token has been retrieved by id");
        return refreshToken;
      }
    } catch (error) {
      res.send(error);
    }
  },
  delete: async function (res: express.Response) {
    try {
      await RefreshModel.findOneAndDelete({});
      console.log("Refresh token has been deleted");
    } catch (error) {
      res.send(error);
    }
  },
  deleteById: async function (userId: string, res: express.Response) {
    if (!userId) {
      res.send('userId was not found');
    }
    try {
      await RefreshModel.findOneAndRemove({ userId }, function (error: Error, callback: any) {
        if (error) {
          res.send(error);
          return;
        }
        console.log('Refresh token has been deleted')
      }).clone()
    } catch (error) {
      res.send(error);
    }
  },
  verify: function (req: express.Request, res: express.Response, next: express.NextFunction) {
    let header = req.headers.authorization;
    if (header) {
      let token = header.split(" ")[1];
      jwt.verify(token, process.env.SECRET as string, (err, data) => {
        if (err) {
          res.status(500).send("the token has expired");
          return;
        }
        return next();
      });
    } else {
      res.send("you are not authenticated");
    }
  },
};
