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
  static deleteGet (id) { // TODO: change id to gadgetId
    return Data.get(`${baseUrl}/delete/${id}`, true) // TODO: check if user is admin
  }
}

export default GadgetData
