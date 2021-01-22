import React, { Component } from 'react'
import ItemAddForm from '../add-item'

import AppHeader from '../app-header'
import ItemStatusFilter from '../item-status-filter'
import SearchPanel from '../seach-panel'
import TodoList from '../todo-list'
import './app.css'

export default class App extends Component {
  maxId = 100

  state = {
    todoData: [
      this.createTodoItem('Learn React'),
      this.createTodoItem('Learn NodeJS'),
      this.createTodoItem('Learn Typescript'),
    ],
    term: '',
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const newArray = todoData.reduce((acc, _, ind) => {
        if (ind !== idx) {
          return [...acc, todoData[ind]]
        }
        return acc
      }, [])

      // const newArray = [...before, ...after]
      return {
        todoData: newArray,
      }
    })
  }

  addItem = (text) => {
    // generate id
    const newItem = this.createTodoItem(text)

    // add element
    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, newItem],
      }
    })
  }

  getItem = (id) => {
    const idx = this.state.todoData.findIndex((el) => el.id === id)
    return this.state.todoData[idx]
  }

  toggleProperty = (arr, id, propName) => {
    //1 update item
    const idx = arr.findIndex((el) => el.id === id)

    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    //2 update arr
    const newArray = arr.reduce((acc, item, ind) => {
      if (ind === idx) {
        return [...acc, newItem]
      }
      return [...acc, item]
    }, [])

    return newArray
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      const newArray = this.toggleProperty(todoData, id, 'important')

      return {
        todoData: newArray,
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const newArray = this.toggleProperty(todoData, id, 'done')

      return {
        todoData: newArray,
      }
    })
  }

  search(items, term) {
    if (term.length === 0) {
      return items
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    })
  }

  onSearchChange = (term) => {
    this.setState({ term })
  }

  render() {
    const { todoData, term } = this.state
    const doneCount = todoData.filter((item) => item.done).length
    const todoCount = todoData.length - doneCount

    const visibleItems = this.search(todoData, term)

    return (
      <div className='todo-app'>
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className='top-panel d-flex'>
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter />
        </div>
        <div className='top-panel d-flex'>
          <ItemAddForm addItem={this.addItem} />
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
      </div>
    )
  }
}
