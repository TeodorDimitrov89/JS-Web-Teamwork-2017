class ValidateHelpers {
  static validateRegisterUser (user) {
    let error = ''
    let formIsValid = true
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(user.email)) {
      error = 'You entered invalid e-mail address.'
      formIsValid = false
    }
    if (user.password.length < 4 || user.confirmPassword.length < 4) {
      error = 'Password and confirm password must have at least 4 characters.'
      formIsValid = false
    }
    if (user.password !== user.confirmPassword) {
      error = 'Password or confirm password do not match.'
      formIsValid = false
    }

    if (error) {
      this.setState({error})
    }
    return formIsValid
  }
  static validateLoginUser (user) {
    let error = ''
    let formIsValid = true
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(user.email)) {
      error = 'You entered invalid e-mail address.'
      formIsValid = false
    }
    if (user.password.length < 4) {
      error = 'Password must have at least 4 characters.'
      formIsValid = false
    }
    if (error) {
      this.setState({error})
    }
    return formIsValid
  }
  static validateGadgetCreate (gadget) {
    let error = ''
    let formIsValid = true
    if (!gadget.title || gadget.title.length < 3 || typeof gadget.title !== 'string') {
      error = 'Name must be more than 3 symbols.'
      formIsValid = false
    }

    if (!gadget.image || gadget.image.length < 3 || typeof gadget.image !== 'string') {
      error = 'Image URL is required.'
      formIsValid = false
    }
    //TODO - to be modified
    // if (!gadget.age || gadget.age < 0) {
    //   error = 'Age must be a positive number.'
    //   formIsValid = false
    // }
    //
    // if (!isNaN(gadget.breed)) {
    //   error = 'Breed must be a string.'
    //   formIsValid = false
    // }

    if (error) {
      this.setState({error})
    }
    return formIsValid
  }
}

export default ValidateHelpers
