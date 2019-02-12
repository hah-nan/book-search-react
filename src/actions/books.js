import { fetchBooksByTitle, fetchBooksByAuthor} from '../mockServer'

export function fetchMatchingTitlesAndAuthors(query){
   const titlesPromise = fetchBooksByTitle({title: query, limit: 5})
   const authorsPromise = fetchBooksByAuthor({author: query, limit: 5})

   return Promise.all([titlesPromise, authorsPromise]).then(([titles, authors]) => {
    return {titles, authors}      
   }).catch(e => console.error(e))
}

export function formatTitlesAndAuthors(titles, authors, match){
  const formattedTitles = titles.map(( book ) => {      
    return {
      title: book.title,
      subtitle: `${book.author} -- Published in ${book.year}`,
      match: match
    }
  })

  const formattedAuthors = authors.map(( book ) => {
    return {
      title: book.author,
      subtitle: `Wrote ${book.title}`,
      match: match
    }
  })

  return {formattedTitles, formattedAuthors}
}

export function debounce(){
  
}