import { cacheContext } from '../middleware/cache'


export async function listNotionDatabases() {
  let notion_databases = [];

  if (!cacheContext.cache.get("notion_databases")) {
    console.debug(new Date(), "Stale notion_databases in cache, fetching again")
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
    notion_databases = responseData.results

    cacheContext.cache.set("notion_databases", notion_databases)
  } else {
    console.debug(new Date(), "Using notion_databases from cache")
    notion_databases = cacheContext.cache.get("notion_databases")
  }
  
  return notion_databases
}

export async function getDatabases() {
  const results = await listNotionDatabases();
  if (results.length > 0) {
    return results.map((database) => {
      return {
        object: database.object,
        id: database.id,
        created_time: database.created_time,
        last_edited_time: database.last_edited_time,
        title: database.title[0].plain_text,
        properties: database.properties
      };
    });
  } else {
    return [];
  }
}

export default async function getDatabasesResolver(parent, args, context) {
  return getDatabases();
}
