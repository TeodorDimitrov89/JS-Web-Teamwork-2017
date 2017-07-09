import React from 'react'
const Input = (props) => {
  let type = props.type || 'text'
  return (
    <div>
      <label htmlFor={props.name}>{props.placeholder} </label>
      <input
        type={type}
        name={props.name}
        value={props.value}
        disabled={props.disabled}
        placeholder={props.placeholder}
        onChange={props.onChange} />
    </div>
  )
}

export default Input
