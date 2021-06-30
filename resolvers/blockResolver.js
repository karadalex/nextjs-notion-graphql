export default {
  __resolveType(obj, context, info) {
    switch (obj.type) {
      case "paragraph":
        return "ParagraphBlock"
      case "heading_1":
        return "Heading1Block"
      case "heading_2":
        return "Heading2Block"
      case "heading_3":
        return "Heading3Block"
      case "bulleted_list_item":
        return "BulletedListItemBlock"
      case "numbered_list_item":
        return "NumberedListItemBlock"
      case "to_do":
        return "TodoBlock"
      case "toggle":
        return "ToggleBlock"
      case "child_page":
        return "ChildPageBlock"
      case "unsupported":
        return "UnsupportedBlock"
      default:
        return "UnsupportedBlock"
    }
  }
}