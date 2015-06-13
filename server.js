console.log("Hello RWNC");
var http = require('http');
var dispatcher = require('httpdispatcher');
const PORT = 8080;
dispatcher.setStatic('resources');
var dbUtil = require('./db-util');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root12345',
    database: 'rwncv1'
});
//server
var server = http.createServer(handleRequest);
server.listen(PORT, function() {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
// request handler
function handleRequest(request, response) {
    try {
        console.log(request.url);
        dispatcher.dispatch(request, response);
    } catch (err) {
        console.log(err);
    }
}
// user get
dispatcher.onGet("/users", function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    var result = [];
    dbUtil.getUsers().then(function(users) {
        res.end((JSON.stringify(users)).toString());
    })
});
// user post
dispatcher.onPost("/user", function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    var body = JSON.parse(req.body);
    dbUtil.putUser(body).then(function(id) {
        res.end((JSON.stringify(id)).toString());
    })
    console.log(body);
});
