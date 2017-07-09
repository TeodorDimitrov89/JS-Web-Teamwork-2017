import Data from './Data'

const baseUrl = 'gadgets'

class GadgetData {
  static all (page) {
    page = page || 1
    return Data.get(`${baseUrl}/all?page=${page}`)
  }
  static create (gadget) {
    return Data.post(`${baseUrl}/create`, gadget, true) // sending true for authorization
  }
  static details (gadgetId) {
    return Data.get(`${baseUrl}/details/${gadgetId}`, true)
  }
  static deleteGet (gadgetId) {
    return Data.get(`${baseUrl}/delete/${gadgetId}`, true) // TODO: check if user is admin
  }
  static deletePost (gadgetId) {
    return Data.delete(`${baseUrl}/delete/${gadgetId}`, true) // TODO: check if user is admin
  }
}

export default GadgetData
