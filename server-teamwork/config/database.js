const mongoose = require('mongoose')
const User = require('../models/User')
require('../models/Gadget')
require('../models/Comment')
mongoose.Promise = global.Promise

module.exports = (settings) => {
  mongoose.connect(settings.db)

  let db = mongoose.connection

  db.once('open', (err) => {
    if (err) {
      throw err
    }

    console.log('Connected to MongoDB.')

    User.seedAdminUser()
  })

  db.on('error', () => {
    console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?')
  })
}
