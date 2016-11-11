"use strict";
const express = require('express')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook')
const profileModule = require("./profile")

const users = {}
const config = { clientSecret: 'd342da722aa1746b7d4335d2fc617bdd',
    clientID: '1016275288481588', callbackURL: 'http://localhost:3000/callback' }


function logout(req, res) {
    req.logout()
    res.redirect('/')
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        next()
    } else {
        res.redirect('/auth/facebook')
    }
}

function profile(req, res) {
    res.send('ok what now?', req.user)
}

function fail(req, res) {
    res.send('you fail', req.user)
}


passport.serializeUser(function(user, done){
    users[user.id] = user
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    var user = users[id]
    done(null, user)
})

passport.use(new FacebookStrategy(config, 
    function(token, refreshToken, profile, done){
        process.nextTick(function(){
            return done(null, profile)
        })
    }))

module.exports = app => {
     app.use('/auth/facebook', passport.authenticate('facebook', { scope: 'email'}))
     app.use('/callback', passport.authenticate('facebook', {
         successRedirect: '/profile', failureRedirect: '/fail'
     }))
     app.use('/profile', isLoggedIn, profile)
     app.use('/fail', fail)
     app.use('/logout', logout)
}