var mysql = require('mysql');
var q = require('q');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rwnc123',
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
            deffered.reject(err)
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
            deffered.reject(err)
        }
    });
    return deffered.promise;
};
// validate existence of an user in system with username and password
exports.validateUser = function(data) {
    console.log("\n\nhellloo");
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
            deffered.reject(err)
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
            deffered.reject(err)
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
            deffered.reject(err)
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
            deffered.reject(err)
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
            deffered.reject(err)
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
            deffered.reject(err)
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
            deffered.reject(err)
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
    var inserts = [data["alias"], data["name"], data["spocName"], data["contact1"], data["contact2"], data["address"], data["email1"], data["email2"], data["vatNo"], data["cstNo"], 'active', user_id];
    query = mysql.format(query, inserts);
    console.log(query)
    connection.query(query, function(err, result) {
        if (!err) {
            console.log(result.insertId);
            returnData["id"] = result.insertId;
            deffered.resolve(returnData);
        } else {
            console.log('Error while performing Query : add customer.');
            deffered.reject(err)
        }
    });
    return deffered.promise;
};
// update a customer
exports.updateCustomer = function(user_id, data) {
    var deffered = q.defer();
    var returnData = {};
    var query = 'update customer set alias = ?, name=?, spoc=?, contact1=?, contact2=?, address=?, email1=?, email2=?, vat_no=?, cst_no=?, ub = ?, uo=now() where customer_id=?';
    var updates = [data["alias"], data["name"], data["spocName"], data["contact1"], data["contact2"], data["address"], data["email1"], data["email2"], data["vatNo"], data["cstNo"], user_id, data["id"]];
    query = mysql.format(query, updates);
    console.log(query);
    connection.query(query, function(err, result) {
        if (!err) {
            console.log(result.insertId);
            returnData["Changed Rows"] = result.changedRows;
            deffered.resolve(returnData);
        } else {
            console.log('Error while performing Query : update customer.');
            deffered.reject(err)
        }
    });
    return deffered.promise;
};
checkDuplicateItem = function(itemToCheck) {
        var raw_ready = itemToCheck["itemRawReady"];
        var material = itemToCheck["itemMaterial"];
        var type = itemToCheck["itemType"];
        var diameter = itemToCheck["itemDiameter"];
        if (diameter == null) {
            diameter = 0;
        }
        if (raw_ready == "raw") {
            var query = 'select * from item where raw_ready=? and  material=? and type=? and diameter=?';
            var inserts = [raw_ready, material, type, diameter];
            query = mysql.format(query, inserts);
	    console.log(query);
            connection.query(query, function(err, rows, fields) {
                if (!err) {
                    var returnData = [];
                    rows.forEach(function(row) {
                        returnData.push(row);
                    });
                    if (returnData.size == 1) {
			console.log('Item found : itemToCheck : single row returned');
                        return returnData[0].item_id;
                    } else if (returnData.size > 1) {
                        console.log('Error while performing Query : itemToCheck : multiple rows returned');
                        return returnData[0].item_id;
                    } else {
                        console.log('Item not found : itemToCheck');
                        return -1;
                    }
                } else {
                    console.log('Error while performing Query : itemToCheck.');
                    return -1;
                }
            })
        }
    }

// insert a new item
insertItem = function(user_id, data) {
    var returnData = {};
    var query = 'insert into item (opening, diameter, length, width, type, material, raw_ready, description, is_clamp, c_pos, c_length, c_thickness, c_desc, threshold, cb) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    var inserts = [data["itemOpening"], data["itemDiameter"], data["itemLength"], data["itemWidth"], data["itemType"], data["itemMaterial"], data["itemRawReady"], data["itemDescription"], data["itemClamped"], data["itemClampPosition"], data["itemClampLength"], data["itemClampThickness"], data["itemClampDescription"], data["itemThreshold"], user_id];
    query = mysql.format(query, inserts);
    console.log(query);
    connection.query(query, function(err, result) {
        if (!err) {
            console.log(result.insertId);
            returnData["itemID"] = result.insertId;
        } else {
            console.log('Error while performing Query : add item.');
            deffered.reject(err)
        }
    });
    return returnData;
};

// insert a new received
exports.insertReceived = function(user_id, data) {
    var deffered = q.defer();
    var returnData = {};
    var item_id = checkDuplicateItem(data);
console.log("item id is "+item_id);
    if (-1 == item_id) {
console.log("go to insertitem");
        var item = insertItem(user_id, data);
        item_id = item["itemId"];
    }
    var query = 'insert into received (customer_id, item_id, quantity, weight, received_date, cb) values (?,?,?,?, now(),?)';
    var inserts = [data["customerId"], item_id, data["receivedQuantity"], data["receivedWeight"], user_id];
    query = mysql.format(query, inserts);
    console.log(query);
    connection.query(query, function(err, result) {
        if (!err) {
            console.log(result.insertId);
            returnData["receivedId"] = result.insertId;
            deffered.resolve(returnData);
        } else {
            console.log('Error while performing Query : add received.');
            deffered.reject(err)
        }
    });
    return deffered.promise;
};
