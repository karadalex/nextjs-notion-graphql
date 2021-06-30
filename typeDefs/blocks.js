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

  type ParagraphBlock implements Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean
    text: JSON,
    children: JSON,
    paragraph: JSON
  }

  type Heading1Block implements Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean
    text: JSON,
    heading_1: JSON
  }

  type Heading2Block implements Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean
    text: JSON,
    heading_2: JSON
  }

  type Heading3Block implements Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean
    text: JSON,
    heading_3: JSON
  }

  type BulletedListItemBlock implements Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean
    text: JSON,
    bulleted_list_item: JSON
  }

  type NumberedListItemBlock implements Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean
    text: JSON,
    numbered_list_item: JSON
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
    children: JSON,
    to_do: JSON
  }

  type ToggleBlock implements Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean
    text: JSON,
    children: JSON,
    toggle: JSON
  }

  type ChildPageBlock implements Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean
    title: String,
    child_page: JSON
  }

  type UnsupportedBlock implements Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean
    unsupported: JSON
  }
`