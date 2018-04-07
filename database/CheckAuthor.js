var util = require('util');

author = {
    author_name: "Ilber Ortayli",
    author_id: null
}

//author'u kontrol et eger database'de daha onceden ekliyse id'sini al, degilse database'e ekle.
module.exports  = async function CheckAuthor(){
    _connection.query(util.format("SELECT author_id FROM author where author_name = '%s'", author.author_name), function (err, result, fields) {
    if (err) throw err;
    if(JSON.stringify(result) === JSON.stringify([])){
        _connection.query(util.format("INSERT INTO `author` (`author_id`, `author_name`) VALUES (NULL, '%s')",author.author_name), function (err, result, fields) {
            if (err) throw err;
            author.author_id = JSON.parse(result[0].author_id);
            console.log(author.author_id);
        });
    }else{
        author.author_id = JSON.parse(result[0].author_id);
    }
    console.log(author);
  });
}
