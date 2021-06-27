import { gql } from 'apollo-server-micro'

export default gql`
  type Query {
    databases: [Database!]!
  }
  type Database {
    id: ID!,
    title: String,
  }
`