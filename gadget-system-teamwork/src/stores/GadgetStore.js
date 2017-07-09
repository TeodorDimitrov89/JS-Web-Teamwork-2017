import { EventEmitter } from 'events'
import dispatcher from '../dispatcher/dispatcher'
import gadgetActions from '../actions/GadgetActions'
import GadgetData from '../data/GadgetData'

class GadgetStore extends EventEmitter {
  create (gadget) {
    GadgetData
      .create(gadget)
      .then(data => {
        this.emit(this.eventTypes.GADGET_CREATED, data)
      })
  }
  all (page) {
    page = page || 1
    GadgetData
      .all(page)
      .then(data => {
        this.emit(this.eventTypes.GADGET_FETCHED, data)
      })
  }
  details (gadgetId) {
    GadgetData
      .details(gadgetId)
      .then(data => {
        this.emit(this.eventTypes.GADGET_DETAILS, data)
      })
  }
  getDeleteForm (gadgetId) {
    GadgetData
      .deleteGet(gadgetId)
      .then(deleteGadget => {
        this.emit(this.eventTypes.DELETE_GADGET_FETCHED, deleteGadget)
      })
  }
  DeleteGadget (gadgetId) {
    GadgetData
      .deletePost(gadgetId)
      .then(deleteGadget => {
        this.emit(this.eventTypes.DELETE_GADGET, deleteGadget)
      })
  }
  handleAction (action) {
    switch (action.type) {
      case gadgetActions.types.CREATE_GADGET: {
        this.create(action.gadget)
        break
      }
      case gadgetActions.types.ALL_GADGETS: {
        this.all(action.page)
        break
      }
      case gadgetActions.types.GADGET_DETAILS: {
        this.details(action.gadgetId)
        break
      }
      case gadgetActions.types.FETCH_DELETE_GADGET: {
        this.getDeleteForm(action.gadgetId)
        break
      }
      case gadgetActions.types.POST_DELETE_GADGET: {
        this.DeleteGadget(action.gadgetId)
        break
      }
      default: break
    }
  }
}
let gadgetStore = new GadgetStore()
gadgetStore.eventTypes = {
  GADGET_CREATED: 'gadget_created',
  GADGET_FETCHED: 'gadget_fetched',
  DELETE_GADGET_FETCHED: 'delete_gadget_fetched',
  DELETE_GADGET: 'delete_gadget'
}
dispatcher.register(gadgetStore.handleAction.bind(gadgetStore))
export default gadgetStore
