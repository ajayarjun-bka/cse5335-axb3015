var express = require('express');
var pug = require('pug');
var path = require('path');
var fs = require('fs');
var port = process.env.PORT || 5000;
var app = express();


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/routes'));
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use('/', function (req, res, next) {
    console.log('Request Type:', req.method, ' url: ', req.url);
    next();
});

app.get('/', function (req, res) {
    res.render('hello');
    //console.log(req.path);
});


app.get('/public/partials/:name',function (req,res) {
    res.render('/public/partials/'+req.params.name);
    //console.log(req.path);
});

app.get('/json', function (req, res) {
    var obj;
    fs.readFile('sample.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        res.json(obj);
    });
});

app.get('/graphdata', function (req, res) {
    var data = '[{"label":"toyota","count":45},{"label":"HONDA","count":60},{"label":"NISSAN","count":30},{"label":"GM","count":50}]';
    var rows = JSON.parse(data);
    res.json(rows);
});

app.get('/mapdata', function (req, res) {
    var data = [{lat: 32.738647, lng: -97.107513}, {lat: 32.733487, lng: -97.120123},
        {lat: 32.735095, lng: -97.114823}];
    res.json(data);
});

app.listen(port);



