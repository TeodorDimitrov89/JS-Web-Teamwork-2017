import React, { Component } from 'react'
import userActions from '../../actions/UserActions'
import userStore from '../../stores/UserStore'
import UserProfileForm from './UserProfileForm'

export default class UserProfilePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {},
      boughtData: {}
    }

    this.handleBoughtGadgetsFetching = this.handleBoughtGadgetsFetching.bind(this)

    userStore.on(
      userStore.eventTypes.GADGETS_BOUGHT_FETCHED,
      this.handleBoughtGadgetsFetching
    )
  }

  componentDidMount () {
    let reqUserId = this.props.match.params.id
    userActions.getGadgetsBought(reqUserId)
  }

  componentWillUnmount () {
    userStore.removeListener(
      userStore.eventTypes.GADGETS_BOUGHT_FETCHED,
      this.handleBoughtGadgetsFetching
    )
  }

  handleBoughtGadgetsFetching (data) {
    let newState = {
      user: data[0],
      boughtData: data[1]
    }
    this.setState(newState)
  }

  render () {
    let boughtData = this.state.boughtData.qtyBoughtGadgets
    let renderRows = <tr style={{color: 'red', fontSize: '1.4em'}}><td><strong>No articles bought by the user</strong></td></tr>
    if (Object.keys(this.state.boughtData).length !== 0) {
      console.log(this.state.boughtData.qtyBoughtGadgets)
      renderRows = Object.keys(boughtData).map((key, index) => {
        let gadgetName = key
        let pcs = boughtData[key][0]
        let rowSum = boughtData[key][1]
        let singlePrice = Number(rowSum) / Number(pcs)
        return (
          <tr className='text-right' key={index}>
            <td>{index + 1}</td>
            <td>{gadgetName}</td>
            <td>{pcs}</td>
            <td>{singlePrice}</td>
            <td>{rowSum}</td>
          </tr>
        )
      })
    }

    return (
      <UserProfileForm
        data={renderRows} />
    )
  }
}
