import React from 'react'
import PropTypes from 'prop-types'

function MatchingLettersBold({text, match}){
  const parts = text.split(new RegExp(`(${match})`, 'gi'));
  
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

MatchingLettersBold.propTypes = {
  text: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired
}

export default MatchingLettersBold