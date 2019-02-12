import { fetchBooksByTitle, fetchBooksByAuthor} from '../../mockServer'

export function fetchMatchingTitles(query){
   return fetchBooksByTitle({title: query, limit: 5})
}
export function fetchMatchingAuthors(query){
   return fetchBooksByAuthor({author: query, limit: 5})
}

export function debounce(func, wait) {
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