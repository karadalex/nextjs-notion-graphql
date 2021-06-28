export default {
  __resolveType(obj, context, info) {
    if (obj.type === "paragraph") {
      return "ParagraphBlock"
    }
    if (obj.type === "heading_1" || obj.type === "heading_2" || obj.type === "heading_3") {
      return "HeadingBlock"
    }
  }
}