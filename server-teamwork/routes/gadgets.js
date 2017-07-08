const express = require('express')
const authCheck = require('../middleware/auth-check')
const petsData = require('../data/pets')
const controllers = require('../controllers')
const router = new express.Router()

router.post('/create', authCheck.isAuthenticated, authCheck.isAdmin(), controllers.gadgets.create) // TODO: add isAdmin?,
router.get('/all', (req, res) => {
  const page = parseInt(req.query.page) || 1
  controllers.gadgets.all(page)
    .then(gadget => {
      res.status(200).json(gadget)
    })
})
router.get('/details/:id', authCheck.isAuthenticated, controllers.gadgets.getDetails) // TODO: add authCheck,

router.post('/details/:id/comments/create', authCheck.isAuthenticated, controllers.comments.create) // TODO: add authCheck,

router.get('/details/:id/comments', authCheck.isAuthenticated, (req, res) => {
  const id = req.params.id

  const pet = petsData.findById(id)

  if (!pet) {
    return res.status(200).json({
      success: false,
      message: 'Pet does not exists!'
    })
  }

  const response = petsData.allComments(id)

  res.status(200).json(response)
})

module.exports = router
