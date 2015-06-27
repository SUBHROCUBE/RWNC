var mysql = require('mysql');
var q = require('q');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
<<<<<<< HEAD
    password: '',
=======
    password: 'admin',
>>>>>>> ea9fdad4e798771d42eda700c90658e7bdc7c1cb
    database: 'rwncv1'
});
// get all user names
exports.getUsers = function() {
    var deffered = q.defer();
    var users = [];
    connection.query('SELECT user_name from user', function(err, rows, fields) {
        if (!err) {
            console.log('Query response is: ', rows);
            rows.forEach(function(row) {
                users.push(row.user_name);
            });
            deffered.resolve(users);
        } else {
            console.log('Error while performing Query : get all users.');
        }
    });
    return deffered.promise;
};
// insert a new user
exports.putUser = function(data) {
    var deffered = q.defer();
    var result;
    connection.query('insert into user (user_name,user_pwd) values("' + data.name + '","' + data.password + '")', function(err, rows, fields) {
        if (!err) {
            deffered.resolve('posted');
        } else {
            console.log('Error while performing Query : put user.');
        }
    });
    return deffered.promise;
};
// validate existence of an user in system with username and password
exports.validateUser = function(data) {
    var deffered = q.defer();
    var result;
    connection.query('select user_id from user where user_name = "' + data.username + '" and user_pwd = "' + data.userpwd + '"', function(err, rows, fields) {
        if (!err) {
            var user_id = -1;
            rows.forEach(function(row) {
                user_id = row.user_id;
            });
            deffered.resolve(user_id);
        } else {
            console.log('Error while performing Query : validate user.');
        }
    });
    return deffered.promise;
};
// fetch authorization of a given user
exports.getAuthorization = function(user_id) {
    var deffered = q.defer();
    var result;
    connection.query('select access_name from access, permission where permission.user_id = "' + user_id + '" and permission.access_id = access.access_id', function(err, rows, fields) {
        if (!err) {
            var returnData = [];
            rows.forEach(function(row) {
                returnData.push(row.access_name);
            });
            deffered.resolve(returnData);
        } else {
            console.log('Error while performing Query : authorize user.');
        }
    });
    return deffered.promise;
};
// fetch top 10 recent orders 
exports.getRecentOrders = function() {
    var deffered = q.defer();
    var result;
    connection.query('select * from orders, item, customer where orders.item_id = item.item_id and orders.customer_id = customer.customer_id order by order_date desc limit 10', function(err, rows, fields) {
        if (!err) {
            var returnData = [];
            rows.forEach(function(row) {
                returnData.push(row);
            });
            deffered.resolve(returnData);
        } else {
            console.log('Error while performing Query : get recent orders.');
        }
    });
    return deffered.promise;
};
// fetch top 10 recent receivables
exports.getRecentReceived = function() {
    var deffered = q.defer();
    var result;
    connection.query('select * from received, item, customer where received.item_id = item.item_id and received.customer_id = customer.customer_id order by received_date desc limit 10', function(err, rows, fields) {
        if (!err) {
            var returnData = [];
            rows.forEach(function(row) {
                returnData.push(row);
            });
            deffered.resolve(returnData);
        } else {
            console.log('Error while performing Query : get recent received.');
        }
    });
    return deffered.promise;
};
// fetch top 10 recent deliveries
exports.getRecentDeliveries = function() {
    var deffered = q.defer();
    var result;
    connection.query('select * from delivery, orders, item, customer where delivery.order_id = orders.order_id and orders.item_id = item.item_id and orders.customer_id = customer.customer_id order by order_date desc limit 10', function(err, rows, fields) {
        if (!err) {
            var returnData = [];
            rows.forEach(function(row) {
                returnData.push(row);
            });
            deffered.resolve(returnData);
        } else {
            console.log('Error while performing Query : get recent deliveries.');
        }
    });
    return deffered.promise;
};
// fetch top 10 recent low stocks
exports.getRecentLowStocks = function() {
    var deffered = q.defer();
    var result;
    connection.query('select * from stock, item where stock.item_id = item.item_id and (quantity<threshold or weight<threshold) order by stock.uo desc', function(err, rows, fields) {
        if (!err) {
            var returnData = [];
            rows.forEach(function(row) {
                returnData.push(row);
            });
            deffered.resolve(returnData);
        } else {
            console.log('Error while performing Query : get recent low stocks.');
        }
    });
    return deffered.promise;
};
// fetch all customers
exports.getAllCustomers = function() {
    var deffered = q.defer();
    var result;
    connection.query('select * from customer', function(err, rows, fields) {
        if (!err) {
            var returnData = [];
            rows.forEach(function(row) {
                returnData.push(row);
            });
            deffered.resolve(returnData);
        } else {
            console.log('Error while performing Query : get all customers.');
        }
    });
    return deffered.promise;
};
// insert a new customer
exports.insertCustomer = function(user_id, data) {
    var deffered = q.defer();
    var returnData = {};
    var query = 'insert into customer (alias, name, spoc, contact1, contact2, address, email1, email2, vat_no, cst_no, status, cb) values (?,?,?,?,?,?,?,?,?,?,?,?)';
console.log(data);
    var inserts = [data["Alias"], data["Name"], data["SPOC Name"], data["Contact 1"], data["Contact 2"], data["Address"], data["Email 1"], data["Email 2"], data["VAT No."], data["CST No."], 'active', user_id];
    query = mysql.format(query, inserts);
    console.log(query)
    connection.query(query, function(err, result) {
        if (!err) {
            console.log(result.insertId);
            returnData["Customer ID"] = result.insertId;
            deffered.resolve(returnData);
        } else {
            console.log('Error while performing Query : add customer.');
        }
    });
    return deffered.promise;
};
// update a customer
exports.updateCustomer = function(user_id, data) {
    var deffered = q.defer();
    var returnData = {};
    var query = 'update customer set alias = ?, name=?, spoc=?, contact1=?, contact2=?, address=?, email1=?, email2=?, vat_no=?, cst_no=?, ub = ?, uo=now() where customer_id=?';
    var updates = [data["Alias"], data["Name"], data["SPOC Name"], data["Contact 1"], data["Contact 2"], data["Address"], data["Email 1"], data["Email 2"], data["VAT No."], data["CST No."], user_id, data["Customer ID"]];
    query = mysql.format(query, updates);
    console.log(query);
    connection.query(query, function(err, result) {
        if (!err) {
            console.log(result.insertId);
            returnData["Changed Rows"] = result.changedRows;
            deffered.resolve(returnData);
        } else {
            console.log('Error while performing Query : update customer.');
        }
    });
    return deffered.promise;
};
checkDuplicateItem = function (itemToCheck) {
	var raw_ready=itemToCheck["Raw/Ready"];
	var material=itemToCheck["Material"];
	var type=itemToCheck["Type"];
	var diameter=itemToCheck["Diameter"];
	if (diameter == null)
	{
		diameter=0;
	}
	if (raw_ready=="raw")
	{
		var query = 'select * from item where raw_ready=? and  material=? and type=? and diameter=?';
		var inserts = [raw_ready, material, type, diameter];
		query = mysql.format(query, inserts);
		connection.query(query, function(err, rows, fields) {
        if (!err) {
            var returnData = [];
            rows.forEach(function(row) {
                returnData.push(row);
            });
			if (returnData.size == 1) {
				return returnData[0].item_id;
			} else {
				console.log('Error while performing Query : itemToCheck : multiple rows returned');
				return -1;
			}
        } else {
			return -1;
            console.log('Error while performing Query : itemToCheck.');
        }
	}
}
// insert a new item
insertItem = function(user_id, data) {
    var returnData = {};
    var query = 'insert into item (opening, diameter, length, width, type, material, raw_ready, description, is_clamp, c_pos, c_length, c_thickness, c_desc, threshold, cb) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    var inserts = [data["Opening"], data["Diameter"], data["Length"], data["Width"], data["Type"], data["Material"], data["Raw/Ready"], data["Description"], data["Clamped"], data["Clamp Position"], data["Clamp Length"], data["Clamp Thickness"], data["Clamp Description"], data["Threshold"], user_id];
    query = mysql.format(query, inserts);
    console.log(query)
    connection.query(query, function(err, result) {
        if (!err) {
            console.log(result.insertId);
            returnData["Item ID"] = result.insertId;
        } else {
            console.log('Error while performing Query : add item.');
        }
    });
    return returnData;
};
// insert a new received
exports.insertReceived = function(user_id, data) {
    var deffered = q.defer();
    var returnData = {};
	var item_id = checkDuplicateItem(data);
	if (-1==item_id)
	{
		var item=insertItem(user_id, data);
		item_id=item["Item ID"];
	}
    var query = 'insert into received (customer_id, item_id, quantity, weight, received_date, cb) values (?,?,?,?,?,?)';
    var inserts = [data["Customer ID"], item_id, data["Quantity"], data["Weight"], data["Received Date"], user_id];
    query = mysql.format(query, inserts);
    console.log(query)
    connection.query(query, function(err, result) {
        if (!err) {
            console.log(result.insertId);
            returnData["Received ID"] = result.insertId;
            deffered.resolve(returnData);
        } else {
            console.log('Error while performing Query : add received.');
        }
    });
    return deffered.promise;
};
