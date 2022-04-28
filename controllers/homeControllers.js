const axios = require('axios')
const apiController = require('./apiController')

exports.renderLogin = (req, res) => {
    res.render("login.ejs")
}

exports.renderSignup = (req, res) => {
    res.render("signup.ejs")
}

exports.renderProfil = (req, res) => {
    res.render("profil.ejs")
}

exports.renderSearch = (req, res) => {
    res.render("search.ejs")
}

exports.renderProfilMyFriends = (req,res) => {
    res.render("profil-user-myfriends.ejs")
}

exports.renderProfilUser = (req, res) => {
    res.render("profilUser.ejs")
}

exports.renderProfilPerson = (req, res) => {
    res.render("profilPerson.ejs")
}

exports.renderFeed = async (req, res) => {
    const TOKEN = req.app.locals.token
    
   const result = await axios.get(`https://ski-api.herokuapp.com/ski-spot?limit=5&page=1`, {
        headers: {
            "Content-Type": "application/json", 
            "Authorization": TOKEN
        }
    })
    res.render("feed", {spots: result.data.skiSpots})
}


exports.renderNewUser = async (req, res) => {
    let username = req.body.userName
    let email = req.body.mail
    let password = req.body.password

    const result = await apiController.newUser(username, email, password)
    res.render("login", result)
}

exports.postAuthentication = async (req, res) => {
    const emailValue = req.body.email
    const passwordValue = req.body.password

    const info = await apiController.authenticationLogin(emailValue, passwordValue)

    res.app.locals.token = info.token;
    res.app.locals.name = info.name;
    res.app.locals.surname = info.name.split(' ')[0];

    const spot = await apiController.getSkiSpot(info.token, 5, 1)

    res.render("feed", {info: info, spots: spot.skiSpots})
}


exports.renderSpotDescription = async (req, res) => {
    const TOKEN = req.app.locals.token
    const queryId = req.params.id
    const created = req.params.create

   const spot = await apiController.infoSpot(queryId, TOKEN)
   const info = await apiController.infoCreater(created, TOKEN)
 
    res.render("description", {spot: spot.skiSpot, info: info.user})
}


exports.newSpots = (req, res) => {
    res.render("newSpot")
}
exports.renderSpots = async (req, res) => {
    const TOKEN = req.app.locals.token
    const page = req.query.page
    
    const result = await apiController.getSkiSpot(TOKEN, 12, page)

    res.render("spots", {spots: result.skiSpots, pages: result.totalPages})
  
}

exports.addedSpots = async (req, res) => {
    
    const name = req.body.name
    const description = req.body.description
    const adresse = req.body.address
    const difficulty = req.body.difficulty
    const left = req.body.left
    const right = req.body.right
    const array = JSON.parse(`[${left}, ${right}]`)
    
    const TOKEN = req.app.locals.token
    
    await apiController.addSpot(name, description, adresse, difficulty, array, TOKEN)
    res.redirect("/spots")
}

exports.deletePostFeed = async (req, res) => {
    const queryId = req.params.id
    const TOKEN = req.app.locals.token

    await apiController.deletePost(queryId, TOKEN)
    res.redirect("/feed")    
}

exports.deletePostSpots =  async (req, res) => {
    const queryId = req.params.id
    const TOKEN = req.app.locals.token

    await apiController.deletePost(queryId, TOKEN)
    res.redirect("/spots")
   
}

exports.editSpot = async (req, res) => {
    const TOKEN = req.app.locals.token
    const queryId = req.params.id

    const result = await apiController.editSpot(queryId, TOKEN)
    res.render("edit", {spot: result.skiSpot})
    
}

exports.updateSpot = async (req, res) => {
    const queryId = req.params.id

    const name = req.body.name
    const description = req.body.description
    const adresse = req.body.address
    const difficulty = req.body.difficulty
    const left = req.body.left
    const right = req.body.right
    
    const array = JSON.parse(`[${left}, ${right}]`)
    
    const TOKEN = req.app.locals.token

    await apiController.putSpot(queryId, TOKEN, name, description, adresse, difficulty, array)
    
    res.redirect("/spots")
    
}