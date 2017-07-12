import React from 'react'
import Input from '../common/forms/Input'
import TextArea from '../common/forms/TextArea'
const EditCommentForm = (props) => (
  <div className='container'>
    <form>
      <div className='error'>{props.error}</div>
      <Input
        disabled
        name='author'
        placeholder='Author'
        value={props.comment.author} />
      <TextArea
        name='content'
        placeholder='Content'
        value={props.comment.content}
        onChange={props.onChange} />
      <br />
      <Input
        disabled
        name='date'
        placeholder='Created on'
        value={props.comment.date} />
      <br />
      <input
        className='btn btn-warning btn-lg'
        type='submit'
        value='Edit'
        onClick={props.onSave} />
    </form>
  </div>
)

export default EditCommentForm
