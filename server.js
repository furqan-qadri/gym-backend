const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mysql = require("mysql2/promise");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Create an Express application
const app = express();
app.use(express.json());
app.use(morgan("dev"));

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || "gym.cbqosqcmy1ts.us-east-1.rds.amazonaws.com",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "gymaws",
  port: 3306, // MySQL default port
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, // 30 seconds
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Middleware and Routes
app.use("/api/v1/gym/members", require("./routes/studentRoutes"));
app.use("/api/v1/gym/trainers", require("./routes/trainerRoutes"));
app.use("/api/v1/gym/announcements", require("./routes/announcementRoutes"));
app.use("/api/v1/gym/plans", require("./routes/planRoutes"));
app.use("/api/v1/gym/payments", require("./routes/paymentsRoutes"));
app.use("/api/v1/gym/salaries", require("./routes/salariesRoutes"));

app.get("/", (req, res) => {
  res.status(200).send("<h1>Furqan and Areeba are a cool couple!! yoyo</h1>");
});

// Start the server and test the database connection
const PORT = process.env.PORT || 8090;

(async function startServer() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to the MySQL database".bgCyan.white);
    connection.release(); // Release the connection back to the pool
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`.bgMagenta.white);
    });
  } catch (error) {
    console.error("Database connection failed: ", error);
  }
})();
