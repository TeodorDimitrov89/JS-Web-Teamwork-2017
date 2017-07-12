import React from 'react'
import {Link} from 'react-router-dom'
import queryString from 'query-string'
import gadgetActions from '../../actions/GadgetActions'
import gadgetStore from '../../stores/GadgetStore'
import Search from '../common/Search'

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
    this.handleSearchGadgets = this.handleSearchGadgets.bind(this)
    this.goToPrevPage = this.goToPrevPage.bind(this)
    this.goToNextPage = this.goToNextPage.bind(this)

    gadgetStore.on(
      gadgetStore.eventTypes.GADGET_FETCHED,
      this.handleGadgetsFetching)

    gadgetStore.on(
      gadgetStore.eventTypes.SEARCH_GADGET,
      this.handleSearchGadgets)
  }

  componentDidMount () {
    gadgetActions.all(this.state.page)
  }

  componentWillUnmount () {
    gadgetStore.removeListener(gadgetStore.eventTypes.GADGET_FETCHED,
      this.handleGadgetsFetching)
    gadgetStore.removeListener(gadgetStore.eventTypes.SEARCH_GADGET,
      this.handleSearchGadgets)
  }

  handleGadgetsFetching (data) {
    this.setState({gadgets: data})
  }

  handleSearchGadgets (data) {
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
          <div className='allGadgets' key={gadget._id}>
            <h2><strong>Title: </strong>{gadget.title}</h2>
            <p><strong>Description: </strong>{gadget.description}</p>
            <img src={`${gadget.image}`} alt={`${gadget.title}`} />
            <p><strong>Quantity on stock: </strong>{gadget.quantityOnStock}</p>
            <p><strong>Single price: </strong>{gadget.price} USD</p>
            <Link to={`/gadgets/delete/${gadget._id}`}>Delete</Link>
            <Link to={`/gadgets/edit/${gadget._id}`}>Edit</Link>
            <Link to={`/gadgets/details/${gadget._id}`}>Details</Link>
            <Link to={`/gadgets/details/${gadget._id}/buy`}><span style={{color: 'green'}}><b>BUY</b></span></Link>
          </div>
        )
      })
    }

    return (
      <div>
        <h1>All Gadgets</h1>
        <Search {...this.props} />
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
