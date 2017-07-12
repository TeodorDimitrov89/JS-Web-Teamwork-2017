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
  static editGet (gadgetId) {
    return Data.get(`${baseUrl}/edit/${gadgetId}`, true) // TODO: check if user is admin
  }
  static editPost (dataEditGadget) {
    return Data.post(`${baseUrl}/edit/${dataEditGadget._id}`, dataEditGadget, true) // TODO: check if user is admin
  }
  static deleteGet (gadgetId) {
    return Data.get(`${baseUrl}/delete/${gadgetId}`, true) // TODO: check if user is admin
  }
  static deletePost (gadgetId) {
    return Data.post(`${baseUrl}/delete/${gadgetId}`, {}, true) // TODO: check if user is admin
  }
  static search (string) {
    return Data.get(`${baseUrl}/?search=${string}`)
  }
  static buyGadget (gadgetId) {
    return Data.post(`${baseUrl}/buy/${gadgetId}`, {gadgetId: gadgetId}, true)
  }
}

export default GadgetData
