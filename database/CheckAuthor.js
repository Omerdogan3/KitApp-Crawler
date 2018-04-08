var util = require('util');

let author_id = null;
//author'u kontrol et eger database'de daha onceden ekliyse id'sini al, degilse database'e ekle.
module.exports  = CheckAuthor = async (authorName) =>{
    _connection.query(util.format("SELECT author_id FROM author where author_name = '%s'", authorName), function (err, result, fields) {
    // if (err) throw err;
    if(JSON.stringify(result) === JSON.stringify([])){
        _connection.query(util.format("INSERT INTO `author` (`author_id`, `author_name`) VALUES (NULL, '%s')",authorName), function (err, res, fields) {
            // if (err) throw err;
        });
    }else{
        author_id = JSON.parse(result[0].author_id);
    }
  });
  return author_id;
}


