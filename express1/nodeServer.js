// const http = require('http')
// //
// const fs = require('fs')

// const server = http.createServer((req, res) => {
//     if (req.url === '/') {

//         // console.log(req);

//         // res = our way of responding to the requester
//         res.writeHead(200, { 'content-type': 'text/html' })
//         // res.write()
//         const homePageHtml = fs.readFileSync('node.html')
//         res.write(homePageHtml)
//         res.end()

//     } else {

//         res.writeHead(404, { 'content-type': 'text/html' })
//         res.write(`<h3>Sorry this isn't the page you're looking for</h3>`)
//         res.end()
//     }
// })

// server.listen(5000)
