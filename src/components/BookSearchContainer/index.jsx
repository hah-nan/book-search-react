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
    this.handleSearchDebounced = debounce(this.handleSearch.bind(this), 300)
  }

  validateSearch(userInputValue){
    return userInputValue.trim().length > 1
  }

  handleSearch(userInputValue){
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

  handleChange(e){
    const userInputValue = e.target.value

    //if cached
    if(this.state.cache[userInputValue]){
      this.setState(this.state.cache[userInputValue])

    //make sure we should search with this input
    }else if(this.validateSearch(userInputValue)){
      //its not cached, need to fetch from server
      this.handleSearchDebounced(e.target.value)

    }else{
      //if theres no input, clear old suggestions
      this.setState({formattedTitles:[], formattedAuthors:[]})
    }

    this.setState({userInputValue})
  }

  render() {
    return <BookSearch userInputValue={this.state.userInputValue} handleChange={this.handleChange} formattedTitles={this.state.formattedTitles} formattedAuthors={this.state.formattedAuthors}/>
  }
}

export default BookSearchContainer