import React, { Component } from 'react'

export default class AdminPanelForm extends Component {
  render () {
    let userRows = this.props.userRows
    return (
      <div className='container'>
        <div className='table-responsive'>
          <h1>Users</h1>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>User email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Products bought</th>
                <th>Is Admin</th>
                <th>Is Blocked</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userRows}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
