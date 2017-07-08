const Gadget = require('mongoose').model('Gadget')
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
    .catch(err => {
      console.log(err)
    })
  },
  all: (page) => {
    return new Promise((resolve, reject) => {
      const pageSize = 3
      Gadget.find({})
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .then(gadgets => {
          return resolve(gadgets)
        })
    })
  }
}
