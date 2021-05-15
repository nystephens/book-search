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
        author: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: String
        user: User
    }

    input BookInput {
        bookId: String
        author: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        savedBooks(savedBooks: String): [User]
    }

    type Mutation {
        loginUser(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: BookInput): User
        removeBook(bookId: String!): Book
    }
`;

module.exports = typeDefs;