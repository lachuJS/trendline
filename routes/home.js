var express = require('express');
var router = express.Router();
var db = require("../bin/model")
/* GET home page. */
router.get('/', function(req, res, next) {
  	db.connect();
  	var render=function (rows){
  		res.render('index.jade',{title:'Trendline',row:rows });
  	}
  	db.retreive(render);
});

module.exports = router;
