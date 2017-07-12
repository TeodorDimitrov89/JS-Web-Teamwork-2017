import React from 'react'
import ValidateHelpers from '../common/ValidateHelpers'
import CreateGadgetForm from '../gadgets/CreateGadgetForm'
import FormHelpers from '../common/forms/FormHelpers'
import gadgetActions from '../../actions/GadgetActions'
import gadgetStore from '../../stores/GadgetStore'
import toastr from 'toastr'
import Auth from '../users/Auth'
class CreateGadgetPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      gadget: {
        title: '',
        description: '',
        image: '',
        quantityOnStock: '',
        price: ''
      },
      error: ''
    }

    this.handleGadgetChange = this.handleGadgetChange.bind(this)
    this.handleGadgetForm = this.handleGadgetForm.bind(this)
    this.handleGadgetCreation = this.handleGadgetCreation.bind(this)

    gadgetStore.on(
      gadgetStore.eventTypes.GADGET_CREATED,
      this.handleGadgetCreation
    )
  }
  componentDidMount () {
    if (this.props.location.pathname === '/gadgets/add' && !Auth.getUser('user').isAdmin) {
      toastr.error('You are not authorized to create gadgets.')
      this.props.history.push('/users/login')
    }
  }
  componentWillUnmount () {
    gadgetStore.removeListener(
    gadgetStore.eventTypes.GADGET_CREATED,
    this.handleGadgetCreation
    )
  }

  handleGadgetCreation (data) {
    if (!data.success) {
      let firstError = FormHelpers.getFirstError(data)
      this.setState({error: firstError})
    } else {
      toastr.success(data.message)
      this.props.history.push('/')
    }
  }

  handleGadgetChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'gadget')
  }

  handleGadgetForm (event) {
    event.preventDefault()
    // validate gadget data
    if (!this.validateGadget()) {
      return
    }
    gadgetActions.create(this.state.gadget)
  }

  validateGadget () {
    const gadget = this.state.gadget
    return ValidateHelpers.validateGadgetCreate.bind(this)(gadget)
  }
  render () {
    return (
      <div>
        <h1>Create Gadget</h1>
        <CreateGadgetForm
          gadget={this.state.gadget}
          error={this.state.error}
          onChange={this.handleGadgetChange}
          onSave={this.handleGadgetForm} />
      </div>
    )
  }
}

export default CreateGadgetPage
