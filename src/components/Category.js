import React, { Component } from 'react'

class Category extends Component {
  handleClick = () => {
    this.props.onClick(this.props.category.id)
  }

  render() {
    return(
      <button className="categoryButton button" key={this.props.category.id} onClick={this.handleClick}>{this.props.category.name}
      </button>
    )
  }
}

export default Category;