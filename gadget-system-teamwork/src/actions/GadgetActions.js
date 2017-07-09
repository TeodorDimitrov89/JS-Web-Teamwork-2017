import dispatcher from '../dispatcher/dispatcher'

const gadgetActions = {
  types: {
    CREATE_GADGET: 'CREATE_GADGET',
    ALL_GADGETS: 'ALL_GADGETS',
    GADGET_DETAILS: 'GADGET_DETAILS'
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
  }
}

export default gadgetActions
