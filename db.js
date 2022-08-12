const mysql = require('mysql'); 
const connection = mysql.createConnection({ 
    host     : 'us-cdbr-east-05.cleardb.net',
    user     : 'bebe6c4fb363fc',
    password : '46bbb4b2',
    port : '3306',
    database : 'heroku_0934b7eb35ef8be',
    dateStrings : 'date' 
  });

  function getAllMemos(callback){
    connection.query(`SELECT * FROM seomunboard ORDER BY ID DESC`, (err, rows, fields) => {
        if(err) throw err;
        callback(rows); 
    });
}




    function insertMemo(title,content, callback){
      connection.query(`INSERT INTO seomunboard (title,updated,content) VALUES ('${title}',NOW(),'${content}')`, (err, result) =>{
          if (err) throw err;
          callback();
      });
  }


function getMemoById(id, callback){
    connection.query(`SELECT * FROM seomunboard WHERE ID ='${id}'`, (err,row, fields) =>{
        if(err) throw err;
        callback(row);
    });
}


  function updateMemoById(id,title,content,callback){
    connection.query(`UPDATE seomunboard SET title ='${title}',content='${content}', updated=NOW() WHERE id='${id}'`, (err, result) => {
        if(err) throw err;
        callback();
    });x
}


  function deleteMemoById(id, callback){
    connection.query(`DELETE FROM seomunboard WHERE ID='${id}'`, (err, result) =>{
        if(err) throw err;
        callback();
    });
}

function getpageByid(id, callback){
  connection.query(`SELECT * FROM seomunboard WHERE id = '${id}'`, (err, row, fields) =>{
      if(err) throw err;
      callback(row);
  })
}

module.exports = {
  getAllMemos,
  insertMemo,
  getMemoById,
  updateMemoById,
  deleteMemoById,
  getpageByid
}

