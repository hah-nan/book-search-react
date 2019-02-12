import React from 'react'
import PropTypes from 'prop-types'
import MatchingLettersBold from '../MatchingLettersBold'

function AuthorSuggestion({book, match}){  
  return (
    <>
      <div className='suggestion-list__item__title'>
      <MatchingLettersBold text={book.author} match={match}/></div>
      <div className='suggestion-list__item__subtitle'>{`Wrote ${book.title}`}</div>
    </>)
}

AuthorSuggestion.propTypes = {
  match: PropTypes.string.isRequired,
  book: React.PropTypes.shape({
    title: React.PropTypes.string,
    author: React.PropTypes.string
  })
}

export default AuthorSuggestion