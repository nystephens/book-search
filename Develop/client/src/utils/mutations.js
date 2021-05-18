import gql from 'graphql-tag';

export const ADD_USER = gql`
mutation addUser($email: String!, $username: String!, $password: String!) {
    addUser(email: $email, username: $username, password: $password) {
      token
      user {
          _id
        }
    }
};
`;
// Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type. (Look into creating what's known as an input type to handle all of these parameters!) 

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
};
`;

// not working
export const SAVE_BOOK = gql`
mutation saveBook ($bookData: bookInput) {
  saveBook(bookData: $bookData) {
      _id
      savedBooks {
        title
        author
        bookId
        description
        image
        link
      }
    }
  }
};
`;


