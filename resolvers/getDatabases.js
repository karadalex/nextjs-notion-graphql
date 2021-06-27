export async function listNotionDatabases() {
  const secret = process.env.NOTION_API_KEY

  let headers = new Headers();
  headers.append("Authorization", `Bearer ${secret}`);
  headers.append("Notion-Version", "2021-05-13");
  headers.append("Content-Type", "application/json");

  const options = {
    method: 'GET',
    headers: headers,
  };

  console.debug(new Date(), "fetching databases from Notion")
  const response = await fetch(`https://api.notion.com/v1/databases`, options)
  const responseData = await response.json()
  const results = responseData.results

  return results
}


export async function getDatabases() {
  const results = await listNotionDatabases()
  if (results.length > 0) {
    return results.map(database => {
      return {
        id: database.id,
        title: database.title[0].plain_text
      }
    })
  } else {
    return []
  }
}


export default async function getDatabasesResolver(parent, args, context) {
  return getDatabases()
}