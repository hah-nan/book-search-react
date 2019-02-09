import React, { Component } from 'react'
import Books from '../../actions/books.js'
import SearchBox from '../SearchBox'

const api = new Books()

class SearchBoxContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      suggestedBooks: [],
      suggestedAuthors: [],
      userInputValue: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount(){
    api.askListBooks().then((books) => {
      this.setState({books})
      this.handleChange(this.state.userInputValue)
    })
  }

  formatTitle(s, match){
    const parts = s.split(new RegExp(`(${match})`, 'gi'));
    
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
    var suggestedBooks = []
    var suggestedAuthors = []

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
        if(book.author.toLowerCase().indexOf(userInputValue.toLowerCase()) > -1){
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
    return <SearchBox userInputValue={this.state.userInputValue} handleChange={this.handleChange} suggestedBooks={this.state.suggestedBooks} suggestedAuthors={this.state.suggestedAuthors}/>
  }
}

export default SearchBoxContainer