var express = require('express');
var pug = require('pug');
var path = require('path');

var port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
//app.use(express.static(path.join(__dirname, 'public')));



app.get('/', function (req, res) {
    res.send("<h1>AJAY</h1>");
});

app.get('/a', function (req, res) {
    res.render('hello',{'name':'ajay'});
});


app.listen(port);
