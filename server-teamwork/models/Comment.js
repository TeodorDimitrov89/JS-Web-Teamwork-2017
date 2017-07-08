const mongoose = require('mongoose')
const SCHEMA = mongoose.Schema
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required!'
const ObjectId = mongoose.Schema.Types.ObjectId

let commentSchema = new SCHEMA({
  content: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  date: { type: Date, default: Date.now },
  author: {type: String},
  gadgetsId: {type: ObjectId, ref: 'Gadgets'},
  userId: {type: ObjectId, ref: 'User'}
})

let Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
