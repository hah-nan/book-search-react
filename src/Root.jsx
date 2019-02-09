import React from 'react'
import './root.scss'
import SearchBoxContainer from './components/SearchBoxContainer'

const Root = () => {
  return (
    <div className='root'>
      <div className='root__content'>
        <p>{'Find your favorite books'}</p>
        <SearchBoxContainer/>
      </div>
    </div>
  )
}

export default Root