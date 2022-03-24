var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var adminR = require('./routes/admin');
var helmet = require('helmet')
var toobusy = require('toobusy-js')
var hpp = require('hpp')
var app = express();
var session = require('express-session')
var limiter = require('express-rate-limit')
var hbs = require('express-handlebars')


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs.engine({extname:"hbs",defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials/'}))
// for preventing exposure of unwanted X-http headers
app.use(helmet()) 
// to prevent dos/ddos/excess traffic
app.use(function(req,res,next){
  if(toobusy()){
    res.send(500,'Server too busy') 
  }else{
    next()
  }
})
// to avoid html parameter pollution
app.use(hpp())
// to avoid ddos/dos attack
app.use(limiter({
  windowMs:5000,
  max:10
}))
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
