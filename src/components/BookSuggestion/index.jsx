import React, { Component } from 'react'
import './index.scss'

const BookSuggestion = ({title, author, year}) => {

  return (
  	<>
	  	<div>{title}</div>
	    <div>{`${author} -- Published in ${year}`}</div>
    </>
  )
}

export default BookSuggestion