export async function getChildren(blockId) {
  console.debug(new Date(), "Getting children blocks for block with id:", blockId)
  const secret = process.env.NOTION_API_KEY

  let headers = new Headers();
  headers.append("Authorization", `Bearer ${secret}`);
  headers.append("Notion-Version", "2021-05-13");
  headers.append("Content-Type", "application/json");

  const options = {
    method: 'GET',
    headers: headers,
  };

  const response = await fetch(`https://api.notion.com/v1/blocks/${blockId}/children`, options)
  const responseData = await response.json()
  console.log(responseData)
  return responseData
}

export default async function getChildrenResolver(parent, args, context) {
  return getChildren();
}
