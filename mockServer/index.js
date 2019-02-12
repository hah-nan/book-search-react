import data from './books-data.js'

//assuming the books database is large (3000+ records)

export function fetchBooksByTitle(query) {
  return _mockServerRequest().then(() => {
    
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

export function fetchBooksByAuthor(query) {
  return _mockServerRequest().then(() => {
    
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


function _mockServerRequest(){
  return new Promise(resolve => {
    window.setTimeout(() => {
      resolve(true)
    }, _random())
  })
}

function _random() {
  return Math.floor(Math.random() * 1200)
}
