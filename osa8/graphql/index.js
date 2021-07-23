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
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({})
      }
      return await Book.find({})
        .filter((b) => (args.author ? b.author === args.author : true))
        .filter((b) => (args.genre ? b.genres.includes(args.genre) : true))
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      // const books = await Book.find({}
      // return authors.map((a) => ({
      //   ...a,
      //   bookCount: /*books.filter((b) => b.author.name === a.name)?.length ||*/ 0,
      // }))
      return authors
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
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name)
      if (!author) {
        return null
      }
      const editedAuthor = { ...author, born: args.setBornTo }
      authors[authors.findIndex((a) => a.name === author.name)] = editedAuthor
      return editedAuthor
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
