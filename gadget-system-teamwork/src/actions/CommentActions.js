import dispatcher from '../dispatcher/dispatcher'

const commentActions = {
  types: {
    CREATE_COMMENT: 'CREATE_COMMENT',
    FETCH_DELETE_COMMENT: 'FETCH_DELETE_COMMENT',
    POST_DELETE_COMMENT: 'POST_DELETE_COMMENT',
    FETCH_EDIT_COMMENT: 'FETCH_EDIT_COMMENT',
    POST_EDIT_COMMENT: 'POST_EDIT_COMMENT'
  },
  create (gadgetId, commentBody) {
    dispatcher.dispatch({
      type: this.types.CREATE_COMMENT,
      gadgetId,
      commentBody
    })
  },
  deleteGet (commentId) {
    dispatcher.dispatch({
      type: this.types.FETCH_DELETE_COMMENT,
      commentId
    })
  },
  deletePost (commentId) {
    dispatcher.dispatch({
      type: this.types.POST_DELETE_COMMENT,
      commentId
    })
  },
  editGet (commentId) {
    dispatcher.dispatch({
      type: this.types.FETCH_EDIT_COMMENT,
      commentId
    })
  },
  editPost (commentBody, commentId) {
    dispatcher.dispatch({
      type: this.types.POST_EDIT_COMMENT,
      commentBody,
      commentId
    })
  }
}

export default commentActions
