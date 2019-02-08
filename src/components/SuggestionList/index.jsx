import React, { Component } from 'react'
import './index.scss'

const SuggestionList = ({title, suggestions}) => {

  if(suggestions.length){
    
    let list = suggestions.map((s, i) => {
      return <li className = 'suggestion-list__item' key={i}>
        <div className='suggestion-list__item__title'>{s.title}</div>
        <div className='suggestion-list__item__subtitle'>{s.subtitle}</div>
      </li>
    })}

    return (
      <div className='suggestion-list'>
        <div className='suggestion-list__title'>{title}</div>
        <ul>{list}</ul>
      </div>
    )
  }else{
    return null
  }


}

export default SuggestionList