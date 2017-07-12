class ValidateHelpers {
  static validateRegisterUser (user) {
    let error = ''
    let isFormValid = true
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(user.email)) {
      error = 'You entered invalid e-mail address.'
      isFormValid = false
    }
    if (user.password.length < 4 || user.confirmPassword.length < 4) {
      error = 'Password and confirm password must have at least 4 characters.'
      isFormValid = false
    }
    if (user.password !== user.confirmPassword) {
      error = 'Password or confirm password do not match.'
      isFormValid = false
    }

    if (error) {
      this.setState({error})
    }
    return isFormValid
  }
  static validateLoginUser (user) {
    let error = ''
    let isFormValid = true
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(user.email)) {
      error = 'You entered invalid e-mail address.'
      isFormValid = false
    }
    if (user.password.length < 4) {
      error = 'Password must have at least 4 characters.'
      isFormValid = false
    }
    if (error) {
      this.setState({error})
    }
    return isFormValid
  }
  static validateGadgetCreate (gadget) {
    let error = ''
    let isFormValid = true
    if (!gadget || typeof gadget.title !== 'string') {
      isFormValid = false
      error = 'Please provide a correct title.'
    }

    if (!gadget || typeof gadget.title !== 'string' || gadget.title.trim().length < 4) {
      isFormValid = false
      error = 'Title must have at least 4 characters.'
    }

    if (!gadget || typeof gadget.description !== 'string' || gadget.description.trim().length === 0) {
      isFormValid = false
      error = 'Please provide a valid description.'
    }

    if (!gadget || typeof gadget.description !== 'string' || gadget.description.trim().length < 10) {
      isFormValid = false
      error = 'Description must have at least 10 characters.'
    }

    if (!gadget || (Number(gadget.quantityOnStock) < 0 || Number(gadget.quantityOnStock) > 100) ||
  typeof Number(gadget.quantityOnStock) !== 'number') {
      isFormValid = false
      error = 'Quantity must be between 0 and 100pcs.'
    }
    if (!gadget || typeof Number(gadget.price) !== 'number' || Number(gadget.price) < 1) {
      isFormValid = false
      error = 'Price must be greater than 1.'
    }

    if (error) {
      this.setState({error})
    }
    return isFormValid
  }
  static validateCreateEditComment (comment) {
    let error = ''
    let isFormValid = true
    if (!comment ||
  typeof comment.content !== 'string' ||
  comment.content.length < 10) {
      isFormValid = false
      error = 'Comment message must be at least 10 symbols.'
    }
    if (error) {
      this.setState({error})
    }
    return isFormValid
  }
}

export default ValidateHelpers
