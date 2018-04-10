var _connection = require('./database/DBconnection');
var util = require('util');

var ISBNCrawler = require('./crawlers/ISBNCrawler');

handleDisconnect = () => {
    _connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
_connection.on('error', function(err) {
    // console.log('db error', err);
    if(err) { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    }else{
        throw err;
    }
    });
}

handleDisconnect();
ISBNCrawler();



