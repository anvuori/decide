/* REQUIRES */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//listen port 8080
var port = process.env.PORT || 8080;
app.listen(port);

/*serve static files from the file 'public'*/
app.use(express.static(__dirname + '/public'));


/* Chooses one from the options given with a post request {[name, id], [name2, id2], ...} */
app.post('/chooseOne', function (req, res) {
	console.log(req.body);
	var options = req.body;
	var rand = options[Math.floor(Math.random() * options.length)];
    res.send(JSON.stringify(rand));  
});

