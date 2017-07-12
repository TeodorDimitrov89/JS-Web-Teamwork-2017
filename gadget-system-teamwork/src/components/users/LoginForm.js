import React from 'react'
import Input from '../common/forms/Input'
const LoginForm = (props) => (
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
      <input className='btn btn-primary' type='submit' value='login' onClick={props.onSave} />
      <br />
    </form>
  </div>
)

export default LoginForm
