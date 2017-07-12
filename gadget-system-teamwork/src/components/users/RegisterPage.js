import React from 'react'
import RegisterForm from './RegisterForm'
import FormHelpers from '../common/forms/FormHelpers'
import ValidateHelpers from '../common/ValidateHelpers'
import userActions from '../../actions/UserActions'
import userStore from '../../stores/UserStore'
import toastr from 'toastr'
class RegisterPage extends React.Component { // Smart Component
  constructor (props) {
    super(props)
    this.state = {
      user: {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
      },
      error: ''
    }
    this.handleUserChange = this.handleUserChange.bind(this)
    this.handleUserForm = this.handleUserForm.bind(this)
    this.handleUserRegistration = this.handleUserRegistration.bind(this)
    userStore.on(
      userStore.eventTypes.USER_REGISTERED,
      this.handleUserRegistration
    )
  }

  componentWillUnmount () {
    userStore.removeListener(
      userStore.eventTypes.USER_REGISTERED,
      this.handleUserRegistration
    )
  }

  handleUserChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'user')
  }

  handleUserForm (event) {
    event.preventDefault()
    if (!this.validateUser()) {
      return
    }
    userActions.register(this.state.user)
  }

  validateUser () {
    const user = this.state.user
    return ValidateHelpers.validateRegisterUser.bind(this)((user))
  }

  handleUserRegistration (data) {
    if (!data.success) {
      let firstError = FormHelpers.getFirstError(data)
      this.setState({error: firstError})
    } else {
      toastr.success(data.message)
      this.props.history.push('/users/login')
    }
  }

  render () {
    return (
      <div>
        <h1>Register User</h1>
        <RegisterForm
          user={this.state.user}
          error={this.state.error}
          onChange={this.handleUserChange}
          onSave={this.handleUserForm}
        />
      </div>
    )
  }
}

export default RegisterPage
