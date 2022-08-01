const axios = require('axios');



const authenticationLogin = async (emailValue, passwordValue) => {

    const result = await axios.post(`https://ski-api.herokuapp.com/login`, {email: emailValue, password: passwordValue})
    return result.data
}



const getSkiSpot = async (TOKEN, limit, page) => {

    const result = await axios.get(`https://ski-api.herokuapp.com/ski-spot?limit=${limit}&page=${page}`, {
        headers: {
            "Content-Type": "application/json", 
            "Authorization": TOKEN
        }
    })
        return result.data
}

const newUser = async (username, email, password) => {

    const result = await axios.post(`https://ski-api.herokuapp.com/signup`, 
    {
        name: username,
        email: email,
        password: password
    })
    return result.data

}

const addSpot = async (name, description, adresse, difficulty, array, TOKEN) => {

    const result = await axios.post(`https://ski-api.herokuapp.com/ski-spot`, {
            name: name,
            description: description,
            address: adresse,
            difficulty: difficulty,
            coordinates: array,   
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": TOKEN
            }})
        return result.data
        }


const deletePost = async (queryId, TOKEN) => {

    const result = await axios.delete(`http://ski-api.herokuapp.com/ski-spot/${queryId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": TOKEN
        }}
    )
    return result.data
}
   
const infoSpot = async (queryId, TOKEN) => {

    const result = await  axios.get(`http://ski-api.herokuapp.com/ski-spot/${queryId}`, {
        headers: {
            "content-type": "application/json",
            "Authorization": TOKEN
        }})
        return result.data
}

const infoCreater = async (created, TOKEN) => {

    const result = await axios.get(`https://ski-api.herokuapp.com/user/${created}`, {
        headers: {
            "content-type": "application/json",
            "Authorization": TOKEN
        }})

    return result.data
}

const editSpot = async (queryId, TOKEN) => {

    const result = await axios.get(`http://ski-api.herokuapp.com/ski-spot/${queryId}`, {
        headers: {
            "content-type": "application/json",
            "Authorization": TOKEN
        }})
    return result.data
}

const putSpot = async (queryId, TOKEN, name, description,adresse, difficulty, array) => {

    const result = await axios.put(`https://ski-api.herokuapp.com/ski-spot/${queryId}`, {
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
    return result.data
}

const searchFriend = async (TOKEN, word) => {
    
    const result = await axios.get(`http://ski-api.herokuapp.com/users/search/${word}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": TOKEN
        }
    })
    return result.data
}

const addFriend = async (friendId, TOKEN) => {

    const result = await axios.post(`http://ski-api.herokuapp.com/friend`, {
        friendId: friendId,
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": TOKEN
        }
    })
    return result.data
    
}
const getFriends = async (TOKEN) => {
    const result = await axios.get(`http://ski-api.herokuapp.com/friend`, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": TOKEN
    }
    }) 
    
    return result.data
}

const getUserFriends = async (friendId, TOKEN) => {

    const result = await axios.get(`http://ski-api.herokuapp.com/friend/${friendId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": TOKEN
        }
        })
        return result.data
}

const getUser = async (userId, TOKEN) => {
    const result = await axios.get(`http://ski-api.herokuapp.com/user/${userId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": TOKEN
        }
    })
    return result.data
}

const deleteFriend = async(friendId, TOKEN) => {
    const result = await axios.delete(`http://ski-api.herokuapp.com/friend/${friendId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": TOKEN
        }}
    )
    return result.data
}

module.exports.getUserFriends = getUserFriends;
module.exports.getFriends = getFriends
module.exports.addFriend = addFriend;
module.exports.searchFriend = searchFriend;
module.exports.putSpot = putSpot
module.exports.editSpot = editSpot;
module.exports.infoCreater = infoCreater;
module.exports.infoSpot = infoSpot;
module.exports.deletePost = deletePost;
module.exports.authenticationLogin = authenticationLogin;
module.exports.getSkiSpot = getSkiSpot;
module.exports.newUser = newUser;
module.exports.addSpot = addSpot;
module.exports.getUser = getUser;
module.exports.deleteFriend = deleteFriend;
