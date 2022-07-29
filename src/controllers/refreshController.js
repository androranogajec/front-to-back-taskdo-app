const RefreshModel = require("../models/refreshModel");

module.exports = {
        save: async function (req, refreshToken) {
            req.body.refreshToken = refreshToken;
            try {
              const refresh = await new RefreshModel(req.body);
              await refresh.save();
              console.log("Refresh token has been saved")
            } catch (error) {
              res.send(error);
            }
          }
}