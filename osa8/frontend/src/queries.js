import { gql } from '@apollo/client'

export const BOOK_FRAGMENT = gql`
  fragment Book on Book {
    title
    author {
      name
    }
    published
    genres
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...Book
    }
  }
  ${BOOK_FRAGMENT}
`

export const ALL_BOOKS_BY_GENRE = gql`
  query allBooksByGenre($genre: String) {
    allBooks(genre: $genre) {
      ...Book
    }
  }
  ${BOOK_FRAGMENT}
`

export const USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`
