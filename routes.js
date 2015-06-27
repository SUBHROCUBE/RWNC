var path = require('path'),
	pass = require('./passport-util')
	passport = require('passport'),
	session = require('./session');

var ExpressBrute = require('express-brute');

var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production 
var bruteforce = new ExpressBrute(store,{minWait:1000*30});

module.exports = function(app) {

	app.post('/loginCheck',bruteforce.prevent,passport.authenticate('local', {failureFlash: true       }),function(req, res) {
				req.brute.reset(function () {
						res.send({'user':req.user}); // logged in, send them to the home page 
					});
				}
	);
	 
	app.get('/',function(req,res){
	 res.redirect('/rwnc');
	});
	//app.get('/scribble',pass.ensureAuthenticatedAJAX, session.session)
	app.get('/rwnc',function(req,res){
	  var isAuthenticated =  req.isAuthenticated()
		res.cookie('isAuthenticated', isAuthenticated);
		//console.log('/scribble',req.isAuthenticated());
		res.sendfile('./index.html');
	}); 

	app.get('/loggedin', function(req, res) {
		//console.log('/loggedin',req.isAuthenticated());
		res.send(req.isAuthenticated() ? req.user : '0');
	});

    app.get('/users', function(req, res) {
            dbUtil.getUsers().then(function(users) {
                res.send((JSON.stringify(users)).toString());
            })
});
	
	app.get('/logout', function(req, res){
		req.logOut();
		res.redirect('/rwnc');
	}); 

};
