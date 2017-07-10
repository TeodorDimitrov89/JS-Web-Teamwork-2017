const express = require('express')
const controllers = require('../controllers')
const authCheck = require('../middleware/auth-check')

const router = new express.Router()

router.post('/signup', controllers.users.signup)
router.post('/login', controllers.users.login)
router.get('/all', authCheck.isAuthenticated, authCheck.isAdmin(), controllers.users.all)

module.exports = router
