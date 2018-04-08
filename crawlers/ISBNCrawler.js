var util = require('util');
var scapeDr = require('../drCrawler');
// const CheckBook = require('../database/CheckBook');
require('../database/CheckAuthor');

let step;
let firstLaunch = true;

let bookSqlObj= {
    author_id: null,
    publisher_id: null,
    category_id: null,
    image_id: null
};

module.exports = async function processCrawler(){
  for(let category=2; category<=24; category=category+2){
      let nextPage = false;
      for(step=1; step<=85; step=step+2){
          if(step>83){
              nextPage = true;
              await scapeDr(firstLaunch,category,1,nextPage);
          }else{
            let bookJson = await scapeDr(firstLaunch,category, step,nextPage);

            // console.log(bookJson);


            if(bookJson != null){              
                
                // var bookSQL = util.format('INSERT INTO `books`(`ISBN`, `title`, `introduction`, `publisher_id`, `category_id`, `image_id`, `author_id`, `stars`) VALUES ("%d","%s","%s","%s","%s","%s","%s","%s")'
                // , bookJson.ISBN.slice(6), bookJson.title, bookJson.summary,2,4,null,null,bookJson.stars.charAt(0));

                // console.log(bookSQL);

                await _connection.query(util.format("SELECT ISBN FROM books where ISBN = '%s'", bookJson.ISBN.slice(6)), (err, res, fields) => {
                    // if (err) throw err;
                    if(JSON.stringify(res) === JSON.stringify([])){ //eger ki ekli degilse
                        // console.log(bookJson.imageLink);
                        insertAuthor(bookJson);
                    }
                });
            }
               

                //gelen linkin son 13 karakteri product id
                // var setProductId = await util.format('insert into productid(ISBN, DrID, KitapYurduID, PandoraID) VALUES ("%d","%d","%d","%d")', bookJson.ISBN.slice(6),  bookJson.productId.slice(bookJson.productId.length-13), 11, 10);
                // await _connection.query(setProductId, (err,result)=>{

                // });
            }
            firstLaunch = false;
          }   
      }
      console.log('Done!');
  }




  insertAuthor = (bookJson) =>{
    _connection.query(util.format("SELECT author_id FROM author where author_name = '%s'", bookJson.author), function (err, result, fields) {
        if(JSON.stringify(result) === JSON.stringify([])){ //select bos object donerse
            _connection.query(util.format("INSERT INTO `author` (`author_id`, `author_name`) VALUES (NULL, '%s')",bookJson.author), function (err, res, fields) {
                _connection.query(util.format("SELECT author_id FROM author where author_name = '%s'", bookJson.author), function (err, r, fields){
                    bookSqlObj.author_id = JSON.parse(r[0].author_id);
                    insertPublisher(bookJson);
                });
            });
        }else{
            bookSqlObj.author_id = JSON.parse(result[0].author_id);
            insertPublisher(bookJson);
        }
    });
  };

  insertPublisher = (bookJson) =>{
    _connection.query(util.format("SELECT publisher_id FROM publisher where publisher_name = '%s'", bookJson.publisher), function (err, result, fields) {
        if(JSON.stringify(result) === JSON.stringify([])){ //select bos object donerse
            _connection.query(util.format("INSERT INTO `publisher` (`publisher_id`, `publisher_name`) VALUES (NULL, '%s')",bookJson.publisher), function (err, res, fields) {
                _connection.query(util.format("SELECT publisher_id FROM publisher where publisher_name = '%s'", bookJson.publisher), function (err, r, fields){
                    bookSqlObj.publisher_id = JSON.parse(r[0].publisher_id);
                    insertCategory(bookJson);
                });
            });
        }else{
            bookSqlObj.publisher_id = JSON.parse(result[0].publisher_id);
            insertCategory(bookJson);
        }
    });
  };

  insertCategory = (bookJson) =>{
    _connection.query(util.format("SELECT category_id FROM category where category_name = '%s'", bookJson.category), function (err, result, fields) {
        if(JSON.stringify(result) === JSON.stringify([])){ //select bos object donerse
            _connection.query(util.format("INSERT INTO `category` (`category_id`, `category_name`) VALUES (NULL, '%s')",bookJson.category), function (err, res, fields) {
                _connection.query(util.format("SELECT category_id FROM category where category_name = '%s'", bookJson.category), function (err, r, fields){
                    bookSqlObj.category_id = JSON.parse(r[0].category_id);
                    insertImage(bookJson);
                });
            });
        }else{
            bookSqlObj.category_id = JSON.parse(result[0].category_id);
            insertImage(bookJson);
        }
    });
  };


  insertImage = (bookJson) =>{
    _connection.query(util.format("SELECT image_id FROM image where image_link = '%s'", bookJson.imageLink), function (err, result, fields) {
        if(JSON.stringify(result) === JSON.stringify([])){ //select bos object donerse
            _connection.query(util.format("INSERT INTO `image` (`image_id`, `image_link`) VALUES (NULL, '%s')",bookJson.imageLink), function (err, res, fields) {
                _connection.query(util.format("SELECT image_id FROM `image` where image_link LIKE '%s'", bookJson.imageLink), function (err, r, fields){
                    // bookSqlObj.image_id = JSON.parse(r[0].image_id);
                    console.log(JSON.stringify(r));
                });
            });
        }else{
            bookSqlObj.image_id = JSON.parse(result[0].image_id);
            console.log(bookSqlObj);
        }
    });
  };










  

  insertBookAuthor = (bookJson) => {
    _connection.query(util.format("INSERT INTO `book_author` (`ISBN`, `author_id`) VALUES (NULL, '%s')",bookJson.ISBN, bookSqlObj.author_id), function (err, res, fields) {

    });
  };

