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
      default: break
    }
  }
}
let gadgetStore = new GadgetStore()
gadgetStore.eventTypes = {
  GADGET_CREATED: 'gadget_created',
  GADGET_FETCHED: 'gadget_fetched'
}
dispatcher.register(gadgetStore.handleAction.bind(gadgetStore))
export default gadgetStore
