"use strict";
var Profile = require('./model.js').Profile

const uploadImage = require('./uploadCloudinary')


const getHeadlines = (req, res) => {
    if (!req.user) req.user = Profile.username
    const users = req.params.users ? req.params.users.split(',') : [req.user]
    const headlinesOutput = []

    users.forEach(function(user){
        Profile.findOne({username: user}).exec(function(err, profile){
            if (profile !== null){
                headlinesOutput.push({username: user, headline: profile.headline})
            }
        })
    })

    res.send({headlines: headlinesOutput})
}

const putHeadline = (req, res) => {
    if (req.body.headline) {
        Profile.update({ username: req.username }, { $set: { headline: req.body.headline }})
    }
    res.send({username: req.username, headline: req.body.headline})
}

const getEmail = (req, res) => {
    if(req.params.user){
        //res.send({username: req.params.user, email: Profile.email})
    }
    else{
        Profile.findOne({ username: req.username }).exec(function(err, profile){
            res.send({username: req.username, email: profile.email})
        })
    }
}

const putEmail = (req, res) => {
    if (req.body.email) {
        Profile.update({ username: req.username }, { $set: { email: req.body.email }})
    }
    res.send({username: req.username, email: req.body.email})
}

const getZipcode = (req, res) => {
    if(req.params.user){
        //res.send({username: req.params.user, zipcode: Profile.zipcode})
    }
    else{
        Profile.findOne({ username: req.username }).exec(function(err, profile){
            res.send({username: req.username, email: profile.zipcode})
        })
    }
}

const putZipcode = (req, res) => {
    if (req.body.zipcode) {
        Profile.update({ username: req.username }, { $set: { zipcode: req.body.zipcode }})
    }
    res.send({username: req.username, zipcode: req.body.zipcode})
}

const getAvatars = (req, res) => {
    if (!req.user) req.user = Profile.username
    const users = req.params.users ? req.params.users.split(',') : [req.user]
    const avatarsOutput = []

    users.forEach(function(user){
        avatarsOutput.push({username: user, avatar: Profile.avatar})
    })

    res.send({avatars: headlinesOutput})
}

const putAvatars = (req, res) => {
    if (req.body.img) {
        Profile.avatar = req.body.img
    }
    res.send({username: Profile.username, avatar: req.body.img})
}

const getDOB = (req, res) => {
    res.send({username: Profile.username, dob: Profile.dob})
}

const uploadAvatar = (req, res) => {
    Profile.update({username: req.username }, { $set: { avatar: req.fileurl }})
}


module.exports = app => {
     app.get('/headlines/:users*?', getHeadlines)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:user?', getAvatars)
     app.put('/avatar', uploadImage('avatar'), uploadAvatar)
     app.put('/avatar', putAvatars)
     app.get('/dob', getDOB)
}

module.exports.profile = Profile

module.exports.userLogin = (uname) => {
    Profile.username = uname
}

module.exports.userRegister = (uname, email, dob, zipcode, pwd) => {
    Profile.username = uname
    Profile.email = email
    Profile.dob = dob
    Profile.zipcode = zipcode
    Profile.password = pwd
}

module.exports.updatePwd = (pwd) => {
    Profile.password = pwd
}

module.exports.addFollower = (uid) => {
    Profile.followers.push(uid)
}

module.exports.deleteFollower = (uid) => {
    const index = Profile.followers.indexOf(uid)
    if (index !== -1){
        Profile.followers.splice(index, 1)
    }
}