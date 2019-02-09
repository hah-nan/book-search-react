import React, { Component, useState } from 'react'
import SuggestionList from '../SuggestionList'
import './index.scss'

const SearchBox = ({userInputValue, suggestedAuthors, suggestedBooks, handleChange}) => {
  const [inputFocused, setInputFocused] = useState(false);
  const renderShadow = inputFocused || userInputValue.length
  const showNoMatchesBox = userInputValue.length > 2 && !suggestedAuthors.length && !suggestedBooks.length

  return (
    <div className={'search-box' + (renderShadow ? ' search-box-shadow' : '')}>
      
      <input 
         onFocus={() => setInputFocused(true)}
         onBlur={() => setInputFocused(false)}
         value={userInputValue}
         onChange={(e) => handleChange(e.target.value)}
         placeholder='Search by title or author'
        />
     
      <SuggestionList suggestions={suggestedBooks} title={'BOOKS'}></SuggestionList>

      <SuggestionList suggestions={suggestedAuthors} title={'AUTHORS'}></SuggestionList>

      { showNoMatchesBox ? 
        <div className ='search-box__no-matches-box'>
        {'No matches'}
        </div>
      : null}

    </div>
  )
}

export default SearchBox