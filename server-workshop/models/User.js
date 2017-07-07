const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')
const SCHEMA = mongoose.Schema
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required!'

let userSchema = new SCHEMA({
  email: { type: SCHEMA.Types.String, required: REQUIRED_VALIDATION_MESSAGE },
  password: SCHEMA.Types.String
  // username: { type: SCHEMA.Types.String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
  // firstName: { type: SCHEMA.Types.String, required: REQUIRED_VALIDATION_MESSAGE },
  // lastName: { type: SCHEMA.Types.String, required: REQUIRED_VALIDATION_MESSAGE },
  // salt: SCHEMA.Types.String,
  // hashedPass: SCHEMA.Types.String,
  // startedTweets: [{ type: SCHEMA.Types.ObjectId, ref: 'Tweet' }],
  // likes: [{ type: SCHEMA.Types.ObjectId, ref: 'Tweet' }],
  // dislikes: [{ type: SCHEMA.Types.ObjectId, ref: 'Tweet' }],
  // roles: [String]
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
