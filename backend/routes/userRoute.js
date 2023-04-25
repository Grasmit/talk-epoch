const express = require('express')
const { registerUser, login, allUsers } = require('../controllers/userController.js')
const { authrisedUser } = require('../middleware/authHandle.js')

const router = express.Router()

router.route('/signup').post(registerUser)
router.post('/login', login)

router.get("/allusers", authrisedUser, allUsers)

module.exports = router