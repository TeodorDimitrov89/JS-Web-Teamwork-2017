import React from 'react'
import gadgetActions from '../../actions/GadgetActions'

class Search extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      search: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(event){
    event.preventDefault()
    this.props.history.push(`?search=${this.state.search}`)
    gadgetActions.search(this.state.search)
  }

  handleChange(event){
    const target = event.target
    const value = target.value
    this.setState({search: value})
  }

  render(){
    return(
      <div>
        <form>
          <input type="text" name="input" onChange={this.handleChange}/>
          <input type="submit" value='Search' onClick={this.handleSearch}/>
        </form>
      </div>
    )
  }
}

export default Search