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

    /* isCompareHashWithString:function(user){
    bcrypt.compareSync(user.password, );
   } */
   getUserId: async function (req, res) {
    try {
      return await UserModel.findOne(
        {
          username: req.body.username,
          password: req.body.password,
        },
        { _id: true }
      );
    } catch (error) {
      console.log(error);
    }
  },
  },
  get: {
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
   
  },
  all: {
    generateToken: function (req) {
      let token = jwt.sign({ userId: req.body._id }, process.env.SECRET, {
        expiresIn: "2h",
      });
      return token;
    },
  },
};
