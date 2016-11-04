"use strict";
const md5 = require('md5')
const cookieParser = require('cookie-parser') 
const cookieKey = 'sid'
const Users = []
const salt = "i love google i love google i love google i love google i love google"


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function register(req, res){
	var username = req.body.username;
	var password = req.body.password;
	if(!username || !password){
		res.sendStatus(401).send("missing username or password")
		return
	}
	else{
        var userSalt = ""
        const randomSaltCnt = getRandomInt(1,10)
        Array(randomSaltCnt).fill().map((_, i) => {
            userSalt += salt
        })
        var hashSalt = md5(password + userSalt)
        Users.push({username:username, salt: userSalt, hash:hashSalt})
        res.send({username:username, salt: userSalt, hash:hashSalt})
	}
}

const isAuthorized = (salt, pwd, hash) => {
    return md5(pwd+salt) === hash
}

const login = (req, res) => {
    var username = req.body.username
    var password = req.body.password
    if (!username || !password) {
        res.sendStatus(401).send("missing username or password")
        return
    }

    var userObj = null
    Users.forEach(function(user){
        if (user.username === username) {
            userObj = user
        }
    })

    if(!userObj || !isAuthorized(userObj.salt, password, userObj.hash)){
        res.sendStatus(401).send("password does not match")
        return
    }

    res.cookie(cookieKey, 111, {maxAge: 3600*1000, httpOnly: true})
    res.send({ username: username, result: "success"})
}




module.exports = app => {
     app.use(cookieParser())
     app.post('/login', login)
     app.post('/register', register)
}