var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {}); // <<-- this is loading index.ejs, that is why you see styles
});

module.exports = router;
