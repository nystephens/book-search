// const { gql } = require('apollo-server-express');

// const typeDefs = gql`
//     type User {
//         _id: ID!
//         username: String
//         email: String
//         bookCount: Int
//         savedBooks: [Book]
//     }

//     type Book {
//         # Not the _id, but the book's id value returned from Google's Book API.
//         bookId: ID!
//         author: [String]
//         description: String
//         title: String!
//         image: String
//         link: String
//     }

//     type Auth {
//         token: ID!
//         user: User
//     }

//     input bookInput {
//         bookId: String!
//         author: [String]
//         description: String!
//         title: String!
//         image: String
//         link: String
//     }

//     type Query {
//         me: User
//     }

//     type Mutation {
//         login(email: String!, password: String!): Auth
//         addUser(username: String!, email: String!, password: String!): Auth
//         saveBook(bookData: bookInput!): User
//         removeBook(bookId: ID!): User
//     }
// `

// module.exports = typeDefs;


// import the gql tagged template function
const { gql } = require("apollo-server-express");
// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    saveBooks: [Book]
  }
  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }
  type Auth {
    token: ID!
    user: User
  }
  input bookInput {
    authors: [String]
    bookId: String!
    image: String
    link: String
    title: String!
    description: String!
  }
  type Query {
      me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: bookInput!): User
    removeBook(bookId: ID!): User
    }
`;
    
module.exports = typeDefs;