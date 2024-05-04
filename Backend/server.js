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
//middleware
app.use(morgan("dev"));

//routes

app.use("/api/v1/students", require("./routes/studentRoutes"));

app.get("/", (req, res) => {
  res.status(200).send(" <h1>Furqan and Mehrish are cool! ikrrr</h1>");
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
