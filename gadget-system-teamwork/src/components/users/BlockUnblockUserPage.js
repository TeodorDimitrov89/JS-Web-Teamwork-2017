import React, {Component} from 'react'
import userActions from '../../actions/UserActions'
import userStore from '../../stores/UserStore'
import DeleteUserForm from './Details_BlockUnblock_UserForm'

export default class BlockUnblockUserPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: ''
    }

    this.handleSingleUserFetching = this.handleSingleUserFetching.bind(this)
    this.handleBlockUnblockBtnClick = this.handleBlockUnblockBtnClick.bind(this)
    this.handleUserBlockecUnblocked = this.handleUserBlockecUnblocked.bind(this)

    userStore.on(
      userStore.eventTypes.SINGLE_USER_FETCHED,
      this.handleSingleUserFetching
    )

    userStore.on(
      userStore.eventTypes.USER_BLOCKED_UNBLOCKED,
      this.handleUserBlockecUnblocked
    )
  }

  componentDidMount () {
    let userId = this.props.match.params.id
    userActions.getUser(userId)
  }

  componentWillUnmount () {
    userStore.removeListener(
      userStore.eventTypes.SINGLE_USER_FETCHED,
      this.handleSingleUserFetching
    )

    userStore.removeListener(
      userStore.eventTypes.USER_BLOCKED_UNBLOCKED,
      this.handleUserBlockecUnblocked
    )
  }

  handleUserBlockecUnblocked (user) {
    this.setState({user: user})
    this.props.history.push('/users/admin-panel')
  }

  handleSingleUserFetching (user) {
    this.setState({user: user})
  }

  handleBlockUnblockBtnClick (event) {
    event.preventDefault()
    userActions.blockUnblockUser(this.state.user._id)
  }

  render () {
    return (
      <DeleteUserForm
        user={this.state.user}
        viewName={'Block/Unblock user'}
        displayBlockBtn={'block'}
        onBlockUnblock={this.handleBlockUnblockBtnClick}
      />
    )
  }
}
