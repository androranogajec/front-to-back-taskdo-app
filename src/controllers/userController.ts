import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
import dotenv from "dotenv";
import User from "../types/User";
import express from "express";

dotenv.config({ path: `${__dirname}/.env` })

export default {
  post: {
    saltAndHashPassword: function (user: User) {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;
      return user;
    },
    getUserId: async function (req: express.Request, res: express.Response) {
      try {
        let id = await UserModel.findOne(
          {
            username: req.body.username,
            password: req.body.password,
          },
          { _id: true }
        );
        id = id._id;
        return id;
      } catch (error) {
        console.log(error);
      }
    },
    isUser: async function (req: express.Request, res: express.Response) {
      try {
        let user = await UserModel.findOne({
          username: req.body.username,
          password: req.body.password,
        });
        if (user) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    userByUsernameAndPassword: async function (verify: User) {
      try {
        return await UserModel.findOne({
          username: verify.username,
          password: verify.password,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  get: {},
  all: {
    generateAccessToken: function (userId: string) {
      let accessToken = jwt.sign({ userId }, process.env.SECRET as string, {
        expiresIn: "1m",
      });
      return accessToken;
    },
    generateRefreshToken: function (userId: string) {
      let refreshToken = jwt.sign({ userId }, process.env.SECRET as string);
      return refreshToken;
    },
  },
};
