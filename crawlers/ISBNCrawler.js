var util = require('util');
var scapeDr = require('../drCrawler');
// const CheckBook = require('../database/CheckBook');
require('../database/CheckAuthor');

let step;
let firstLaunch = true;


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
                let author_id = await CheckAuthor(bookJson.author);

                var bookSQL = util.format('INSERT INTO `books`(`ISBN`, `title`, `introduction`, `publisher_id`, `category_id`, `image_id`, `author_id`, `stars`) VALUES ("%d","%s","%s","%s","%s","%s","%s","%s")'
                , bookJson.ISBN.slice(6), bookJson.title, bookJson.summary,2,4,null,author_id,bookJson.stars.charAt(0));

                console.log(author_id);

                await _connection.query(util.format("SELECT ISBN FROM books where ISBN = '%s'", bookJson.ISBN.slice(6)), (err, res, fields) => {
                    // if (err) throw err;
                    if(JSON.stringify(res) === JSON.stringify([])){ //eger ki ekli degilse
                        _connection.query(bookSQL , (err,result)=>{

                        });
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