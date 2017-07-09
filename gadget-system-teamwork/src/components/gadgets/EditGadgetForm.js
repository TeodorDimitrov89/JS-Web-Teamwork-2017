import React from 'react'
import Input from '../common/forms/Input'

const EditGadgetForm = (props) => (
  <div>
    <form className='container'>
      <div className='error'>{props.error}</div>
      <Input
        name='title'
        placeholder='Title'
        value={props.gadget.title}
        onChange={props.onChange} />
      <br />
      <Input
        name='description'
        placeholder='Description'
        value={props.gadget.description}
        onChange={props.onChange} />
      <br />
      <Input
        type='url'
        name='image'
        placeholder='Image'
        value={props.gadget.image}
        onChange={props.onChange} />
      <br />
      <Input
        type='number'
        name='quantityOnStock'
        placeholder='Quantity On Stock'
        value={props.gadget.quantityOnStock}
        onChange={props.onChange} />
      <br />
      <Input
        type='number'
        name='price'
        placeholder='Price'
        value={props.gadget.price}
        onChange={props.onChange} />
      <input
        className='btn btn-warning btn-lg'
        type='submit'
        value='edit'
        onClick={props.onEdit} />
    </form>
  </div>
)

export default EditGadgetForm
