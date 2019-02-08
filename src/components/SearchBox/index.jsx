import React, { Component } from 'react'
import './index.scss'
import Books from '../../actions/books.js'
import SuggestionList from '../SuggestionList'
import BookSuggestion from '../BookSuggestion'
import AuthorSuggestion from '../BookSuggestion'

const api = new Books()

export default class SearchBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      suggestedBooks: [],
      suggestedAuthors: [],
      searchInputValue: ''
    };

    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount(){
    api.askListBooks().then((books) => {
      this.setState({books})
    })
  }

  handleChange(e){
    let searchInputValue = e.target.value

    let suggestedBooks = this.state.books.filter(( book ) => {
      return book.title.toLowerCase().indexOf(searchInputValue.toLowerCase()) > -1
    })
    
    let suggestedAuthors = this.state.books.filter(( book ) => {
      return book.author.toLowerCase().indexOf(searchInputValue.toLowerCase()) > -1
    })

    this.setState({searchInputValue, suggestedAuthors, suggestedBooks})
  }

  render() {
    return (
      <div className={'search-box' + (this.state.searchInputValue.length ? ' search-box-active' : '')}>
        
        <input value={this.state.searchInputValue} onChange={this.handleChange} placeholder='Search by title or author'/>
       
        <SuggestionList suggestions={this.state.suggestedBooks} title={'BOOKS'}>
          <BookSuggestion/>
        </SuggestionList>

        <SuggestionList suggestions={this.state.suggestedAuthors} title={'AUTHORS'}>
          <AuthorSuggestion/>
        </SuggestionList>

      </div>
    )
  }
}