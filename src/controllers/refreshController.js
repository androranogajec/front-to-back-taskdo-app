const RefreshModel = require("../models/refreshModel");
const jwt = require("jsonwebtoken");

module.exports = {
  save: async function (req, refreshToken, userId) {
    req.body.refreshToken = refreshToken;
    req.body.userId = userId;
    try {
      const refresh = await new RefreshModel(req.body);
      await refresh.save();
      console.log("Refresh token has been saved");
    } catch (error) {
      res.send(error);
    }
  },
  get: async function () {
    try {
      const refreshToken = await RefreshModel.find({});
      console.log("Refresh token has been retrieved");
      return refreshToken;
    } catch (error) {
      res.send(error);
    }
  },
  getById: async function (id) {
    try {
      const refreshToken = await RefreshModel.findOne({ _id: id });
      console.log("Refresh token has been retrieved by id");
      return refreshToken;
    } catch (error) {
      res.send(error);
    }
  },
  delete: async function () {
    try {
      await RefreshModel.findOneAndDelete({});
      console.log("Refresh token has been deleted");
    } catch (error) {
      res.send(error);
    }
  },
  verify: function (req, res, next) {
    let header = req.headers.authorization;
    if (header) {
      let token = header.split(" ")[1];
      jwt.verify(token, process.env.SECRET, (err, data) => {
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
