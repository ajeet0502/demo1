var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();



// configure app
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

//use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(session({secret: 'max', saveUninitialized: false, resave:false}));

//define routes
app.use(require('./internal'));

//start the server
app.listen(8085,function(){
	console.log('ready on port 8085');
});
	