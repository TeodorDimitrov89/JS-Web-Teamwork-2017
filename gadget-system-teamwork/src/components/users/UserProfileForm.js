import React, {Component} from 'react'

export default class UserProfileForm extends Component {
  render () {
    // console.log(this.props.data)
    return (
      <div className='container'>
        <h1>User Bought data</h1>
        <table className='table table-responsive table-bordered table table-striped'>
          <thead className='thead-inverse'>
            <tr>
              <th>Pos Nr.</th>
              <th>Gadget</th>
              <th>Bought pcs.</th>
              <th>Single price,<p>USD</p></th>
              <th>Sum,<p>USD</p></th>
            </tr>
          </thead>
          <tbody>
            {this.props.data}
          </tbody>
        </table>
      </div>
    )
  }
}
