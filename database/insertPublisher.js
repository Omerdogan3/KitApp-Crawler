var util = require('util');
const insertCategory = require('../database/insertCategory');

module.exports = insertPublisher = (bookJson,bookSqlObj) =>{
    _connection.query(util.format("SELECT publisher_id FROM publisher where publisher_name = '%s'", bookJson.publisher), function (err, result, fields) {
        if(JSON.stringify(result) === JSON.stringify([])){ //select bos object donerse
            _connection.query(util.format("INSERT INTO `publisher` (`publisher_id`, `publisher_name`) VALUES (NULL, '%s')",bookJson.publisher), function (err, res, fields) {
                _connection.query(util.format("SELECT publisher_id FROM publisher where publisher_name = '%s'", bookJson.publisher), function (err, r, fields){
                    bookSqlObj.publisher_id = JSON.parse(r[0].publisher_id);
                    insertCategory(bookJson,bookSqlObj);
                });
            });
        }else{
            bookSqlObj.publisher_id = JSON.parse(result[0].publisher_id);
            insertCategory(bookJson,bookSqlObj);
        }
    });
  };