import databaseDefs from './databases'
import { listNotionDatabases } from '../resolvers/getDatabases'
import camelCase from 'lodash.camelcase'
import { gql } from 'apollo-server-micro'


export default async function getDynamicTypeDefs() {
  let typeDefs = [databaseDefs]

  const databases = await listNotionDatabases()
  databases.forEach(database => {
    // TODO: Title is an array, improve parsing to take into consideration all possible elements
    // of this array
    let typeName = camelCase(database.title[0].plain_text)
    typeName = typeName[0].toUpperCase() + typeName.substring(1)
    // Singularize typename
    if (typeName[typeName.length-1].toLowerCase() === "s") {
      typeName = typeName.substring(0, typeName.length-1)
    }

    // Construct new graphql type
    const fields = Object.keys(database.properties)
      .map(property => `${camelCase(property)}:String`)
    const typeDef = gql`
      type ${typeName} {
        ${fields}
      }
    `

    typeDefs.push(typeDef)
  });
  
  return typeDefs
}
