window.onload(query());
document.getElementById('more').onclick;
function query(){
	var xmlhttp;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open('GET','/data',true);
	xmlhttp.send();
	xmlhttp.onreadystatechange=function (){
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			var data=JSON.parse(xmlhttp.responseText);
			for (var i = 0; i < data.length; i++) {
				document.getElementById('lines').innerHTML+=data[i]['title']+'<br>';
			};
		}
	}
}