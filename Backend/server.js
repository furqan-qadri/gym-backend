//imports
const cors = require("cors");
const express = require("express");
const colors = require("colors");
const mysql = require("mysql");
const morgan = require("morgan"); //log api hits
const dotenv = require("dotenv");
const mySqlPool = require("./config/db");

//app

dotenv.config();

const app = express();
app.use(express.json());
//middleware
app.use(morgan("dev"));

//routes

app.use("/api/v1/gym/members", require("./routes/studentRoutes"));
app.use("/api/v1/gym/trainers", require("./routes/trainerRoutes"));

app.get("/", (req, res) => {
  res.status(200).send(" <h1>Furqan and Areeba are a cool couple!! yoyo</h1>");
});

const PORT = process.env.PORT;

mySqlPool
  .query("SELECT 1")
  .then(() => {
    console.log("MYSQL DB connected".bgCyan.white);
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`.bgMagenta.white);
    });
  })
  .catch((error) => {
    console.log(error);
  });
