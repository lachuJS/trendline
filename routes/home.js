var express = require('express');
var router = express.Router();
var fs=require('fs');
var db=require('../bin/model');
/* GET home page. */
router.get('/', function(req, res, next) {
  	fs.readFile('views/home.html',function(err,data){
  		res.send(data.toString());
  	})
});
router.get('/data',function(req,res,next){
	db.connect();
	var send=function (rows){
		res.send(rows);
	}
	db.retreive(send);
	db.close();
});

module.exports = router;
