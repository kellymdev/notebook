import React, { Component } from 'react'
import axios from 'axios'

class NoteForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.note.title,
      category_id: this.props.note.category_id,
      body: this.props.note.body,
      image_url: this.props.note.image_url,
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
      body: this.state.body,
      image_url: this.state.image_url
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

          <select className="input" name="category_id" onChange={this.handleInput} value={this.state.category_id}>
            {this.state.categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>{category.name}</option>
              )
            })}
          </select>

          <input className="input" type="text" name="image_url" placeholder="Enter an image url" value={this.state.image_url} onChange={this.handleInput} ref={this.props.imageUrlRef} />

          <textarea className="input" name="body" placeholder="Enter your note" value={this.state.body} onChange={this.handleInput} >
          </textarea>
        </form>
      </div>
    );
  }
}

export default NoteForm;