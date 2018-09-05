var express = require('express');
var router = express.Router();
var mysql = require('./tool/mysql.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('addBlog')
});
router.post('/insert',function(req,res,next){
	var insertObj = req.body;
	mysql.connect((db) => {
		mysql.insert(db,'blog',insertObj,(result) => {
			res.redirect('/')
		})
	})
})

module.exports = router;
