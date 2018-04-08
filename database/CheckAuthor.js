var util = require('util');

let id = null;

//author'u kontrol et eger database'de daha onceden ekliyse id'sini al, degilse database'e ekle.
module.exports  = CheckAuthor = (authorName) =>{
     _connection.query(util.format("SELECT author_id FROM author where author_name = '%s'", authorName), function (err, result, fields) {
        if(JSON.stringify(result) === JSON.stringify([])){ //select bos object donerse
            _connection.query(util.format("INSERT INTO `author` (`author_id`, `author_name`) VALUES (NULL, '%s')",authorName), function (err, res, fields) {
                _connection.query(util.format("SELECT author_id FROM author where author_name = '%s'", authorName), function (err, r, fields){
                    id = JSON.parse(r[0].author_id);
                });
            });
        }else{ //id'yi return ederse
            // console.log(JSON.parse(result[0].author_id));
            id = JSON.parse(result[0].author_id);
            return id;
        }
  });
  return id;
}


