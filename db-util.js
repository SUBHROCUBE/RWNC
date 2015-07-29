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
    var deferred = q.defer();
    var users = [];
    connection.query('SELECT user_name from user', function(err, rows, fields) {
        if (!err) {
            console.log('Query response is: ', rows);
            rows.forEach(function(row) {
                users.push(row.user_name);
            });
            deferred.resolve(users);
        } else {
            console.log('Error while performing Query : get all users.');
            deferred.reject(err)
        }
    });
    return deferred.promise;
};

// get all type names
exports.getTypes = function() {
    var deferred = q.defer();
    var data = [];
    connection.query('SELECT type_name from type', function(err, rows, fields) {
        if (!err) {
            console.log('Query response is: ', rows);
            rows.forEach(function(row) {
                data.push(row.type_name);
            });
            deferred.resolve(data);
        } else {
            console.log('Error while performing Query : get all types.');
            deferred.reject(err)
        }
    });
    return deferred.promise;
};

// get all material names
exports.getMaterials = function() {
    var deferred = q.defer();
    var data = [];
    connection.query('SELECT material_name from material', function(err, rows, fields) {
        if (!err) {
            console.log('Query response is: ', rows);
            rows.forEach(function(row) {
                data.push(row.material_name);
            });
            deferred.resolve(data);
        } else {
            console.log('Error while performing Query : get all materials.');
            deferred.reject(err)
        }
    });
    return deferred.promise;
};

