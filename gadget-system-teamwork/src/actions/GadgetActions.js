import dispatcher from '../dispatcher/dispatcher'

const gadgetActions = {
  types: {
    CREATE_GADGET: 'CREATE_GADGET',
    ALL_GADGETS: 'ALL_GADGETS',
    GADGET_DETAILS: 'GADGET_DETAILS',
    FETCH_DELETE_GADGET: 'FETCH_DELETE_GADGET',
    POST_DELETE_GADGET: 'POST_DELETE_GADGET'
  },
  create (gadget) {
    dispatcher.dispatch({
      type: this.types.CREATE_GADGET,
      gadget
    })
  },
  all (page) {
    page = page || 1
    dispatcher.dispatch({
      type: this.types.ALL_GADGETS,
      page
    })
  },
  details (gadgetId) {
    dispatcher.dispatch({
      type: this.types.GADGET_DETAILS,
      gadgetId
    })
  },
  deleteGet (gadgetId) {
    dispatcher.dispatch({
      type: this.types.FETCH_DELETE_GADGET,
      gadgetId
    })
  },
  deletePost (gadgetId) {
    dispatcher.dispatch({
      type: this.types.POST_DELETE_GADGET,
      gadgetId
    })
  }
}

export default gadgetActions
