require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = process.env.MONGO_URI

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => {
      const books = await Book.find({})
      return books.length
    },
    authorCount: async () => {
      const authors = await Author.find({})
      return authors.length
    },
    allBooks: async (root, args) => {
      let books
      if (!args.author && !args.genre) {
        books = await Book.find({})
      } else {
        books = await Book.find({ genres: { $in: [args.genre] } })
        // parametri authors ei vielä toimi
      }
      return books.map(async (b) => {
        const author = await Author.findById(b.author)
        return {
          title: b.title,
          author: author,
          published: b.published,
          genres: b.genres,
        }
      })
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({})
      return authors.map((a) => ({
        name: a.name,
        born: a.born,
        bookCount: books.filter((b) => b.author == a.id).length,
      }))
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const authorName = args.author
      const author = await Author.findOne({ name: authorName })

      if (!author) {
        const newAuthor = new Author({ name: authorName, born: null })
        await newAuthor.save()
      }

      const bookAuthor = await Author.findOne({ name: authorName })

      const book = new Book({
        ...args,
        author: bookAuthor,
        id: uuid(),
      })
      return book.save()
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { returnOriginal: false }
      )
      return author
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
