import { fetchBooksByTitle, fetchBooksByAuthor} from '../../mockServer'

export function fetchMatchingTitles(title){
   return fetchBooksByTitle({title: title, limit: 5})
}
export function fetchMatchingAuthors(author){
   return fetchBooksByAuthor({author: author, limit: 5})
}

export function throttle(func, wait) {
  let timeout = null
  return function(...args) {
    const later = function() {
      timeout = null
      func.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}