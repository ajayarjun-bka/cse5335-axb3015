var express = require('express');

var app = express();
var port = process.env.PORT || 5000;

app.get('/', function (req, res) {
    res.send("<h1>AJAY</h1>");
});

app.listen(port);


/*
 var http = require('http')

 http.createServer(function (req, res) {
 res.writeHead(200, {'content-type': 'text/html'});
 res.end("<h1>Hello World</h1>");
 }).listen(process.env.PORT || 5000);
 console.log("Server Started");*/
