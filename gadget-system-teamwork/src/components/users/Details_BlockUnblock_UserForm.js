import React, {Component} from 'react'

export default class DetailsUserForm extends Component {
  render () {
    return (
      <div className='container'>
        <div className='table-responsive'>
          <h1>{this.props.viewName}</h1>
          <table className='table table-bordered text-left'>
            <tbody>
              <tr>
                <th>E-mail:</th>
                <td>{this.props.user.email}</td>
              </tr>
              <tr>
                <th>First Name:</th>
                <td>{this.props.user.firstName}</td>
              </tr>
              <tr>
                <th>Last Name:</th>
                <td>{this.props.user.lastName}</td>
              </tr>
              <tr>
                <th>isAdmin</th>
                <td className={this.props.user.isAdmin ? 'text-success' : 'text-danger'}>
                  <b>
                    {this.props.user.isAdmin ? 'true' : 'false'}
                  </b>
                </td>
              </tr>
              <tr>
                <th>Blocked:</th>
                <td>
                  <b>
                    <span style={{marginLeft: '5px'}} className={this.props.user.isBlocked ? 'text-danger' : 'text-success'}>
                      {this.props.user.isBlocked ? 'true' : 'false'}
                    </span>
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
          <span>
            <input
              className={this.props.user.isBlocked ? 'btn btn-success' : 'btn btn-danger'}
              style={{ width: '120px', height: '40px', display: `${this.props.displayDelBtn}`}}
              type='submit'
              value={this.props.user.isBlocked ? 'Unblock' : 'Block'}
              onClick={this.props.onBlockUnblock} />
          </span>
        </div>
      </div>
    )
  }
}
