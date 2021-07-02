import databaseDefs from './databases'
import blockDefs from './blocks'
import searchDefs from './search'
import { listNotionDatabases } from '../resolvers/getDatabases'
import camelCase from 'lodash.camelcase'
import { gql } from 'apollo-server-micro'
import { getTypeNameFromNotionDatabase, getQueryNameFromNotionDatabase } from '../utils/types'


export default async function getDynamicTypeDefs() {
  let typeDefs = [databaseDefs, blockDefs, searchDefs]

  // TODO: Improve database fetching below, to reduce amount of API calls
  // to the Notion API (maybe add a cache layer in between)
  const databases = await listNotionDatabases()

  let typeNames = ["Database"]
  let queryNames = ["databases"]
  databases.forEach(database => {
    // TODO: Title is an array, improve parsing to take into consideration all possible elements
    // of this array
    let queryName = getQueryNameFromNotionDatabase(database)
    queryNames.push(queryName)
    let typeName = getTypeNameFromNotionDatabase(database)
    typeNames.push(typeName)

    // Construct new graphql type
    const fields = Object.keys(database.properties)
      .map(property => `${camelCase(property)}:JSON`)
    const typeDef = gql`
      type ${typeName} {
        object: String!,
        id: ID!,
        created_time: String!,
        last_edited_time: String!,
        parent: JSON,
        archived: Boolean,
        ${fields}
        # children: JSON
        children: BlockChildren
      }
    `

    typeDefs.push(typeDef)
  })

  // Construct Query type with the generated types from all databases of Notion
  const queryFields = queryNames.map((queryName, index) => {
    return `${queryName}:[${typeNames[index]}!]!`
  })
  let queryTypeDef = gql`
    type Query {
      ${queryFields}

      search(parameters: Search): JSON
    }
  `
  typeDefs.push(queryTypeDef)
  
  return typeDefs
}
