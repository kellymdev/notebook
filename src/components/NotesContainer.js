import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'
import Note from './Note'
import NoteForm from './NoteForm'

class NotesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      editingNoteId: null
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/notes.json')
    .then(response => {
      console.log(response)
      this.setState({notes: response.data})
    })
    .catch(error => console.log(error))
  }

  addNewNote = () => {
    axios.post(
      'http://localhost:3001/api/v1/notes',
      { note:
        {
          title: '',
          body: ''
        }
      }
    )
    .then(response => {
      const notes = update(this.state.notes, {
        $splice: [[0, 0, response.data]]
      })
      this.setState({
        notes: notes,
        editingNoteId: response.data.id
      })
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <button className = "newNoteButton"
          onClick={this.addNewNote} >
          New Note
        </button>

        <div>
          {this.state.notes.map((note) => {
            if(this.state.editingNoteId === note.id) {
              return(
                <NoteForm note={note} key={note.id} />
              )
            } else {
              return(
                <Note note={note} key={note.id} />
              )
            }
          })}
        </div>
      </div>
    );
  }
}

export default NotesContainer;