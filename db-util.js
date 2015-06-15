var mysql = require('mysql');
var q = require('q');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root12345',
    database: 'rwncv1'
});
exports.getUsers = function() {
    var deffered = q.defer();
    var users = [];
    connection.query('SELECT user_name from user', function(err, rows, fields) {
        if (!err) {
            console.log('Query response is: ', rows);
            rows.forEach(function(row) {
                users.push(row.user_name);
            });
            deffered.resolve(users)
        } else {
            console.log('Error while performing Query : get all users.');
        }
    });
    return deffered.promise;
};
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
