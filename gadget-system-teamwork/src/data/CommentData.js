import Data from '../data/Data'

const baseUrl = 'gadgets'

class CommentData {
  static create (gadgetId, commentBody) {
    return Data.post(`${baseUrl}/details/${gadgetId}/comments/create`, commentBody, true)
  }
  static getComments (gadgetId) {
    return Data.get(`${baseUrl}/details/${gadgetId}/comments/all`, true)
  }
}

export default CommentData
