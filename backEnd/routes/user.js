const express = require('express');
const router =  express.Router();
const userCtrl = require('../controllers/user');
const password = require('../middleware/password_validator');
const rateLimit = require('../middleware/rate-limit');

//Création des routes 
router.post('/signup', rateLimit, password, userCtrl.signup);
router.post('/login', rateLimit, userCtrl.login);

module.exports = router;