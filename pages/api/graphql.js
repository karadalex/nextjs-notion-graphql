import { ApolloServer, gql } from 'apollo-server-micro'
import getDatabases from '../../actions/getDatabases'

const typeDefs = gql`
  type Query {
    databases: [Database!]!
  }
  type Database {
    id: ID!,
    title: String,
  }
`

const resolvers = {
  Query: {
    databases: getDatabases,
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
