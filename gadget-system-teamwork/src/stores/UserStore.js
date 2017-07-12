import { EventEmitter } from 'events'
import dispatcher from '../dispatcher/dispatcher'
import userActions from '../actions/UserActions'
import UserData from '../data/UserData'

class UserStore extends EventEmitter {
  register (user) {
    UserData
      .register(user)
      .then(data => this.emit(this.eventTypes.USER_REGISTERED, data))
  }
  login (user) {
    UserData
      .login(user)
      .then(data => this.emit(this.eventTypes.USER_LOGGED_IN, data))
  }
  getAllUsers () {
    UserData
      .getAll()
      .then(data => this.emit(this.eventTypes.USER_FETCHED, data))
  }
  getUser (userId) {
    UserData
      .getUser(userId)
      .then(data => this.emit(this.eventTypes.SINGLE_USER_FETCHED, data.user))
  }
  blockUnblockUser (userId) {
    UserData
      .blockUnblockUser(userId)
      .then(data => this.emit(this.eventTypes.USER_BLOCKED_UNBLOCKED, data.user))
  }
  editUser (user) {
    UserData
      .editUser(user)
      .then(data => this.emit(this.eventTypes.USER_EDITED, data))
  }
  getGadgetsBought (userId) {
    Promise.all(UserData.getGadgetsBought(userId))
      .then(data => this.emit(this.eventTypes.GADGETS_BOUGHT_FETCHED, data))
  }
  handleAction (action) {
    switch (action.type) {
      case userActions.types.REGISTER_USER: {
        this.register(action.user)
        break
      }
      case userActions.types.LOGIN_USER: {
        this.login(action.user)
        break
      }
      case userActions.types.FETCH_USERS: {
        this.getAllUsers()
        break
      }
      case userActions.types.FETCH_SINGLE_USER: {
        this.getUser(action.userId)
        break
      }
      case userActions.types.BLOCK_UNBLOCK_USER: {
        this.blockUnblockUser(action.userId)
        break
      }
      case userActions.types.EDIT_USER: {
        this.editUser(action.user)
        break
      }
      case userActions.types.FETCH_GADGETS_BOUGHT: {
        this.getGadgetsBought(action.userId)
        break
      }
      default: break
    }
  }
}
let userStore = new UserStore()
userStore.eventTypes = {
  USER_REGISTERED: 'user_registered',
  USER_LOGGED_IN: 'user_logged_in',
  USER_FETCHED: 'user_fetched',
  SINGLE_USER_FETCHED: 'single_user_fetched',
  USER_BLOCKED_UNBLOCKED: 'user_blocked_unblocked',
  USER_EDITED: 'user_edited',
  GADGETS_BOUGHT_FETCHED: 'gadgets_bought_fetched'
}
dispatcher.register(userStore.handleAction.bind(userStore))
export default userStore
