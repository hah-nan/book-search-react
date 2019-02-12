import React from 'react'
import PropTypes from 'prop-types'
import MatchingLettersBold from '../MatchingLettersBold'

function TitleSuggestion({book, match}){
  return (
    <>
      <div className='suggestion-list__item__title'>
      <MatchingLettersBold text={book.title} match={match}/></div>
      <div className='suggestion-list__item__subtitle'>{`${book.author ? book.author : 'Author not available'} -- Published in ${book.year ? book.year : 'N/A'}`}</div>
    </>)
}

TitleSuggestion.propTypes = {
  match: PropTypes.string.isRequired,
  book: React.PropTypes.shape({
    title: React.PropTypes.string,
    author: React.PropTypes.string,
    year: React.PropTypes.string
  })
}

export default TitleSuggestion