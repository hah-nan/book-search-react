import data from './data.js'

export default class Books {

  fetchBooksByTitle(query) {
    return this._mockServerRequest().then(() => {


      //replace with database optimization magic
      return data.books.filter((book) => {
        return book.title.toLowerCase().indexOf(query.title.toLowerCase()) > -1
      })
    })
  }

  fetchBooksByAuthor(query) {
    return this._mockServerRequest().then(() => {
      
      //replace with database optimization magic
      let authorsFound = {}
      return data.books.filter((book, i, books) => {
        let authorMatch = book.author.toLowerCase().indexOf(query.author.toLowerCase()) > -1
        let duplicate = authorsFound[book.author]

        if(authorMatch && !duplicate){
          authorsFound[book.author] = true
          return true
        }
      })
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
