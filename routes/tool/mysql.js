var MongoClient = require('mongodb').MongoClient;
var CONNECT_STR = "mongodb://localhost:27017/MyBlog";
//定义模块
var mysql = {
	connect(callback){
		MongoClient.connect(CONNECT_STR, (err, db) => {
			if(err) throw err;
			console.log('your db is running')
			//后续操作   增删改查
			callback(db)
		})
	},
	insert(db, collectionName, insertData, callback ){
		db.collection(collectionName).insert(insertData, (err, result) => {
			if(err) throw err;
			callback(result)
		})
	},
	deleteOne(db, collectionName, deleteObj, callback){
		db.collection(collectionName).deleteOne(deleteObj, (err, result) => {
			if(err) throw err;
			callback(result)
		})
	},
	deleteMany(db, collectionName, deleteObj, callback){
		db.collection(collectionName).deleteMany(deleteObj, (err, result) => {
			if(err) throw err;
			callback(result)
		})
	},
	updateOne(db, collectionName,whereObj,updateObj,callback){
		db.collection(collectionName).updateOne(whereObj, updateObj, (err, result) => {
			if(err) throw err;
			callback(result)
		})
	},
	updateMany(db, collectionName,whereObj,updateObj,callback){
		db.collection(collectionName).updateMany(whereObj, updateObj, (err, result) => {
			if(err) throw err;
			callback(result)
		})
	},
	find(config){
	//	config["db"]   ==   config.db
		config.db.collection(config.collectionName).find(config.whereObj, config.showObj).toArray((err, result) => {
			if(err) throw err;
			config.success(result)
		})
	},
	paging(config){
		var { db, collectionName, whereObj, showObj, limitNum, pageCode, success } = config;
        db.collection(collectionName).find(whereObj,showObj).limit(limitNum).skip(limitNum * pageCode).toArray( (err, result) => {
            if(err) throw err;
            success(result)
        } )
	},
	sort(config){
        var { db, collectionName, whereObj, showObj, sortObj, success } = config;
        db.collection(collectionName).find(whereObj,showObj).sort(sortObj).toArray( (err, result) => {
            if(err) throw err;
            success(result)
        } )
    }
	
}

//暴露模块
module.exports = mysql
