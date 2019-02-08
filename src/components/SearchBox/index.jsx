import React, { Component } from 'react';
import './index.scss'

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='search-box'>
        <input placeholder='Search by title or author'/>
      </div>
    )
  }
}