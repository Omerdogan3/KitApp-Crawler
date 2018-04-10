var util = require('util');


module.exports = insertBookImage = (bookJson, bookSqlObj) => {
    _connection.query(util.format("SELECT ISBN FROM book_image where image_id = '%s'", bookSqlObj.image_id), function (err, result, fields) {
        if(JSON.stringify(result) === JSON.stringify([])){ //select bos object donerse
            _connection.query(util.format("INSERT INTO `book_image` (`ISBN`, `image_id`) VALUES ('%s', '%s')", bookJson.ISBN, bookSqlObj.image_id), function (err, res, fields) {
                // if(err) console.log(err);
            });
        }
    });
  };