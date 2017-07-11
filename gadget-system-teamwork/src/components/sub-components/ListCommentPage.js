import React from 'react'
import { Link } from 'react-router-dom'
const ListCommentPage = (props) => (
  <div className='comments'>
    <div className='comment-box'>
      <span className='comment-count'>#{props.index}</span>
      <span>{props.author} says:</span>
      <p>{props.date}</p>
      <p>Content: {props.content}</p>
      <Link to={`/gadgets/details/delete/comment/${props.commentId}`} className='btn btn-sm btn-danger btn-block' >Delete</Link>
      <Link to='' className='btn btn-sm btn-info btn-block'>Edit</Link>
    </div>
  </div>
)

export default ListCommentPage
