import databaseDefs from './databases'
import { listNotionDatabases } from '../resolvers/getDatabases'
import camelCase from 'lodash.camelcase'
import { gql } from 'apollo-server-micro'
import { getTypeNameFromNotionDatabase, getQueryNameFromNotionDatabase } from '../utils/types'


export default async function getDynamicTypeDefs() {
  let typeDefs = [databaseDefs]

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
      .map(property => `${camelCase(property)}:String`)
    const typeDef = gql`
      type ${typeName} {
        ${fields}
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
    }
  `
  typeDefs.push(queryTypeDef)
  
  return typeDefs
}
