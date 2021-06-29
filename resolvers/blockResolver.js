export default {
  __resolveType(obj, context, info) {
    
    textAndChildrenBlocks = ["paragraph", "bulleted_list_item", "numbered_list_item", "toggle"]
    if (obj.type in textAndChildrenBlocks) {
      return "GenericTextAndChildrenBlock"
    }

    if (obj.type === "to_do") {
      return "TodoBlock"
    }

    headingBlocks = ["heading_1", "heading_2", "heading_3"]
    if (obj.type === "heading_1" || obj.type === "heading_2" || obj.type === "heading_3") {
      return "HeadingBlock"
    }

    if (obj.type === "child_page") {
      return "TodoBlock"
    }

    if (obj.type === "unsupported") {
      return "Block"
    }
  }
}