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
              message: 'Comment added successfully.',
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
  deleteGet (req, res) {
    const commentId = req.params.id
    Comment
    .findById(commentId)
    .then(comment => {
      if (!comment) {
        return res.status(200).json({
          success: false,
          message: 'Comment does not exists!'
        })
      }
      res.status(200).json({
        success: true,
        message: 'Comment fetched',
        comment
      })
    })
    .catch(() => {
      res.status(200).json({
        success: false,
        message: 'Content is required.',
        errors: 'Content is required.'
      })
    })
  },
  deletePost (req, res) {
    const commentId = req.params.id
    Comment
    .findByIdAndRemove(commentId)
    .then(deletedComment => {
      if (!deletedComment) {
        return res.status(200).json({
          success: false,
          message: 'Comment does not exists!'
        })
      }
      res.status(200).json({
        success: true,
        message: 'Comment deleted successfully',
        deletedComment
      })
    }).catch(err => {
      console.log(err)
      res.status(200).json({
        success: false,
        message: '',
        errors: '' // TODO: change message and error
      })
    })
  },
  editGet (req, res) {
    const commentId = req.params.id
    Comment
      .findById(commentId)
      .then(comment => {
        if (!comment) {
          return res.status(200).json({
            success: false,
            message: 'Comment does not exists!'
          })
        }
        res.status(200).json({
          success: true,
          comment
        })
      }).catch(err => {
        console.log(err)
        res.status(200).json({
          success: false,
          message: '',
          errors: '' // TODO: change message and error
        })
      })
  },
  editPost (req, res) {
    const commentId = req.params.id
    const commentBody = req.body
    const validationResult = validateCommentForm(commentBody)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }
    const commentContent = commentBody.content
    Comment
      .findByIdAndUpdate(commentId, {
        $set: {
          content: commentContent
        }
      }).then(editedComment => {
        return res.status(200).json({
          success: true,
          message: 'Comment edited successfully.',
          editedComment
        })
      }).catch(err => {
        console.log(err)
        res.status(200).json({
          success: false,
          message: '',
          errors: '' // TODO: change message and error
        })
      })
  }
}
