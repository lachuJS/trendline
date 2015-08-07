#!/usr/bin/env node
var mysql=require('mysql');
var db=new Object,con;
String.prototype.supplant = function (o) {
    return this.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};


db.connect=function (){
	con=mysql.createConnection({
		host:'localhost',
		user:'root',
		password:'asspearinse',
		database:'headline'
	});
	con.connect();
}
db.save=function (trend,title,source,url,date,index){
	//console.log(q);
	con.query('select * from line where title="{title}"'.supplant({title:title}),function (err,rows,columns){
		if (err) {
			console.log('err select query');
		}
		else{
			console.log(rows);
			if (rows.length==0) {
				var send='insert into line values("null","{trend}","{title}","{source}","{url}","{date}","{time}")'
				.supplant({trend:trend,title:title,source:source,url:url,date:date,time:date.substr(11,18)});
				con.query(send,function (err,row,fields){
					if (err) {
						console.log(err);
					};
				});
			};
		}
	});
}
db.close=function (){
	con.end();
}

module.exports=db;