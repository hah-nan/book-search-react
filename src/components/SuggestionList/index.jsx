import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const SuggestionList = ({category, suggestions}) => {

  if(suggestions.length){

    const list = suggestions.map((s, i) => {
      return <li className = 'suggestion-list__item' key={i}>
        <div className='suggestion-list__item__title'>{boldMatchingLetters(s.title, s.match)}</div>
        <div className='suggestion-list__item__subtitle'>{s.subtitle}</div>
      </li>
    })

    return (
      <div className='suggestion-list'>
        <div className='suggestion-list__title'>{category}</div>
        <ul>{list}</ul>
      </div>
    )

  }else{
    return null
  }
}

function boldMatchingLetters(s, match){
  const parts = s.split(new RegExp(`(${match})`, 'gi'));
  
  return (<span> { 
      parts.map((part, i) => {
        if(part.toLowerCase() === match.toLowerCase()){
          return <strong key={i}>{part}</strong>
        }else{
          return <span key={i}>{part}</span>
        }
      }
  )} </span>)
}

SuggestionList.propTypes = {
  category: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    match: PropTypes.string
  }))
}

export default SuggestionList