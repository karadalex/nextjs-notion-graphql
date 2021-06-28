import camelCase from "lodash.camelcase";

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
  
  // Iterate through properties
  const records = responseData.results.map(obj => {
    let record = {}

    const properties = Object.keys(obj.properties)
    const propertiesCamel = properties.map(property => camelCase(property))

    // get value of each property (JSON serialize it temporarily for simplicity)
    propertiesCamel.forEach((property, index) => {
      record[property] = obj.properties[properties[index]]
    });

    // This record object is a Notion "Page"
    record = {
      object: obj.object,
      id: obj.id,
      created_time: obj.created_time,
      last_edited_time: obj.last_edited_time,
      parent: obj.parent,
      archived: obj.archived,
      ...record,
    }

    return record
  })
  
  return records
}