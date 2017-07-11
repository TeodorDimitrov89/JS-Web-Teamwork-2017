import dispatcher from '../dispatcher/dispatcher'

const commentActions = {
  types: {
    CREATE_COMMENT: 'CREATE_COMMENT'
  },
  create (gadgetId, commentBody) {
    dispatcher.dispatch({
      type: this.types.CREATE_COMMENT,
      gadgetId,
      commentBody
    })
  }
}

export default commentActions
