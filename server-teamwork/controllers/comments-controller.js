const Gadget = require('mongoose').model('Gadget')
const Comment = require('mongoose').model('Comment')
function validateCommentForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''
  if (!payload ||
  typeof payload.content !== 'string' ||
  payload.content.length < 10) {
    isFormValid = false
    errors.content = 'Comment message must be at least 10 symbols.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}
module.exports = {
  create: (req, res) => {
    const commentBody = req.body
    let commentAuthor = req.user
    const id = req.params.id
    const user = req.user
    Gadget
      .findById(id)
      .then(gadget => {
        if (!gadget) {
          return res.status(200).json({
            success: false,
            message: 'Gadget does not exists!'
          })
        }
        const validationResult = validateCommentForm(commentBody)
        if (!validationResult.success) {
          return res.status(200).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
          })
        }
        Comment.create({
          content: commentBody.content,
          author: req.user.firstName
        })
        .then(comment => {
          gadget.comments.push(comment)
          gadget.save().then(() => {
            res.status(200).json({
              success: true,
              message: 'Gadget added successfuly.',
              gadget
            })
          }).catch((err) => {
            res.status(200).json({
              success: false,
              errors: err
            })
          })
        })
      }).catch(() => {
        res.status(200).json({
          success: false,
          message: 'Content is required.',
          errors: 'Content is required.'
        })
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
