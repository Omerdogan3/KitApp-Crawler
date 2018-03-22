
var _connection = require('./database/DBconnection');
var util = require('util');

var ISBNCrawler = require('./crawlers/ISBNCrawler');

_connection.connect(
    (err) => {
        if (err) throw err;
        console.log("Connected!");
    }
);



ISBNCrawler();



