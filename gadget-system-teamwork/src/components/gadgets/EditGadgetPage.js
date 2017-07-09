import React from 'react'
import gadgetActions from '../../actions/GadgetActions'
import gadgetStore from '../../stores/GadgetStore'
import EditGadgetForm from './EditGadgetForm'
import FormHelpers from '../common/forms/FormHelpers'
import toastr from 'toastr'

class EditGadgetPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      gadgetId: this.props.match.params.id,
      gadget: {
        title: '',
        description: '',
        image: '',
        price: 0,
        quantityOnStock: 0
      },
      error: ''
    }
    this.handleGadgetChange = this.handleGadgetChange.bind(this)
    this.handleEditFetching = this.handleEditFetching.bind(this)
    this.handleGadgetForm = this.handleGadgetForm.bind(this)
    this.handleGadgetEdit = this.handleGadgetEdit.bind(this)

    gadgetStore.on(gadgetStore.eventTypes.EDIT_GADGET_FETCHED,
    this.handleEditFetching)

    gadgetStore.on(gadgetStore.eventTypes.GADGET_EDITED,
    this.handleGadgetEdit)
  }

  componentDidMount () {
    gadgetActions.editGet(this.state.gadgetId)
  }

  componentWillUnmount () {
    gadgetStore.removeListener(gadgetStore.eventTypes.EDIT_GADGET_FETCHED,
    this.handleEditFetching)

    gadgetStore.removeListener(gadgetStore.eventTypes.GADGET_EDITED,
    this.handleGadgetEdit)
  }

  handleGadgetChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'gadget')
  }

  handleEditFetching (editGadget) {
    this.setState({gadget: editGadget})
  }

  handleGadgetForm (event) {
    event.preventDefault()
    gadgetActions.editPost(this.state.gadget)
  }
  handleGadgetEdit (data) {
    toastr.success(data.message)
    this.props.history.push('/')
  }
  render () {
    return (
      <div>
        <h1>Edit Gadget page</h1>
        <EditGadgetForm
          gadget={this.state.gadget}
          error={this.state.error}
          onChange={this.handleGadgetChange}
          onEdit={this.handleGadgetForm} />
      </div>
    )
  }
}

export default EditGadgetPage
