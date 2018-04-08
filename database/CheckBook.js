var util = require('util');
let result;
module.exports = CheckBook = async (ISBN) => {
    await _connection.query(util.format("SELECT * FROM books where ISBN = '%s'", ISBN), function (err, res, fields) {
        if (err) throw err;
        if(JSON.stringify(res) === JSON.stringify([])){ //eger ki ekli degilse
            result = false;
        }else{
            result = true;
        }  
  });
  return result;
}