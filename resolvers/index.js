import getDatabasesResolver from './getDatabases'
import { listNotionDatabases } from './getDatabases'
import { getTypeNameFromNotionDatabase, getQueryNameFromNotionDatabase } from '../utils/types'
import genericDatabaseResolver from './genericDatabaseResolver'
import GraphQLJSON from 'graphql-type-json'


export default async function getDynamicResolvers() {
  let resolvers = {
    Query: {
      databases: getDatabasesResolver,
    },
    JSON: GraphQLJSON
  }

  const databases = await listNotionDatabases()
  databases.forEach(database => {
    // TODO: Title is an array, improve parsing to take into consideration all possible elements
    // of this array
    let queryName = getQueryNameFromNotionDatabase(database)
    let typeName = getTypeNameFromNotionDatabase(database)

    // Construct new resolver
    resolvers.Query[queryName] = (parent, args, context) => genericDatabaseResolver(database.id)
  })

  return resolvers
}