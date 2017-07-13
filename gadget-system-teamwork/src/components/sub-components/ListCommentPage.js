import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../users/Auth'
const ListCommentPage = (props) => (
  <div className='comments'>
    <div className='comment-box'>
      <span className='comment-count'>#{props.index}</span>
      <span>{props.author} says:</span>
      <p>{props.date}</p>
      <p>Content: {props.content}</p>
      {(Auth.isUserAuthenticated() && Auth.isUserAdmin()) ? (
        <div className='list-comments'>
          <Link to={`/gadgets/details/delete/comment/${props.commentId}`} className='btn btn-sm btn-danger btn-block' >Delete</Link>
          <Link to={`/gadgets/details/edit/comment/${props.commentId}`} className='btn btn-sm btn-info btn-block'>Edit</Link>
        </div>
      ) : '' }
    </div>
  </div>
)

export default ListCommentPage
