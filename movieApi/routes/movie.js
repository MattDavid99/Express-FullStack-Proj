var express = require('express');
var router = express.Router();

const movieDetails = require('../data/movieDetails')


function requireJSON(req, res, next) {
    if (req.is('application/json')) {
        res.json({
            msg: 'Content-Type must be application/json'
        })
    } else {
        next()
    }
}


router.param(('movieId'), (req, res, next) => {
    // update the db with analytics data
    // console.log("Someone hit a route that used the movieId wildcard!");
    next()
})

/* GET MOVIE page. */
// /movie/...
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});



// GET /movie/top_rated
router.get('/top_rated', (req, res, next) => {
    let page = req.query.page
    if (!page) {
        page = 1
    }
    const results = movieDetails.sort((a, b) => {
        return b.vote_average - a.vote_average
    })
    const indexToStart = (page - 1) * 20
    res.json(results.slice(indexToStart, indexToStart + 20))
})

// GET /movie/movie:Id
// This one needs to come last of all /SOMETHING
router.get('/:movieId', (req, res, next) => {
    const movieId = req.params.movieId
    const results = movieDetails.find((movie) => {
        return movie.id === +movieId;
    })
    res.json(results)
})

// POST /movie/{movie_id}/rating
router.post('/:movieId/rating', requireJSON, (req, res, next) => {
    const movieId = req.params.movieId

    const userRating = req.body.value
    if ((userRating < 0.5 || userRating > 10)) {
        res.json({
            msg: "Rating must be between 0.5 and 10"
        })
    } else {
        res.json({
            msg: "Thank for your rating",
            status_code: 200
        })
    }
})


// DELETE /movie/{movie_id}/rating
router.delete('/:movieId/rating', requireJSON, (req, res, next) => {
    res.json({
        msg: "Rating deleted"
    })
})

module.exports = router;
