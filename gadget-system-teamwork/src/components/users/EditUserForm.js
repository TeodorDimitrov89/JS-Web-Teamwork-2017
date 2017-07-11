import React from 'react'
import Input from '../common/forms/Input'

const EditUserForm = (props) => {
  return (
    <form className='form-signin'>
      <div className='error'>{props.error}</div>
      <Input
        className='form-control'
        name='email'
        placeholder='E-mail:'
        value={props.user.email}
        onChange={props.onChange} />
      <Input
        name='firstName'
        placeholder='First Name:'
        value={props.user.firstName}
        onChange={props.onChange} />
      <Input
        name='lastName'
        placeholder='Last Name:'
        value={props.user.lastName}
        onChange={props.onChange} />
      <div>
        <label htmlFor='IsAdmin'>isAdmin:</label>
        <select name='isAdmin' id='type' onChange={props.onChange} >
          <option value='' />
          <option value='true'>true</option>
          <option value='false'>false</option>
        </select>
      </div>
      <input
        className='btn btn-warning btn-lg'
        type='submit'
        value='Edit'
        onClick={props.onEdit} />
    </form>
  )
}

export default EditUserForm
