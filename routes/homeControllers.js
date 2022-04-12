const axios = require('axios')

exports.renderLogin = (req, res) => {
    res.render("login.ejs")
}
exports.renderProfil = (req, res) => {
    const TOKEN = req.app.locals.token
    
    axios.get(`https://ski-api.herokuapp.com/ski-spot?limit=5&page=1`, {
        headers: {
            "Content-Type": "application/json", 
            "Authorization": TOKEN
        }
    })
    .then(result => {
        res.render("profil", {spots: result.data.skiSpots})})
    .catch(err => {console.log(err)})

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

        const TOKEN = req.app.locals.token
    
        axios.get(`https://ski-api.herokuapp.com/ski-spot?limit=5&page=1`, {
            headers: {
                "Content-Type": "application/json", 
                "Authorization": TOKEN
            }
        })
        .then(spot => {
            res.render("profil", {spots: spot.data.skiSpots},)})
        .catch(err => {console.log(err)})
    })
    .catch(err => {console.log(err)})
}

exports.renderSpotDescription = (req, res) => {
    const TOKEN = req.app.locals.token
    const queryId = req.params.id
    const created = req.params.create

    axios.get(`http://ski-api.herokuapp.com/ski-spot/${queryId}`, {
        headers: {
            "content-type": "application/json",
            "Authorization": TOKEN
        }}
    ).then(result => {
        console.log(queryId)
        console.log(created)
        axios.get(`https://ski-api.herokuapp.com/user/${created}`, {
            headers: {
                "content-type": "application/json",
                "Authorization": TOKEN
            }})
            .then(info => {
        
                res.render("description", {spot: result.data.skiSpot, info: info.data.user})

            })
            .catch(err => {console.log(err)})
    })
    .catch(err => {console.log(err)})
    
}


exports.newSpots = (req, res) => {
    res.render("newSpot")
}
exports.renderSpots = (req, res) => {
    const TOKEN = req.app.locals.token
    const page = req.query.page
    
    axios.get(`https://ski-api.herokuapp.com/ski-spot?limit=12&page=${page}`, {
        headers: {
            "Content-Type": "application/json", 
            "Authorization": TOKEN
        }
    })
    .then(result => {
        res.render("spots", {spots: result.data.skiSpots, pages: result.data.totalPages})})
    .catch(err => {console.log(err)})

}

exports.addedSpots = (req, res) => {
    
    const name = req.body.name
    const description = req.body.description
    const adresse = req.body.address
    const difficulty = req.body.difficulty
    const left = req.body.left
    const right = req.body.right
    const array = JSON.parse(`[${left}, ${right}]`)
    
    
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
        res.redirect("/profil")
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