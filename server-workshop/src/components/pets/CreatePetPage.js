import React, { Component } from 'react'
import FormHelpers from '../common/forms/FormHelpers'
import CreatePetForm from './CreatePetForm'
import petActions from '../../actions/PetActions'
import petStore from '../../stores/PetStore'
import toastr from 'toastr'

class CreatePetPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pet: {
        name: 'Rijko',
        age: 2,
        type: 'Cat',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUDQgbT9PFaERFaLbqP8sFsyq2r3sSYu6BtCj63z90tLEpALgo',
        breed: 'Street superb'
      },
      error: ''
    }

    this.handlePetCreation = this.handlePetCreation.bind(this)

    petStore.on(
      petStore.eventTypes.PET_CREATED,
      this.handlePetCreation
    )
  }

  componentWillUnmount () {
    petStore.removeListener(
      petStore.eventTypes.PET_CREATED,
      this.handlePetCreation
    )
  }

  handlePetChange (event) {
    const formChangeFunc = FormHelpers.handleFormChange.bind(this)
    formChangeFunc(event, 'pet')
  }

  handlePetForm (event) {
    event.preventDefault()

    // validate form data

    petActions.create(this.state.pet)
  }

  handlePetCreation (data) {
    if (!data.success) {
      let firstError = FormHelpers.getFirstError(data)
      this.setState({
        error: firstError
      })
    } else {
      toastr.success(data.message)
      this.props.history.push(`/pets/details/${data.pet.id}`)
    }
  }

  render () {
    return (
      <div className='petClass'>
        <h1>Add Your Pet</h1>
        <CreatePetForm
          pet={this.state.pet}
          error={this.state.error}
          onChange={this.handlePetChange.bind(this)}
          onSave={this.handlePetForm.bind(this)}
        />
      </div>
    )
  }
}

export default CreatePetPage
