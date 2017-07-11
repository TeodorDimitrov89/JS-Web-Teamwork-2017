import Data from './Data'
const baseUrl = 'auth'

class UserData {
  static register (user) {
    return Data.post(`${baseUrl}/signup`, user)
  }
  static login (user) {
    return Data.post(`${baseUrl}/login`, user)
  }
  static getAll () {
    return Data.get(`${baseUrl}/all`, true)
  }
  static getUser (userId) {
    return Data.get(`${baseUrl}/${userId}`, true)
  }
  static blockUnblockUser (userId) {
    return Data.post(`${baseUrl}/block/${userId}`, ({}), true)
  }
  static editUser (user) {
    return Data.post(`${baseUrl}/edit`, user, true)
  }
}
export default UserData
