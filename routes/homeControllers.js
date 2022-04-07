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
    }).then(result => {res.render("login.ejs", result.data)})
    .catch()
}

exports.postAuthentication = (req, res) => {
    const emailValue = req.body.email
    const passwordValue = req.body.password
    axios.post(`https://ski-api.herokuapp.com/login`, {email: emailValue, password: passwordValue})
    .then(result => {
        res.app.locals.token = result.data.token
        res.app.locals.name = result.data.name
        res.app.locals.surname = result.data.name.split(' ')[0]
        res.render("profil")
    })
    .catch(err => {console.log(err)})}

exports.renderSpotDescription = (req, res) => {
    res.render("spot-description")
}

exports.newSpots = (req, res) => {
    res.render("newSpot")
}
exports.renderSpots = (req, res) => {
    const TOKEN = req.app.locals.token
    
    axios.get(`https://ski-api.herokuapp.com/ski-spot`, {
        headers: {
            "Content-Type": "application/json", 
            "Authorization": TOKEN
        }
    })
    .then(result => {
        res.render("spots", {spots: result.data.skiSpots})})
    .catch(err => {console.log(err)})

}

exports.addedSpots = (req, res) => {
    
    const name = req.body.name
    const description = req.body.description
    const adresse = req.body.address
    const difficulty = req.body.difficulty
    let coordinates = req.body.coordinates

    const array = JSON.parse("[" + coordinates + "]")
    
    const TOKEN = req.app.locals.token
    
    axios.post(`https://ski-api.herokuapp.com/ski-spot`, {
            name: name,
            description: description,
            address: adresse,
            difficulty: difficulty,
            coordinates: array,   
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": TOKEN
            }}
    ).then(result => {
        res.redirect("/spots")
    })
    .catch(err => {console.log(err)})
}

exports.deletePost = (req, res) => {
    const queryId = {_id: req.params.id}
    const TOKEN = req.app.locals.token

    axios.delete(`http://ski-api.herokuapp.com/ski-spot/${queryId._id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": TOKEN
        }}
    ).then(()=>{
        res.redirect("/spots")
    }).catch((err) => {
        console.log(err)
        
    })
}

exports.editSpot = (req, res) => {
    const TOKEN = req.app.locals.token
    const queryId = {_id: req.params.id}

    axios.get(`http://ski-api.herokuapp.com/ski-spot/${queryId._id}`, {
        headers: {
            "content-type": "application/json",
            "Authorization": TOKEN
        }}
    ).then(result => {
        res.render("edit", {spot: result.data.skiSpot})
    })
    .catch(err => {console.log(err)})
}

exports.updateSpot = (req, res) => {
    const queryId = {_id: req.params.id}

    const name = req.body.name
    const description = req.body.description
    const adresse = req.body.address
    const difficulty = req.body.difficulty
    let coordinates = req.body.coordinates

    const array = JSON.parse("[" + coordinates + "]")
    
    const TOKEN = req.app.locals.token

    axios.put(`https://ski-api.herokuapp.com/ski-spot/${queryId._id}`, {
        name: name,
        description: description,
        address: adresse,
        difficulty: difficulty,
        coordinates: array
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": TOKEN
        }
    })
    .then(result => {
        res.redirect("/spots")
    })
    .catch(err => {console.log(err)})
}