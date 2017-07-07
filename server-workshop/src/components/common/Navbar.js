import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../users/Auth'
import userStore from '../../stores/UserStore'

class Navbar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: Auth.getUser().name // This WILL BE EMPTY OBJECT after page refersh!!!
    }
    this.homeUpdate = this.homeUpdate.bind(this)
    this.handleUserLoggedIn = this.handleUserLoggedIn.bind(this)

    userStore.on(                 // Sets this.state.username whil username exists in the local store!!!
      userStore.eventTypes.USER_LOGGED_IN,
      this.handleUserLoggedIn)
  }

  handleUserLoggedIn (data) {
    if (data.success) {
      this.setState({
        username: data.user.name
      })
    }
  }

  homeUpdate () {
    window.location.reload()
  }
    // ListPetsPage()

  render () {
    return (
      <div className='menu'>
        <Link onClick={this.homeUpdate} to='/'>Home</Link>
        { Auth.isUserAuthenticated() ? (
          <div>
            <span>{this.state.username}</span>
            <Link to='/pets/add'>Add Pet</Link>
            <Link to='/users/logout'>Logout</Link>
          </div>
    ) : (
      <div>
        <Link to='/users/register'>Register</Link>
        <Link to='/users/login'>Login</Link>
      </div>
    )}
      </div>
    )
  }
}

export default Navbar
