module.exports = {
  handleMongooseError: function (err) {
    let message = ''
    if (err.message) {
      message = err.message
    } else {
      let firstKey = Object.keys(err.errors)[0]
      message = err.errors[firstKey].message
    }
    return message
  }
}
