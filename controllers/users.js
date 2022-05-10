const express = require('express')
const router = express.Router()
const homeController = require('./homeControllers')

router.get('/', homeController.renderLogin); 
router.post('/', homeController.postAuthentication);

router.get('/signup', homeController.renderSignup);
router.post('/signup', homeController.renderNewUser)

router.get('/feed', homeController.renderFeed);
router.get("/feed/delete/:id", homeController.deletePostFeed)

router.get("/spots", homeController.renderSpots);
router.get("/description/:id/:create", homeController.renderSpotDescription)

router.get("/spots/new", homeController.newSpots)
router.post("/spots/new", homeController.addedSpots)

router.get("/spots/delete/:id", homeController.deletePostSpots)
router.get("/spots/edit/:id", homeController.editSpot)
router.post("/spots/edit/:id", homeController.updateSpot)

router.get('/search', homeController.renderSearch);
router.get("/search/:id", homeController.addFriend);
router.get("/friend/delete/:id", homeController.deleteFriend);


router.get('/profil/myfriends', homeController.renderProfilMyFriends);
router.get("/profil/delete/:id", homeController.deleteFriendAmi);
router.get("/profil/deleted/:id", homeController.deleteFriendAmis);

router.get("/profil", homeController.renderProfilUser);
router.get("/profil/addFriendProfil/:id", homeController.addFriendProfil)
router.get("/profil/deleteFriendProfil/:id", homeController.deleteFriendProfil);

router.get("/search/friend/:id", homeController.renderProfilPerson);
router.get("/search/friend/addFriend/:id", homeController.addFriend);

module.exports = router