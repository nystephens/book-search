const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: String
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        # Not the _id, but the book's id value returned from Google's Book API.
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: String
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        savedBooks(savedBooks: String): [User]
    }

    type Mutations {
        loginUser(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookId: String!): Book
        removeBook(bookId: String!): Book
    }
`;

module.exports = typeDefs;