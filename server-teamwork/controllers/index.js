const usersController = require('./users-controller')
const gadgetsController = require('./gadgets-controller')
const commentsController = require('./comments-controller')
module.exports = {
  users: usersController,
  gadgets: gadgetsController,
  comments: commentsController
}
