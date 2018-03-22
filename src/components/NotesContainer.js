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
      editingNoteId: null,
      notification: ''
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

  updateNote = (note) => {
    const noteIndex = this.state.notes.findIndex(x => x.id === note.id)
    const notes = update(this.state.notes, {
      [noteIndex]: { $set: note }
    })
    this.setState({
      notes: notes,
      notification: 'All changes saved'
    })
  }

  resetNotification = () => {
    this.setState({notification: ''})
  }

  enableEditing = (id) => {
    this.setState({editingNoteId: id},
      () => { this.title.focus() })
  }

  deleteNote = (id) => {
    axios.delete(`http://localhost:3001/api/v1/notes/${id}`)
    .then(response => {
      const noteIndex = this.state.notes.findIndex(x => x.id === id)
      const notes = update(this.state.notes, { $splice: [[noteIndex, 1]]})
      this.setState({notes: notes})
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

        <span className="notification">
          {this.state.notification}
        </span>

        <div>
          {this.state.notes.map((note) => {
            if(this.state.editingNoteId === note.id) {
              return(
                <NoteForm note={note} key={note.id}
                  updateNote={this.updateNote}
                  titleRef= {input => this.title = input}
                  resetNotification={this.resetNotification} />
              )
            } else {
              return(
                <Note note={note} key={note.id} onClick={this.enableEditing} onDelete={this.deleteNote} />
              )
            }
          })}
        </div>
      </div>
    );
  }
}

export default NotesContainer;