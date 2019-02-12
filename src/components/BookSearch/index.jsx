import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'
import SuggestionList from '../SuggestionList'
import AuthorSuggestion from '../AuthorSuggestion'
import TitleSuggestion from '../TitleSuggestion'

import './index.scss'

const BookSearch = ({searchValue, matchingAuthors, matchingTitles, handleChange}) => {
  
  const [inputFocused, setInputFocused] = useState(false);
  const renderShadow = inputFocused || searchValue.length
  const showNoMatchesBox = searchValue.trim().length > 1 && !matchingAuthors.length && !matchingTitles.length

  return (
    <div className={'search-box' + (renderShadow ? ' search-box-shadow' : '')}>

      <input 
         onFocus={() => setInputFocused(true)}
         onBlur={() => setInputFocused(false)}
         value={searchValue}
         onChange={handleChange}
         placeholder='Search by title or author'
        />
     
      {inputFocused && 
        <>
        <SuggestionList list={matchingTitles} category={'BOOKS'}>
         {(book) => <TitleSuggestion book={book} match={searchValue}/>}
        </SuggestionList>
        <SuggestionList list={matchingAuthors} category={'AUTHORS'}>
         {(book) => <AuthorSuggestion book={book} match={searchValue}/>}
        </SuggestionList>
        </>}

      {showNoMatchesBox &&
        <div className ='search-box__no-matches-box'>
        {'No matches'}
        </div>}

    </div>
  )
}

BookSearch.propTypes = {
  searchValue: PropTypes.string.isRequired,
  matchingAuthors: PropTypes.array.isRequired,
  matchingTitles: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default BookSearch