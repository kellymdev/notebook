import React from 'react'

const Note = ({note}) =>
  <div className="tile" key={note.id}>
    <h4>{note.title}</h4>
    <p>{note.body}</p>
  </div>

export default Note;