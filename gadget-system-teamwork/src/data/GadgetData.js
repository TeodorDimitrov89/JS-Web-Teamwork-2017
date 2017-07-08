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
}

export default GadgetData
