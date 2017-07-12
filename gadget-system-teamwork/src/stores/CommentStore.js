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
  getEditForm (commentId) {
    CommentData
    .editGet(commentId)
    .then(data => {
      this.emit(this.eventTypes.EDIT_COMMENT_FETCHED, data)
    })
  }
  editComment (commentBody, commentId) {
    CommentData
    .editPost(commentBody, commentId)
    .then(data => {
      this.emit(this.eventTypes.COMMENT_EDITED, data)
    })
  }
  getDeleteForm (commentId) {
    CommentData
    .deleteGet(commentId)
    .then(commentBody => {
      this.emit(this.eventTypes.DELETE_COMMENT_FETCHED, commentBody)
    })
  }
  deleteComment (commentId) {
    CommentData
    .deletePost(commentId)
    .then(deleteComment => {
      this.emit(this.eventTypes.DELETE_COMMENT, deleteComment)
    })
  }
  handleAction (action) {
    switch (action.type) {
      case commentActions.types.CREATE_COMMENT: {
        this.create(action.gadgetId, action.commentBody)
        break
      }
      case commentActions.types.FETCH_DELETE_COMMENT: {
        this.getDeleteForm(action.commentId)
        break
      }
      case commentActions.types.POST_DELETE_COMMENT: {
        this.deleteComment(action.commentId)
        break
      }
      case commentActions.types.FETCH_EDIT_COMMENT: {
        this.getEditForm(action.commentId)
        break
      }
      case commentActions.types.POST_EDIT_COMMENT: {
        this.editComment(action.commentBody, action.commentId)
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
  COMMENT_CREATED: 'comment_created',
  EDIT_COMMENT_FETCHED: 'edit_comment_fetched',
  COMMENT_EDITED: 'comment_edited',
  DELETE_COMMENT_FETCHED: 'delete_comment_fetched',
  DELETE_COMMENT: 'delete_comment'
}
dispatcher.register(commentStore.handleAction.bind(commentStore))

export default commentStore
