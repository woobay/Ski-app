const axios = require('axios')

exports.renderLogin = (req, res) => {
    res.render("login.ejs")
}
exports.renderProfil = (req, res) => {
    res.render("profil.ejs")
}
exports.renderSignup = (req, res) => {
    res.render("signup.ejs")
}

exports.renderNewUser = (req, res) => {
    let username = req.body.userName
    let email = req.body.mail
    let password = req.body.password

    axios.post(`https://ski-api.herokuapp.com/signup`, 
    {
        name: username,
        email: email,
        password: password
    }).then(result => {res.render("login", result.data)})
    .catch()
}