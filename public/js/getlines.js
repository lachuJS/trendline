var io=io();
var count=-1;
document.onload=query();
function query(){
	count++;
	io.emit('getlines',count);
}
io.on('gotlines',function (rows){
	 if (rows.length==0) {
	 	if (count==0) {
	 		count++;
	 		io.emit('getlines',count);
	 	}
	 	else{
		 	var link=document.getElementById('more');
		 	link.innerHTML=''
	 	}
	 }
	 else {
	 	for (var i = 0; i < rows.length; i++) {
	 		var card=document.createElement('div')
	 		card.className='card';
	 		
	 		var card_content=document.createElement('div');
	 		card_content.className='card-content black-text';

			var title=document.createElement('div');
			var bold=document.createElement('strong');
			bold.appendChild(document.createTextNode(rows[i]['title']));
			title.appendChild(bold);
			title.className='card-title black-text';

		 	var desc=document.createElement('p');
		 	var desc_text=document.createTextNode(rows[i]['description']);
		 	desc.appendChild(desc_text);

			var link=document.createElement('a');
			link.setAttribute('href',rows[i]['url']);
			link.setAttribute('target','_blank');
			link.className='teal-text';
			//link.setAttribute('style','text-decoration:underline');
			link.appendChild(document.createTextNode(rows[i]['source']));
			link_div=document.createElement('div');
			link_div.className='card-action';
			link_div.appendChild(link);

	 		card_content.appendChild(title);
	 		card_content.appendChild(desc);
	 		card.appendChild(card_content);
	 		card.appendChild(link_div);
	 		document.getElementById('234').appendChild(card);
	 		document.getElementById('more').removeAttribute('style');

	 	};
	 }		 	
});