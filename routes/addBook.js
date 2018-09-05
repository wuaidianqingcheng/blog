var express = require('express');
var router = express.Router();
var mysql = require('./tool/mysql.js');
var url = require('url');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('addBook')
});
//点击提交上传数据库，重定向至推荐书籍界面
router.post('/insert',function(req,res,next){
	var insertObj = req.body;
	console.log(insertObj)
	mysql.connect((db) => {
		mysql.insert(db,'book',insertObj,(result) => {
			res.redirect('/book')
		})
	})
})
module.exports = router;
