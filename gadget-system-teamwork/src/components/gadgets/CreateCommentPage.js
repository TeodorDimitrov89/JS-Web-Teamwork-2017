import React from 'react'
import CreateCommentForm from './CreateCommentForm'
import FormHelpers from '../common/forms/FormHelpers'
import ValidateHelpers from '../common/ValidateHelpers'
import commentActions from '../../actions/CommentActions'
import commentStore from '../../stores/CommentStore'

import toastr from 'toastr'
class CreateCommentPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: {
        content: '',
        author: '',
        createdOn: ''
      },
      error: ''
    }
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.handleCommentForm = this.handleCommentForm.bind(this)
    this.handleCommentCreation = this.handleCommentCreation.bind(this)
    commentStore.on(
      commentStore.eventTypes.COMMENT_CREATED,
      this.handleCommentCreation)
  }
  componentWillUnmount () {
    commentStore.removeListener(
      commentStore.eventTypes.COMMENT_CREATED,
      this.handleCommentCreation)
  }
  handleCommentCreation (data) {
    if (!data.success) {
      let firstError = FormHelpers.getFirstError(data)
      this.setState({error: firstError})
    } else {
      toastr.success(data.message)
      const gadgetId = this.props.match.params.id
      this.props.history.push(`/gadgets/details/${gadgetId}`)
    }
  }

  handleCommentChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'comment')
  }
  handleCommentForm (event) {
    event.preventDefault()
    if (!this.validateComment()) {
      return
    }
    const gadgetId = this.props.match.params.id
    commentActions.create(gadgetId, this.state.comment)
  }
  validateComment () {
    const comment = this.state.comment
    return ValidateHelpers.validateCreateEditComment.bind(this)(comment)
  }
  render () {
    let gadgetTitle = this.props.match.params.title.replace(/[-]+/g, ' ')
    return (
      <div className='container'>
        <CreateCommentForm
          gadgetTitle={gadgetTitle}
          comment={this.state.comment}
          error={this.state.error}
          onChange={this.handleCommentChange}
          onSave={this.handleCommentForm} />
      </div>
    )
  }
}
export default CreateCommentPage
