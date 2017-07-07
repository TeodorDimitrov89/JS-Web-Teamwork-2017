module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/users/login')
    }
  },
  isInRole: (role) => {
    return (req, res, next) => {
      if (req.isAuthenticated() && req.user.roles.indexOf('Admin') > -1) {
        next()
      } else {
        res.redirect('/users/login')
      }
    }
  }
}
