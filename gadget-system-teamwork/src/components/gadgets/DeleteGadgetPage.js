import React from 'react'
import gadgetActions from '../../actions/GadgetActions'
import gadgetStore from '../../stores/GadgetStore'
import DeleteGadgetForm from './DeleteGadgetForm'
import toastr from 'toastr'
class DeleteGadgetPage extends React.Component {
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
    this.handleDeleteFetching = this.handleDeleteFetching.bind(this)
    this.handleGadgetForm = this.handleGadgetForm.bind(this)
    this.handleGadgetDelete = this.handleGadgetDelete.bind(this)

    gadgetStore.on(gadgetStore.eventTypes.DELETE_GADGET_FETCHED,
    this.handleDeleteFetching)

    gadgetStore.on(gadgetStore.eventTypes.DELETE_GADGET,
    this.handleGadgetDelete)
  }

  componentDidMount () {
    gadgetActions.deleteGet(this.state.gadgetId)
  }

  componentWillUnmount () {
    gadgetStore.removeListener(gadgetStore.eventTypes.DELETE_GADGET_FETCHED,
    this.handleDeleteFetching)

    gadgetStore.removeListener(gadgetStore.eventTypes.DELETE_GADGET,
    this.handleGadgetDelete)
  }
  handleDeleteFetching (deleteGadget) {
    this.setState({gadget: deleteGadget})
  }
  handleGadgetForm (event) {
    event.preventDefault()
    gadgetActions.deletePost(this.state.gadgetId)
  }
  handleGadgetDelete (data) {
    toastr.success(data.message)
    this.props.history.push('/')
  }
  render () {
    return (
      <div>
        <DeleteGadgetForm
          disabled
          gadget={this.state.gadget}
          error={this.state.error}
          onDelete={this.handleGadgetForm} />
      </div>
    )
  }
}

export default DeleteGadgetPage
