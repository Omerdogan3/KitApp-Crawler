var util = require('util');
let result;
module.exports  = async function CheckBook(ISBN){
    await _connection.query(util.format("SELECT * FROM books where ISBN = '%s'", ISBN), function (err, res, fields) {
        if (err) throw err;
        if(JSON.stringify(res) === JSON.stringify([])){ //eger ki ekli degilse
            // console.log(JSON.stringify(res));
            result = false;
        }else{
            //console.log(JSON.stringify(res));
            result = true;
        }  
  });
  return result;
}