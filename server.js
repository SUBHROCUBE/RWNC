console.log("Hello RWNC");
var express = require('express');
var app = new express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var dbUtil = require('./db-util');

//server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('RWNC API listening at http://%s:%s', host, port);
});

//requests

// get all users
app.get('/users', function (req, res) {
dbUtil.getUsers().then(function(users) {
        res.send((JSON.stringify(users)).toString());
    })
});

// post a new user
// use data {"name":"***", "password":"***"}
app.post('/user', function (req, res) {
    var body = req.body;
    dbUtil.putUser(body).then(function(id) {
	    console.log(id);
	    res.send((JSON.stringify(id)).toString());
    });
});
