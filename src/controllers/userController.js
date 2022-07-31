const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

require("dotenv").config();
module.exports = {
  post: {
    saltAndHashPassword: function (user) {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;
      return user;
    },
    getUserId: async function (req, res) {
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
    isUser: async function (req, res) {
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
    userByUsernameAndPassword: async function (verify) {
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
    generateAccessToken: function (userId) {
      let accessToken = jwt.sign({ userId }, process.env.SECRET, {
        expiresIn: "1m",
      });
      return accessToken;
    },
    generateRefreshToken: function (userId) {
      let refreshToken = jwt.sign({ userId }, process.env.SECRET);
      return refreshToken;
    },
  },
};
