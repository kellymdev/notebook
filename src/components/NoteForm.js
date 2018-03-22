import React, { Component } from 'react'
import axios from 'axios'

class NoteForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.note.title,
      category_id: this.props.note.category_id,
      body: this.props.note.body,
      categories: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/categories.json')
    .then(response => {
      this.setState({categories: response.data})
    })
    .catch(error => console.log(error))
  }

  handleInput = (e) => {
    this.props.resetNotification()
    this.setState({[e.target.name]: e.target.value})
  }

  handleBlur = () => {
    const note = {
      title: this.state.title,
      category_id: this.state.category_id,
      body: this.state.body
    }

    axios.put(
      `http://localhost:3001/api/v1/notes/${this.props.note.id}`,
      {
        note: note
      })
    .then(response => {
      this.props.updateNote(response.data)
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="tile">
        <form onBlur={this.handleBlur}>
          <input className="input" type="text" name="title" placeholder="Enter a title" value={this.state.title} onChange={this.handleInput} ref={this.props.titleRef} />

          <select name="category_id" onChange={this.handleInput}>
            {this.state.categories.map((category) => {
              if(this.props.category === category.id) {
                return(
                  <option value={category.id} key={category.id} selected>{category.name}</option>
                )
              } else {
                return(
                  <option value={category.id} key={category.id}>{category.name}</option>
                )
              }
            })}
          </select>

          <textarea className="input" name="body" placeholder="Enter your note" value={this.state.body} onChange={this.handleInput} >
          </textarea>
        </form>
      </div>
    );
  }
}

export default NoteForm;