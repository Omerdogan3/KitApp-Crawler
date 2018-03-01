var scapeDr = require('./drCrawler');
var _connection = require('./database/DBconnection');
var util = require('util');

_connection.connect(
    (err) => {
        if (err) throw err;
        console.log("Connected!");
    }
);

let step;
let firstLaunch = true;
async function processCrawler(){
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

            if(bookJson != null){
                var sql = await util.format('insert into books (ISBN, title, author, stars, publisher, summary) set ("%d","%s","%s","%s","%s","%s")'
                , bookJson.ISBN.slice(6), bookJson.title, bookJson.author, bookJson.stars.charAt(0), bookJson.publisher, bookJson.summary);

                await _connection.query(sql , (err,result)=>{
                    // console.log('Inserted');
                    // console.log(result.message);
                });    
            }
            firstLaunch = false;
          }   
      }
  }
  console.log('Done!');
}

processCrawler();



