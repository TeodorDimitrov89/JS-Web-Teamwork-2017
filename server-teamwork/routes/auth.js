const express = require('express')
const controllers = require('../controllers')
const authCheck = require('../middleware/auth-check')

const router = new express.Router()

router.post('/signup', controllers.users.signup)
router.post('/login', controllers.users.login)
router.get('/all', authCheck.isAuthenticated, authCheck.isAdmin(), controllers.users.all)
router.get('/:id', authCheck.isAuthenticated, authCheck.isAdmin(), controllers.users.getUser)
router.post('/block/:id', authCheck.isAuthenticated, authCheck.isAdmin(), controllers.users.blockUnblockUser)
router.post('/edit', authCheck.isAuthenticated, authCheck.isAdmin(), controllers.users.editUser)

module.exports = router
