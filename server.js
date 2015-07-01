
var express = require('express'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
session = require('express-session'),
passport = require('passport'),
cors = require('cors'),
hbs = require('hbs');
var app = express(),
    flash = require('connect-flash');
var server = require('http').Server(app);

  app.set('view engine', 'html');
   app.set('trust proxy', 1); // trust first proxy
  app.engine('html', hbs.__express);
 
  app.use(cookieParser());
 // parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
	app.use(bodyParser.json())
 	app.use(cors());
  app.use(session({ secret: 'keyboard cat',key: "sessionId", proxy:true, cookie: { maxAge: 600000, secure: false, httpOnly: true }}));
  app.use(flash());
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());


require('./routes')(app);

var port = 8888;
console.log('server running on localhost:'+port);
//app.listen(8080);
server.listen(port);

