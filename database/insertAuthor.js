var util = require('util');
const insertPublisher = require('../database/insertPublisher');
const insertError = require('../database/insertError');

module.exports = insertAuthor = (bookJson, bookSqlObj) =>{
    _connection.query(util.format("SELECT author_id FROM author where author_name = '%s'", bookJson.author), function (err, result, fields) {
        if(err) insertError(bookJson);
        if(JSON.stringify(result) === JSON.stringify([])){ //select bos object donerse
            _connection.query(util.format("INSERT INTO `author` (`author_id`, `author_name`) VALUES (NULL, '%s')",bookJson.author), function (err, res, fields) {
                if(err) insertError(bookJson);
                _connection.query(util.format("SELECT author_id FROM author where author_name = '%s'", bookJson.author), function (err, r, fields){
                    if(err) insertError(bookJson);
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