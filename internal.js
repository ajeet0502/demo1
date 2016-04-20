var express = require('express');
var mysql      = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'pappi_node',
  port	   : '2082',
  password : 'node @123',
  database : 'pappi_node'
});

connection.connect();

router.get('/', function (req, res) {
	 var sess = req.session.eid;
	 if(!sess){
		res.redirect('/login');
	 }
	 else{ 
	connection.query('select * from tbl_employee',function (err, rows, fields) {
	var em1=req.session.ename;	
	obj = {print: rows,em:em1};	
	res.render('home', obj);
	//console.log(obj);
	 });}
});

router.get('/login', function (req, res) {
	res.render('login',{ title: '' });
	//console.log(rows);
});

router.post('/login',function (req, res){
	var email = req.body.newItem;
	var pass = req.body.newItem1;
	connection.query('select * from tbl_user where fld_email= ? and fld_password= ?', [email, pass],function (err, rows, fields) {
	if (err) throw err;
	if(rows.length===0){ 
	req.session.eid= null;
	console.log(req.session.eid);
	res.render('login',{ title: 'Username or Password is wrong.' });
	}
	else{
		var eid=rows[0].fld_id;
		var ename=rows[0].fld_email;
	req.session.eid= eid;
	req.session.ename= ename;
	console.log(req.session.eid);
	res.redirect('/');
	}
	});
});

router.get('/home/:id', function(req, res1) {
	//console.log('user ' + req.params.id);
	var a= req.params.id;
	var res = a.split(":");
	var b=res[1];
	//console.log(b);
	connection.query('select * from tbl_employee where fld_eid= ?', b,function (err, rows, fields) {
		if (err) throw err;
	obj1 = {print1: rows};
	//console.log(rows);
	res1.render('employee', obj1);
	});
});

router.get('/contact', function (req, res) {
	var sess = req.session.eid;
	 if(!sess){
		res.redirect('/login');
	 }
	 else{
	res.render('contact');
	 }
});

router.get('/about', function (req, res) {
	var sess = req.session.eid;
	 if(!sess){
		res.redirect('/login');
	 }
	 else{
	res.render('about');
	 }
}); 

module.exports = router;

