import { gql } from '@apollo/client'
import { BOOK_FRAGMENT } from './queries'

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...Book
    }
  }
  ${BOOK_FRAGMENT}
`
