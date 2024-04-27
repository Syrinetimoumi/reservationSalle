const express = require('express');
const router = express.Router();
const userController = require('../controllers/authController');


router.get('/register', userController.registerPage);

router.post('/register', userController.register);


router.get('/login', userController.loginPage);

router.post('/login', userController.login);

module.exports = router;
