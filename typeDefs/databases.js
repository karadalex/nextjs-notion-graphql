import { gql } from 'apollo-server-micro'

export default gql`
  type Database {
    id: ID!,
    title: String,
    created_time: String,
    last_edited_time: String
  }
`