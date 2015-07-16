var path = require('path'),
    pass = require('./passport-util')
passport = require('passport'),
    session = require('./session'),
    async = require('async');
var modelutil = require('./model-util');
var dbUtil = require('./db-util');
var ExpressBrute = require('express-brute');

var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production 
var bruteforce = new ExpressBrute(store, {
    minWait: 1000 * 30
});

// messages
var msg1 = "Authentication Error. Invalid login credentials.";
var msg2 = "Authorization Error. Access to this page forbidden.";
var msg3 = "Invalid parameters or request body ";

module.exports = function(app) {

    app.post('/loginCheck', bruteforce.prevent, passport.authenticate('local', {
        failureFlash: true
    }), function(req, res) {
        req.brute.reset(function() {
            res.send({
                'user': req.user
            }); // logged in, send them to the home page 
        });
    });

    app.get('/', function(req, res) {
        res.redirect('/rwnc');
    });
    //app.get('/scribble',pass.ensureAuthenticatedAJAX, session.session)
    app.get('/rwnc', function(req, res) {
        var isAuthenticated = req.isAuthenticated();
        console.log("\n\n user name of login is :" + req.user);
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
        }, function(error) {
            res.send(error)
        })
    });


    // post a new user
    // use data {"name":"***", "password":"***"}
    app.post('/user', function(req, res) {
        var body = req.body;
        dbUtil.putUser(body).then(function(id) {
            console.log(id);
            res.send((JSON.stringify(id)).toString());
        });
    });


    // retrieve all recent orders, for home page view
    app.get('/recent_orders', function(req, res) {
        dbUtil.getRecentOrders().then(function(data) {
            if (data != null) {
                var data2 = modelutil.getRecentOrders(data);
                res.statusCode = 200;
                res.send((JSON.stringify(data2)).toString());
            }
        }, function(err) {
            res.send(err)
        });

    });

    // retrieve all recent received, for home page view
    app.get('/recent_received', function(req, res) {
        dbUtil.getRecentReceived().then(function(data) {
            if (data != null) {
                var data2 = modelutil.getRecentReceived(data);
                res.statusCode = 200;
                res.send((JSON.stringify(data2)).toString());
            }
        }, function(err) {
            res.send(err)
        });
    });


    // retrieve all recent deliveries, for home page view
    app.get('/recent_deliveries', function(req, res) {

        dbUtil.getRecentDeliveries().then(function(data) {
            if (data != null) {
                var data2 = modelutil.getRecentDeliveries(data);
                res.statusCode = 200;
                res.send((JSON.stringify(data2)).toString());
            }
        }, function(err) {
            res.send(err)
        });

    });

    // retrieve all recent stocks below level, for home page view
    app.get('/recent_low_stocks', function(req, res) {
        dbUtil.getRecentLowStocks().then(function(data) {
            if (data != null) {
                var data2 = modelutil.getRecentLowStocks(data);
                res.statusCode = 200;
                res.send((JSON.stringify(data2)).toString());
            }
        }, function(err) {
            res.send(err)
        });

    });

    // retrieve all customer details
    app.get('/all_customers', function(req, res) {
        dbUtil.getAllCustomers().then(function(data) {
            if (data != null) {
                var data2 = modelutil.getAllCustomers(data);
                res.statusCode = 200;
                res.send((JSON.stringify(data2)).toString());
            }
        }, function(err) {
            res.send(err)
        });
    });

    // POST a new customer details
    // use content-type 		 Application/json
    app.post('/customer', function(req, res) {
        var user_id = 1; // change it with user ID obtained from session
        var customer_details = req.body;
        console.log(customer_details["alias"]);
        dbUtil.insertCustomer(user_id, customer_details).then(function(data) {
            if (data != null) {
                res.statusCode = 200;
                res.send(data);
            }
        }, function(err) {
            res.send(err)
        });
    });


    // UPDATE a new customer details
    // use content-type 		 Application/json
    app.put('/customer', function(req, res) {
        var user_id = 1; // change it with user ID obtained from session
        var customer_details = req.body;
        var id = customer_details["id"];
        if (id == null) {
            res.statusCode = 404;
            res.send((JSON.stringify(msg3)).toString());
        } else {
            dbUtil.updateCustomer(user_id, customer_details).then(function(data) {
                if (data != null) {
                    res.statusCode = 200;
                    res.send(data);
                }
            }, function(err) {
                res.send(err)
            });
        }
    });

    // POST a new Received details
    // use content-type 		 Application/json
    app.post('/received', function(req, res) {
        var receivedDetails = req.body;
        var user_id = 1; // change it with user ID obtained from session

        var returnData = {};
        dbUtil.checkDuplicateAddAndFetchItem(user_id, receivedDetails).then(function(itemId) {
            console.log(itemId);
            receivedDetails['itemId'] = itemId;
            dbUtil.insertReceived(user_id, receivedDetails).then(function(receivedId) {
                async.parallel([
                    dbUtil.checkAndInsertDeposit(user_id, receivedDetails).then(function(depositId) {
                        console.log(depositId);
                        returnData['depositId'] = depositId;
                    }),
                    dbUtil.checkAndInsertStock(user_id, receivedDetails).then(function(stockId) {
                        console.log(stockId);
                        returnData['stockId'] = stockId;
                    })
                ], function(err, parallelResults) {
                    returnData['itemId'] = itemId;
                    returnData['receivedId'] = receivedId;
                    res.statusCode = 200;
                    res.send(returnData);
                });

            });
        });
    });

    app.get('/logout', function(req, res) {
        req.logOut();
        res.redirect('/rwnc');
    });

    // POST filters to receive stock details
    // use content-type 		 Application/json
    app.post('/stock', function(req, res) {
        var stockFilterModel = req.body;
        var user_id = 1; // change it with user ID obtained from session

        modelutil.stockFilterModelToDB(stockFilterModel).then(function(stockFilterDB) {
            if (stockFilterModel.hasOwnProperty('customerId')) {
                dbUtil.fetchCustomerDeposit(stockFilterDB).then(function(data) {
                    var depositModel = modelutil.getDeposit(data);
                    res.statusCode = 200;
                    res.send(depositModel);
                }, function(err) {
                    res.send(err);
                });
            } else {
                dbUtil.fetchRwncStock(stockFilterDB).then(function(data) {
                    var stockModel = modelutil.getStock(data);
                    res.statusCode = 200;
                    res.send(stockModel);
                }, function(err) {
                    res.send(err);
                });
            }
        });
    });


    // POST filters to receive orders details
    // use content-type 		 Application/json
    app.post('/orders', function(req, res) {
        var orderFilterModel = req.body;
        var user_id = 1; // change it with user ID obtained from session

        modelutil.orderFilterModelToDB(orderFilterModel).then(function(orderFilterDB) {
            dbUtil.fetchOrders(orderFilterDB).then(function(data) {
                var orderModel = modelutil.getOrders(data);
                res.statusCode = 200;
                res.send(orderModel);
            }, function(err) {
                res.send(err);
            });
        });
    });

    // POST a new order
    // use content-type 		 Application/json
    app.post('/order', function(req, res) {
        var orderDetails = req.body;
        var user_id = 1; // change it with user ID obtained from session

        dbUtil.checkDuplicateAddAndFetchItem(user_id, orderDetails).then(function(itemId) {
            console.log(itemId);
            orderDetails['itemId'] = itemId;
            if ((!orderDetails.hasOwnProperty("parentOrderId")) || orderDetails["parentOrderId"] == null) {
                dbUtil.fetchNextParentOrderId().then(function(parentOrderId) {
                    orderDetails["parentOrderId"] = parentOrderId;
                    dbUtil.insertOrder(user_id, orderDetails).then(function(returnData) {
                        res.statusCode = 200;
                        res.send(returnData);
                    });
                });
            } else {
                dbUtil.insertOrder(user_id, orderDetails).then(function(returnData) {
                    res.statusCode = 200;
                    res.send(returnData);
                });
            }
        });
    });
    // POST filters to retrieve productions details
    // use content-type 		 Application/json
    app.post('/productions', function(req, res) {
        var productionFilterModel = req.body;
        var user_id = 1; // change it with user ID obtained from session
        
        modelutil.productionFilterModelToDB(productionFilterModel).then(function(productionFilterDB) {
            dbUtil.fetchProductions(productionFilterDB).then(function(data) {
                var productionModel = modelutil.getProductions(data);
                res.statusCode = 200;
                res.send(productionModel);
            }, function(err) {
                res.send(err);
            });
        });
    });




    app.get('/logout', function(req, res) {
        req.logOut();
        res.redirect('/rwnc');
    });

};
