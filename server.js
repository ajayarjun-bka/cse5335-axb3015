var express = require('express');
var pug = require('pug');
var mongodb = require('mongodb');
var path = require('path');
var fs = require('fs');
var port = process.env.PORT || 5000;
var app = express();
var mongoose = require('mongoose');
var mongodbUri = 'mongodb://heroku_zf2ln3fx:batrgh1r3emubhs6unnirlmvbl@ds163397.mlab.com:63397/heroku_zf2ln3fx';
mongoose.connect(mongodbUri);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

var Schema = mongoose.Schema;

// var UserSchema = new Schema({
//     _id: Number,
//     name : String
// });
//
// var User = mongoose.model('User', UserSchema);

var customers = new Schema({
    pk: Number,
    AGE: Number,
    SEX: Number,
    NATIONAL_PROVIDER_ID: Number,
    LENGTH_OF_STAY: Number,
    DRG_PRICE: Number
});

var Customer = mongoose.model('Customer', customers);







app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use('/', function (req, res, next) {
    console.log('Request Type:', req.method, ' url: ', req.url);
    next();
});

app.get('/', function (req, res) {
    res.render('index');
});


app.get('/partials/:name', function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
});

app.get('/table-data', function (req, res) {
    var obj;
    fs.readFile('sample.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        res.json(obj);
    });
});

app.get('/users/:id', function (req, res) {
    Customer.find({pk:req.params.id}, function (err, docs) {
        //console.log(docs)
        res.json(docs);
    })
});
app.get('/graph-data', function (req, res) {
    var data = '[{"label":"toyota","count":45},{"label":"HONDA","count":60},{"label":"NISSAN","count":30},{"label":"GM","count":50}]';
    var rows = JSON.parse(data);
    res.json(rows);
});

app.get('/map-data', function (req, res) {
    var data = [{lat: 32.738647, lng: -97.107513}, {lat: 32.733487, lng: -97.120123},
        {lat: 32.735095, lng: -97.114823}];
    res.json(data);
});

app.listen(port);



