var util = require('util');
const insertPublisher = require('../database/insertPublisher');


module.exports = insertAuthor = (bookJson, bookSqlObj) =>{
    _connection.query(util.format("SELECT author_id FROM author where author_name = '%s'", bookJson.author), function (err, result, fields) {
        if(JSON.stringify(result) === JSON.stringify([])){ //select bos object donerse
            _connection.query(util.format("INSERT INTO `author` (`author_id`, `author_name`) VALUES (NULL, '%s')",bookJson.author), function (err, res, fields) {
                _connection.query(util.format("SELECT author_id FROM author where author_name = '%s'", bookJson.author), function (err, r, fields){
                    bookSqlObj.author_id = JSON.parse(r[0].author_id);
                    insertPublisher(bookJson, bookSqlObj);
                });
            });
        }else{
            bookSqlObj.author_id = JSON.parse(result[0].author_id);
            insertPublisher(bookJson, bookSqlObj);
        }
    });
  };