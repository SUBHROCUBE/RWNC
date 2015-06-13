var mysql = require('mysql');
var q= require('q');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root12345',
    database: 'rwncv1'
});


exports.getuser=function(){
var deffered=q.defer();
var users=[];
connection.connect();

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
    connection.end();


return deffered.promise;

}
