import React from 'react'
import EditCommentForm from './EditCommentForm'
import commentActions from '../../actions/CommentActions'
import commentStore from '../../stores/CommentStore'
import FormHelpers from '../common/forms/FormHelpers'
import ValidateHelpers from '../common/ValidateHelpers'
import toastr from 'toastr'

class EditCommentPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      commentId: this.props.match.params.id,
      comment: {
        author: '',
        content: '',
        date: ''
      },
      error: ''
    }
    this.handleEditFetching = this.handleEditFetching.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.handleCommentEdit = this.handleCommentEdit.bind(this)
    this.handleCommentForm = this.handleCommentForm.bind(this)
    commentStore.on(
      commentStore.eventTypes.EDIT_COMMENT_FETCHED,
      this.handleEditFetching
    )
    commentStore.on(
      commentStore.eventTypes.COMMENT_EDITED,
      this.handleCommentEdit
    )
  }
  componentDidMount () {
    commentActions.editGet(this.state.commentId)
  }
  componentWillUnmount () {
    commentStore.removeListener(
      commentStore.eventTypes.EDIT_COMMENT_FETCHED,
    this.handleEditFetching)

    commentStore.removeListener(
      commentStore.eventTypes.COMMENT_EDITED,
    this.handleCommentEdit)
  }

  handleCommentEdit (data) {
    let gadgetId = data.editedComment.gadgetId
    this.setState({
      comment: data.editedComment
    })
    toastr.success(data.message)
    this.props.history.push(`/gadgets/details/${gadgetId}`)
  }

  handleEditFetching (commentFetched) {
    this.setState({
      comment: commentFetched.comment
    })
  }
  handleCommentChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'comment')
  }
  handleCommentForm (event) {
    event.preventDefault()

    if (!this.validateComment()) {
      return
    }
    const commmentBody = this.state.comment
    const commentId = this.state.commentId
    commentActions.editPost(commmentBody, commentId)
  }
  validateComment () {
    const comment = this.state.comment
    return ValidateHelpers.validateCreateEditComment.bind(this)(comment)
  }
  render () {
    return (
      <div>
        <EditCommentForm
          comment={this.state.comment}
          error={this.state.error}
          onChange={this.handleCommentChange}
          onSave={this.handleCommentForm} />
      </div>
    )
  }
}

export default EditCommentPage
