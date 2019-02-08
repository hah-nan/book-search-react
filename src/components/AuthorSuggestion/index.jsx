import React, { Component } from 'react'
import './index.scss'

const AuthorSuggestion = ({title, author}) => {

  return (
  	<>
			<div>{author}</div>
			<div>{`Wrote ${title}`}</div>
    </>
  )
}

export default AuthorSuggestion