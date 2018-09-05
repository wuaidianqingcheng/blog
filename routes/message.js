var express = require('express');
var router = express.Router();
var mysql = require('./tool/mysql.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  /*res.render('message', { title: 'Express' });*/
	mysql.connect((db) => {
		mysql.find({
			db,
			collectionName:"message",
			whereObj:{},
			showObj:{
				_id:0
			},
			success:(result) => {
				res.render('message',{
					result
				})
			}
		})
	})
});

module.exports = router;
