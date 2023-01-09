const path = require('path')

const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')

const helmet = require('helmet')
const { clear } = require('console') // <<-  idk why this is here, mistake
const { raw } = require('express')
const { parseArgs } = require('util')
app.use(helmet())
// app.use(helmet({
//     contentSecurityPolicy: false,
// }))




// serve up static files
app.use(express.static('public'))
// Parse json and urlencoded data into req.body
app.use(express.json())
app.use(express.urlencoded())
// Parse the cookies
app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use((req, res, next) => {

    if (req.query.msg === 'fail') {
        res.locals.msg = `Sorry this username and password does not exist`
    }

    else {
        res.locals.msg = ``
    }

    // Send me onto the next piece of middleware
    next()
})



app.get('/', (req, res, next) => {
    res.send("Sanity Check")
})

// -------------------------------

app.get('/login', (req, res, next) => {

    // the req object has a query property in Express
    // req.query is an obj, with a property of every key in the query string
    // The query string is where you put insecure data

    // console.log(req.query); // <<-- this will print { msg: 'fail', test: 'hello'}
    res.render('login')
})

app.post('/process_login', (req, res, next) => {
    // req.body is made by urlencoded(), which parses the http message for sent data!
    const password = req.body.password
    const username = req.body.username

    // check the database to see if user credentials are valid
    // if they are valid...
    // - save their username in a cookie
    // - then send them to the welcome page
    if (password === 'x') {
        // res.cookie takes 2 args:
        //     1. name of the cookie
        //     2. value to set it to
        res.cookie('username', username)
        // res.redirect takes 1 arg, where to send the browser
        res.redirect('/welcome')
    }

    else {
        // the "?" is a special character in a URL
        // ----- 1. they hold key/value pairs: "msg=fail"
        // ----- 2. multiple key/value pairs are serperated by "&"

        res.redirect('/login?msg=fail&test=hello') // <<-- this is the query string
    }

    // res.json(req.body)
})

app.get('/welcome', (req, res, next) => {
    // The, req.cookies obj will have a property for every named cookie
    // that has been set.
    res.render('welcome', {
        username: req.cookies.username
    })
})
// ------------------------------------------------------------------------------------------------------------------------------

// app.param() - takes 2 args
//     1. param to look for in the route
//     2. the callback to run (with the usuals)

app.param('id', (req, res, next, id) => {

    console.log('Params called: ', id);
    // if id has something to do with stories...
    // if id has something to do with blog...

    next()
})

// --------------------- This code is ass but it works, instead we'll so something else
// app.get('/story/1', (req, res, next) => {
//     res.send(`<h1>Story 1<h1/>`)
// })
// app.get('/story/2', (req, res, next) => {
//     res.send(`<h1>Story 2<h1/>`)
// })
// app.get('/story/3', (req, res, next) => {
//     res.send(`<h1>Story 3<h1/>`)
// })
// ---------------------- ⬇️⬇️⬇️

// in a route, anytime something has a ":" in front, is a WILDCARD!
// WILDCARD's will match anything in that slot ⬇⬇

app.get('/story/:storyId', (req, res, next) => {
    // the req.params obj always exists
    // it will have a property for each wildcard in the route
    res.send(`<h1>Story ${req.params.storyId}</h1>`)
    // res.send(`<h1>Story 1<h1/>`)
})

app.get('/story/:storyId/:link', (req, res, next) => {
    // the req.params obj always exists
    // it will have a property for each wildcard in the route
    res.send(`<h1>Story ${req.params.storyId} - ${req.params.link}</h1>`)
    // res.send(`<h1>Story 1<h1/>`)
})
// ------------------------------------------------------------------------------------------------------------------------------






app.get('/logout', (req, res, next) => {
    // res.clearCookie take 1 arg:
    // 1. Cookie to clear, (by name)
    res.clearCookie('username')
    res.redirect('/login')
})





const port = 5000
app.listen(port)
