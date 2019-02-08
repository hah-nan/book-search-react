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
      userInputValue: '',
      searchValue: '',
      inputFocused: false
    };

    this.handleChange = this.handleChange.bind(this)
    this.formatBookForSuggestionList = this.formatItemForSuggestionList.bind(this, 'book')
    this.formatAuthorForSuggestionList = this.formatItemForSuggestionList.bind(this, 'author')
  }

  componentWillMount(){
    api.askListBooks().then((books) => {
      this.setState({books})
    })
  }

  formatItemForSuggestionList(type, book){
    if(type === 'book'){
      return {title: book.title, subtitle: `${author} -- Published in ${year}`
    }else if (type === 'author'){
      return {title: book.author, subtitle: `Wrote ${title}`
    }
  }

  handleChange(e){
    let userInputValue = e.target.value
    let searchValue = userInputValue.replace(/(\s+$)/g, '')

    let suggestedBooks = []
    let suggestedAuthors = []
    //more than two non-space characters

    if(searchValue.replace(/[^a-zA-Z0-9 -]/g, '').length > 1){

      suggestedBooks = this.state.books.filter(( book ) => {
        return book.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
      }).map(formatBookForSuggestionList)
    
      suggestedAuthors = this.state.books.filter(( book ) => {
        return book.author.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
      }).map(formatAuthorForSuggestionList)
    }

    this.setState({userInputValue, searchValue, suggestedAuthors, suggestedBooks})
  }

  render() {

    let renderShadow = this.state.inputFocused || this.state.searchValue.length
    let showNoMatchesBox = this.state.userInputValue.length > 2 && !this.setState.suggestedAuthors.length && !this.state.suggestedBooks.length

    return (
      <div className={'search-box' + (renderShadow ? ' search-box-shadow' : '')}>
        
        <input 
           onFocus={() => this.setState({inputFocused: true})}
           onBlur={() => this.setState({inputFocused: false})}
           value={this.state.userInputValue}
           onChange={this.handleChange}
           placeholder='Search by title or author'
          />
       
        <SuggestionList suggestions={this.state.suggestedBooks} title={'BOOKS'}>
          <BookSuggestion/>
        </SuggestionList>

        <SuggestionList suggestions={this.state.suggestedAuthors} title={'AUTHORS'}>
          <AuthorSuggestion/>
        </SuggestionList>

        { showNoMatchesBox ? 
          <div className ='search-box__no-matches-box'>
          {'No matches'}
          </div>
        : null}

      </div>
    )
  }
}