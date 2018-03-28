/* VARIABLES, gets and sets */

var options = [];
var id = 0;

function addID(){
	id++;
}
function getID(){
	return id;
}

function getOptions(){
	return options;
}
function addOption(optio){
	options.push(optio);
}
function deleteOption(optio){
	var newopt = options.filter(tag => tag.id != optio );
	options = newopt;
	loadOptions(null);
}
function countOptions(){
	return options.length;
}

/* EVENT LISTENERS */


/* Add option by pressing enter */
document.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      // code for enter
	  addOptionTag();
    }
});


/* CREATE HTML */

/* Load all options from the array to the HTML*/
function loadOptions(chosen){
	document.getElementById("target").innerHTML = "";
	for(var i = 0; i< options.length; i++){
		createTag(options[i], chosen);
	}
	
}

/* Adds a new option tag to the #target cell */
function addOptionTag(){
	
	if(document.getElementById("option1").value != ""){
		var value = document.getElementById("option1").value;
		var options = getOptions();
		var data = {"name" : value , "id" : getID()};
		addID();
		createTag(data, null);
		
		addOption(data);
		document.getElementById("option1").value = ""
		document.getElementById("option1").focus();
	}
}

/* Creates the option tag */
function createTag(value, chosen){
	var tag = document.createElement('div');
		var a = document.createElement('a'); // <a></a>
		// color change of the chosen option
		if(chosen == value.id){
			tag.setAttribute('class', 'chosen');
		}
		else{
			tag.setAttribute('class', 'tags');
		}
		a.setAttribute('class', 'aa'); // <a class="aa"></a>
		a.setAttribute('onclick', 'deleteOption(' + value.id + ')');
		a.setAttribute('id', value.id );
		var tagtext = document.createTextNode(' ' + value.name);
		var ax = document.createTextNode('x');
		a.appendChild(ax); // <a class="aa">x</a>
		tag.appendChild(a);
		tag.appendChild(tagtext);
		document.getElementById("target").appendChild(tag);
		

}

/* HTTP REQUESTS */

/* Sends data from the array options as a post request to the node part */
function sendOptions(){

	var data = getOptions();
	var rq = new XMLHttpRequest();
	rq.open('POST', '/chooseOne');
	rq.setRequestHeader("Content-type", "application/json");
	rq.send(JSON.stringify(data));
	
	
		rq.onreadystatechange = function() {
    if (rq.readyState == XMLHttpRequest.DONE) {
						
			var chosen = JSON.parse(rq.responseText);
			loadOptions(chosen.id);
			
		}
		}

}