import React from 'react'
import Input from '../common/forms/Input'
const DeleteGadgetForm = (props) => (
  <div>
    <form className='container'>
      <div className='error'>{props.error}</div>
      <Input
        disabled={props.disabled}
        name='title'
        placeholder='Title'
        value={props.gadget.title} />
      <br />
      <Input
        disabled={props.disabled}
        name='description'
        placeholder='Description'
        value={props.gadget.description} />
      <br />
      <Input
        disabled={props.disabled}
        type='url'
        name='image'
        placeholder='Image'
        value={props.gadget.image} />
      <br />
      <Input
        disabled={props.disabled}
        type='number'
        name='quantityOnStock'
        placeholder='Quantity On Stock'
        value={props.gadget.quantityOnStock} />
      <br />
      <Input
        disabled={props.disabled}
        type='number'
        name='price'
        placeholder='Price'
        value={props.gadget.price} />
      <input
        className='btn btn-danger btn-lg'
        type='submit'
        value='delete'
        onClick={props.onDelete} />
    </form>
  </div>
)

export default DeleteGadgetForm
