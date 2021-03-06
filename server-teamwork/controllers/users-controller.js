const validator = require('validator')
const passport = require('passport')
const localSignupStrategy = require('../passport/local-signup')
const localLoginStrategy = require('../passport/local-login')
const User = require('mongoose').model('User')
const Gadget = require('mongoose').model('Gadget')

module.exports = {
  signupStrategy: localSignupStrategy,

  signup: (req, res, next) => {
    const validationResult = validateSignupForm(req.body)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    return passport.authenticate('local-signup', (err) => {
      if (err) {
        return res.status(200).json({
          success: false,
          message: err
        })
      }

      return res.status(200).json({
        success: true,
        message: 'You have successfully signed up! Now you should be able to log in.'
      })
    })(req, res, next)
  },

  loginStrategy: localLoginStrategy,

  login: (req, res, next) => {
    const validationResult = validateLoginForm(req.body)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    return passport.authenticate('local-login', (err, token, userData) => {
      if (err) {
        if (err.firstName === 'IncorrectCredentialsError') {
          return res.status(200).json({
            success: false,
            message: err.message
          })
        }

        return res.status(200).json({
          success: false,
          message: 'Could not process the form.'
        })
      }
      return res.json({
        success: true,
        message: 'You have successfully logged in!',
        token,
        user: userData
      })
    })(req, res, next)
  },
  all: (req, res, next) => {
    const page = parseInt(req.query.page) || 1
    let getUsers = new Promise((resolve, reject) => {
      const pageSize = 10
      User
        .find({})
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .then(users => {
          return resolve(users)
        })
        .catch(err => res.status(200).json({
          success: false,
          errors: err
        }))
    })
    getUsers
      .then(users => {
        return res.status(200).json({
          success: true,
          users
        })
      })
      .catch(err => res.status(200).json({
        success: false,
        errors: err
      }))
  },
  getUser: (req, res) => {
    const id = req.params.id
    User
      .findById(id)
      .then(user => {
        return res.status(200).json({
          success: true,
          user
        })
      }).catch(err => res.status(200).json({
        success: false,
        errors: err
      }))
  },
  blockUnblockUser: (req, res) => {
    const id = req.params.id
    User
      .findById(id)
      .then(user => {
        user.isBlocked ? user.isBlocked = false : user.isBlocked = true
        user.save()
        return res.status(200).json({
          success: true,
          user
        })
      }).catch(err => res.status(200).json({
        success: false,
        errors: err
      }))
  },
  editUser: (req, res, next) => {
    const validationResult = validateSignupForm(req.body)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    let id = req.body._id
    User
      .findByIdAndUpdate(id, {
        $set: {
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          isAdmin: req.body.isAdmin,
          isBlocked: req.body.isBlocked
        }
      })
      .then(user => {
        user.save()
        .then(() => {
          return res.status(200).json({
            success: true,
            message: 'Edit successful!',
            user
          })
        }).catch(err => res.status(200).json({
          success: false,
          errors: err
        }))
      }).catch(err => res.status(200).json({
        success: false,
        errors: err
      }))
  },
  findGadgetsBought: (req, res) => {
    let idReqUser = req.params.id

    Gadget
     .find({buyerUsers: idReqUser})
     .then(gadgets => {
       if (gadgets.length < 1) {
         return res.status(200).json({
           success: false,
           message: 'No gadget purchased by current user found!'
         })
       }
       let qtyBoughtGadgets = {}
       for (let gadget of gadgets) {
         let searchedIndex = gadget.buyerUsers.indexOf(idReqUser)
         let totalPrice = gadget.quantityBought[searchedIndex] * gadget.price
         let userQuantityBought = gadget.quantityBought[searchedIndex]
         qtyBoughtGadgets[gadget.title] = [userQuantityBought, totalPrice]
       }
       return res.status(200).json({
         success: true,
         qtyBoughtGadgets
       })
     }).catch(err => {
       console.log(err)
       res.status(200).json(err)
     })
  }
}

function validateSignupForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false
    errors.email = 'Please provide a correct email address.'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 4) {
    isFormValid = false
    errors.password = 'Password must have at least 4 characters.'
  }

  if (!payload || typeof payload.firstName !== 'string' || payload.firstName.trim().length === 0) {
    isFormValid = false
    errors.firstName = 'Please provide your first name.'
  }

  if (!payload || typeof payload.lastName !== 'string' || payload.lastName.trim().length === 0) {
    isFormValid = false
    errors.lastName = 'Please provide your last name'
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

function validateLoginForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false
    errors.email = 'Please provide your email address.'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false
    errors.password = 'Please provide your password.'
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
