import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../users/Auth'
import userStore from '../../stores/UserStore'
class Navbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: Auth.getUser().name
    }
    this.handleUserLoggedIn = this.handleUserLoggedIn.bind(this)
    userStore.on(userStore.eventTypes.USER_LOGGED_IN,
    this.handleUserLoggedIn)
  }
  handleUserLoggedIn (data) {
    if (data.success) {
      this.setState({
        username: data.user.name
      })
    }
  }
  render () {
    return (
      <div className='menu'>
        {Auth.isUserAuthenticated() ? (
          <div>
            <nav className='navbar navbar-toggleable-md navbar-light bg-faded'>
              <Link to='/'>Home</Link>
              <span>{this.state.username}</span>
              <Link to='/gadgets/add'>Add Gadget</Link>
              {Auth.isUserAdmin() ? (
                <Link to='/users/admin-panel'>Admin Panel</Link>
              ) : ''}
              <Link to='/users/logout'>Logout</Link>
            </nav>
          </div>
    ) : (
      <div>
        <nav className='navbar navbar-toggleable-md navbar-light bg-faded'>
          <Link to='/'>Home</Link>
          <Link to='/users/register'>Register</Link>
          <Link to='/users/login'>Login</Link>
        </nav>
      </div>
    )}
      </div>
    )
  }
}

export default Navbar
