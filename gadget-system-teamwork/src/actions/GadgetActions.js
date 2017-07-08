import dispatcher from '../dispatcher/dispatcher'

const gadgetActions = {
  types: {
    CREATE_GADGET: 'CREATE_GADGET',
    ALL_GADGETS: 'ALL_GADGETS'
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
  }
}

export default gadgetActions
