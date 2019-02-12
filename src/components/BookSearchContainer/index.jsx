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
    this.handleChange = debounce(this.handleChange.bind(this), 300)
  }

  handleSearch(userInputValue){
        //its not cached, need to fetch from server
  }

  handleChange(e){
    const userInputValue = e.target.value

    //if cached
    if(this.state.cache[userInputValue]){
      this.setState(this.state.cache[userInputValue])
    }else{
      this.handleSearchDebounced(e.target.value)
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