import { gql } from 'apollo-server-micro'

export default gql`
  type BlockChildren {
    object: String,
    results: [Block],
    next_cursor: String,
    has_more: Boolean
  }

  interface Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean
  }

  enum BlockType {
    paragraph
    heading_1
    heading_2
    heading_3
    bulleted_list_item
    numbered_list_item
    to_do
    toggle
    child_page
    and unsupported
  }

  type GenericTextAndChildrenBlock implements Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean
    text: JSON,
    children: JSON
  }

  type HeadingBlock implements Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean
    text: JSON,
  }

  type TodoBlock implements Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean
    text: JSON,
    checked: Boolean,
    children: JSON
  }

  type ChildPageBlock implements Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean
    title: String
  }
`