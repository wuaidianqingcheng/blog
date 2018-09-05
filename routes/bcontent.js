var express = require('express');
var router = express.Router();
var url = require('url');
var mysql = require('./tool/mysql.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  /*res.render('content', { title: 'Express' });*/
 //获取当前页面url   通过url模块获取id 查询数据库
 var id = url.parse(req.url,true).query.id;
 
 mysql.connect((db) => {
 	mysql.find({
 		db,
 		collectionName:"book",
 		whereObj:{
 			id:id
 		},
 		showObj:{
 			_id:0
 		},
 		success:(result) => {
 			console.log(result);
 			res.render('bcontent',{
 				result
 				
 			})
 		}
 	})
 })
});
//响应添加留言
router.post('/addMessage',function(req,res,next){
	var insertObj = req.body;
	console.log(req.body)
	console.log(req.body)
	mysql.connect((db) => {
		mysql.insert(db,'message',insertObj,(result) => {
			res.redirect('/')
		})
	})
})
module.exports = router;
