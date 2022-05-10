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

    const infoFriends = await apiController.getFriends(TOKEN)
    let friends = infoFriends.friends.map(friend => friend.id)

    const result = await apiController.searchFriend(TOKEN, word)

    
    res.render("search", {
        page_name : 'Search',
        users: result.users, 
        word: word, 
        friends: friends
    })
}

exports.renderProfilMyFriends = async (req,res) => {
    const TOKEN = req.app.locals.token
    
    const result = await apiController.getFriends(TOKEN)
    
    res.render("profil-user-myfriends", {
        page_name : 'Myfriends',
        users: result.friends
    })

}

exports.renderProfilUser = async (req, res) => {
    const TOKEN = req.app.locals.token
    
    const result = await apiController.getFriends(TOKEN)
    
    res.render("profilUser", {
        page_name : 'ProfilUser',
        users: result.friends
    })
}

exports.renderProfilPerson = async (req, res) => {
    const TOKEN = req.app.locals.token
    const friendId = req.params.id
    const userId = req.params.id
    
    const userFriends = await apiController.getUserFriends(friendId, TOKEN)

    const userInfo = await apiController.getUser(userId, TOKEN)
    const infoFriends = await apiController.getFriends(TOKEN)
    let friends = infoFriends.friends.map(friend => friend.id)
    

    res.render("profilPerson", {
        page_name : 'ProfilPerson',
        userFriends: userFriends.friends,
        userName: userInfo.user.name,
        userId: userInfo.user.id,
        friends: friends
    })
}

exports.renderFeed = async (req, res) => {
    const TOKEN = req.app.locals.token
    
   const result = await axios.get(`https://ski-api.herokuapp.com/ski-spot?limit=5&page=1`, {
        headers: {
            "Content-Type": "application/json", 
            "Authorization": TOKEN
        }
    })
    res.render("feed", {
        page_name : 'Feed',
        spots: result.data.skiSpots
    })
}
exports.addFriend = async (req, res) => {
    const friendId = req.params.id
    const TOKEN = req.app.locals.token
    const word = req.query.word

    
    let result = await apiController.addFriend(friendId, TOKEN)
    let friend = await apiController.searchFriend(TOKEN, word)
    const infoFriends = await apiController.getFriends(TOKEN)
    let friends = infoFriends.friends.map(friend => friend.id)

    
    
    res.render("search", {
        page_name : 'Search',
        word: word, 
        users: friend.users,
        friends: friends
    })
}

exports.addFriendProfil = async (req, res) => {
    const friendId = req.params.id
    const TOKEN = req.app.locals.token
    const userId = req.params.id
    
    let result = await apiController.addFriend(friendId, TOKEN)
    const userFriends = await apiController.getUserFriends(friendId, TOKEN)

    const userInfo = await apiController.getUser(userId, TOKEN)
    const infoFriends = await apiController.getFriends(TOKEN)
    let friends = infoFriends.friends.map(friend => friend.id)

    
    
    res.render("profilPerson", {
        page_name : 'ProfilPerson',
        userFriends: userFriends.friends,
        userName: userInfo.user.name,
        userId: userInfo.user.id,
        friends: friends
    })
}

exports.deleteFriend = async (req, res) => {
    const friendId = req.params.id
    const TOKEN = req.app.locals.token
    const word = req.query.word
    
    const del = await apiController.deleteFriend(friendId, TOKEN)
    const friend = await apiController.searchFriend(TOKEN, word)
    const infoFriends = await apiController.getFriends(TOKEN)

    let friends = infoFriends.friends.map(friend => friend.id)
    
    res.render("search", {
        page_name : 'Search',
        word: word,
        users: friend.users,
        friends: friends
    })  
}

exports.deleteFriendProfil = async (req, res) => {
    const friendId = req.params.id
    const TOKEN = req.app.locals.token
    const userId = req.params.id
    
    const del = await apiController.deleteFriend(friendId, TOKEN)
    const userFriends = await apiController.getUserFriends(friendId, TOKEN)

    const userInfo = await apiController.getUser(userId, TOKEN)
    const infoFriends = await apiController.getFriends(TOKEN)
    let friends = infoFriends.friends.map(friend => friend.id)
    
    res.render("profilPerson", {
        page_name : 'ProfilPerson',
        userFriends: userFriends.friends,
        userName: userInfo.user.name,
        userId: userInfo.user.id,
        friends: friends
    })
}

exports.deleteFriendAmi = async (req, res) => {
    const friendId = req.params.id
    const TOKEN = req.app.locals.token

    const del = await apiController.deleteFriend(friendId, TOKEN)
    const infoFriends = await apiController.getFriends(TOKEN)
    let friends = infoFriends.friends.map(friend => friend.id)
    
    res.render("profil-user-myfriends", {
        page_name : 'Profil',
        users: infoFriends.friends

    })  
}
exports.deleteFriendAmis = async (req, res) => {
    const friendId = req.params.id
    const TOKEN = req.app.locals.token

    const del = await apiController.deleteFriend(friendId, TOKEN)
    const infoFriends = await apiController.getFriends(TOKEN)
    let friends = infoFriends.friends.map(friend => friend.id)
    
    res.render("profilUser", {
        page_name : 'Profil',
        users: infoFriends.friends

    })  
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

    res.render("feed", {
        page_name : 'Feed',
        info: info, 
        spots: spot.skiSpots
    })
}


exports.renderSpotDescription = async (req, res) => {
    const TOKEN = req.app.locals.token
    const queryId = req.params.id
    const created = req.params.create

   const spot = await apiController.infoSpot(queryId, TOKEN)
   const info = await apiController.infoCreater(created, TOKEN)
 
    res.render("description", {
        page_name : 'description',
        spot: spot.skiSpot, 
        info: info.user})
}


exports.newSpots = (req, res) => {
    res.render("newSpot", {
        page_name : 'Créer'
    })
}

exports.renderSpots = async (req, res) => {
    const TOKEN = req.app.locals.token
    const page = req.query.page
    
    const result = await apiController.getSkiSpot(TOKEN, 12, page)

    res.render("spots", {
        page_name : 'Explore',
        spots: result.skiSpots, 
        pages: result.totalPages
    })
  
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
    res.render("edit", {
        page_name : 'Edit',
        spot: result.skiSpot})
    
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