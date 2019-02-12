import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MatchingLettersBold from '../MatchingLettersBold'
import './index.scss'

const SuggestionList = ({category, list, children}) => {

  if(list.length){
    return (
      <div className='suggestion-list'>
        <div className='suggestion-list__title'>{category}</div>
        <ul>{list.map((s, i) => {
          return <li className = 'suggestion-list__item' key={i}>{children(s)}</li>
        })}</ul>
      </div>
    )
  }else{
    return null
  }
}

SuggestionList.propTypes = {
  category: PropTypes.string,
  list: PropTypes.array
}

export default SuggestionList