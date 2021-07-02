export default async function searchResolver(parent, args, context) {
  console.log(JSON.stringify(args))

  console.debug(new Date(), "Searching for parameters:", JSON.stringify(args))
  const secret = process.env.NOTION_API_KEY

  let headers = new Headers();
  headers.append("Authorization", `Bearer ${secret}`);
  headers.append("Notion-Version", "2021-05-13");
  headers.append("Content-Type", "application/json");

  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(args.parameters)
  };

  const response = await fetch(`https://api.notion.com/v1/search`, options)
  const responseData = await response.json()

  return responseData
}
