var express = require('express');
const movies = require('../data/movies');
const people = require('../data/people')
var router = express.Router();


function queryRequired(req, res, next) {
    const searchTerm = req.query.query
    if (!searchTerm) {
        res.json({
            msg: "Query is required"
        })

    } else {
        next()
    }
}

// This middleware will be used by ALL routes in THIS router
router.use(queryRequired)


// GET /search/movie
router.get('/movie', (req, res, next) => {
    const searchTerm = req.query.query
    const results = movies.filter((movie) => {
        let found = movie.overview.includes(searchTerm) || movie.title.includes(searchTerm)
        return found
    })
    res.json({ results })
})



// GET/search/person
router.get('/person', (req, res, next) => {
    const searchTerm = req.query.query
    const results = people.filter((movie) => {
        let found = movie.overview.includes(searchTerm) || movie.title.includes(searchTerm)
        return found
    })
    res.json({ results })
})


module.exports = router;