// insert a new user
exports.putUser = function(data) {
    var deferred = q.defer();
    var result;
    connection.query('insert into user (user_name,user_pwd) values("' + data.name + '","' + data.password + '")', function(err, rows, fields) {
        if (!err) {
            deferred.resolve('posted');
        } else {
            console.log('Error while performing Query : put user.');
            deferred.reject(err)
        }
    });
    return deferred.promise;
};
// validate existence of an user in system with username and password
exports.validateUser = function(data) {
    console.log("\n\nhellloo");
    var deferred = q.defer();
    var result;
    connection.query('select user_id from user where user_name = "' + data.username + '" and user_pwd = "' + data.userpwd + '"', function(err, rows, fields) {
        if (!err) {
            var user_id = -1;
            rows.forEach(function(row) {
                user_id = row.user_id;
            });
            deferred.resolve(user_id);
        } else {
            console.log('Error while performing Query : validate user.');
            deferred.reject(err)
        }
    });
    return deferred.promise;
};
// fetch authorization of a given user
exports.getAuthorization = function(user_id) {
    var deferred = q.defer();
    var result;
    connection.query('select access_name from access, permission where permission.user_id = "' + user_id + '" and permission.access_id = access.access_id', function(err, rows, fields) {
        if (!err) {
            var returnData = [];
            rows.forEach(function(row) {
                returnData.push(row.access_name);
            });
            deferred.resolve(returnData);
        } else {
            console.log('Error while performing Query : authorize user.');
            deferred.reject(err)
        }
    });
    return deferred.promise;
};
// fetch top 10 recent orders 
exports.getRecentOrders = function() {
    var deferred = q.defer();
    var result;
    connection.query('select * from orders, item, customer where orders.item_id = item.item_id and orders.customer_id = customer.customer_id order by order_date desc limit 5', function(err, rows, fields) {
        if (!err) {
            var returnData = [];
            rows.forEach(function(row) {
                returnData.push(row);
            });
            deferred.resolve(returnData);
        } else {
            console.log('Error while performing Query : get recent orders.');
            deferred.reject(err)
        }
    });
    return deferred.promise;
};
// fetch top 10 recent receivables
exports.getRecentReceived = function() {
    var deferred = q.defer();
    var result;
    connection.query('select * from received, item, customer where received.item_id = item.item_id and received.customer_id = customer.customer_id and lower(raw_ready)= "raw" order by received_date desc limit 5', function(err, rows, fields) {
        if (!err) {
            var returnData = [];
            rows.forEach(function(row) {
                returnData.push(row);
            });
            deferred.resolve(returnData);
        } else {
            console.log('Error while performing Query : get recent received.');
            deferred.reject(err)
        }
    });
    return deferred.promise;
};
// fetch top 10 recent deliveries
exports.getRecentDeliveries = function() {
    var deferred = q.defer();
    var result;
    connection.query('select * from delivery, orders, item, customer where delivery.order_id = orders.order_id and orders.item_id = item.item_id and orders.customer_id = customer.customer_id order by order_date desc limit 5', function(err, rows, fields) {
        if (!err) {
            var returnData = [];
            rows.forEach(function(row) {
                returnData.push(row);
            });
            deferred.resolve(returnData);
        } else {
            console.log('Error while performing Query : get recent deliveries.');
            deferred.reject(err)
        }
    });
    return deferred.promise;
};
// fetch top 10 recent low stocks
exports.getRecentLowStocks = function() {
    var deferred = q.defer();
    var result;
    connection.query('select * from stock, item where stock.item_id = item.item_id and (quantity<threshold or weight<threshold) and lower(raw_ready)= "raw" order by stock.uo desc', function(err, rows, fields) {
        if (!err) {
            var returnData = [];
            rows.forEach(function(row) {
                returnData.push(row);
            });
            deferred.resolve(returnData);
        } else {
            console.log('Error while performing Query : get recent low stocks.');
            deferred.reject(err)
        }
    });
    return deferred.promise;
};
// fetch all customers
exports.getAllCustomers = function() {
    var deferred = q.defer();
    var result;
    connection.query('select * from customer', function(err, rows, fields) {
        if (!err) {
            var returnData = [];
            rows.forEach(function(row) {
                returnData.push(row);
            });
            deferred.resolve(returnData);
        } else {
            console.log('Error while performing Query : get all customers.');
            deferred.reject(err)
        }
    });
    return deferred.promise;
};
// insert a new customer
exports.insertCustomer = function(user_id, data) {
    var deferred = q.defer();
    var returnData = {};
    var query = 'insert into customer (alias, name, spoc, contact1, contact2, address, email1, email2, vat_no, cst_no, status, cb) values (?,?,?,?,?,?,?,?,?,?,?,?)';
    console.log(data);
    var inserts = [data["alias"], data["name"], data["spocName"], data["contact1"], data["contact2"], data["address"], data["email1"], data["email2"], data["vatNo"], data["cstNo"], 'active', user_id];
    query = mysql.format(query, inserts);
    console.log(query);
    connection.query(query, function(err, result) {
        if (!err) {
            console.log(result.insertId);
            returnData["id"] = result.insertId;
            deferred.resolve(returnData);
        } else {
            console.log('Error while performing Query : add customer.');
            deferred.reject(err)
        }
    });
    return deferred.promise;
};
// update a customer
exports.updateCustomer = function(user_id, data) {
    var deferred = q.defer();
    var returnData = {};
    var query = 'update customer set alias = ?, name=?, spoc=?, contact1=?, contact2=?, address=?, email1=?, email2=?, vat_no=?, cst_no=?, ub = ?, uo=now() where customer_id=?';
    var updates = [data["alias"], data["name"], data["spocName"], data["contact1"], data["contact2"], data["address"], data["email1"], data["email2"], data["vatNo"], data["cstNo"], user_id, data["id"]];
    query = mysql.format(query, updates);
    console.log(query);
    connection.query(query, function(err, result) {
        if (!err) {
            console.log(result.insertId);
            returnData["Changed Rows"] = result.changedRows;
            deferred.resolve(returnData);
        } else {
            console.log('Error while performing Query : update customer.');
            deferred.reject(err)
        }
    });
    return deferred.promise;
};

// update stock
exports.updateStock = function(user_id, data) {
    var deferred = q.defer();
    var returnData = {};
    var query = 'update stock set quantity=?, weight = ?, uo=now(), ub = ? where stock_id=?';
    var updates = [data["quantity"], data["weight"], user_id, data["stockId"]];
    query = mysql.format(query, updates);
    console.log(query);
    connection.query(query, function(err, result) {
        if (!err) {
            console.log(result.insertId);
            returnData["Changed Rows"] = result.changedRows;
            deferred.resolve(returnData);
        } else {
            console.log('Error while performing Query : update stock.');
            deferred.reject(err)
        }
    });
    return deferred.promise;
};



