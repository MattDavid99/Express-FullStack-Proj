var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//============PASSPORT FILES===============/
const passport = require('passport')
const GitHubStrategy = require('passport-github')
//=========================================/

var indexRouter = require('./routes/index');

var app = express();

const helmet = require("helmet") // <<-- Remember to: npm install helmet --save
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    "img-src": ["'self'", "https: data:"]
  }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);



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

// ------------------------------------------------------------ (API Key)
// API key: 1fb720b97cc13e580c2c35e1138f90f8

// If you want to get your own (or this stops working), sign up here: https://www.themoviedb.org/documentation/api?language=en-US

// API Docs: https://developers.themoviedb.org/3/getting-started/introduction

// Starter files: https://github.com/ridiculous-inc/justExpress/tree/master/starterFiles/movieAppProj1

// API vars:

// const apiBaseUrl = 'http://api.themoviedb.org/3';
// const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
// const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

module.exports = app;
