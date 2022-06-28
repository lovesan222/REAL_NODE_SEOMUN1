var express = require('express');
var router = express.Router();
const {check, validationResult} = require('express-validator');

const db = require('./../db');


// router.use(expressLayouts);

router.get('/', (req,res) =>{ 
  res.render('main')
 
});
router.get('/notice', (req,res) =>{ 
  res.render("marketNotice"); 
  
});

router.get('/intro', (req,res) =>{ 
  res.render("market"); 
  
});
router.get('/join', (req,res) =>{ 
  res.render("join");
});
router.get('/login', (req,res) =>{ 
  res.render("login");
});
router.get('/join_detail', (req,res) =>{ 
  res.render("join_detaill");
});






// get 뒤에 비워둬야함 뭘 넣으면 안 뜸 
router.get('/', function(req, res, next) {

  db.getAllMemos((rows) =>{
    res.render('marekt_notice', { rows: rows });
  });
});



// 작성하기_상세...? 

router.get('/market_notice_write',  function(req, res, next){
  res.render('market_notice_write');
});


// 작성해서 저장하기 

router.post('/store',
  check('content').isLength({ min: 1, max: 3000 }),
  function (req, res, next) {
  let errs = validationResult(req);
  console.log(errs);
  if(errs['errors'].length > 0){ 
    res.render('market_notice',{errs:errs['errors']});
  }else{
    let param = JSON.parse(JSON.stringify(req.body));
    let title = param['title'];
    let content = param['content'];
    db.insertMemo(title,content,() =>{
      res.redirect('/');
    });
  }
});



// 수정

router.get('/market_notice_update',(req,res) => {
  let id = req.query.id;
  
  db.getMemoById(id, (row)=>{
      if(typeof id === 'undefined' || row.length <= 0){
          res.status(404).json({error:'undefind memo'});
      } else {
          res.render('market_notice_update',{row:row[0]});
      }
  });
});


router.post('/market_notice_update', [check('title').isLength({ min: 1 , max: 3000})],
  (req,res) => {
      let errs = validationResult(req);

      let param = JSON.parse(JSON.stringify(req.body));
      let id = param['id'];
      let title = param['title'];
      let content = param['content'];

      if (errs['errors'].length>0){
          db.updateMemoById(id, (row)=>{ 
          res.render('market_notice_update',{row:row[0], errs:errs['errors']});
      });
      }else{
          db.updateMemoById(id,title,content, () =>{
          res.redirect('/');
          });
      }
  });




///

router.get('/notice_read', function(req, res) {
  let id = req.query.id;

  db.getpageByid(id, (row)=>{
      if(typeof id === 'undefined' || row.length <= 0){
          res.status(404).json({error:'undefind memo'});
      } else {
          res.render('notice_read',{row:row[0]});
      }
  });
});




router.get('/deletememo', (req, res) =>{
  let id = req.query.id;
  db.deleteMemoById(id, () =>{
    res.redirect('/');
  });
});

module.exports = router;