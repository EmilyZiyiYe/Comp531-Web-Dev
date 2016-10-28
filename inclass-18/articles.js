
const express = require('express')
const bodyParser = require('body-parser')


let allArticles = [{id:1, author:'Scott', text:'This is my first article'}, 
            {id:2, author:'Max', body:'This is max article'}, 
            {id:3, author:'Lee', body:'This is lee article'}]

const addArticle = (req, res) => {
     var newId = allArticles.length + 1
     var newArticle = {id: newId, author:"Rho", text:req.body.body}
     allArticles.push(newArticle)
     res.send(newArticle)
}

const getArticles = (req, res) => {
	if(req.params.id){
		res.send(allArticles.filter((article) => {
			return article.id == req.params.id
		}))		
	} else {
		res.send(allArticles)
	}
}

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles/:id*?', getArticles)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
