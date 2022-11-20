// IMPORTS
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose')
require('dotenv').config()
const cronScheduler = require('./worker/cron-scheduler')
// ROUTES
var indexRouter = require('./routes/index');
var gifsRouter = require('./routes/gifs');
var songsRouter = require('./routes/songs');

// EXPRESS APP
var app = express();
// MIDDLEWARE
app.use(cors())
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
cronScheduler()

// MAIN ENDPOINTS
app.use('/', indexRouter);
app.use('/gifs', gifsRouter);
app.use('/songs', songsRouter)


// ERROR HANDLERS
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



/* 
  ======== Required fields for .env ========
  # EXPRESS
  PORT = xxxx

  # MONGODB
  MONGO_URI = mongodb+srv://xxxx:xxxx@xxxx.xxxxxxx.mongodb.net/xxxxxxxx?retryWrites=true&w=majority

  # GIFs
  GIF_API_KEY = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  # SPOTIFY
  SPOTIFY_CLIENT_ID = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  SPOTIFY_CLIENT_SECRET = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
*/