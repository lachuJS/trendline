#!/usr/bin/env node
var mysql=require('mysql');
var db=new Object();
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
		host:'sql6.freemysqlhosting.net',
		user:'sql687533',
		password:'zM4*sZ6*',
		database:'sql687533'
	});
	con.connect();
}
db.save=function (trend,title,source,url,desc,date){
	//console.log(q);
	con.query('select * from line where title="{title}"'.supplant({title:title}),function (err,rows,columns){
		if (err) {
			console.log('err select query');
		}
		else{
			console.log(rows);
			if (rows.length==0) {
				var send='insert into line values("null","{trend}","{title}","{source}","{url}","{desc}","{date}","{time}")'
				.supplant({trend:trend,title:title,source:source,url:url,desc:desc,date:date,time:date.substr(11,18)});
				con.query(send,function (err,row,fields){
					if (err) {
						console.log(err);
					};
				});
			};
		}
	});
}
db.retreive=function (count,callback){
	console.log(count);
	from=count*10;
	con.query('select * from line order by date desc, time desc limit {from}, 10'.supplant({from:from}),function (err,rows,coloumns){
		//console.log(rows);
		callback(rows);
	})
}
db.close=function (){
	con.end();
}

module.exports=db;