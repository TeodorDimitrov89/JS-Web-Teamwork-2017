const express = require('express')
const authCheck = require('../middleware/auth-check')
const petsData = require('../data/pets')
const controllers = require('../controllers')
const router = new express.Router()

router.post('/create', controllers.gadgets.create)
router.get('/all', (req, res) => {
  const page = parseInt(req.query.page) || 1
  controllers.gadgets.all(page)
    .then(gadget => {
      res.status(200).json(gadget)
    })
})

router.get('/details/:id', authCheck, (req, res) => {
  const id = req.params.id

  let pet = petsData.findById(id)

  if (!pet) {
    return res.status(200).json({
      success: false,
      message: 'Pet does not exists!'
    })
  }

  let response = {
    id,
    name: pet.name,
    image: pet.image,
    age: pet.age,
    type: pet.type,
    createdOn: pet.createdOn
  }

  if (pet.breed) {
    response.breed = pet.breed
  }

  res.status(200).json(response)
})

router.post('/details/:id/comments/create', authCheck, (req, res) => {
  const id = req.params.id
  const user = req.user.name

  let pet = petsData.findById(id)

  if (!pet) {
    return res.status(200).json({
      success: false,
      message: 'Pet does not exists!'
    })
  }

  const comment = req.body

  if (!comment.message || typeof comment.message !== 'string' || comment.message.length < 10) {
    return res.status(200).json({
      success: false,
      message: 'Comment message must be at least 10 symbols.'
    })
  }

  petsData.addComment(id, comment.message, user)

  res.status(200).json({
    success: true,
    message: 'Comment added successfuly.',
    comment: {
      id,
      message: comment.message,
      user
    }
  })
})

router.get('/details/:id/comments', authCheck, (req, res) => {
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
