import dispatcher from '../dispatcher/dispatcher'

const commentActions = {
  types: {
    CREATE_COMMENT: 'CREATE_COMMENT',
    ALL_COMMENTS: 'ALL_COMMENTS'
  },
  create (gadgetId, commentBody) {
    dispatcher.dispatch({
      type: this.types.CREATE_COMMENT,
      gadgetId,
      commentBody
    })
  },
  all (page) {
    page = page || 1
    dispatcher.dispatch({
      type: this.types.ALL_COMMENTS,
      page
    })
  }
}

export default commentActions
