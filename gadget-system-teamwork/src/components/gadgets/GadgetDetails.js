import React from 'react'
import { Link } from 'react-router-dom'
import gadgetActions from '../../actions/GadgetActions'
import gadgetStore from '../../stores/GadgetStore'
import ListCommentPage from '../sub-components/ListCommentPage'
import FormHelpers from '../common/forms/FormHelpers'
import toastr from 'toastr'

class GadgetDetails extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      gadgetId: this.props.match.params.id,
      gadget: {}
    }
    this.handleGadgetFetching = this.handleGadgetFetching.bind(this)
    this.handleGadgetBuy = this.handleGadgetBuy.bind(this)
    this.handleGadgetBought = this.handleGadgetBought.bind(this)

    gadgetStore.on(
      gadgetStore.eventTypes.GADGET_DETAILS,
      this.handleGadgetFetching)

    gadgetStore.on(
      gadgetStore.eventTypes.GADGET_BOUGHT,
      this.handleGadgetBought)
  }

  componentDidMount () {
    gadgetActions.details(this.state.gadgetId)
  }

  componentWillUnmount () {
    gadgetStore.removeListener(
      gadgetStore.eventTypes.GADGET_DETAILS,
      this.handleGadgetFetching)

    gadgetStore.removeListener(
      gadgetStore.eventTypes.GADGET_BOUGHT,
      this.handleGadgetBought)
  }

  handleGadgetBought (data) {
    if (!data.success) {
      let firstError = FormHelpers.getFirstError(data)
      this.setState({error: firstError})
      toastr.error(data.message)
    } else {
      toastr.success(data.message)
      this.componentDidMount()
    }
  }

  handleGadgetFetching (data) {
    this.setState({gadget: data})
  }

  handleGadgetBuy (event) {
    event.preventDefault()
    gadgetActions.buyGadget(this.state.gadgetId)
  }

  render () {
    let gadget = this.state.gadget
    let displayBuyBtn = this.props.location.pathname.endsWith('buy')
    let gadgetTitle
    let listComments
    if (Object.keys(gadget).length !== 0) {
      gadgetTitle = gadget.title.replace(/[\s]+/g, '-')
      listComments = gadget.comments.map((comment, index) => {
        return (
          <ListCommentPage
            index={index + 1}
            commentId={comment._id}
            key={comment._id}
            content={comment.content}
            author={comment.author}
            date={comment.date} />
        )
      })
    }

    return (
      <div>
        <h1>{gadget.title}</h1>
        <img src={gadget.image} alt={gadget.title} />
        <p>{gadget.description}</p>
        <p>Available on stock: {gadget.quantityOnStock}</p>
        <h3>Price: &euro; {gadget.price}</h3>
        <Link to={`/gadgets/details/${gadget._id}/comments/create/${gadgetTitle}`}>Leave a Comment</Link>
        <span>
          <input
            className='btn btn-small btn-success'
            style={{ marginLeft: '20px', width: '80px', height: '35px', display: displayBuyBtn ? '' : 'none'}}
            type='button'
            value='Buy'
            onClick={this.handleGadgetBuy} />
        </span>
        {listComments}
      </div>
    )
  }
}

export default GadgetDetails
