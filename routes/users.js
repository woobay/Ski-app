const express = require('express');
const router = express.Router();
const homeController = require('./homeControllers');

router.get('/', homeController.renderLogin); 

router.get('/signup', homeController.renderSignup);
router.post('/signup', homeController.renderNewUser);

router.get('/profil', homeController.renderProfil);

router.get("/spots", homeController.renderSpots);
router.get("/spot-description", homeController.renderSpotDescription)

router.get("/spots/new", homeController.newSpots)
router.post("/spots/new", homeController.addedSpots)

router.get("/spots/delete/:id", homeController.deletePost)
router.get("/spots/edit/:id", homeController.editSpot)
router.post("/spots/edit/:id", homeController.updateSpot)

module.exports = router
