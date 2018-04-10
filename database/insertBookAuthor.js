var util = require('util');
const insertBookImage = require('../database/insertBookImage');

module.exports = insertBookAuthor = (bookJson, bookSqlObj) => {
    _connection.query(util.format("SELECT ISBN FROM book_author where author_id = '%s'", bookSqlObj.author_id), function (err, result, fields) {
        if(JSON.stringify(result) === JSON.stringify([])){ //select bos object donerse
            _connection.query(util.format("INSERT INTO `book_author` (`ISBN`, `author_id`) VALUES ('%s', '%s')", bookJson.ISBN, bookSqlObj.author_id), function (err, res, fields) {
                insertBookImage(bookJson, bookSqlObj);
            });
        }else{
            insertBookImage(bookJson, bookSqlObj);
        }
    });
  };