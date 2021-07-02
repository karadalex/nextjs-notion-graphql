GraphQL server for Notion API
=============================

A simple GraphQL server for the Notion API using NextJS and Apollo Server (micro)

## Features

- [x] Dynamic Types schema generation based on Notion Databases
- [x] Dynamic Get Resolvers generation based on Notion Databases
- [ ] Update mutators
- [ ] Delete mutators
- [x] Notion API Caching (To reduce number of calls to the Notion API)

## Examples

### Database

Consider the following Notion database, on its own page
![](./docs/img/notion-database-structure.png)

then an example query for this database is the following (the schema was generated automatically)
```graphql
query {
  blogPosts {
    id
    created_time
    children {
      object
      has_more
      results {
        type
        ...on ParagraphBlock {
          paragraph {
            text {
              plain_text
            }
          }
        }
      }
    }
  }
}
```
Another example is the following search query that searches using the search API endpoint
```graphql
query {
  search(parameters: {
    query: "blog post",
    sort: {
      direction: descending
      timestamp: last_edited_time
    }
  })
}
```

## Deployment

Deploy the example using [Vercel](https://vercel.com?utm_source=github):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/karadalex/nextjs-notion-graphql)

