const express = require('express')
const router = express.Router()
const homeController = require('./homeControllers')

router.get('/', homeController.renderLogin); 

router.get('/signup', homeController.renderSignup);
router.post('/signup', homeController.renderNewUser)

router.get('/profil', homeController.renderProfil);

module.exports = router
