import getDatabasesResolver from './getDatabases'


export default {
  Query: {
    databases: getDatabasesResolver,
  },
}