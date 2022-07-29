const RefreshModel = require("../models/refreshModel");
const express = require('express');
const refreshRouter = express();


refreshRouter.post("", async (req, res) =>{
    const refreshToken = req.body.token;
    if(!refreshToken){
        res.status(401).send("you are not authenticated");
    }
})

module.exports = refreshRouter;
