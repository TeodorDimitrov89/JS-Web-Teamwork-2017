import React from 'react'

class DeleteCommentPage extends React.Component {
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
  }
  render () {
    return (
      <div>
        Hello from Delete Comment Page
      </div>
    )
  }
}

export default DeleteCommentPage
