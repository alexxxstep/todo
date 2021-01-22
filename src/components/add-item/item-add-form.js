import React, { Component } from 'react'
import './item-add-form.css'

export default class ItemAddForm extends Component {
  state = {
    label: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
    
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.addItem(this.state.label)

    this.setState({
      label: '',
    })
    
  }

  render() {
    const { addItem } = this.props

    return (
      <form className='item-add-form d-flex' onSubmit={this.onSubmit}>
        <input
          type='text'
          className='form-control seach-input'
          onChange={this.onLabelChange}
          placeholder='What`s new to do?'
          value={this.state.label}
        />
        <button className='btn btn-outline-secondary'>
          Add
        </button>
      </form>
    )
  }
}