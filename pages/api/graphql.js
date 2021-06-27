import { ApolloServer, gql } from 'apollo-server-micro'
import getDynamicTypeDefs from '../../typeDefs'
import resolvers from '../../resolvers'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function graphqlServer(req, res) {
  // Create a dynamic GraphQL Server
  const typeDefs = await getDynamicTypeDefs()
  const apolloServer = new ApolloServer({ typeDefs, resolvers })
  const apolloHandler = apolloServer.createHandler({ path: '/api/graphql' })

  await apolloHandler(req, res)
}
