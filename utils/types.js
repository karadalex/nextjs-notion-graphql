import camelCase from 'lodash.camelcase'


export function getTypeNameFromNotionDatabase(database) {
  let typeName = camelCase(database.title[0].plain_text)
  // Make first letter capital
  typeName = typeName[0].toUpperCase() + typeName.substring(1)
  // Singularize typename
  if (typeName[typeName.length-1].toLowerCase() === "s") {
    typeName = typeName.substring(0, typeName.length-1)
  }

  return typeName
}


export function getQueryNameFromNotionDatabase(database) {
  let queryName = camelCase(database.title[0].plain_text)
  return queryName
}