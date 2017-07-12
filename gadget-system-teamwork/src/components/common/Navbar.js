import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../users/Auth'
import userStore from '../../stores/UserStore'
class Navbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: Auth.getUser().firstName
    }
    this.handleUserLoggedIn = this.handleUserLoggedIn.bind(this)
    userStore.on(userStore.eventTypes.USER_LOGGED_IN,
    this.handleUserLoggedIn)
  }

  componentWillUnmount () {
    userStore.removeListener(userStore.eventTypes.USER_LOGGED_IN,
    this.handleUserLoggedIn)
  }
  handleUserLoggedIn (data) {
    if (data.success) {
      this.setState({
        username: data.user.firstName
      })
    }
  }
  render () {
    return (
      <div className='menu'>
        {Auth.isUserAuthenticated() ? (
          <nav className='navbar navbar-default'>
            <div className='container-fluid'>
              <Link className='navbar-brand' to='/'>Home</Link>
              <Link className='navbar-brand' to='/gadgets/all'>All Gadgets</Link>
              {Auth.isUserAdmin() ? (
                <div>
                  <Link className='navbar-brand' to='/gadgets/add'>Add Gadget</Link>
                  <Link className ='navbar-brand' to='/users/admin-panel'>Admin Panel</Link>
                </div>
                ) : ''}
              <div className='right'>
                <Link className='navbar-brand right' to='/users/logout'>Logout</Link>
                <span className='navbar-brand right'>Hello, {this.state.username}</span>
              </div>
            </div>
          </nav>

        ) : (

          <nav className='navbar navbar-default'>
            <div className='container-fluid'>
              <Link className='navbar-brand' to='/'>Home</Link>
              <Link className='navbar-brand' to='/gadgets/all'>All Gadgets</Link>
              <div className='right'>
                <Link className='navbar-brand' to='/users/register'>Register</Link>
                <Link className='navbar-brand' to='/users/login'>Login</Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    )
  }
}

export default Navbar
