var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "BOOKS"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE BOOKS (ISBN VARCHAR(255), title VARCHAR(255), author VARCHAR(255), stars VARCHAR(255), publisher VARCHAR(255), summary VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});