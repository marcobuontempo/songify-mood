var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var scheduledFetchGIF = require('./worker/fetch-gifs').scheduledFetchGIF

require('dotenv').config()

// ROUTES
var indexRouter = require('./routes/index');
var giphyRouter = require('./routes/gifs');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// CRON JOBS
// scheduledFetchGIF()

// ENDPOINTS
app.use('/', indexRouter);
app.use('/giphy', giphyRouter);

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
