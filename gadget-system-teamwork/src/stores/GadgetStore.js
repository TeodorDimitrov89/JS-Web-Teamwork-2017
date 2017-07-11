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
  getEditForm (gadgetId) {
    GadgetData
      .editGet(gadgetId)
      .then(editGadget => {
        this.emit(this.eventTypes.EDIT_GADGET_FETCHED, editGadget)
      })
  }
  editGadget (dataEditedGadget) {
    GadgetData
      .editPost(dataEditedGadget)
      .then(editGadget => {
        this.emit(this.eventTypes.GADGET_EDITED, editGadget)
      })
  }
  getDeleteForm (gadgetId) {
    GadgetData
      .deleteGet(gadgetId)
      .then(deleteGadget => {
        this.emit(this.eventTypes.DELETE_GADGET_FETCHED, deleteGadget)
      })
  }
  deleteGadget (gadgetId) {
    GadgetData
      .deletePost(gadgetId)
      .then(deleteGadget => {
        this.emit(this.eventTypes.DELETE_GADGET, deleteGadget)
      })
  }
  searchGadget (string) {
    GadgetData
      .search(string)
      .then(searchedGadgets => {
        this.emit(this.eventTypes.SEARCH_GADGET, searchedGadgets)
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
      case gadgetActions.types.FETCH_EDIT_GADGET: {
        this.getEditForm(action.gadgetId)
        break
      }
      case gadgetActions.types.POST_EIDT_GADGET: {
        this.editGadget(action.dataEditedGadget)
        break
      }
      case gadgetActions.types.FETCH_DELETE_GADGET: {
        this.getDeleteForm(action.gadgetId)
        break
      }
      case gadgetActions.types.POST_DELETE_GADGET: {
        this.deleteGadget(action.gadgetId)
        break
      }
      case gadgetActions.types.SEARCH_GADGET: {
        this.searchGadget(action.string)
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
  GADGET_DETAILS: 'gadget_details',
  EDIT_GADGET_FETCH: 'edit_gadget_fetched',
  GADGET_EDITED: 'gadget_edited',
  DELETE_GADGET_FETCHED: 'delete_gadget_fetched',
  DELETE_GADGET: 'delete_gadget',
  SEARCH_GADGET: 'search_gadget'
}
dispatcher.register(gadgetStore.handleAction.bind(gadgetStore))
export default gadgetStore
