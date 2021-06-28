import { gql } from 'apollo-server-micro'

export default gql`
  scalar JSON

  type Database {
    object: String!,
    id: ID!,
    created_time: String,
    last_edited_time: String
    title: String,
    properties: JSON
  }
`