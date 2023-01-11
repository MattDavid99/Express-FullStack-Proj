var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // const date = new Date(1969, 6, 20)
  // res.set('Date')
  // res.set('Cache-Control', 'no-store')
  // res.set('Content-Type', 'text/html')

  // fresh and scale

  res.render('index', { title: 'Express' });
});

module.exports = router;
