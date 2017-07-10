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
    const commentAuthor = req.user
    const gadgetid = req.params.id
    Gadget
      .findById(gadgetid)
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
          author: commentAuthor.firstName,
          gadgetId: gadget._id,
          userId: commentAuthor._id

        })
        .then(comment => {
          gadget.comments.push(comment)
          gadget.save().then(() => {
            res.status(200).json({
              success: true,
              message: 'Gadget added successfuly.',
              comment
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
   all: (req, res) => {
    const gadgetId = req.params.id
    Gadget
      .findById(gadgetId)
      .populate('comments')
      .then((gadget) => {
        res.status(200).json({
          success: true,
          gadgetTitle: gadget.title,
          comments: gadget.comments
        })
      })
    // Comment
    //   .find({})
    //   .then(comments => {
    //     res.status(200).json({
    //       success: true,
    //       comments: comments
    //     })
    //   }).catch(() => {
    //     res.status(200).json({
    //       success: false,
    //       message: 'Content is required.',
    //       errors: 'Content is required.'
    //     })
    //   })
  }
}
