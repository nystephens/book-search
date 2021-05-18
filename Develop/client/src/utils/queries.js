import gql from 'graphql-tag';


export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            savedBooks {
                bookId
                author
                image
                link
                title
                description
            }
        }
    }
  `;