import React from 'react'
const Select = (props) => {
  return (
    <div>
      <select name='type' id='type'>
        <option value={props.pet.type.Cat}>{props.pet.type.Cat}</option>
        <option value={props.pet.type.Dog}>{props.pet.type.Dog}</option>
        <option value={props.pet.type.Other}>{props.pet.type.Other}</option>
      </select>
    </div>
  )
}

export default Select
