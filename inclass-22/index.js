"use strict";
const express = require('express')
const bodyParser = require('body-parser')

const modifyHeaders = (req, res, next)=>{
	var origin=req.headers.origin
	res.set({'Access-Control-Allow-Credentials': true,
             'Access-Control-Allow-Headers': 'Authorization, Content-Type, X-Requested-With, Origin',
             'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
             'Access-Control-Allow-Origin': origin})
    console.log(res)
	if(req.method==='OPTIONS'){
		res.status(200).send()	
	}
    else{
		next()
	}
}


const app = express()
app.use(bodyParser.json())
app.use(modifyHeaders)
require('./src/profile')(app)
require('./src/articles')(app)
require('./src/auth')(app)
require('./src/following')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
