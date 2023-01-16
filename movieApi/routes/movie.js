var express = require('express');
var router = express.Router();

const movieDetails = require('../data/movieDetails')

/* GET MOVIE page. */
// /movie/...
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

// GET /movie/movie:Id
router.get('/:movieId', (req, res, next) => {
    const movieId = req.params.movieId
    const results = movieDetails.find((movie) => {
        return movie.id === +movieId;
    })
    res.json(results)
})

// GET /movie/top_rated

// POST /movie/{movie_id}/rating

// DELETE /movie/{movie_id}/rating

module.exports = router;
