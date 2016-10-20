
const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadline = (req, res) => {
    res.send({headlines: [ {username:"scott", headline:"Happy"} ]})
}

const putHeadline = (req, res) => {
    res.send({ headlines: [{
        username: "rho",
        headline: req.body.headline || "empty headline"
    }]})
}

const getEmail = (req, res) => {
    res.send({emails: [ {username:"scott", email:"sco@rice.edu"} ]})
}

const putEmail = (req, res) => {
    res.send({ emails: [{
        username: "rho",
        email: req.body.headline || "xx@rice.edu"
    }]})
}

const getZipcode = (req, res) => {
    res.send({zipcodes: [ {username:"scott", zipcode:"11111"} ]})
}

const putZipcode = (req, res) => {
    res.send({ zipcodes: [{
        username: "rho",
        zipcode: req.body.headline || "22222"
    }]})
}

const getAvatars = (req, res) => {
    res.send({avatars: [ {username:"scott", avatar:"picture url"} ]})
}

const putAvatars = (req, res) => {
    res.send({ avatars: [{
        username: "rho",
        avatar: req.body.headline || "empty avatar"
    }]})
}


module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:user?', getHeadline)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:user?', getAvatars)
     app.put('/avatar', putAvatars)
}
