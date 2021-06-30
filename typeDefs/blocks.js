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

  enum RichTextType {
    text
    mention
    equation
  }

  type TextAndChildrenObject {
    text: [RichTextObject],
    children: [Block]
  }

  type TextObject {
    text: [RichTextObject]
  }

  type TodoObject {
    text: [RichTextObject],
    checked: Boolean
    children: [Block]
  }

  type TitleObject {
    title: String
  }

  type RichTextObject {
    plain_text: String,
    href: String,
    annotations: JSON,
    type: RichTextType
  }

  type ParagraphBlock implements Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean,
    paragraph: TextAndChildrenObject
  }

  type Heading1Block implements Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean
    heading_1: TextObject
  }

  type Heading2Block implements Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean
    heading_2: TextObject
  }

  type Heading3Block implements Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean
    heading_3: TextObject
  }

  type BulletedListItemBlock implements Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean
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
    numbered_list_item: TextAndChildrenObject
  }

  type TodoBlock implements Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean
    to_do: TodoObject
  }

  type ToggleBlock implements Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean
    toggle: TextAndChildrenObject
  }

  type ChildPageBlock implements Block {
    object: String!,
    id: ID!,
    type: BlockType,
    created_time: String,
    last_edited_time: String
    has_children: Boolean
    child_page: TitleObject
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