checkDuplicateItem = function(itemToCheck) {
    var deferred = q.defer();
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
                if (rows.length == 1) {
                    console.log('Item found : itemToCheck : single row returned');
                    deferred.resolve(rows[0].item_id);
                } else if (rows.length > 1) {
                    console.log('Error while performing Query : itemToCheck : multiple rows returned');
                    deferred.resolve(rows[0].item_id);
                } else {
                    console.log('Item not found : itemToCheck');
                    deferred.resolve(-1);
                }
            } else {
                console.log('Error while performing Query : itemToCheck.');
                deferred.resolve(-1);
            }
        })
    }


    else if (raw_ready == "ready") {
        var query = 'select * from item where raw_ready=? and  material=? and type=? and diameter=? and opening=? and is_clamp=? and c_pos=? and c_length=? and c_thickness=? and c_desc=?';
        var inserts = [raw_ready, material, type, diameter, itemToCheck["itemOpening"], itemToCheck["itemClamped"], itemToCheck["itemClampPosition"],itemToCheck["itemClampLength"],itemToCheck["itemClampThickness"],itemToCheck["itemClampDescription"]];
        query = mysql.format(query, inserts);
        console.log(query);
        connection.query(query, function(err, rows, fields) {
            if (!err) {
                if (rows.length == 1) { 
                    console.log('Item found : itemToCheck : single row returned');
                    deferred.resolve(rows[0].item_id);
                } else if (rows.length > 1) {
                    console.log('Error while performing Query : itemToCheck : multiple rows returned');
                    deferred.resolve(rows[0].item_id);
                } else {
                    console.log('Item not found : itemToCheck');
                    deferred.resolve(-1);
                }
            } else {
                console.log('Error while performing Query : itemToCheck.');
                deferred.resolve(-1);
            }
        })
    }
    return deferred.promise;
}

// insert a new item
insertItem = function(user_id, data) {
    var deferred = q.defer();
    var returnData = {};

    var query = 'insert into item (opening, diameter, length, width, type, material, raw_ready, description, is_clamp, c_pos, c_length, c_thickness, c_desc, threshold, cb) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    var inserts = [data["itemOpening"], data["itemDiameter"], data["itemLength"], data["itemWidth"], data["itemType"], data["itemMaterial"], data["itemRawReady"], data["itemDescription"], data["itemClamped"], data["itemClampPosition"], data["itemClampLength"], data["itemClampThickness"], data["itemClampDescription"], data["itemThreshold"], user_id];
    query = mysql.format(query, inserts);
    console.log(query);
    connection.query(query, function(err, result) {
        if (!err) {
            console.log(result.insertId);
            deferred.resolve(result.insertId);
        } else {
            console.log('Error while performing Query : add item.');
            deferred.reject(err);
        }
    });
    return deferred.promise;
};

exports.checkDuplicateAddAndFetchItem = function(user_id, data) {
    var deferred = q.defer();
    checkDuplicateItem(data).then(function(itemId) {
        if (itemId == -1) {
            insertItem(user_id, data).then(function(itemId2) {
                deferred.resolve(itemId2);
            });
        } else {
            deferred.resolve(itemId);
        }
    });
    return deferred.promise;
};

exports.checkAndInsertDeposit = function(user_id, data) {
    var returnData = [];
    var deferred = q.defer();
    var queryString1 = 'select * from deposit where customer_id = ? and item_id = ?';
    var inserts = [data["customerId"], data["itemId"]];
    queryString1 = mysql.format(queryString1, inserts);
    console.log(queryString1);
    connection.query(queryString1, function(err, rows, fields) {
        if (!err) {
            var returnData2 = [];
            rows.forEach(function(row) {
                returnData2.push(row);
            });
            if (returnData2.length == 0) {
                var queryString2 = 'insert into deposit (customer_id, item_id, quantity, weight, cb) values (?,?,?,?,?)';
                inserts = [data["customerId"], data["itemId"], data["itemQuantity"], data["itemWeight"], user_id];
                queryString2 = mysql.format(queryString2, inserts);
                console.log(queryString2);
                connection.query(queryString2, function(err, result) {
                    if (!err) {
                        console.log(result.insertId);
                        deferred.resolve(result.insertId);
                    }
                });

            } else {
                var queryString2 = 'update deposit set  quantity=quantity + ?, weight=weight+ ? , ub=?  where customer_id=? and item_id =?';
                inserts = [data["itemQuantity"], data["itemWeight"], user_id, data["customerId"], data["itemId"]];
                queryString2 = mysql.format(queryString2, inserts);
                console.log(queryString2);
                connection.query(queryString2, function(err, result) {
                    if (!err) {
                        console.log(result.changedRows);
                        deferred.resolve(result.changedRows);
                    }
                });
            }
        }
    });
    return deferred.promise;
};

