const express = require('express')
const authCheck = require('../middleware/auth-check')
const controllers = require('../controllers')
const router = new express.Router()

router.post('/create', authCheck.isAuthenticated, authCheck.isAdmin(), controllers.gadgets.create)

router.get('/all', controllers.gadgets.all)

router.get('/details/:id', authCheck.isAuthenticated, controllers.gadgets.getDetails)

router.post('/details/:id/comments/create', authCheck.isAuthenticated, controllers.comments.create)

router.get('/details/:id/comments/all', controllers.comments.all)

router.get('/delete/:id', controllers.gadgets.deleteGet)

router.post('/delete/:id', controllers.gadgets.deletePost)

router.get('/edit/:id', controllers.gadgets.editGet)

router.post('/edit/:id', controllers.gadgets.editPost)

module.exports = router
