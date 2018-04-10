var util = require('util');
const insertBooks = require('../database/insertBooks');

module.exports = insertImage = (bookJson, bookSqlObj) =>{
    _connection.query(util.format("SELECT image_id FROM image where image_link = '%s'", bookJson.imageLink), function (err, result, fields) {
        if(JSON.stringify(result) === JSON.stringify([])){ //select bos object donerse
            _connection.query(util.format("INSERT INTO `image` (`image_id`, `image_link`) VALUES (NULL, '%s')",bookJson.imageLink), function (err, res, fields) {
                _connection.query(util.format("SELECT image_id FROM `image` where image_link LIKE '%s'", bookJson.imageLink), function (err, r, fields){
                    bookSqlObj.image_id = JSON.parse(r[0].image_id);
                    // console.log(JSON.stringify(r));
                    insertBooks(bookJson,bookSqlObj);
                });
            });
        }else{
            bookSqlObj.image_id = JSON.parse(result[0].image_id);
            insertBooks(bookJson,bookSqlObj);
        }
    });
  };