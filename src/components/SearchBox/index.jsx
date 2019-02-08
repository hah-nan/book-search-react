import React, { Component } from 'react'
import './index.scss'
import Books from '../../actions/books.js'

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
      console.log(book)
      return book.title.toLowerCase().indexOf(searchInputValue.toLowerCase()) > -1
    })
    
    let suggestedAuthors = this.state.books.filter(( book ) => {
      console.log(book)
      return book.author.toLowerCase().indexOf(searchInputValue.toLowerCase()) > -1
    })

    this.setState({searchInputValue, suggestedAuthors, suggestedBooks})
  }

  render() {
    return (
      <div className='search-box'>
        <input value={this.state.searchInputValue} onChange={this.handleChange} placeholder='Search by title or author'/>
        
        <div className='search-box__suggestion-list'>
          <div>{'BOOKS'}</div>
          <ul>{this.state.suggestedBooks.map((book) => {
            return (
              <li>
                <div>{book.title}</div>
                <div>{`${book.author} -- Published in ${book.year}`}</div>
              </li>
            )
          })}</ul>
        </div>

        <div className='search-box__suggestion-list'>
          <div>{'AUTHORS'}</div>
          <ul>{this.state.suggestedAuthors.map((book) => {
            return (
              <li>
                <div>{book.author}</div>
                <div>{`Wrote ${book.title}`}</div>
              </li>
            )
          })}</ul>
        </div>
      </div>
    )
  }
}