import { gql } from 'apollo-server-micro'

export default gql`

  enum DirectionEnum {
    ascending
    descending
  }

  enum TimestampEnum {
    last_edited_time
  }

  input SortObject {
    direction: DirectionEnum,
    timestamp: TimestampEnum
  }

  input FilterObject {
    value: String,
    property: String
  }

  input Search {
    query: String!,
    sort: SortObject,
    filter: FilterObject,
    start_cursor: String,
    page_size: Int
  }
`