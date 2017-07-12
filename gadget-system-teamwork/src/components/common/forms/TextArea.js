import React from 'react'

const TextArea = (props) => (
  <div className='form-group'>
    <label htmlFor={props.name}>{props.placeholder} </label>
    <textarea
      rows='4' cols='50'
      className='form-control'
      disabled={props.disabled}
      type={props.type}
      id={props.name}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange} />
  </div>
)

export default TextArea
