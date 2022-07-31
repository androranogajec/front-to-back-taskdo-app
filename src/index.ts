import express from "express";
const app = express();
import cors from "cors";
const port = 8080;
import connection from "./database";
import indexRouter from "./routes/indexRouter";

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
app.use('/api', indexRouter);
