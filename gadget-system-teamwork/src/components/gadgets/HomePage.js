import React from 'react'
import '../../HomePage.css'
import gadgetActions from '../../actions/GadgetActions'
import gadgetStore from '../../stores/GadgetStore'
import {Link} from 'react-router-dom'
import Auth from '../users/Auth'
class HomePage extends React.Component {
  constructor () {
    super()

    this.state = {
      lastAddedGadgets: [],
      page: 1
    }

    this.handleGadgetsFetching = this.handleGadgetsFetching.bind(this)

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
    this.setState({lastAddedGadgets: data})
  }
  render () {
    let gadgets = this.state.lastAddedGadgets.map(gadget => {
      return (
        <div className='homeGadgets' key={gadget._id}>
          <h2>{gadget.title}</h2>
          <p>{gadget.description}</p>
          <img src={`${gadget.image}`} alt={`${gadget.title}`} />
          <p><strong>Quantity on stock: </strong>{gadget.quantityOnStock}</p>
          {(Auth.isUserAuthenticated() && Auth.isUserAdmin()) ? (
            <div>
              <Link to={`/gadgets/edit/${gadget._id}`}>Edit</Link>
              <Link to={`/gadgets/delete/${gadget._id}`}>Delete</Link>
              <Link to={`/gadgets/details/${gadget._id}`}>Details</Link>
              <Link to={`/gadgets/details/${gadget._id}/buy`}><span style={{color: 'green'}}><b>BUY</b></span></Link>
            </div>
              ) : Auth.isUserAuthenticated() ? (
                <div>
                  <Link to={`/gadgets/details/${gadget._id}`}>Details</Link>
                  <Link to={`/gadgets/details/${gadget._id}/buy`}><span style={{color: 'green'}}><b>BUY</b></span></Link>
                </div>
              ) : ''}
        </div>
      )
    }).sort((a, b) => b.createdOn - a.createdOn)
    return (
      <div>
        <div className='title'>
          <h1 className='front-header'>
          Welcome to
          <br />
            <span className='front'>Crazy Gadgets Store</span>
          </h1>
        </div>

        <div className='flex'>{gadgets}</div>
      </div>
    )
  }
}

export default HomePage
