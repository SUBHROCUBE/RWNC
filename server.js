console.log("Hello RWNC");
var express = require('express');
var app = new express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies
var dbUtil = require('./db-util');
var auth = require('basic-auth');


// messages
var msg1 = "Authentication Error. Invalid login credentials.";
var msg2 = "Authorization Error. Access to this page forbidden.";

//server
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('RWNC API listening at http://%s:%s', host, port);
});

//requests

// get all users
app.get('/users', function(req, res) {
    var credentials = JSON.parse(req.headers['credentials']);
    dbUtil.validateUser(credentials).then(function(user_id) {
        if (user_id == "-1") {
            res.statusCode = 401;
            res.send((JSON.stringify(msg1)).toString());
        } else {
            dbUtil.getUsers().then(function(users) {
                res.send((JSON.stringify(users)).toString());
            })
        }
    });
});

// post a new user
// use header in format          credentials = {"username":"***", "userpwd":"***"}
// use data {"name":"***", "password":"***"}
app.post('/user', function(req, res) {
    var credentials = JSON.parse(req.headers['credentials']);
    dbUtil.validateUser(credentials).then(function(user_id) {
        if (user_id == "-1") {
            res.statusCode = 401;
            res.send((JSON.stringify(msg1)).toString());
        } else {
            var body = req.body;
            dbUtil.putUser(body).then(function(id) {
                console.log(id);
                res.send((JSON.stringify(id)).toString());
            });
        }
    });
});

// retrieve all recent orders, for home page view
// use header in format          credentials = {"username":"***", "userpwd":"***"}
app.get('/recent_orders', function(req, res) {
    var credentials = JSON.parse(req.headers['credentials']);
    dbUtil.validateUser(credentials).then(function(user_id) {
        if (user_id == "-1") {
            res.statusCode = 401;
            res.send((JSON.stringify(msg1)).toString());
        } else {
            dbUtil.getAuthorization(user_id).then(function(authorizations) {
                if (authorizations.indexOf("home_view") > -1) {
                    dbUtil.getRecentOrders().then(function(data) {
                        res.statusCode = 200;
                        res.send((JSON.stringify(data)).toString());
                    });
                } else {
                    res.statusCode = 403;
                    res.send((JSON.stringify(msg2)).toString());
                }
            });
        }
    });
});


// retrieve all recent received, for home page view
// use header in format          credentials = {"username":"***", "userpwd":"***"}
app.get('/recent_received', function(req, res) {
    var credentials = JSON.parse(req.headers['credentials']);
    dbUtil.validateUser(credentials).then(function(user_id) {
        if (user_id == "-1") {
            res.statusCode = 401;
            res.send((JSON.stringify(msg1)).toString());
        } else {
            dbUtil.getAuthorization(user_id).then(function(authorizations) {
                if (authorizations.indexOf("home_view") > -1) {
                    dbUtil.getRecentReceived().then(function(data) {
                        res.statusCode = 200;
                        res.send((JSON.stringify(data)).toString());
                    });
                } else {
                    res.statusCode = 403;
                    res.send((JSON.stringify(msg2)).toString());
                }
            });
        }
    });
});


// retrieve all recent deliveries, for home page view
// use header in format          credentials = {"username":"***", "userpwd":"***"}
app.get('/recent_deliveries', function(req, res) {
    var credentials = JSON.parse(req.headers['credentials']);
    dbUtil.validateUser(credentials).then(function(user_id) {
        if (user_id == "-1") {
            res.statusCode = 401;
            res.send((JSON.stringify(msg1)).toString());
        } else {
            dbUtil.getAuthorization(user_id).then(function(authorizations) {
                if (authorizations.indexOf("home_view") > -1) {
                    dbUtil.getRecentDeliveries().then(function(data) {
                        res.statusCode = 200;
                        res.send((JSON.stringify(data)).toString());
                    });
                } else {
                    res.statusCode = 403;
                    res.send((JSON.stringify(msg2)).toString());
                }
            });
        }
    });
});


// retrieve all recent stocks below level, for home page view
// use header in format          credentials = {"username":"***", "userpwd":"***"}
app.get('/recent_low_stocks', function(req, res) {
    var credentials = JSON.parse(req.headers['credentials']);
    dbUtil.validateUser(credentials).then(function(user_id) {
        if (user_id == "-1") {
            res.statusCode = 401;
            res.send((JSON.stringify(msg1)).toString());
        } else {
            dbUtil.getAuthorization(user_id).then(function(authorizations) {
                if (authorizations.indexOf("home_view") > -1) {
                    dbUtil.getRecentLowStocks().then(function(data) {
                        res.statusCode = 200;
                        res.send((JSON.stringify(data)).toString());
                    });
                } else {
                    res.statusCode = 403;
                    res.send((JSON.stringify(msg2)).toString());
                }
            });
        }
    });
});
