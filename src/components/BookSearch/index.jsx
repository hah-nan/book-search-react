import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'
import SuggestionList from '../SuggestionList'
import './index.scss'

const BookSearch = ({userInputValue, formattedAuthors, formattedTitles, handleChange}) => {
  
  const [inputFocused, setInputFocused] = useState(false);
  const renderShadow = inputFocused || userInputValue.length
  const showNoMatchesBox = userInputValue.trim().length > 1 && !formattedAuthors.length && !formattedTitles.length

  return (
    <div className={'search-box' + (renderShadow ? ' search-box-shadow' : '')}>

      <input 
         onFocus={() => setInputFocused(true)}
         onBlur={() => setInputFocused(false)}
         value={userInputValue}
         onChange={handleChange}
         placeholder='Search by title or author'
        />
     
      {inputFocused ? 
        <>
        <SuggestionList suggestions={formattedTitles} category={'BOOKS'}></SuggestionList>
        <SuggestionList suggestions={formattedAuthors} category={'AUTHORS'}></SuggestionList>
        </>
      : null}

      {showNoMatchesBox ? 
        <div className ='search-box__no-matches-box'>
        {'No matches'}
        </div>
      : null}

    </div>
  )
}

BookSearch.propTypes = {
  userInputValue: PropTypes.string.isRequired,
  formattedAuthors: PropTypes.array.isRequired,
  formattedTitles: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default BookSearch