import { Component } from 'react'
import Auth from './Auth'

class LogoutPage extends Component {
  componentWillMount () {
    Auth.deauthenticateUser()
    Auth.removeUser()
    this.props.history.push('/login')
  }

  render () {
    return null
  }
}

export default LogoutPage
