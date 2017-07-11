import React, {Component} from 'react'
import userActions from '../../actions/UserActions'
import userStore from '../../stores/UserStore'
import EditUserForm from './EditUserForm'
import FormHelpers from '../common/forms/FormHelpers'

export default class EditUserPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {
        email: '',
        firstName: '',
        lastName: '',
        isAdmin: ''
      }
    }

    this.handleSingleUserFetching = this.handleSingleUserFetching.bind(this)
    this.handleUserEditing = this.handleUserEditing.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnEdit = this.handleOnEdit.bind(this)

    userStore.on(
      userStore.eventTypes.SINGLE_USER_FETCHED,
      this.handleSingleUserFetching
    )

    userStore.on(
      userStore.eventTypes.USER_EDITED,
      this.handleUserEditing)
  }

  componentDidMount () {
    let userId = this.props.match.params.id
    userActions.getUser(userId)
  }

  componentWillUnmount () {
    userStore.removeListener(
      userStore.eventTypes.SINGLE_USER_FETCHED,
      this.handleSingleUserFetching)

    userStore.removeListener(
      userStore.eventTypes.USER_EDITED,
      this.handleUserEditing)
  }

  handleUserEditing (user) {
    this.props.history.push('/users/admin-panel')
  }

  handleSingleUserFetching (user) {
    this.setState({user: user})
  }

  handleOnChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'user')
  }

  handleOnEdit (event) {
    event.preventDefault()
    userActions.editUser(this.state.user)
  }

  render () {
    return (
      <div>
        <h1>EDIT USER PAGE</h1>
        <EditUserForm
          user={this.state.user}
          error={this.state.erro}
          onChange={this.handleOnChange}
          onEdit={this.handleOnEdit} />
      </div>
    )
  }
}
