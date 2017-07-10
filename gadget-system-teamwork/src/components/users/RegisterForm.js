import React from 'react'
import Input from '../common/forms/Input'
const RegisterForm = (props) => ( // Dumb Component
  <div className='container'>
    <form>
      <div className='error'>{props.error}</div>
      <Input
        type='email'
        name='email'
        value={props.user.email}
        placeholder='E-mail'
        onChange={props.onChange} />
      <br />
      <Input
        type='password'
        name='password'
        value={props.user.password}
        placeholder='Password'
        onChange={props.onChange} />
      <br />
      <Input
        type='password'
        name='confirmPassword'
        value={props.user.confirmPassword}
        placeholder='Confirm-Password'
        onChange={props.onChange} />
      <br />
      <Input
        name='firstName'
        value={props.user.firstName}
        placeholder='First Name'
        onChange={props.onChange} />
      <br />
      <Input
        name='lastName'
        value={props.user.lastName}
        placeholder='Last Name'
        onChange={props.onChange} />
      <input type='submit' value='register' onClick={props.onSave} />
    </form>
  </div>
)

export default RegisterForm
