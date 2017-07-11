import React from 'react'
import { Link } from 'react-router-dom'
import gadgetActions from '../../actions/GadgetActions'
import gadgetStore from '../../stores/GadgetStore'
import ListCommentPage from '../sub-components/ListCommentPage'
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
        {listComments}
      </div>
    )
  }
}

export default GadgetDetails
