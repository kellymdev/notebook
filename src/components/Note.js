import React, { Component } from 'react'

class Note extends Component {
  handleClick = () => {
    this.props.onClick(this.props.note.id)
  }

  handleDelete = () => {
    this.props.onDelete(this.props.note.id)
  }

  render() {
    return(
      <div className="tile" key={this.props.note.id}>
        <span className="deleteButton" onClick={this.handleDelete}>
          x
        </span>
        <h4 onClick={this.handleClick}>{this.props.note.title}</h4>
        <p className="categoryName" onClick={this.handleClick}>Category: {this.props.note.category_name}</p>
        <p onClick={this.handleClick}>{this.props.note.body}</p>

        {this.props.note.image_url && this.props.note.image_url.length > 0 &&
          <img src={this.props.note.image_url} alt={this.props.note.title} onClick={this.handleClick} />
        }
      </div>
    )
  }
}

export default Note;