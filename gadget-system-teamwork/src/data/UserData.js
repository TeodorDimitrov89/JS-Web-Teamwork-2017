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
}
export default UserData
