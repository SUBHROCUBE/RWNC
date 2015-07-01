var path = require('path'),
	pass = require('./passport-util')
	passport = require('passport'),
	session = require('./session');
var modelutil = require('./model-util');
var ExpressBrute = require('express-brute');

var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production 
var bruteforce = new ExpressBrute(store,{minWait:1000*30});

// messages
var msg1 = "Authentication Error. Invalid login credentials.";
var msg2 = "Authorization Error. Access to this page forbidden.";
var msg3 = "Invalid parameters or request body ";

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

    app.get('/users',function(req, res) {
            dbUtil.getUsers().then(function(users) {
                res.send((JSON.stringify(users)).toString());
            },function(error){
            	res.send(error)
            })
});
    

// post a new user
// use header in format          credentials = {"username":"***", "userpwd":"***"}
// use data {"name":"***", "password":"***"}
app.post('/user', function(req, res) {
            var body = req.body;
            dbUtil.putUser(body).then(function(id) {
                console.log(id);
                res.send((JSON.stringify(id)).toString());
            });
});  
    

    // retrieve all recent orders, for home page view
// use header in format          credentials = {"username":"***", "userpwd":"***"}
app.get('/recent_orders', function(req, res) {
                    dbUtil.getRecentOrders().then(function(data) {
                        if (data != null) {
                            var data2 = modelutil.getRecentOrders(data);
                            res.statusCode = 200;
                            res.send((JSON.stringify(data2)).toString());
                        }
                    },function(err){
                    	res.send(err)
                    });
               
});
    
// retrieve all recent received, for home page view
// use header in format          credentials = {"username":"***", "userpwd":"***"}
app.get('/recent_received', function(req, res){ 
                    dbUtil.getRecentReceived().then(function(data) {
                        if (data != null) {
                            var data2 = modelutil.getRecentReceived(data);
                            res.statusCode = 200;
                            res.send((JSON.stringify(data2)).toString());
                        }
                    },function(err){
                    	res.send(err)
                    });
});
    

// retrieve all recent deliveries, for home page view
// use header in format          credentials = {"username":"***", "userpwd":"***"}
app.get('/recent_deliveries', function(req, res) {
            
                    dbUtil.getRecentDeliveries().then(function(data) {
                        if (data != null) {
                            var data2 = modelutil.getRecentDeliveries(data);
                            res.statusCode = 200;
                            res.send((JSON.stringify(data2)).toString());
                        }
                    },function(err){
                    	res.send(err)
                    });
                
});

// retrieve all recent stocks below level, for home page view
// use header in format          credentials = {"username":"***", "userpwd":"***"}
app.get('/recent_low_stocks', function(req, res) {
                    dbUtil.getRecentLowStocks().then(function(data) {
                        if (data != null) {
                            var data2 = modelutil.getRecentLowStocks(data);
                            res.statusCode = 200;
                            res.send((JSON.stringify(data2)).toString());
                        }
                    },function(err){
                    	res.send(err)
                    });
                
});


// retrieve all customer details
// use header in format          credentials = {"username":"***", "userpwd":"***"}
app.get('/all_customers', function(req, res) {
                    dbUtil.getAllCustomers().then(function(data) {
                        if (data != null) {
                            var data2 = modelutil.getAllCustomers(data);
                            res.statusCode = 200;
                            res.send((JSON.stringify(data2)).toString());
                        }
                    },function(err){
                    	res.send(err)
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

                    var customer_details = req.body;
                    console.log(customer_details["Alias"]);
                    dbUtil.insertCustomer(user_id, customer_details).then(function(data) {
                        if (data != null) {
                            res.statusCode = 200;
                            res.send(data);
                        }
                    },function(err){
                    	res.send(err)
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
						},function(err){
                    	res.send(err)
                    });
					}
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
           
                    var received_details = req.body;
                    dbUtil.insertReceived(user_id, received_details).then(function(data) {
                        if (data != null) {
                            res.statusCode = 200;
                            res.send(data);
                        }
                    },function(err){
                    	res.send(err)
                    });
              
});
    
	app.get('/logout', function(req, res){
		req.logOut();
		res.redirect('/rwnc');
	}); 

};
