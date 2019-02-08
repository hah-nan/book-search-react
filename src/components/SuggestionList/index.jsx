import React, { Component } from 'react'
import './index.scss'

const SuggestionList = ({title, suggestions, children}) => {

  if(suggestions.length){
    return (
      <div className='suggestion-list'>
        <div className='suggestion-list__title'>{title}</div>
        <ul>{suggestions.map((s, i) => {
          return <li key={i}>{React.cloneElement(children, {...s})}</li>
        })}</ul>
      </div>
    )
  }else{
    return null
  }


}

export default SuggestionList