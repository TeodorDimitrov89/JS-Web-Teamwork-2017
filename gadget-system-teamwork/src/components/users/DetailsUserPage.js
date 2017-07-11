import React, {Component} from 'react'
import userActions from '../../actions/UserActions'
import userStore from '../../stores/UserStore'
import DetailsUserForm from './Details_BlockUnblock_UserForm'

export default class DetailsUserPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: ''
    }

    this.handleSingleUserFetching = this.handleSingleUserFetching.bind(this)

    userStore.on(
      userStore.eventTypes.SINGLE_USER_FETCHED,
      this.handleSingleUserFetching
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
  }

  handleSingleUserFetching (user) {
    this.setState({ user: user })
  }

  render () {
    return (
      <DetailsUserForm
        user={this.state.user}
        viewName={'User details'}
        displayDelBtn={'none'}
        displayCancelBtn={'none'}
      />
    )
  }
}
