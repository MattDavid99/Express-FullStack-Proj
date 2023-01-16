var express = require('express');
var router = express.Router();

const movies = require('../data/movies')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/most_popular', (req, res, next) => {
  // get the page variable from the query string
  let page = req.query.page;
  if (page === undefined) page = 1;

  // if (req.query.api_key != 123456789) {
  //   res.json("Invaild API Key")

  // } else {
  let results = movies.filter((movie) => {
    return movie.most_popular;
  })
  results = results.slice((page - 1) * 20, (page - 1) * 20 + 19)
  if (!results) {
    res.json({
      msg: "Movie ID Not Found",
      production_companies: []
    })
  }

  res.json({ results })
  // }
})

module.exports = router;
