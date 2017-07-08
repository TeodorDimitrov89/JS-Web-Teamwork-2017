const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')
const SCHEMA = mongoose.Schema
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required!'
const ObjectId = mongoose.Schema.Types.ObjectId
let userSchema = new SCHEMA({
  email: { type: SCHEMA.Types.String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
  password: { type: SCHEMA.Types.String, required: REQUIRED_VALIDATION_MESSAGE },
  salt: SCHEMA.Types.String,
  firstName: { type: SCHEMA.Types.String, required: REQUIRED_VALIDATION_MESSAGE },
  lastName: { type: SCHEMA.Types.String, required: REQUIRED_VALIDATION_MESSAGE },
  likes: [{type: ObjectId, ref: 'Gadgets'}],
  dislikes: [{type: ObjectId, ref: 'Gadgets'}],
  comments: [{type: ObjectId, ref: 'Gadgets'}],
  qtyGadgetsBought: {type: Number, default: 0},
  isBlocked: {type: Boolean, default: false},
  isAdmin: {type: Boolean}
})

userSchema.method({
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.hashedPass
  }
})

let User = mongoose.model('User', userSchema)

module.exports = User

module.exports.seedAdminUser = () => {
  User.find({}).then((users) => {
    if (users.length > 0) {
      return
    }
    let salt = encryption.generateSalt()
    let hashedPass = encryption.generateHashedPassword(salt, 'Admin')
    User.create({
      email: 'admin@admin.com',
      firstName: 'Admin',
      lastName: 'Admin',
      salt: salt,
      password: hashedPass,
      isAdmin: true // TODO: add isAdmin to new user
    })
  })
}
