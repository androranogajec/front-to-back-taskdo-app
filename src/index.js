const express = require("express");
const app = express();
const cors = require("cors");
const port = 8080;
const connection = require("./database");
const userRouter = require("./routes/userRouter")

/* Connection to the mongodb */
connection();

/* listening the http server */
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});

/* only look and parse json requests*/
app.use(express.json())

/* cross origin resource sharing if diff ports or domain or scheme */
app.use(cors());

/* routers */
app.use('/api', userRouter)
