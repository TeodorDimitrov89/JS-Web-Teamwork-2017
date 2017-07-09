import React from 'react'
import gadgetActions from '../../actions/GadgetActions'
import gadgetStore from '../../stores/GadgetStore'
import DeleteGadgetForm from './DeleteGadgetForm'
class DeleteGadgetPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      gadget: {
        title: '',
        description: '',
        image: ''
      },
      error: ''
    }
    this.handleDeleteFetching = this.handleDeleteFetching.bind(this)
    gadgetStore.on(gadgetStore.eventTypes.DELETE_GADGET_FETCHED,
    this.handleDeleteFetching)
  }
  componentDidMount () {
    gadgetActions.deleteGet(this.state.id)
  }
  componentWillUnmount () {
    gadgetStore.removeListener(gadgetStore.eventTypes.DELETE_GADGET_FETCHED,
    this.handleDeleteFetching)
  }
  handleDeleteFetching (deleteGadget) {
    this.setState({gadget: deleteGadget})
  }
  handleGadgetChange () {

  }
  handleGadgetForm () {

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
