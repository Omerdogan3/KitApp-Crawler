var util = require('util');
const insertImage = require('../database/insertImage');

module.exports = insertCategory = (bookJson,bookSqlObj) =>{
    _connection.query(util.format("SELECT category_id FROM category where category_name = '%s'", bookJson.category), function (err, result, fields) {
        if(JSON.stringify(result) === JSON.stringify([])){ //select bos object donerse
            _connection.query(util.format("INSERT INTO `category` (`category_id`, `category_name`) VALUES (NULL, '%s')",bookJson.category), function (err, res, fields) {
                _connection.query(util.format("SELECT category_id FROM category where category_name = '%s'", bookJson.category), function (err, r, fields){
                    bookSqlObj.category_id = JSON.parse(r[0].category_id);
                    insertImage(bookJson,bookSqlObj);
                });
            });
        }else{
            bookSqlObj.category_id = JSON.parse(result[0].category_id);
            insertImage(bookJson,bookSqlObj);
        }
    });
  };