import React from 'react'

const Input = (props) => {
  let type = props.type || 'text'
  return (
    <div className='inputComponent'>
      <label htmlFor='name'>{props.placeholder} </label>
      <input
        type={type}
        name={props.name}
        placeholder={props.name}
        value={props.value}
        onChange={props.onChange} />
    </div>
  )
}

export default Input
