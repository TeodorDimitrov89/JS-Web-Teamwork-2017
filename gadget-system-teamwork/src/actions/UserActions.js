import dispatcher from '../dispatcher/dispatcher'

const userActions = {
  types: {
    REGISTER_USER: 'REGISTER_USER',
    LOGIN_USER: 'LOGIN_USER',
    FETCH_USERS: 'FETCH_USERS',
    FETCH_SINGLE_USER: 'FETCH_SINGLE_USER',
    BLOCK_UNBLOCK_USER: 'BLOCK_UNBLOCK_USER',
    EDIT_USER: 'EDIT_USER',
    FETCH_GADGETS_BOUGHT: 'FETCH_GADGETS_BOUGHT'
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
  },
  getUser (userId) {
    dispatcher.dispatch({
      type: this.types.FETCH_SINGLE_USER,
      userId
    })
  },
  getGadgetsBought (userId) {
    dispatcher.dispatch({
      type: this.types.FETCH_GADGETS_BOUGHT,
      userId
    })
  },
  blockUnblockUser (userId) { // The actions blocks or unblocks depending on its current isBlocked status
    dispatcher.dispatch({
      type: this.types.BLOCK_UNBLOCK_USER,
      userId
    })
  },
  editUser (user) {
    dispatcher.dispatch({
      type: this.types.EDIT_USER,
      user
    })
  }
}

export default userActions
