import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MatchingLettersBold from '../MatchingLettersBold'
import './index.scss'

const SuggestionList = ({category, suggestions, match}) => {

  if(suggestions.length){
    return (
      <div className='suggestion-list'>
        <div className='suggestion-list__title'>{category}</div>
        <ul>{suggestions.map((s, i) => {
          return <li className = 'suggestion-list__item' key={i}>
            <div className='suggestion-list__item__title'>
            <MatchingLettersBold text={s.title} match={match}/></div>
            <div className='suggestion-list__item__subtitle'>{s.subtitle}</div>
          </li>
        })}</ul>
      </div>
    )
  }else{
    return null
  }
}

SuggestionList.propTypes = {
  category: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string
  }))
}

export default SuggestionList