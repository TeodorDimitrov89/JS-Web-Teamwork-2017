import React from 'react'
import Input from '../common/forms/Input'
import TextArea from '../common/forms/TextArea'

const CreateGadgetForm = (props) => (
  <div className='container'>
    <form>
      <div className='error'>{props.error}</div>
      <Input
        name='title'
        placeholder='Title'
        value={props.gadget.title}
        onChange={props.onChange} />
      <br />
      <TextArea
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
      <br />
      <input
        className='btn btn-primary btn-lg'
        type='submit'
        value='add'
        onClick={props.onSave} />
    </form>
  </div>
)

export default CreateGadgetForm
