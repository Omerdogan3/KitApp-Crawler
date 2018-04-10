var util = require('util');
const insertBookAuthor = require('../database/insertBookAuthor');

module.exports = insertBooks = (bookJson, bookSqlObj) => {
    _connection.query(util.format("SELECT ISBN FROM books where ISBN = '%s'", bookJson.ISBN), function (err, result, fields) {
        if(JSON.stringify(result) === JSON.stringify([])){ //select bos object donerse
            _connection.query(util.format('INSERT INTO `books`(`ISBN`, `title`, `introduction`, `publisher_id`, `category_id`, `image_id`, `author_id`, `stars`) VALUES ("%d","%s","%s","%s","%s","%s","%s","%s")',
                bookJson.ISBN, 
                bookJson.title, 
                bookJson.summary,
                bookSqlObj.publisher_id,
                bookSqlObj.category_id,
                bookSqlObj.image_id,
                bookSqlObj.author_id,
                bookJson.stars.charAt(0)
            ), function (err, res, fields) {
                if(err){
                    console.log(bookJson.ISBN);
                }
                insertBookAuthor(bookJson,bookSqlObj); 
            });
        }else{
            // console.log(bookSqlObj);
            insertBookAuthor(bookJson,bookSqlObj);
        }
    });
  };