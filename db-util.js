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
                console.log(row.user_name);
                users.push(row.user_name);
            });
            deffered.resolve(users)
        } else {
            console.log('Error while performing Query.');
        }
    });
    return deffered.promise;
};
exports.putUser = function(data) {
    var deffered = q.defer();
    var result;
    connection.query('insert into user (user_name,user_pwd) values("' + data.name + '","' + data.pwd + '")', function(err, rows, fields) {
        if (!err) {
	    deffered.resolve('posted');
        } else {
            console.log('Error while performing Query.');
        }
    });
    return deffered.promise;
};
