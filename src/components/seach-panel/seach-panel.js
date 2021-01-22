import React, { Component } from 'react'
import './search-panel.css'

export default class SearchPanel extends Component {
  state = {
    term: '',
  }

  onSearchChange = (e) => {
    const term = e.target.value

    this.setState({term})
    this.props.onSearchChange(term)
    
  }
  render() {
    const searchText = 'type to seach'
    return (
      <input
        type='text'
        className='form-control seach-input'
        placeholder={searchText}
        value={this.state.term}
        onChange={this.onSearchChange}
      />
    )
  }
}
