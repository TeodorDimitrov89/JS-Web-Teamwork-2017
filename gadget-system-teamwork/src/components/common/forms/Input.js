import React from 'react'
const Input = (props) => {
  let type = props.type || 'text'
  return (
    <div className="form-group">
      <label className="control-label" htmlFor={props.name}>{props.placeholder} </label>
      <input
        className="form-control"
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