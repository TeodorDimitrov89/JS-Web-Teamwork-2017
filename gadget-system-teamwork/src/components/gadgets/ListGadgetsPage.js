import React from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import gadgetActions from '../../actions/GadgetActions'
import gadgetStore from '../../stores/GadgetStore'
class ListGadgetsPage extends React.Component {
  constructor (props) {
    super(props)
    const query = queryString.parse(this.props.location.search)
    const page = parseInt(query.page, 10) || 1
    this.state = {
      gadgets: [],
      page: page
    }

    this.handleGadgetsFetching = this.handleGadgetsFetching.bind(this)
    this.goToPrevPage = this.goToPrevPage.bind(this)
    this.goToNextPage = this.goToNextPage.bind(this)

    gadgetStore.on(
      gadgetStore.eventTypes.GADGET_FETCHED,
      this.handleGadgetsFetching)
  }
  componentDidMount () {
    gadgetActions.all(this.state.page)
  }
  componentWillUnmount () {
    gadgetStore.removeListener(gadgetStore.eventTypes.GADGET_FETCHED,
    this.handleGadgetsFetching)
  }
  handleGadgetsFetching (data) {
    this.setState({gadgets: data})
  }
  goToPrevPage () {
    let page = this.state.page
    if (page === 1) {
      return
    }
    page -= 1
    this.setState({
      page
    })
    this.props.history.push(`?page=${page}`)
    gadgetActions.all(page)
  }
  goToNextPage () {
    if (this.state.gadgets.length === 0) {
      return
    }
    let page = this.state.page
    page += 1
    this.setState({
      page
    })
    this.props.history.push(`?page=${page}`)
    gadgetActions.all(page)
  }

  render () {
    let gadgets = 'No gadgets available'
    if (this.state.gadgets.length > 0) {
      gadgets = this.state.gadgets.map(gadget => {
        return (
          <div key={gadget._id}>
            <h2><strong>Title: </strong>{gadget.title}</h2>
            <p><strong>Description: </strong>{gadget.description}</p>
            <img src={`${gadget.image}`} alt={`${gadget.title}`} />
            <p><strong>Quantity on stock: </strong>{gadget.quantityOnStock}</p>
            <Link to={`/gadgets/delete/${gadget._id}`}>Delete</Link>
            <Link to={`/gadgets/details/${gadget._id}`}>Details</Link>
          </div>
        )
      })
    }

    return (
      <div>
        <h1>All Gadgets</h1>
        {gadgets}
        <div>
          <button className='btn btn-primary' onClick={this.goToPrevPage}>Prev</button>
          {this.state.gadgets.length > 0 ? (
            <button className='btn btn-primary' onClick={this.goToNextPage}>Next</button>
    ) : (
      <button className='btn btn-primary disabled' onClick={this.goToNextPage}>Next</button>
    )}
        </div>
      </div>
    )
  }
}
export default ListGadgetsPage
