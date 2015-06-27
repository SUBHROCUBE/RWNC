console.log("Hello RWNC");
var express = require('express');
var app = new express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies
app.use('/', express.static(__dirname + '/dist'));
var dbUtil = require('./db-util');
var modelutil = require('./model-util');
var auth = require('basic-auth');


// messages
var msg1 = "Authentication Error. Invalid login credentials.";
var msg2 = "Authorization Error. Access to this page forbidden.";
var msg3 = "Invalid parameters or request body ";

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
                        if (data != null) {
                            var data2 = modelutil.getRecentOrders(data);
                            res.statusCode = 200;
                            res.send((JSON.stringify(data2)).toString());
                        }
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
                        if (data != null) {
                            var data2 = modelutil.getRecentReceived(data);
                            res.statusCode = 200;
                            res.send((JSON.stringify(data2)).toString());
                        }
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
                        if (data != null) {
                            var data2 = modelutil.getRecentDeliveries(data);
                            res.statusCode = 200;
                            res.send((JSON.stringify(data2)).toString());
                        }
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
                        if (data != null) {
                            var data2 = modelutil.getRecentLowStocks(data);
                            res.statusCode = 200;
                            res.send((JSON.stringify(data2)).toString());
                        }
                    });
                } else {
                    res.statusCode = 403;
                    res.send((JSON.stringify(msg2)).toString());
                }
            });
        }
    });
});


// retrieve all customer details
// use header in format          credentials = {"username":"***", "userpwd":"***"}
app.get('/all_customers', function(req, res) {
    var credentials = JSON.parse(req.headers['credentials']);
    dbUtil.validateUser(credentials).then(function(user_id) {
        if (user_id == "-1") {
            res.statusCode = 401;
            res.send((JSON.stringify(msg1)).toString());
        } else {
            dbUtil.getAuthorization(user_id).then(function(authorizations) {
                if (authorizations.indexOf("customer_view") > -1) {
                    dbUtil.getAllCustomers().then(function(data) {
                        if (data != null) {
                            var data2 = modelutil.getAllCustomers(data);
                            res.statusCode = 200;
                            res.send((JSON.stringify(data2)).toString());
                        }
                    });
                } else {
                    res.statusCode = 403;
                    res.send((JSON.stringify(msg2)).toString());
                }
            });
        }
    });
});

// POST a new customer details
// use header in format          credentials = {"username":"***", "userpwd":"***"}
// use content-type 		 Application/json
// use body in format 
//	{
//      "Alias":"Banaraswala",
//      "Name":"G.K.Tiwari",
//      "SPOC Name":"Hemant",
//      "Contact 1":"9999999999",
//      "Contact 2":null,
//      "Address":null,
//      "Email 1":"xxxxx@gmail.com",
//      "Email 2":null,
//      "VAT No.":"VAT001",
//      "CST No.":"CST001"
//	}
app.post('/customer', function(req, res) {
    var credentials = JSON.parse(req.headers['credentials']);
    dbUtil.validateUser(credentials).then(function(user_id) {
        if (user_id == "-1") {
            res.statusCode = 401;
            res.send((JSON.stringify(msg1)).toString());
        } else {
            dbUtil.getAuthorization(user_id).then(function(authorizations) {
                if (authorizations.indexOf("customer_add") > -1) {
                    var customer_details = req.body;
                    console.log(customer_details["Alias"]);
                    dbUtil.insertCustomer(user_id, customer_details).then(function(data) {
                        if (data != null) {
                            res.statusCode = 200;
                            res.send(data);
                        }
                    });
                } else {
                    res.statusCode = 403;
                    res.send((JSON.stringify(msg2)).toString());
                }
            });
        }
    });
});


// POST a new customer details
// use header in format          credentials = {"username":"***", "userpwd":"***"}
// use content-type 		 Application/json
// use body in format 
//	{
//		"Customer ID":"1",
//      "Alias":"Banaraswala",
//      "Name":"G.K.Tiwari",
//      "SPOC Name":"Hemant",
//      "Contact 1":"9999999999",
//      "Contact 2":null,
//      "Address":null,
//      "Email 1":"xxxxx@gmail.com",
//      "Email 2":null,
//      "VAT No.":"VAT001",
//      "CST No.":"CST001"
//	}
app.put('/customer', function(req, res) {
    var credentials = JSON.parse(req.headers['credentials']);
    dbUtil.validateUser(credentials).then(function(user_id) {
        if (user_id == "-1") {
            res.statusCode = 401;
            res.send((JSON.stringify(msg1)).toString());
        } else {
            dbUtil.getAuthorization(user_id).then(function(authorizations) {
                if (authorizations.indexOf("customer_add") > -1) {
                    var customer_details = req.body;
                    var id = customer_details["Customer ID"];
					if (id==null)
					{
						res.statusCode = 404;
						res.send((JSON.stringify(msg3)).toString());
					}
					else
					{
						dbUtil.updateCustomer(user_id, customer_details).then(function(data) {
							if (data != null) {
								res.statusCode = 200;
								res.send(data);
							}
						});
					}
                } else {
                    res.statusCode = 403;
                    res.send((JSON.stringify(msg2)).toString());
                }
            });
        }
    });
});

// POST a new Received details
// use header in format          credentials = {"username":"***", "userpwd":"***"}
// use content-type 		 Application/json
// use body in format 
//	{
//      "Alias":"Banaraswala",
//      "Name":"G.K.Tiwari",
//      "SPOC Name":"Hemant",
//      "Contact 1":"9999999999",
//      "Contact 2":null,
//      "Address":null,
//      "Email 1":"xxxxx@gmail.com",
//      "Email 2":null,
//      "VAT No.":"VAT001",
//      "CST No.":"CST001"
//	}
app.post('/received', function(req, res) {
    var credentials = JSON.parse(req.headers['credentials']);
    dbUtil.validateUser(credentials).then(function(user_id) {
        if (user_id == "-1") {
            res.statusCode = 401;
            res.send((JSON.stringify(msg1)).toString());
        } else {
            dbUtil.getAuthorization(user_id).then(function(authorizations) {
                if (authorizations.indexOf("received_add") > -1) {
                    var received_details = req.body;
                    dbUtil.insertReceived(user_id, received_details).then(function(data) {
                        if (data != null) {
                            res.statusCode = 200;
                            res.send(data);
                        }
                    });
                } else {
                    res.statusCode = 403;
                    res.send((JSON.stringify(msg2)).toString());
                }
            });
        }
    });
});
