const express = require('express');
const { registerUser, loginUser, allUsers} = require('../controllers/userController');
const router = express.Router();

router.route('/register').post(registerUser).get(allUsers)
router.route('/login').post(loginUser)

module.exports= router;