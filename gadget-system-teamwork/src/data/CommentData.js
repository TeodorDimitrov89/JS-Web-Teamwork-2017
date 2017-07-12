import Data from '../data/Data'

const baseUrl = 'gadgets'

class CommentData {
  static create (gadgetId, commentBody) {
    return Data.post(`${baseUrl}/details/${gadgetId}/comments/create`, commentBody, true)
  }

  static editGet (commentId) {
    return Data.get(`${baseUrl}/details/edit/comment/${commentId}`)
  }

  static editPost (commentBody, commentId) {
    return Data.post(`${baseUrl}/details/edit/comment/${commentId}`, commentBody, true)
  }

  static deleteGet (commentId) {
    return Data.get(`${baseUrl}/details/delete/comment/${commentId}`)
  }
  static deletePost (commentId) {
    return Data.post(`${baseUrl}/details/delete/comment/${commentId}`)
  }
}

export default CommentData
