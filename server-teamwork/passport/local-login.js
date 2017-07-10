const jwt = require('jsonwebtoken')
const PassportLocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const encryption = require('../utilities/encryption')
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const reqUser = {
    email: email.trim(),
    password: password.trim()
  }
  User
    .findOne({email: reqUser.email})
    .then(savedUser => {
      if (!savedUser) {
        const error = new Error('Incorrect email or password')
        error.firstName = 'IncorrectCredentialsError'
        return done(error)
      }
      let salt = savedUser.salt
      let hashedPass = encryption.generateHashedPassword(salt, reqUser.password)
      const isMatch = savedUser.password === hashedPass
      if (!isMatch) {
        const error = new Error('Incorrect email or password')
        error.firstName = 'IncorrectCredentialsError'
        return done(error)
      }
      const payload = {
        sub: savedUser._id
      }
      // create a token string
      const token = jwt.sign(payload, 's0m3 r4nd0m str1ng')
      const data = {
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        isAdmin: savedUser.isAdmin
      }
      return done(null, token, data)
    })
    .catch(err => {
      console.log(err)
      throw new Error('Local-login Error')
    })
})
