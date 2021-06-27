export default async function genericDatabaseResolver(database_id) {
  const secret = process.env.NOTION_API_KEY

  let headers = new Headers();
  headers.append("Authorization", `Bearer ${secret}`);
  headers.append("Notion-Version", "2021-05-13");
  headers.append("Content-Type", "application/json");

  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      page_size: 10,
      sorts: [
        {
          timestamp: "last_edited_time",
          direction: "descending"
        }
      ]
    }),
  };

  const response = await fetch(`https://api.notion.com/v1/databases/${database_id}/query`, options)
  const responseData = await response.json()
  
  return responseData.results
}