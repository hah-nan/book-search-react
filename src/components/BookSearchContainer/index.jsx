import React, { Component } from 'react'
import Books from '../../actions/books.js'
import BookSearch from '../BookSearch'

const api = new Books()

class BookSearchContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formattedTitles: [],
      formattedAuthors: [],
      userInputValue: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  formatTitlesAndAuthors(titles, authors, userInputValue){
    const formattedTitles = titles.map(( book ) => {      
      return {
        title: book.title,
        subtitle: `${book.author} -- Published in ${book.year}`,
        match: userInputValue
      }
    })
  
    const formattedAuthors = authors.map(( book ) => {
      return {
        title: book.author,
        subtitle: `Wrote ${book.title}`,
        match: userInputValue
      }
    })

    return {formattedTitles, formattedAuthors}
  }

  checkSearchConditions(userInputValue){
    return userInputValue.replace(/[^a-zA-Z0-9 -]/g, '').length > 1
  }

  handleChange(e){
    const userInputValue = e.target.value

    if(this.checkSearchConditions(userInputValue)){

     const titlesPromise = api.fetchBooksByTitle({title: userInputValue, limit: 5})
     const authorsPromise = api.fetchBooksByAuthor({author: userInputValue, limit: 5})

     Promise.all([titlesPromise, authorsPromise]).then(([titles, authors]) => {
      let { formattedTitles, formattedAuthors } = this.formatTitlesAndAuthors(titles, authors, userInputValue)
      
      if(this.state.userInputValue === userInputValue){
        this.setState({formattedTitles, formattedAuthors})
      }
     })

    }else{
      this.setState({formattedTitles:[], formattedAuthors:[]})
    }

    this.setState({userInputValue})
  }

  render() {
    return <BookSearch userInputValue={this.state.userInputValue} handleChange={this.handleChange} formattedTitles={this.state.formattedTitles} formattedAuthors={this.state.formattedAuthors}/>
  }
}

export default BookSearchContainer