import { EventEmitter } from 'events'
import dispatcher from '../dispatcher/dispatcher'
import commentActions from '../actions/CommentActions'
import CommentData from '../data/CommentData'

class CommentStore extends EventEmitter {
  create (gadgetId, commentBody) {
    CommentData
      .create(gadgetId, commentBody)
      .then(data => {
        this.emit(this.eventTypes.COMMENT_CREATED, data)
      })
  }

  handleAction (action) {
    switch (action.type) {
      case commentActions.types.CREATE_COMMENT: {
        this.create(action.gadgetId, action.commentBody)
        break
      }
      default: {
        break
      }
    }
  }
}

let commentStore = new CommentStore()
commentStore.eventTypes = {
  COMMENT_CREATED: 'COMMENT_CREATED'
}
dispatcher.register(commentStore.handleAction.bind(commentStore))

export default commentStore
