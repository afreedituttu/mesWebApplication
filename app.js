var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('express-handlebars')
const { engine } = require('express-handlebars')
var indexRouter = require('./routes/index');
var adminR = require('./routes/admin');
var db = require('./db/connection')
var app = express();
var session = require('express-session')
//---------- email ----------//
// let sibkey = process.env.SIB_API_KEY
// var SibApiV3Sdk = require('sib-api-v3-sdk');
// SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = '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';

// new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({

//      "sender":{ "email":"afreedisulfiker@gmail.com", "name":"Afreei Backend developer"},
//      "subject":"This is my default subject line",
//      "htmlContent":"<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>",
//      "params":{
//         "greeting":"This is the default greeting",
//         "headline":"This is the default headline"
//      },
//    "messageVersions":[
//      //Definition for Message Version 1 
//      {
//          "to":[
//             {
//                "email":"mumthas77@gmail.com",
//                "name":"mumthas"
//             },
//             {
//                "email":"aliyasulfi18@gmail.com",
//                "name":"aliya"
//             }
//          ]
//       }
//     ]
// }).then(function(data) {
//   console.log(data);
// }, function(error) {
//   console.error(error);
// });
//---------- endof emai ---------//
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.engine('hbs',hbs())
// app.engine('hbs',handlebars({layoutsDir:__dirname+'/views/layouts',extname:'hbs'}))
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"tuttukey",cookie:{maxAge:60000}}))

app.use('/', indexRouter);
app.use('/code123admin',adminR)
// app.use('/code123admin', adminR);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
