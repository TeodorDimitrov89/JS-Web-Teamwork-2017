const Gadget = require('mongoose').model('Gadget')
const User = require('mongoose').model('User')

function validateGadgetForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.title !== 'string') {
    isFormValid = false
    errors.email = 'Please provide a correct title.'
  }

  if (!payload || typeof payload.title !== 'string' || payload.title.trim().length < 4) {
    isFormValid = false
    errors.title = 'Title must have at least 4 characters.'
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.trim().length === 0) {
    isFormValid = false
    errors.description = 'Please provide a valid description.'
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.trim().length < 10) {
    isFormValid = false
    errors.description = 'Description must have at least 10 characters.'
  }
  if (!payload || typeof payload.quantityOnStock !== 'number' || payload.quantityOnStock < 0 || payload.quantityOnStock > 100) {
    isFormValid = false
    errors.quantity = 'Quantity must be between 0 and 100pcs.'
  }
  if (!payload || typeof payload.price !== 'number' || !payload.price > 1) {
    isFormValid = false
    errors.price = 'Price must be greater than 1.'
  }
  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}
module.exports = {
  create: (req, res) => {
    let gadgetBody = req.body
    let userId = req.user._id
    const validationResult = validateGadgetForm(gadgetBody)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }
    Gadget.create({
      title: gadgetBody.title,
      image: gadgetBody.image,
      description: gadgetBody.description,
      quantityOnStock: gadgetBody.quantityOnStock,
      userId: userId,
      price: gadgetBody.price,
      comments: [],
      isBought: false
    })
    .then((gadget) => {
      res.status(200).json({
        success: true,
        message: 'Gadget added successfuly.',
        gadget
      })
    })
    .catch(() => {
      res.status(200).json({
        success: false,
        message: 'Title must be unique.',
        errors: 'Title must be unique.'
      })
    })
  },
  all: (req, res) => {
    const page = parseInt(req.query.page) || 1
    let getGadgets = new Promise((resolve, reject) => {
      const pageSize = 3
      Gadget
        .find({})
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .then(gadgets => {
          return resolve(gadgets)
        })
        .catch(err => res.status(200).json(err))
    })

    getGadgets
      .then(gadget => {
        res.status(200).json(gadget)
      })
      .catch(err => res.status(200).json(err))
  },
  getDetails: (req, res) => {
    const id = req.params.id
    Gadget
        .findById(id)
        .then(gadget => {
          if (!gadget) {
            return res.status(200).json({
              success: false,
              message: 'Gadget does not exists!'
            })
          }
          return res.status(200).json(gadget)
        })
        .catch((err) => {
          console.log(err)
          return res.status(200).json(err)
        })
  },
  deleteGet: (req, res) => {
    let idDeleteGadget = req.params.id
    Gadget
      .findById(idDeleteGadget)
      .then(gadget => {
        if (!gadget) {
          return res.status(200).json({
            success: false,
            message: 'Gadget does not exists!'
          })
        }
        res.status(200).json(gadget)
      }).catch(err => {
        console.log(err)
        res.status(200).json(err)
      })
  },
  deletePost: (req, res) => {
    let idDeleteGadget = req.params.id
    Gadget
      .findById(idDeleteGadget)
      .populate('comments')
      .then(gadget => {
        res.status(200).json(gadget)
      }).catch((err) => {
        console.log(err)
        return res.status(200).json(err)
      })

    // Gadget
    //   .findById(idDeleteGadget)
    //   .then(gadget => {
    //     res.status(200).json(gadget)
    //   })
  }
}
