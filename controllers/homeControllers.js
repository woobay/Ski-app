const axios = require('axios')
const apiController = require('./apiController')

exports.renderLogin = (req, res) => {
    res.render("login.ejs")
}

exports.renderSignup = (req, res) => {
    res.render("signup.ejs")
}

exports.renderSearch = async (req, res) => {
    const TOKEN = req.app.locals.token
    const word = req.query.word
     
    const result = await apiController.searchFriend(TOKEN, word)
    res.render("search", {users: result.users, word: word})
}

exports.renderProfilMyFriends = async (req,res) => {
    const TOKEN = req.app.locals.token
    
    const result = await apiController.getFriends(TOKEN)
    
    res.render("profil-user-myfriends", {users: result.friends})

}

exports.renderProfilUser = async (req, res) => {
    const TOKEN = req.app.locals.token
    
    const result = await apiController.getFriends(TOKEN)
    
    res.render("profilUser", {users: result.friends})
}

exports.renderProfilPerson = async (req, res) => {
    const TOKEN = req.app.locals.token
    const friendId = req.params.id
    const userId = req.params.id
    // const friends = req.locals.
     
    const result = await apiController.infoFriend(friendId, TOKEN)
    const userInfo = await apiController.getUser(userId, TOKEN)
    console.log(userInfo)
    res.render("profilPerson", {users: result.friends, userInfo: userInfo.user})
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
exports.addFriend = async (req, res) => {
    const friendId = req.params.id
    const TOKEN = req.app.locals.token
    const word = req.query.word

    console.log(word)
    await apiController.addFriend(friendId, TOKEN)
    res.render("search", {word: word})
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