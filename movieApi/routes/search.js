var express = require('express');
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
    if (!searchTerm) {
        res.json({
            msg: "Query is required"
        })
    }
    res.json("Test")
})



// GET/search/person
router.get('/person', (req, res, next) => {
    res.json("Test")
})


module.exports = router;
