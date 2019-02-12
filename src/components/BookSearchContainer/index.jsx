import React, { Component } from 'react'
import Books from '../../actions/books.js'
import BookSearch from '../BookSearch'
import { fetchMatchingTitles, fetchMatchingAuthors, debounce } from '../../actions/books'

class BookSearchContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matchingTitles: [],
      matchingAuthors: [],
      searchValue: '',
      cache:{}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSearchDebounced = debounce(this.handleSearch.bind(this), 300)
  }

  shouldSearch(searchValue){
    return searchValue.trim().length > 1
  }

  handleSearch(searchValue){
    Promise.all([fetchMatchingTitles(searchValue), fetchMatchingAuthors(searchValue)]).then(([matchingTitles, matchingAuthors]) => {
      //check if the searchValue has changed since waiting for fetch to complete
      if(this.state.searchValue === searchValue){
        //cache
        let cache = Object.assign({}, this.state.cache)
        cache[searchValue] = {matchingTitles, matchingAuthors}
        this.setState({matchingTitles, matchingAuthors, cache})
      }
    }).catch(e => console.error(e))
  }

  handleChange(e){
    const searchValue = e.target.value

    //if cached
    if(this.state.cache[searchValue]){
      this.setState(this.state.cache[searchValue])

    //make sure we should search with this input
    }else if(this.shouldSearch(searchValue)){
      //its not cached, need to fetch from server
      this.handleSearchDebounced(e.target.value)

    }else{
      //if theres no input, clear old suggestions
      this.setState({matchingTitles:[], matchingAuthors:[]})
    }

    this.setState({searchValue})
  }

  render() {
    return <BookSearch handleChange={this.handleChange} {...this.state} />
  }
}

export default BookSearchContainer