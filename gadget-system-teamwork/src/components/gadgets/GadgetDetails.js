import React from 'react'
import gadgetActions from '../../actions/GadgetActions'
import gadgetStore from '../../stores/GadgetStore'
import { Link } from 'react-router-dom'
class GadgetDetails extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      gadgetId: this.props.match.params.id,
      gadget: {}
    }
    this.handleGadgetFetching = this.handleGadgetFetching.bind(this)

    gadgetStore.on(
      gadgetStore.eventTypes.GADGET_DETAILS,
      this.handleGadgetFetching)
  }
  componentDidMount () {
    gadgetActions.details(this.state.gadgetId)
  }

  componentWillUnmount () {
    gadgetStore.removeListener(gadgetStore.eventTypes.GADGET_DETAILS,
      this.handleGadgetFetching)
  }

  handleGadgetFetching (data) {
    this.setState({gadget: data})
  }

  render () {
    let gadget = this.state.gadget

    return (
      <div>
        <h1>{gadget.title}</h1>
        <img src={gadget.image} alt={gadget.title} />
        <p>{gadget.description}</p>
        <p>Available on stock: {gadget.quantityOnStock}</p>
        <h3>Price: &euro; {gadget.price}</h3>
        <Link to={`/gadgets/details/${gadget._id}/comments/create`}>Leave a Comment</Link>
      </div>
    )
  }
}

export default GadgetDetails
