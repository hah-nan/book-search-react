import data from './data.js'

export default class Books {

  fetchBooksByTitle(query) {
    return this._mockServerRequest().then(() => {
      //replace with database optimization magic
      let matchedBooks = []
      for(let i = 0; i < data.books.length; i++){
        let book = data.books[i]
        if(book.title.toLowerCase().indexOf(query.title.toLowerCase()) > -1) matchedBooks.push(book)
        if(matchedBooks.length === query.limit) break
      }

      return matchedBooks
    })
  }

  fetchBooksByAuthor(query) {
    return this._mockServerRequest().then(() => {
      
      //replace with database optimization magic
      let authorsFound = {}
      let matchedAuthors = []

      for(let i = 0; i < data.books.length; i++){
        let book = data.books[i]
        let authorMatch = book.author.toLowerCase().indexOf(query.author.toLowerCase()) > -1 
        let duplicate = authorsFound[book.author]

        if(authorMatch && !duplicate){
          authorsFound[book.author] = true
          matchedAuthors.push(book)
        }

        if(matchedAuthors.length === query.limit) break
      }

      return matchedAuthors
    })
  }

  _mockServerRequest(){
    return new Promise(resolve => {
      window.setTimeout(() => {
        resolve(true)
      }, this._random())
    })
  }

  _random() {
    return Math.floor(Math.random() * 1200)
  }
}
