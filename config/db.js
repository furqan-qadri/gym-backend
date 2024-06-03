const mysql = require("mysql2/promise");

//with local repo code
// const mySqlPool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "GymManagement",
// });

// module.exports = mySqlPool;

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

const mySqlPool = mysql.createPool(dbConfig);
module.exports = mySqlPool;
