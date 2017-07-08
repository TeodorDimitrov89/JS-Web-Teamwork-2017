const PassportLocalStrategy = require('passport-local').Strategy
const encryption = require('../utilities/encryption')
const User = require('../models/User')
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const reqUser = {
    email: email.trim(),
    password: password.trim(),
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim()
  }
  User
   .findOne({ email: reqUser.email })
   .then(userFound => {
     if (!userFound) {
       let salt = encryption.generateSalt()
       let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)
       User
         .create({
           email: reqUser.email,
           password: hashedPassword,
           salt: salt,
           firstName: reqUser.firstName,
           lastName: reqUser.lastName,
           isAdmin: false
         })
         .then(userCreated => {
           return done(null)
         }).catch(err => {
           console.log(err)
         })
     } else {
       return done('E-mail already exists!')
     }
   })
   .catch(err => {
     console.log(err)
   })
})
