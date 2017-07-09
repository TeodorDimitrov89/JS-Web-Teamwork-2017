import React from 'react'
import FormHelpers from '../common/forms/FormHelpers'
import ValidateHelpers from '../common/ValidateHelpers'
import LoginForm from './LoginForm'
import userActions from '../../actions/UserActions'
import userStore from '../../stores/UserStore'
import Auth from './Auth'
import toastr from 'toastr'
class LoginPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {
        email: 'admin@admin.com',
        password: 'Admin'
      },
      error: ''
    }
    this.handleUserChange = this.handleUserChange.bind(this)
    this.handleUserForm = this.handleUserForm.bind(this)
    this.handleUserLogin = this.handleUserLogin.bind(this)
    userStore.on(
      userStore
        .eventTypes.USER_LOGGED_IN,
      this.handleUserLogin)
  }
  componentWillUnmount () {
    userStore.removeListener(
      userStore.eventTypes.USER_LOGGED_IN,
      this.handleUserLogin
    )
  }
  handleUserLogin (data) {
    if (!data.success) {
      let firstError = FormHelpers.getFirstError(data)
      this.setState({error: firstError})
    } else {
      Auth.authenticateUser(data.token)
      Auth.saveUser(data.user)
      toastr.success(data.message)
      this.props.history.push('/')
    }
  }
  handleUserChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'user')
  }
  handleUserForm (event) {
    event.preventDefault()
    // Validation
    if (!this.validateUser()) {
      return
    }
    // Actions
    userActions.login(this.state.user)
  }
  validateUser () {
    let user = this.state.user
    return ValidateHelpers.validateLoginUser.bind(this)(user)
  }
  render () {
    return (
      <div>
        Login Page
        <LoginForm
          user={this.state.user}
          error={this.state.error}
          onChange={this.handleUserChange}
          onSave={this.handleUserForm} />
      </div>
    )
  }
}

export default LoginPage
