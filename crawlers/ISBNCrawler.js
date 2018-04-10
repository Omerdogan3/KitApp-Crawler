var util = require('util');
var scapeDr = require('../drCrawler');
const insertAuthor = require('../database/insertAuthor');

let step;
let firstLaunch = true;

let bookSqlObj= {
    author_id: null,
    publisher_id: null,
    category_id: null,
    image_id: null
};

module.exports = async function processCrawler(){
  for(let category=4; category<=24; category=category+2){
      let nextPage = false;
      for(step=1; step<=85; step=step+2){
          if(step===85){
              nextPage = true;
              await scapeDr(firstLaunch,category,1,nextPage);
          }else{
            let bookJson = await scapeDr(firstLaunch,category, step,nextPage);
                if(bookJson != null){              
                    await _connection.query(util.format("SELECT ISBN FROM books where ISBN = '%s'", bookJson.ISBN.slice(6)), (err, res, fields) => {
                        if(JSON.stringify(res) === JSON.stringify([])){ 
                            insertAuthor(bookJson,bookSqlObj);
                        }
                    });
                }
            }
            firstLaunch = false;
          }   
      }
      console.log('Done!');
  }




  

  

  


 



 





  

