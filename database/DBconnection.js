var mysql = require('mysql');
var KEYS = require('../config/mySqlInfo.js');

module.exports =  _connection = mysql.createConnection({
  host: KEYS.host,
  user: KEYS.user,
  password: KEYS.password,
  database: KEYS.database
});