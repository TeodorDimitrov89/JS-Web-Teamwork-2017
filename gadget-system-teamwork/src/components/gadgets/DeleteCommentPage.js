import React from 'react'
import commentActions from '../../actions/CommentActions'
import commentStore from '../../stores/CommentStore'
import DeleteCommentForm from './DeleteCommentForm'
import toastr from 'toastr'

class DeleteCommentPage extends React.Component {
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
    this.handleDeleteFetching = this.handleDeleteFetching.bind(this)
    this.handleCommentDelete = this.handleCommentDelete.bind(this)
    this.handleCommentForm = this.handleCommentForm.bind(this)

    commentStore.on(
      commentStore.eventTypes.DELETE_COMMENT_FETCHED,
      this.handleDeleteFetching
    )
    commentStore.on(
      commentStore.eventTypes.DELETE_COMMENT,
      this.handleCommentDelete
    )
  }
  componentDidMount () {
    commentActions.deleteGet(this.state.commentId)
  }
  componentWillUnmount () {
    commentStore.removeListener(
      commentStore.eventTypes.DELETE_COMMENT_FETCHED,
      this.handleDeleteFetching
    )
    commentStore.removeListener(
      commentStore.eventTypes.DELETE_COMMENT,
      this.handleCommentDelete
    )
  }
  handleCommentDelete (data) {
    toastr.success(data.message)
    const gadgetId = data.deletedComment.gadgetId
    this.props.history.push(`/gadgets/details/${gadgetId}`)
  }
  handleDeleteFetching (commentFetched) {
    this.setState({
      comment: commentFetched.comment
    })
  }
  handleCommentForm (event) {
    event.preventDefault()
    commentActions.deletePost(this.state.commentId)
  }
  render () {
    return (
      <div>
        <DeleteCommentForm
          disabled
          comment={this.state.comment}
          error={this.state.error}
          onDelete={this.handleCommentForm} />
      </div>
    )
  }
}

export default DeleteCommentPage
