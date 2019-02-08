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
      inputFocused: false
    };
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount(){
    api.askListBooks().then((books) => {
      this.setState({books})
      this.handleChange(this.state.userInputValue)
    })
  }

  formatTitle(s, match){
    let parts = s.split(new RegExp(`(${match})`, 'gi'));
    
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

  handleChange(userInputValue){
    let suggestedBooks = []
    let suggestedAuthors = []

    if(userInputValue.replace(/[^a-zA-Z0-9 -]/g, '').length > 1){

      suggestedBooks = this.state.books.reduce(( acc, book ) => {
        if(book.title.toLowerCase().indexOf(userInputValue.toLowerCase()) > -1){
          acc.push({
            title: this.formatTitle(book.title, userInputValue),
            subtitle: `${book.author} -- Published in ${book.year}`
          })
        }
        return acc
      }, [])
    
      suggestedAuthors = this.state.books.reduce(( acc, book ) => {
        if(book.title.toLowerCase().indexOf(userInputValue.toLowerCase()) > -1){
          acc.push({
            title: this.formatTitle(book.author, userInputValue),
            subtitle: `Wrote ${book.title}`
          })
        }
        return acc
      }, [])
    }

    this.setState({userInputValue, userInputValue, suggestedAuthors, suggestedBooks})
  }

  render() {

    let renderShadow = this.state.inputFocused || this.state.userInputValue.length
    let showNoMatchesBox = this.state.userInputValue.length > 2 && !this.state.suggestedAuthors.length && !this.state.suggestedBooks.length

    return (
      <div className={'search-box' + (renderShadow ? ' search-box-shadow' : '')}>
        
        <input 
           onFocus={() => this.setState({inputFocused: true})}
           onBlur={() => this.setState({inputFocused: false})}
           value={this.state.userInputValue}
           onChange={(e) => { this.handleChange(e.target.value)}}
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