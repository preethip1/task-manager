const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YOUR_PASSWORD",
  database: "task_manager",
});

db.connect((err) => {
  if (err) {
    console.error("DB Connection Failed:", err);
    return;
  }
  console.log("MySQL Connected");
});

module.exports = db;