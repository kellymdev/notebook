import React, { Component } from 'react'
import axios from 'axios'

class NoteForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="tile">
        <form>
          <input className="input" type="text" name="title" placeholder="Enter a title" />
          <textarea className="input" name="body" placeholder="Enter your note" />
        </form>
      </div>
    );
  }
}

export default NoteForm;