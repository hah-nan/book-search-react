import React, { Component } from 'react'
import './index.scss'

const BookSuggestion = ({title, author, year}) => {

  return (
  	<div className = 'suggestion-list__item'>
	  	<div className='suggestion-list__item__title'>{title}</div>
	    <div className='suggestion-list__item__subtitle'>{`${author} -- Published in ${year}`}</div>
    </div>
  )
}

export default BookSuggestion