import React from 'react'
import TextArea from '../common/forms/TextArea'
const CreateCommentForm = (props) => (
  <div>
    <h2>Create Comment Form</h2>
    <form>
      <div className='error'>{props.error}</div>
      <TextArea
        type='text'
        name='content'
        placeholder='Add your comment'
        value={props.comment.content}
        onChange={props.onChange} />
      <input
        className='btn btn-primary btn-lg'
        type='submit'
        value='add comment'
        onClick={props.onSave} />
    </form>
  </div>
)

export default CreateCommentForm
