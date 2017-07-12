import React from 'react'
import Input from '../common/forms/Input'
import TextArea from '../common/forms/TextArea'
const DeleteCommentForm = (props) => (
  <div className='container'>
    <form>
      <div className='error'>{props.error}</div>
      <Input
        disabled={props.disabled}
        name='author'
        placeholder='Author'
        value={props.comment.author} />
      <TextArea
        disabled={props.disabled}
        name='content'
        placeholder='Content'
        value={props.comment.content} />
      <br />
      <Input
        disabled={props.disabled}
        name='date'
        placeholder='Created on'
        value={props.comment.date} />
      <br />
      <input
        className='btn btn-danger btn-lg'
        type='submit'
        value='Delete'
        onClick={props.onDelete} />
    </form>
  </div>
)

export default DeleteCommentForm
