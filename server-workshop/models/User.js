const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')
const SCHEMA = mongoose.Schema
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required!'

let userSchema = new SCHEMA({
  email: { type: SCHEMA.Types.String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
  password: SCHEMA.Types.String,
  salt: SCHEMA.Types.String,
  firstName: { type: SCHEMA.Types.String, required: REQUIRED_VALIDATION_MESSAGE },
  lastName: { type: SCHEMA.Types.String, required: REQUIRED_VALIDATION_MESSAGE }
})

userSchema.method({
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.hashedPass
  }
})

let User = mongoose.model('User', userSchema)

module.exports = User

// module.exports.seedAdminUser = () => {
//   User.find({}).then((users) => {
//     if (users.length > 0) {
//       return
//     }
//     let salt = encryption.generateSalt()
//     let hashedPass = encryption.generateHashedPassword(salt, 'Admin')
//     User.create({
//       username: 'Admin',
//       firstName: 'Admin',
//       lastName: 'Admin',
//       salt: salt,
//       hashedPass: hashedPass,
//       roles: ['Admin']
//     })
//   })
// }
