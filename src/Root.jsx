import React from 'react'
import './root.scss'
import BookSearchContainer from './components/BookSearchContainer'

const Root = () => {
  return (
    <div className='root'>
      <div className='root__content'>
        <p>{'Find your favorite books'}</p>
        <BookSearchContainer/>
      </div>
    </div>
  )
}

export default Root