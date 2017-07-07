import React, { Component } from 'react'
import Auth from './Auth'
import FormHelpers from '../common/forms/FormHelpers'
import LoginForm from './LoginForm'
import userActions from '../../actions/UserActions'
import userStore from '../../stores/UserStore'
import toastr from 'toastr'

class LoginPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {
        email: 'test@test.com',
        password: '1234'
      },
      error: ''
    }

    this.handleUserLogin = this.handleUserLogin.bind(this)

    userStore.on(
      userStore.eventTypes.USER_LOGGED_IN,
      this.handleUserLogin)
  }

  componentWillUnmount () {
    userStore.removeListener(
      userStore.eventTypes.USER_LOGGED_IN,
      this.handleUserLogin
    )
  }

  handleUserChange (event) {
    const formChangeFunc = FormHelpers.handleFormChange.bind(this)
    formChangeFunc(event, 'user')
  }

  handleUserLoginForm (event) {
    event.preventDefault()

    // Validate form
    userActions.login(this.state.user)
  }

  handleUserLogin (data) {
    if (!data.success) {
      let firstError = data.message
      if (data.errors) {
        firstError = Object.keys(data.errors).map(k => data.errors[k])[0]
      }
      this.setState({
        error: firstError
      })
    } else {
      Auth.authenticateUser(data.token)
      Auth.saveUser(data.user)
      toastr.success(data.message)
      this.props.history.push('/') // Redirect to homepage
    }
  }

  render () {
    return (
      <div>
        <h1>Login User</h1>
        <LoginForm
          user={this.state.user}
          error={this.state.error}
          onChange={this.handleUserChange.bind(this)}
          onSave={this.handleUserLoginForm.bind(this)} />
      </div>
    )
  }
}

export default LoginPage
