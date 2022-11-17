var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose')
require('dotenv').config()

const scheduledFetchGIF = require('./worker/fetch-gifs').scheduledFetchGIF

// ROUTES
var indexRouter = require('./routes/index');
var gifsRouter = require('./routes/gifs');

var app = express();

// MIDDLEWARE
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// DATABASE
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Database connection successful')
    })
    .catch(err => {
      console.error('Database connection error', err)
    })


// CRON JOBS
scheduledFetchGIF()

// ENDPOINTS
app.use('/', indexRouter);
app.use('/giphy', gifsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