exports.checkAndInsertStock = function(user_id, data) {
    var returnData = [];
    var deferred = q.defer();
    var queryString1 = 'select * from stock where  item_id = ?';
    var inserts = [data["itemId"]];
    queryString1 = mysql.format(queryString1, inserts);
    console.log(queryString1);
    connection.query(queryString1, function(err, rows, fields) {
        if (!err) {
            var returnData2 = [];
            rows.forEach(function(row) {
                returnData2.push(row);
            });
            if (returnData2.length == 0) {
                var queryString2 = 'insert into stock (item_id, quantity, weight, cb) values (?,?,?,?)';
                inserts = [data["itemId"], data["itemQuantity"], data["itemWeight"], user_id];
                queryString2 = mysql.format(queryString2, inserts);
                console.log(queryString2);
                connection.query(queryString2, function(err, result) {
                    if (!err) {
                        console.log(result.insertId);
                        deferred.resolve(result.insertId);
                    }
                });

            } else {
                var queryString2 = 'update stock set quantity=quantity + ?, weight=weight+ ? , ub=?  where item_id =?';
                inserts = [data["itemQuantity"], data["itemWeight"], user_id, data["itemId"]];
                queryString2 = mysql.format(queryString2, inserts);
                console.log(queryString2);
                connection.query(queryString2, function(err, result) {
                    if (!err) {
                        console.log(result.changedRows);
                        deferred.resolve(result.changedRows);
                    }
                });
            }
        }
    });
    return deferred.promise;
};



// insert a new received
exports.insertReceived = function(user_id, data) {
    var deferred = q.defer();
    var returnData = {};

    var query = 'insert into received (customer_id, item_id, quantity, weight, received_date, cb) values (?,?,?,?, now(),?)';
    var inserts = [data["customerId"], data["itemId"], data["itemQuantity"], data["itemWeight"], user_id];
    query = mysql.format(query, inserts);
    console.log(query);
    connection.query(query, function(err, result) {
        if (!err) {
            console.log(result.insertId);
            returnData["receivedId"] = result.insertId;
            deferred.resolve(returnData);
        } else {
            console.log('Error while performing Query : add received.');
            deferred.reject(err)
        }
    });
    return deferred.promise;
};

// fetch receives based upon passed filters
exports.fetchReceive = function(receiveFilterDB) {
    var deferred = q.defer();
    var result;
    var queryString = 'select * from received, item where item.item_id = received.item_id ';

    if (receiveFilterDB != null && receiveFilterDB.length > 0) {
        queryString = queryString + " and " + receiveFilterDB.join(" and ");
    }
    console.log(queryString);
    connection.query(queryString, function(err, rows, fields) {
        if (!err) {
            var returnData = [];
            rows.forEach(function(row) {
                returnData.push(row);
            });
            deferred.resolve(returnData);
        } else {
            console.log('Error while performing Query : get order.');
            deferred.reject(err);
        }
    });
    return deferred.promise;
};

// fetch customer deposit based upon passed filters
exports.fetchCustomerDeposit = function(stockFilterDB) {
    var deferred = q.defer();
    var result;
    var queryString = 'select * from deposit, item, customer where deposit.item_id = item.item_id and deposit.customer_id = customer.customer_id';
    if (stockFilterDB != null && stockFilterDB.length > 0) {
        queryString = queryString + " and " + stockFilterDB.join(" and ");
    }
    console.log(queryString);
    connection.query(queryString, function(err, rows, fields) {
        if (!err) {
            var returnData = [];
            rows.forEach(function(row) {
                returnData.push(row);
            });
            deferred.resolve(returnData);
        } else {
            console.log('Error while performing Query : get deposit.');
            deferred.reject(err);
        }
    });
    return deferred.promise;
};

// fetch RWNC stock based upon passed filters
exports.fetchRwncStock = function(stockFilterDB) {
    var deferred = q.defer();
    var result;
    var queryString = 'select * from stock, item where item.item_id = stock.item_id ';
    if (stockFilterDB != null && stockFilterDB.size > 0) {
        query = query + " and " + stockFilterDB.join(" and ");
    }
    console.log(queryString);
    connection.query(queryString, function(err, rows, fields) {
        if (!err) {
            var returnData = [];
            rows.forEach(function(row) {
                returnData.push(row);
            });
            deferred.resolve(returnData);
        } else {
            console.log('Error while performing Query : get stock.');
            deferred.reject(err);
        }
    });
    return deferred.promise;
};


