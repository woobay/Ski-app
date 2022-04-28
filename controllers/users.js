const express = require('express')
const router = express.Router()
const homeController = require('./homeControllers')

router.get('/', homeController.renderLogin); 
router.post('/', homeController.postAuthentication);

router.get('/signup', homeController.renderSignup);
router.post('/signup', homeController.renderNewUser)

router.get('/profil', homeController.renderProfil);
router.get("/profil/delete/:id", homeController.deletePostProfil)

router.get("/spots", homeController.renderSpots);
router.get("/description/:id/:create", homeController.renderSpotDescription)


router.get("/spots/new", homeController.newSpots)
router.post("/spots/new", homeController.addedSpots)

router.get("/spots/delete/:id", homeController.deletePostSpots)
router.get("/spots/edit/:id", homeController.editSpot)
router.post("/spots/edit/:id", homeController.updateSpot)

router.get("/profil2", homeController.renderProfilUser);

router.get("/profil3", homeController.renderProfilPerson);

module.exports = router
