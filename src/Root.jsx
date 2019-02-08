import React, { Component } from 'react'
import './root.scss'
import SearchBox from './components/SearchBox'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className='root'>
        <div className='root__content'>
          <p>{'Find your favorite books'}</p>
          <SearchBox/>
        </div>
      </div>
    )
  }
}