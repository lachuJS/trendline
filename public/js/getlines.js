var io=io();
var count=-1;
document.onload=query();
function query(){
	count++;
	io.emit('getlines',count);
}
io.on('gotlines',function (rows){
	 if (rows.length==0) {
	 	var link=document.getElementById('more');
	 	link.removeAttribute('href');
	 	link.innerHTML='...'
	 }
	 else {
	 	for (var i = 0; i < rows.length; i++) {
	 		var line=document.createElement('div');
	 		line.className='line';

		 	var title=document.createElement('span');
			title.className='title';
	 		title.appendChild(document.createTextNode(rows[i]['title']));

		 	var desc=document.createElement('span');
			desc.className='desc';
	 		desc.appendChild(document.createTextNode(rows[i]['description']));

	 		line.appendChild(title);
	 		line.appendChild(desc);
	 		document.getElementById('line-container').appendChild(line);

	 	};
	 }		 	
});