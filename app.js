var express = require('express');
var cookieParser = require('cookie-parser');
var expressLayouts = require('express-ejs-layouts');
var logger = require('morgan');
var path = require('path');
var routers = require('./routes/route');
var app = express();

// var expressLayouts = require('express-ejs-layouts');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout','layout');
app.set('layout extractScripts', true);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));


// app.use(expressLayouts);
app.use('/', routers);

module.exports = app;




