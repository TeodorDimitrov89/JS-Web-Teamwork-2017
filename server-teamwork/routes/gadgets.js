const express = require('express')
const authCheck = require('../middleware/auth-check')
const controllers = require('../controllers')
const router = new express.Router()

router.post('/create', authCheck.isAuthenticated, authCheck.isAdmin(), controllers.gadgets.create)

router.get('/all', controllers.gadgets.all)

// Comment Routes

router.post('/details/:id/comments/create', authCheck.isAuthenticated, controllers.comments.create)

router.get('/details/delete/comment/:id', controllers.comments.deleteGet)

router.post('/details/delete/comment/:id', controllers.comments.deletePost)

router.get('/details/edit/comment/:id', controllers.comments.editGet)

router.post('/details/edit/comment/:id', controllers.comments.editPost)

// Gadget Routes
router.get('/findGadgetsBought/:id', authCheck.isAuthenticated, controllers.gadgets.findGadgetsBought)

router.post('/buy/:id', authCheck.isAuthenticated, controllers.gadgets.buyGadget)

router.get('/details/:id', authCheck.isAuthenticated, controllers.gadgets.getDetails)

router.get('/delete/:id', controllers.gadgets.deleteGet)

router.post('/delete/:id', controllers.gadgets.deletePost)

router.get('/edit/:id', controllers.gadgets.editGet)

router.post('/edit/:id', controllers.gadgets.editPost)

router.get('/', controllers.gadgets.search)

module.exports = router
