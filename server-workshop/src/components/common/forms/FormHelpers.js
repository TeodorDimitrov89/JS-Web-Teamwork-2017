class FormHelpers {
  static handleFormChange (event, stateField) {
    const target = event.target
    const fieldName = target.name
    const value = target.value  // tharget.check is used when it is an checkbox field

    const state = this.state[stateField]
    state[fieldName] = value

    this.setState({ [stateField]: state })
  }

  static getFirstError (data) {
    let firstError = data.message
    if (!data.success) {
      if (data.errors) {
        firstError = Object.keys(data.errors).map(k => data.errors[k])[0]
      }
    }

    return firstError
  }
}

export default FormHelpers
