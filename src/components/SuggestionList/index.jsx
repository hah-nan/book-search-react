import React, { Component } from 'react'
import './index.scss'

const SuggestionList = () => {

  render() {
    return (
      <div className='suggestion-list'>
        <div>{this.props}
        <ul>{this.state.suggestionsCurrent.map((suggestions) => {
          return <li>{book.title}</li>
        })}</ul>
      </div>
    )
  }
}

export default SuggestionList