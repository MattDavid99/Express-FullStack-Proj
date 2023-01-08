const path = require('path')

const express = require('express')
const app = express()

const helmet = require('helmet')
app.use(helmet())
// app.use(helmet({
//     contentSecurityPolicy: false,
// }))


const port = 5000


// serve up static files
app.use(express.static('public'))
// Parse json and urlencoded data into req.body
app.use(express.json())
app.use(express.urlencoded())

// ⬇️ takes a {key: value}
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// 1. Express as we know it happens. This file
// 2. We define a view engine
//  --EJS
//  --HandleBars
//  --Jade/Pug
// 3. Inside one of our routes, we have res.render()
// 4. We pass that res.render() 2 things:
//  -- the file we want to use
//  -- the data we want to send to that file
// 5. Express uses that node module for our specified view engine and parses the file.
//  -- that means, it takes the HTML/CSS and combines it with whatever "node" there is in the file.
// 6. The final result if this process is a compiled product of things the browser can read.
//  -- HTML, JS, CSS

app.get('/', (req, res, next) => {
    res.render("index")
})







app.listen(port)
