export async function listNotionDatabases() {
  // const secret = process.env.NOTION_API_KEY

  // let headers = new Headers();
  // headers.append("Authorization", `Bearer ${secret}`);
  // headers.append("Notion-Version", "2021-05-13");
  // headers.append("Content-Type", "application/json");

  // const options = {
  //   method: 'GET',
  //   headers: headers,
  // };

  // console.debug(new Date(), "fetching databases from Notion")
  // const response = await fetch(`https://api.notion.com/v1/databases`, options)
  // const responseData = await response.json()
  // const results = responseData.results

  // return results

  return [
    {
      object: "database",
      id: "2c4417b9-9f3a-4b7b-a5e4-98cf0ba56e82",
      created_time: "2021-06-18T22:06:00.537Z",
      last_edited_time: "2021-06-27T15:05:00.000Z",
      title: [
        {
          type: "text",
          text: {
            content: "Blog posts",
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "Blog posts",
          href: null,
        },
      ],
      properties: {
        image: {
          id: ";<DU",
          type: "url",
          url: {},
        },
        date: {
          id: ";xkY",
          type: "last_edited_time",
          last_edited_time: {},
        },
        slug: {
          id: "ASp~",
          type: "rich_text",
          rich_text: {},
        },
        published: {
          id: "CS^B",
          type: "checkbox",
          checkbox: {},
        },
        author: {
          id: "JJQ[",
          type: "created_by",
          created_by: {},
        },
        tags: {
          id: "VL\\y",
          type: "multi_select",
          multi_select: {
            options: [
              {
                id: "ad0aedc1-7a3b-4bc5-aaab-3701affe2410",
                name: "tag1",
                color: "orange",
              },
              {
                id: "35c36b0f-5d0a-4029-a65e-b16319aa78a0",
                name: "tag2",
                color: "gray",
              },
              {
                id: "cd186731-cedd-42df-971d-d38ebdf44a29",
                name: "tag3",
                color: "gray",
              },
              {
                id: "c7ecaa55-d9b7-4e46-8185-2d767aefce48",
                name: "tag4",
                color: "yellow",
              },
              {
                id: "b8f9872c-584f-4751-9a41-43b2a93e598f",
                name: "tag5",
                color: "default",
              },
            ],
          },
        },
        description: {
          id: "pomR",
          type: "rich_text",
          rich_text: {},
        },
        title: {
          id: "title",
          type: "title",
          title: {},
        },
      },
      parent: {
        type: "page_id",
        page_id: "d5dc5d36-c049-4e58-a8c3-f7aa50d95023",
      },
    },
    {
      object: "database",
      id: "989c2091-6db2-4769-bb6e-14abc76e6e5d",
      created_time: "2021-06-27T14:59:06.685Z",
      last_edited_time: "2021-06-27T15:05:00.000Z",
      title: [
        {
          type: "text",
          text: {
            content: "Users",
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "Users",
          href: null,
        },
      ],
      properties: {
        Tags: {
          id: "y^rL",
          type: "multi_select",
          multi_select: {
            options: [],
          },
        },
        Name: {
          id: "title",
          type: "title",
          title: {},
        },
      },
      parent: {
        type: "page_id",
        page_id: "d5dc5d36-c049-4e58-a8c3-f7aa50d95023",
      },
    },
    {
      object: "database",
      id: "cd196203-f531-41d8-a065-bd10c1887b57",
      created_time: "2021-06-27T15:45:45.289Z",
      last_edited_time: "2021-06-27T15:45:00.000Z",
      title: [
        {
          type: "text",
          text: {
            content: "Products",
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          plain_text: "Products",
          href: null,
        },
      ],
      properties: {
        Tags: {
          id: "saCT",
          type: "multi_select",
          multi_select: {
            options: [],
          },
        },
        Name: {
          id: "title",
          type: "title",
          title: {},
        },
      },
      parent: {
        type: "page_id",
        page_id: "d5dc5d36-c049-4e58-a8c3-f7aa50d95023",
      },
    },
  ];
}

export async function getDatabases() {
  const results = await listNotionDatabases();
  if (results.length > 0) {
    return results.map((database) => {
      return {
        id: database.id,
        title: database.title[0].plain_text,
      };
    });
  } else {
    return [];
  }
}

export default async function getDatabasesResolver(parent, args, context) {
  return getDatabases();
}