// fetch orders based upon passed filters
exports.fetchOrders = function(orderFilterDB) {
    var deferred = q.defer();
    var result;
    var queryString = 'select * from orders, item where item.item_id = orders.item_id ';

    if (orderFilterDB != null && orderFilterDB.length > 0) {
        queryString = queryString + " and " + orderFilterDB.join(" and ");
    }
    console.log(queryString);
    connection.query(queryString, function(err, rows, fields) {
        if (!err) {
            var returnData = [];
            rows.forEach(function(row) {
                returnData.push(row);
            });
            deferred.resolve(returnData);
        } else {
            console.log('Error while performing Query : get order.');
            deferred.reject(err);
        }
    });
    return deferred.promise;
};

// insert a new Order
exports.insertOrder = function(user_id, data) {
    var deferred = q.defer();
    var returnData = {};
console.log(data);
console.log(data.parentOrderId);
    var query = 'insert into orders (parent_order_id, customer_id, item_id, quantity, weight, rate, order_date, cb) values (?,?,?,?,?,?, now(),?)';
    var inserts = [data["parentOrderId"],data["customerId"], data["itemId"], data["orderQuantity"], data["orderWeight"], data["orderRate"], user_id];
    query = mysql.format(query, inserts);
    console.log(query);
    connection.query(query, function(err, result) {
        if (!err) {
            console.log(result.insertId);
            returnData["orderId"] = result.insertId;
	    returnData["parentOrderId"] = data["parentOrderId"];
            deferred.resolve(returnData);
        } else {
            console.log('Error while performing Query : add Order.');
            deferred.reject(err)
        }
    });
    return deferred.promise;
};


// fetch next parent order ID
exports.fetchNextParentOrderId = function() {
    var deferred = q.defer();
    var result;
    var queryString = 'select max(parent_order_id) + 1 as id from orders';
    console.log(queryString);
    connection.query(queryString, function(err, rows, fields) {
        if (!err) {
            var returnData;
            rows.forEach(function(row) {
                returnData=row.id;
            });

            deferred.resolve(returnData);
        } else {
            console.log('Error while performing Query : fetch next parent order ID.');
            deferred.reject(err);
        }
    });
    return deferred.promise;
};

// fetch productions based upon passed filter
exports.fetchProductions = function(productionFilterDB) {
    var deferred = q.defer();
    var result;
    var queryString = 'select * from production, orders, item, customer where production.order_id = orders.order_id and item.item_id = orders.item_id and orders.customer_id = customer.customer_id ';

    if (productionFilterDB != null && productionFilterDB.length > 0) {
        queryString = queryString + " and " + productionFilterDB.join(" and ");
    }

	queryString = queryString + ' order by field(production.status, "NOT STARTED", "STARTED", "COMPLETED") ';
    console.log(queryString);
    connection.query(queryString, function(err, rows, fields) {
        if (!err) {
            var returnData = [];
            rows.forEach(function(row) {
                returnData.push(row);
            });
            deferred.resolve(returnData);
        } else {
            console.log('Error while performing Query : get productions.');
            deferred.reject(err);
        }
    });
    return deferred.promise;
};

// insert a new production
exports.insertProduction = function(user_id, data) {
    var deferred = q.defer();
    var returnData = {};
    var query = 'insert into production (order_id, expected_end_date, start_date, pm, dice, machine, status, cb) values (?,?,?,?,?,?,?,?)';
    console.log(data);
    var inserts = [data["orderId"], data["expectedEndDate"], data["startDate"], data["productionManager"], data["dice"], data["machine"], data["status"], user_id];
    query = mysql.format(query, inserts);
    console.log(query);
    connection.query(query, function(err, result) {
        if (!err) {
            console.log(result.insertId);
            returnData["id"] = result.insertId;
            deferred.resolve(returnData);
        } else {
            console.log('Error while performing Query : add production.');
            deferred.reject(err)
        }
    });
    return deferred.promise;
};

// update a production
exports.updateProduction = function(user_id, data) {
    var deferred = q.defer();
    var returnData = {};
    var query = 'update production set expected_end_date = ?, start_date=?, end_date=?, pm=?, dice=?, machine=?, status=?, uo=now(), ub=? where production_id=?';
    var updates = [data["expectedEndDate"], data["startDate"], data["endDate"], data["pm"], data["dice"], data["machine"], data["status"], user_id, data["productionId"]];
    query = mysql.format(query, updates);
    console.log(query);
    connection.query(query, function(err, result) {
        if (!err) {
            console.log(result.insertId);
            returnData["Changed Rows"] = result.changedRows;
            deferred.resolve(returnData);
        } else {
            console.log('Error while performing Query : update production.');
            deferred.reject(err)
        }
    });
    return deferred.promise;
};
