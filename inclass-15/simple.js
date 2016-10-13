var http = require('http')

var host = '127.0.0.1'
var port = 3333

http.createServer(preprocess).listen(port, host)
console.log('Server running at http://' + host + ':' + port)

function preprocess(req, res) {
     var body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

     var payload
     if (req.method === 'GET') {
        if (req.url === '/'){
            payload = { 'hello': 'world' }
        }
        else if(req.url === "/articles"){
            payload = { articles: [{id:1, author:'Scott', body:'Post'}, 
            {id:2, author:'Rho', body:'Hello'}, {id:3, author:'Jim', body:'World'}]}
        }
     }

     if (req.method === 'PUT' && req.url === "/logout") {
        payload = "OK"
     }

     if (req.method === 'POST' && req.url === '/login'){
        var payloadJSON = JSON.parse(req.body)
        payload = {username: payloadJSON.username, password: payloadJSON.password}
     }
     
     res.setHeader('Content-Type', 'application/json')
     res.statusCode = 200
     res.end(JSON.stringify(payload))
}
