const express = require('express')
const app = express()

// Req ---MIDDLEWARE--- Res
// 1. Request comes in
// 2. We need to validate the user, sometimes.
// 3. We need to store some things in DataBase
// 4. If there is datat from the users, we need to parse it and store it
// 5. Respond

function validateUser(req, res, next) {
    // get info of the req object
    // do stuff with DB
    res.locals.validated = true
    console.log('VALIDATED RAN');
    next()
}

app.use('/admin', validateUser)

app.get('/', (req, res, next) => {
    res.send(`<h1>Main Page<h1/>`)
    console.log(res.locals.validated);

})

app.get('/admin', (req, res, next) => {
    res.send(`<h1>Admin Page<h1/>`)
    console.log(res.locals.validated);

})

app.listen(5000)
