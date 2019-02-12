import React, { Component } from 'react'
import Books from '../../actions/books.js'
import BookSearch from '../BookSearch'
import { fetchMatchingTitlesAndAuthors, formatTitlesAndAuthors, debounce } from '../../actions/books'

class BookSearchContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formattedTitles: [],
      formattedAuthors: [],
      userInputValue: '',
      cache:{}
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    const userInputValue = e.target.value

    //if cached
    if(this.state.cache[userInputValue]){
      this.setState(this.state.cache[userInputValue])
    }else{

      //its not cached, need to fetch from server
      fetchMatchingTitlesAndAuthors(userInputValue).then(({authors, titles}) => {
        let { formattedTitles, formattedAuthors } = formatTitlesAndAuthors(titles, authors, userInputValue)
        
        //check if the userInputValue has changed since waiting for fetch to complete
        if(this.state.userInputValue === userInputValue){
          //cache
          let cache = Object.assign({}, this.state.cache)
          cache[userInputValue] = {formattedTitles, formattedAuthors}
          this.setState({formattedTitles, formattedAuthors, cache})
        }
      })
    }

    //if theres no input, clear old suggestions
    if(!userInputValue.length) this.setState({formattedTitles:[], formattedAuthors:[]})

    this.setState({userInputValue})
  }

  render() {
    return <BookSearch userInputValue={this.state.userInputValue} handleChange={this.handleChange} formattedTitles={this.state.formattedTitles} formattedAuthors={this.state.formattedAuthors}/>
  }
}

export default BookSearchContainer