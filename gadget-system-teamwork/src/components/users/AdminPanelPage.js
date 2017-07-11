import React, {Component} from 'react'
import AdminPanelForm from './AdminPanelForm'
import userActions from '../../actions/UserActions'
import userStore from '../../stores/UserStore'
import {Link} from 'react-router-dom'

export default class AdminPanelPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: []
    }

    this.handleUsersFetching = this.handleUsersFetching.bind(this)

    userStore.on(
      userStore.eventTypes.USER_FETCHED,
      this.handleUsersFetching)
  }

  componentDidMount () {
    userActions.getAllUsers()
  }

  componentWillUnmount () {
    userStore.removeListener(
      userStore.eventTypes.USERS_FETCHED,
      this.handleUsersFetching)
  }

  handleUsersFetching (usersData) {
    this.setState({ users: usersData.users })
  }

  render () {
    let userRows = this.state.users.map(user => {
      return (
        <tr className='text-left' key={user._id}>
          <td>{user.email}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td className={user.isAdmin ? 'text-success' : 'text-danger'}><strong>{user.isAdmin ? 'true' : 'false'}</strong></td>
          <td className={user.isBlocked ? 'text-danger' : 'text-success'}><strong>{user.isBlocked ? 'true' : 'false'}</strong></td>
          <td>
            <Link to={'/users/details/' + user._id} className='btn btn-lg btn-primary btn-block' style={{width: '110px',
              height: '35px',
              paddingTop: '5px'}}>Details</Link>
            <Link to={'/users/edit/' + user._id} className='btn btn-lg btn-warning btn-block' style={{width: '110px',
              height: '35px',
              paddingTop: '5px'}}>Edit user</Link>
            <Link to={'/users/block-unblock/' + user._id} className={user.isBlocked ? 'btn btn-lg btn-success btn-block' : 'btn btn-lg btn-danger btn-block'} style={{width: '110px',
              height: '35px',
              paddingTop: '5px'}}>{user.isBlocked ? 'Unblock' : 'Block' }</Link>
          </td>
        </tr>
      )
    })

    return (
      <div>
        <h1>Admin Panel</h1>
        <AdminPanelForm {...this.props}
          userRows={userRows} />
      </div>
    )
  }
}
