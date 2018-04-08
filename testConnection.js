var mysql = require('mysql');

var con = mysql.createConnection({
  host: "94.73.146.81",
  database: "u7832868_kitApp",
  user: "u7832868_Omerdogan",
  password: "Omerdogan.1"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});