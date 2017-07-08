const express = require('express')
const controllers = require('../controllers')

const router = new express.Router()

router.post('/signup', controllers.users.signup)
router.post('/login', controllers.users.login)

module.exports = router
