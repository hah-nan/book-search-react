import React, { Component } from 'react'
import './index.scss'

const AuthorSuggestion = ({title, author}) => {

  return (
  	<div className='suggestion-list__item'>
			<div className='suggestion-list__item__title'>{author}</div>
			<div className='suggestion-list__item__subtitle'>{`Wrote ${title}`}</div>
    </div>
  )
}

export default AuthorSuggestion