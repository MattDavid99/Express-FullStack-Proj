const http = require('http')

const server = http.createServer((req, res) => {
    // console.log(req);

    // res = our way of responding to the requester
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write('<h1>hello world</h1>')
    res.end()
})

server.listen(5000)
