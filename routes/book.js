var express = require('express');
var router = express.Router();
var mysql = require('./tool/mysql.js');
var url = require('url');
/* GET home page. */
router.get('/', function(req, res, next) {
  mysql.connect((db) => {
 	mysql.find({
 		db,
 		collectionName:"book",
 		whereObj:{},
 		showObj:{
 			_id:0
 		},
 		success:(result) => {
 			console.log(result);
 			res.render('book',{
 				result
 			})
 		}
 	})
 })
});
//响应修改博客跳转
router.get('/updateBook',function(req,res,next){
	console.log('1111111111111111111111111111111')
	var id = url.parse(req.url,true).query.id;
	
	mysql.connect((db) => {
		mysql.find({
			db,
			collectionName:'book',
			whereObj:{
				id:id
			},
			showObj:{
				_id:0
			},
			success:(result) => {
				res.render('updateBook',{
					result
				})
			}
		})
	})
})
//提交修改博客上传数据库
router.post('/updateSub',function(req,res,next){
		var {id,title,content,author} = req.body;
		console.log(req.body)
		var whereObj = {
			id
		}
		var updateObj = {
			$set:{
				id,
				title,
				content,
				author
			}
		}
		mysql.connect((db) => {
			mysql.updateOne(db,'book',whereObj,updateObj,(result) => {
				res.redirect('/')
			})
		})
});
//根据id查询数据库，然后删除指定数据
router.get('/deleteBook',function(req,res,next){
	var id = url.parse(req.url,true).query.id;
	var deleteObj = {
		id:id
	}
	mysql.connect((db) => {
		mysql.deleteOne(db,'book',deleteObj,(result) => {
			res.redirect('/book')
		})
	})
})
module.exports = router;
