const express = require('express')
const router = express.Router()

//controller functions
const { signupUser, loginUser } = require('../controller/userController')


//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)


module.exports = router