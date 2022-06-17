const express = require("express");
const app = express();
const cors = require("cors");
const port = 8080;
const connection = require("./database");

/* Connection to the mongodb */
connection();

/* listening the http server */
app.listen(port, ()=>{
    console.log(`App listening on port ${port}...`)
})

