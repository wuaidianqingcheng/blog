var express = require('express');
var router = express.Router();

//var mongodb=require('mongodb').MongoClient;
//var db_str="mongodb://localhost:27017/test"

 var mongodb=require('mongodb').MongoClient;
  //声明数据库地址
  var db_str="mongodb://localhost:27017/MyBlog"


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('index',{});
});


router.post('/register',(req,res)=>{
	mongodb.connect(db_str,(err,database)=>{
		database.collection('user',(err,coll)=>{
			coll.find({name:req.body.name}).toArray((err,data)=>{
				if(data.length>0){
					res.send('1')
				}else{
					coll.save(req.body,()=>{
						res.send('2')						
					})
				}
				database.close()
			})
		})
	})
});

//登录
router.post('/login',(req,res)=>{
	mongodb.connect(db_str,(err,database)=>{
		database.collection('user',(err,coll)=>{
			coll.find({name:req.body.name}).toArray((err,data)=>{
				if(data.length>0){
					res.send('1')
				}else{
					coll.save(req.body,()=>{
						req.session.name=data[0].name
						res.send('2')
					})
				}
				database.close()
			})
		})
	})
})


module.exports = router;
