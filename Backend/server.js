const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// making the app an express one
const app = express();
// allowing cors
app.use(cors());

// db connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test", // use "database" instead of "db"
});

// connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM student where id=2";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json({ data });
  });
});

app.listen(4001, () => {
  console.log("Server running");
});
