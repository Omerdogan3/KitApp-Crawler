var util = require('util');

module.exports = insertError = (bookJson) => {
    _connection.query(util.format("SELECT ISBN FROM errors where ISBN = '%s'", bookJson.ISBN), function (err, result, fields) {
        if(JSON.stringify(result) === JSON.stringify([])){
            _connection.query(util.format("INSERT INTO `errors` (`error_id`,`ISBN`) VALUES ('NULL','%s')", bookJson.ISBN), function (err, res, fields) {
                if(err)console.log(err);
            });
        }
    });
}