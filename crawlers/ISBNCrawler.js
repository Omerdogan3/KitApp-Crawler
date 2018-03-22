var util = require('util');
var scapeDr = require('../drCrawler');

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

            // bookJson.ISBN = bookJson.ISBN.slice(5);
            // var sql = `INSERT INTO books (ISBN, title, author, stars, publisher, summary) VALUES (${parseInt(bookJson.ISBN)}
            //     ,${String(bookJson.title)},
            //     ,${String(bookJson.author)}
            //     ,${String(bookJson.stars)}
            //     ,${String(bookJson.publisher)}
            //     ,'test')`;
            console.log(bookJson);


            if(bookJson != null){
                var sql = await util.format('insert into books(ISBN, title, author, stars, publisher, summary) VALUES ("%d","%s","%s","%s","%s","%s")'
                , bookJson.ISBN.slice(6), bookJson.title, bookJson.author, bookJson.stars.charAt(0), bookJson.publisher, bookJson.summary);

                await _connection.query(sql , (err,result)=>{
                    // if (err) throw err;
                    // console.log('Inserted');
                    // console.log(result.message);
                });  
                
                //gelen linkin son 13 karakteri product id
                var setProductId = await util.format('insert into productid(ISBN, DrID, KitapYurduID, PandoraID) VALUES ("%d","%d","%d","%d")', bookJson.ISBN.slice(6),  bookJson.productId.slice(bookJson.productId.length-13), 11, 10);
                await _connection.query(setProductId, (err,result)=>{

                });
            }
            firstLaunch = false;
          }   
      }
  }
  console.log('Done!');
}