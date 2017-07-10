import dispatcher from '../dispatcher/dispatcher'

const userActions = {
  types: {
    REGISTER_USER: 'REGISTER_USER',
    LOGIN_USER: 'LOGIN_USER',
    FETCH_USERS: 'FETCH_USERS'
  },
  register (user) {
    dispatcher.dispatch({
      type: this.types.REGISTER_USER,
      user
    })
  },
  login (user) {
    dispatcher.dispatch({
      type: this.types.LOGIN_USER,
      user
    })
  },
  getAllUsers () {
    dispatcher.dispatch({
      type: this.types.FETCH_USERS
    })
  }
}

export default userActions
