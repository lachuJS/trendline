var io=io();
var count=-1;
document.onload=query();
function query(){
	if (count!=-1) {
		document.getElementById('progress').removeAttribute('style');
		document.getElementById('more').innerHTML='';
	};
	count++;
	io.emit('getlines',count);
}
io.on('gotlines',function (rows){
	 //start animation

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
	 		card.className='card-panel';

	 		var card_content=document.createElement('div');
	 		card_content.className='black-text';

			var title=document.createElement('div');
			var bold=document.createElement('strong');
			bold.appendChild(document.createTextNode(rows[i]['title']));
			title.appendChild(bold);
			title.className='black-text';
			title.setAttribute('style','font-size:25px');

		 	var desc=document.createElement('p');
		 	var desc_text=document.createTextNode(rows[i]['description']);
		 	desc.appendChild(desc_text);
		 	desc.setAttribute('style','text-align:justify');

			var url=document.createElement('strong');	
			var link=document.createElement('a');
			link.className='teal-text';
			link.setAttribute('href',rows[i]['url']);
			link.setAttribute('target','_blank');
			
			url.appendChild(document.createTextNode(rows[i]['source']));
			link.appendChild(url);

	 		card_content.appendChild(title);
	 		card_content.appendChild(desc);
	 		card_content.appendChild(link);
	 		card.appendChild(card_content);
	 		document.getElementById('234').appendChild(card);
	 	};
	 	//replace animation with link
	 	var progress=document.getElementById('progress');
	 	progress.setAttribute('style','display:none');
	 	document.getElementById('more').innerHTML="<strong>get more lines.</strong>";
	 }		 	
});