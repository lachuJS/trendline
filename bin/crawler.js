#!/usr/bin/env node
setInterval(crawl,600000);
function crawl(){
	console.log('crawling...');	
	var twit=require('twit');
	var db=require('./model.js');
	var bing=require('node-bing-api')({ accKey:'D7Zz8z2ySBJvp8ChD5X2k2gGkR4IV0WRohsG/os0qpc'});
	var forEach=require('async-foreach').forEach;

	twit=new twit({
		consumer_key:'IPp9qawJvqo2iFJlLW6BAArrP',
		consumer_secret:'SakaNTbJuP72qjEwslqjmUGO7rrw6sTmKgIyQ5Wdio2em8k9fH',
		access_token:'1313889283-xYX2nZzEFZgGiBTq6qf0EZnGbzcewooGi9ApDm5',
		access_token_secret:'0wqfncaau8d6tmNoXddsqHj9oT0msFGSt3hqb2xfKLGdo'
	});
	twit.get('trends/place',{ id:'23424848'/*,exclude:'hashtags'*/ },function(error, data, response) {
		console.log(data);
		if (error) {
			console.error("twit get failed!");
		}
		else{
			headline(data[0]['trends']);
		}
	});
	function headline(trend){
		db.connect();
		forEach(trend,function (item,index,array){
			var topic=(function (){
				if (item['name'].substr(0,1)=='#') {
					return item['name'].substr(1);
				}
				else{
					return item['name'];
				}
			})();
			console.log(topic);
			bing.news(topic, {
 				top: 1,  
   				skip: 0, 
			},function(error, res, data){
  				if (error) {
  					headline(item);
  				}
  				else{
  					if (typeof data['d']['results'][0]==='undefined') {
  						console.log('no news!');	
  					}
  					else{
  						console.log(data['d']['results'][0]);
  						db.save(topic,data['d']['results'][0]['Title'],data['d']['results'][0]['Source'],
  							data['d']['results'][0]['Url'],data['d']['results'][0]['Description'],data['d']['results'][0]['Date']);
  					}
  				}
			});	
		});
	}
}
