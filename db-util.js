var mysql = require('mysql');
var q = require('q');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root12345',
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
exports.postCustomer = function(user_id, data) {
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
            console.log('Error while performing Query : get all customers.');
        }
    });
    return deffered.promise;
};
