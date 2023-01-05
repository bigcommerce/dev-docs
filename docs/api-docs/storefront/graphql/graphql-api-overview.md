# GraphQL Storefront API Overview

<!-- theme: success -->
> #### Early access
> The GraphQL Storefront API is in early access and is feature-incomplete. It will remain in early access until we reach the minimum amount of functionality necessary to power an end-to-end shopping experience. As new features are added to the API, we'll announce them in our [Developer Changelog](/changelog#labels/storefront-api).

BigCommerce's GraphQL Storefront API makes it possible to query storefront data from within a [Stencil](/stencil-docs/getting-started/about-stencil) theme or remote site. This means information previously only available on the back-end using [Stencil's template logic](/stencil-docs/reference-docs/global-objects-and-properties) can now be accessed with front-end JavaScript. For example, with the GraphQL Storefront API, it is possible to do the following:

* Access product options, variations, and custom fields for any product from any page.
* Request any product's images at any resolution.
* Ask for customer details such as name, email address, and attributes (if logged in).
* Look up objects, such as categories or brands, by URL, and fetch their details.
* Build front-end applications on top of a BigCommerce [Stencil](/stencil-docs/getting-started/about-stencil) theme or on a remote site.


Additionally, by leveraging the power of [GraphQL](https://graphql.org/), data for multiple resources can be returned from a single API call, which simplifies integration and increases performance so that developers can focus on building delightful shopper experiences.

This article is a general overview of BigCommerce's GraphQL Storefront API; it includes sections on authentication and how to access a store's GraphQL Playground. To see specific examples of how GraphQL can be used to query storefront data, see [GraphQL Storefront API Example Queries](/api-docs/storefront/graphql/graphql-storefront-api-samples).

<!-- theme: info -->
> #### Note
> BigCommerce legacy Blueprint themes do not support the GraphQL API and Playground.

## See it in action

To see the GraphQL Storefront API in action, checkout the [Bootstrap + Vanilla JS GraphQL Storefront API Example](https://bigcommerce.github.io/storefront-api-examples/html-bootstrap-vanillajs/) hosted on GitHub. This example shows how a static HTML site can be used to render dynamic product information using the GraphQL Storefront API.

Open the link and click submit with the sample data in the form. To see the example page with your store's data, [create a GraphQL Storefront API token](/api-reference/store-management/tokens/api-token/createtoken) against your store and paste the token into the example form. Be sure to create a token valid for this origin: `https://bigcommerce.github.io`.


For a full list of examples, see the [GraphQL Storefront API Examples repo](https://github.com/bigcommerce/storefront-api-examples).

## Accessing the GraphQL Playground

To access the GraphQL Storefront API Playground and documentation, [sign in to your store](https://login.bigcommerce.com/deep-links/manage) and navigate to **Settings > API> Storefront API Playground**.


The GraphQL Storefront API Playground will open.

![GraphQL Storefront API Playground](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/graphql-storefront-api-playground.png "GraphQL Storefront API Playground")

<!-- theme: info -->
> #### Note
> If the **Storefront API Playground** link is not visible, the store may not be using a Stencil theme. Apply a Stencil theme to use the GraphQL Storefront API.


## Using the GraphQL Playground

To use the request runner, input queries on the left side and then click the **Play** button. Query results will be displayed on the right side.


![GraphQL Playground Query](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/graphql-storefront-api-playground2.png "GraphQL Playground Query")

The following is an example query to get you started.


```graphql title="Example query" lineNumbers
query MyFirstQuery {
  site {
    settings {
      storeName
    }
    products {
      edges {
        node {
          name
          sku
          prices {
            retailPrice {
              value
              currencyCode
            }
            price {
              value
              currencyCode
            }
          }
        }
      }
    }
  }
}
```

To explore the storefront GraphQL schema, checkout the **Docs** and **Schema** tabs on the right.



![GraphQL Playground Docs](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/graphql-playground-docs.png "GraphQL Playground Docs")

## Authentication

GraphQL Storefront API requests are authenticated with tokens sent using the HTTP `Authorization` header.


```shell title="Example Authorization header using cURL"
curl 'https://{bigcommerce_storefront_domain}.com/graphql'\
  # ...
  -H 'Authorization: Bearer {token}'\
  # ...
```

### Creating a token

Use the [Create a GraphQL Storefront API token](/api-reference/store-management/tokens/api-token/createtoken) REST endpoint to request JWT-style bearer tokens that authenticate cross-origin requests to the GraphQL Storefront API. Consult the endpoint's documentation to determine what OAuth scopes it requires. In addition, ensure that the API account you use for the following request has sufficient permissions to make your GraphQL queries. **Your JWT will have the same OAuth scopes as the REST API account that creates it.** 

```http title="Example request: Create a GraphQL Storefront API token"
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/storefront/api-token
X-Auth-Token: {{access_token}}
Accept: application/json
Content-Type: application/json

{
  "channel_id": 1,            // int (must be a valid channel ID on the store)
  "expires_at": 1602288000,   // double utc unix timestamp (required)
  "allowed_cors_origins": [   // array (accepts 1 origin currently)
    "https://example.com"
  ]
}
```
&nbsp;
<!-- theme: info -->
> #### Notes
> * The `allowed_cors_origins` array currently accepts only one origin. Generate a fresh token for each origin.
> * The `channel_id` for the default Stencil storefront is `1`. To learn more about channels, see [the channels section of the Multi-Storefront Overview](/api-docs/multi-storefront/overview#channels). For more about using the GraphQL Storefront API on custom channels, consult this article's [FAQ section on alternate channels](#i-want-to-run-requests-in-the-context-of-another-channel).

```json title="Example response: Create a GraphQL Storefront API token" lineNumbers
{
  "token":"...eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9...",
  "meta": {
    // ...
  }
}
```

Only use the [Revoke a token](/api-reference/store-management/tokens/api-token/revoketoken) endpoint to revoke compromised tokens under emergency situations. Allow uncompromised short-lived tokens to naturally expire, as these do not need to be revoked.


### Authenticating with an auto-generated Stencil token

Client code in BigCommerce Stencil themes can be passed a token at render time with the `{{settings.storefront_api.token}}` Handlebars object:

```js title="Example request: GraphQL query using Stencil token" lineNumbers
fetch('/graphql', {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer {{settings.storefront_api.token}}'
  },
  body: JSON.stringify({ query: `query MyFirstQuery {...}`})
})
.then(res => console.log(res))
.catch(error => console.error(error));
```


### Customer impersonation tokens

It's also possible to generate tokens for use in server-to-server interactions with a trusted consumer using the [Create a customer impersonation token](/api-reference/storefront/graphql-api-tokens/customer-impersonation-token/createtokenwithcustomerimpersonation) endpoint. Consult the endpoint's documentation to determine what OAuth scopes it requires.

```http title="Example request: Create a customer impersonation token"
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/storefront/api-token-customer-impersonation
X-Auth-Token: {{access_token}}
Accept: application/json
Content-Type: application/json

{
  "channel_id": 1,
  "expires_at": 1602288000
}
```
&nbsp;

```json title="Example response: Create a customer impersonation token" lineNumbers
{
  "data":
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
  "meta": {}
}
```

Customer impersonation token-authenticated requests made to the GraphQL Storefront API receive store information from the perspective of the customer corresponding to the customer ID specified in the `X-Bc-Customer-Id` header sent with the GraphQL `POST` request. Pricing, product availability, customer account, and customer details will be reflected.

Customer impersonation tokens should **never** be exposed publicly, for example, to JavaScript or HTML. These tokens should not be used for front-end requests. Unlike normal GraphQL Storefront API tokens, they are sensitive and should be treated like secrets, just as you might treat an OAuth access token for BigCommerce's REST APIs. Attempts to run requests using these tokens from a web browser will be rejected.

Consider this sample request using a Customer Impersonation token to run a request in the context of customer ID `123`.

```shell title="Example request: Query as customer 123"
curl 'https://store.com/graphql' -H 'Authorization: Bearer TOKEN_GOES_HERE' -H 'X-Bc-Customer-Id: 123' --data-binary '{"query":"query CustomerInformation {\n  customer {\n    firstName\n    lastName\n    email\n  }\n}"}'
```

### Customer login

If you're using the GraphQL Storefront API from a browser, for example, on top of your Stencil storefront, you can use the new Customer Login mutation to sign in to a customer account with an email address and a password. For server-side integrations, consider a customer impersonation token instead. This will set a session cookie in the browser which will authenticate the customer account on future requests:

```graphql title="Example query: login mutation" lineNumbers
mutation Login($email: String!, $pass: String!) {
  login(email: $email, password: $pass) {
    result
  }
}
```

As a best practice, you should inject the password using GraphQL query variables. This prevents the password from being exposed in the query itself. In the [GraphQL Playground](/graphql-playground), you can set the variables for the request.

![GraphQL Playground Query Variables](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/graphql-overview-01.png "GraphQL Playground Query Variables")

You can use a logout mutation to sign out of a customer account:


```graphql title="Example query: logout mutation" lineNumbers
mutation Logout {
   logout {
     result
   }
 }
```

## Querying within a BigCommerce storefront

GraphQL Storefront API calls can be made directly from within a Stencil theme or from a script in the store's [Script Manager](https://support.bigcommerce.com/s/article/Using-Script-Manager). If a GraphQL query is added to a script using Script Manager, any output printed with `console.log()` will be visible in the browser's JavaScript Console.

The following example request uses the `{{settings.storefront_api.token}}` Handlebars object and [JavaScript's Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch):

<!-- theme: info -->
> #### Note
> The `fetch` request's `credentials` property must be set to `same-origin`.


```js title="Example request: GraphQL query using Stencil token" lineNumbers
fetch('/graphql', {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {{ settings.storefront_api.token }}'
  },
  body: JSON.stringify({
    query: `query MyFirstQuery {
      site {
        settings {
          storeName
        }
        products {
          edges {
            node {
              name
              sku
              prices {
                retailPrice {
                  value
                  currencyCode
                }
                price {
                  value
                  currencyCode
                }
              }
            }
          }
        }
      }
    }`
  })
})
.then(res => console.log(res))
.catch(error => console.error(error));
```

You can limit the number of items retrieved for the nodes that return multiple items. See the section on [pagination](#pagination) later in this article.

Client libraries like [Apollo](https://www.apollographql.com/docs/react/) offer features that can simplify GraphQL implementations, such as [declarative data fetching](https://www.apollographql.com/docs/react/data/queries), [state management](https://www.apollographql.com/docs/react/local-state/local-state-management), and [caching](https://www.apollographql.com/docs/react/caching/overview) for more consistent UI components. For an example of adding Apollo Client to the Cornerstone theme, check out this [Cornerstone commit](https://github.com/bigcommerce/cornerstone/commit/508feeb1b00d2bb2940771e5e91250a08b6be4d9) on GitHub.

## Pagination

The GraphQL Storefront API follows the [GraphQL Cursor Connections Specification](https://facebook.github.io/relay/graphql/connections.htm) for pagination. If this is your first time working with GraphQL pagination, see [Apollo's Blog Post "Explaining GraphQL Connections"](https://blog.apollographql.com/explaining-graphql-connections-c48b7c3d6976) for an accessible introduction. If you've worked with other GraphQL APIs, pagination on BigCommerce should look familiar.

For example, consider the following query for a store's first three products (notice `first: 3` passed to `products`):

```graphql title="Example query: first three products" lineNumbers
query paginateProducts {
  site {
    products (first: 3) {
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          entityId
          name
        }
      }
    }
  }
}
```

You can run this query against an example storefront using the [GraphQL Playground](/graphql-playground?tabs=firstThreeProducts).

The results look something like the following:

```json title="Example response: first three products" lineNumbers
{
  "data": {
    "site": {
      "products": {
        "pageInfo": {
          "startCursor": "YXJyYXljb25uZWN0aW9uOjA=",
          "endCursor": "YXJyYXljb25uZWN0aW9uOjI="
        },
        "edges": [
          {
            "cursor": "YXJyYXljb25uZWN0aW9uOjA=",
            "node": {
              "entityId": 80,
              "name": "Orbit Terrarium - Large"
            }
          },
          {
            "cursor": "YXJyYXljb25uZWN0aW9uOjE=",
            "node": {
              "entityId": 81,
              "name": "Shower Curtain"
            }
          },
          {
            "cursor": "YXJyYXljb25uZWN0aW9uOjI=",
            "node": {
              "entityId": 82,
              "name": "Chambray Towel"
            }
          }
        ]
      }
    }
  }
}
```

Notice the `edge` corresponding to `entityId: 81` has a `cursor` of `YXJyYXljb25uZWN0aW9uOjE=`. We can pass that cursor to the `after` parameter to get the three products after `entityId: 81`:

```graphql title="Example query using cursor" lineNumbers
query paginateProducts {
  site {
    products (first: 3, after: "YXJyYXljb25uZWN0aW9uOjE=") {
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          entityId
          name
        }
      }
    }
  }
}
```

The results will look something like this (notice the last product `entityId: 82` is now the first product):

```json title="Example response using cursor" lineNumbers
{
  "data": {
    "site": {
      "products": {
        "pageInfo": {
          "startCursor": "YXJyYXljb25uZWN0aW9uOjI=",
          "endCursor": "YXJyYXljb25uZWN0aW9uOjQ="
        },
        "edges": [
          {
            "cursor": "YXJyYXljb25uZWN0aW9uOjI=",
            "node": {
              "entityId": 82,
              "name": "Chambray Towel"
            }
          },
          {
            "cursor": "YXJyYXljb25uZWN0aW9uOjM=",
            "node": {
              "entityId": 83,
              "name": "Hand & Body Cream"
            }
          },
          {
            "cursor": "YXJyYXljb25uZWN0aW9uOjQ=",
            "node": {
              "entityId": 84,
              "name": "Room Spray"
            }
          }
        ]
      }
    }
  }
}
```


This same approach can be used to *slice* any GraphQL connection and paginate through the *slices* using `startCursor` and `endCursor`. For example, the following query gets the first thirty brands:

```graphql title="Example query using slices" lineNumbers
query brands {
  site {
    brands (first: 30) {
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          name
        }
      }
    }
  }
}
```

And given the following results:

```json title="Example response using slices" lineNumbers
{
  "data": {
    "site": {
      "brands": {
        "pageInfo": {
          "startCursor": "YXJyYXljb25uZWN0aW9uOjA=",
          "endCursor": "YXJyYXljb25uZWN0aW9uOjM="
        },
        "edges": [
          {
            "cursor": "YXJyYXljb25uZWN0aW9uOjA=",
            "node": {
              "name": "Sagaform"
            }
          },
          ...
        ]
      }
    }
  }
}
```

You can retrieve the next thirty by making a new query and passing in the `endCursor` from the first page of results:

```graphql title="Example query using slices and cursor" lineNumbers
query brands {
  site {
    brands (first: 30, after:"YXJyYXljb25uZWN0aW9uOjM="  {
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          name
        }
      }
    }
  }
}
```

## Complexity limits

The GraphQL Storefront API uses an algorithm to calculate a complexity score for queries made against the API. Queries that exceed the complexity score will receive an error response:

```json title="Example response with complexity error"
{
  "error": {
    "error": "The query is too complex as it has a complexity score of 1223 out of 1000. Please remove some elements and try again"
  }
}
```

The complexity limit error is usually caused by queries for a large quantity of deeply nested objects, for example, this query for first 50 products and their prices, variants, options, and option values.

```graphql title="Example query with excessive complexity" lineNumbers
query {
  site {
    products(first:50) {
      edges {
        node {
          name
          prices {
            price {
              value
              currencyCode
            }
            retailPrice {
              value
              currencyCode
            }
          }
          variants {
            edges {
              node {
                entityId
                depth {
                  value
                  unit
                }
                sku
              }
            }
          }
          options {
            edges {
              node {
                displayName
                values {
                  edges {
                    node {
                      label
                      entityId
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

The complexity of this query is easily reduced by changing the number of products queried from `first:50` to `first:10`:

```graphql title="Example query with limited complexity" lineNumbers
query {
  site {
    products(first:10) { // <--- reducing quantity requested reduces complexity score
      // ...
```

To reduce complexity, reduce the number of objects requested. For example, do the following:
* Limit collections to a smaller page size (for example, `first:10` instead of `first:50`).
* Reduce the number of items in nested collections.
* Request less fields.

Image queries will return 10 by default.


## FAQ: Querying from alternate channels and external systems

If you wish to use the GraphQL Storefront API from an external system, there are a few considerations.

- Which channel do you wish to run requests in the context of?
- Are you running requests from a server or a front-end application?
- If you are running requests from a front-end application, do you need to show customer-specific information, or only anonymous information?
- If you are running requests from a server, do you need the ability to impersonate customers?

As a best practice, you should create tokens that expire and rotate them regularly before their expiry. However, you are also permitted to create long-lived tokens.

### I want to run requests in the context of the store's default channel (channel ID 1)

There are two public URLs you can use to run requests:

- The storefront's vanity URL; for example, `https://example.com/graphql`
- The store's permanent URL; for example, `https://store-STOREHASH.mybigcommerce.com/graphql`

### I want to run requests in the context of another channel

Use the channel's permanent URL in the following form: `https://store-STOREHASH-CHANNELID.mybigcommerce.com/graphql`.

For example, if your store hash is `abc123` and your channel ID is `456`, the channel's permanent URL is `https://store-abc123-456.mybigcommerce.com/graphql`. 

To expose a channel's permanent URL, [create a site](/api-reference/store-management/sites/sites/post-site) for the channel.

<!-- theme: info -->
> #### Note 
> When you create a GraphQL Storefront API token, include the channel ID of the channel on which you wish to use the token. Otherwise, the server will reject your requests. See this article's section on [Creating a token](#creating-a-token).

### I want to run requests from a front-end application or browser. I only show anonymous information, or I do not support signing in as a customer

Use a normal GraphQL Storefront API token. You can use an anonymous `fetch` or `XHR` mode that does not send cookies along with the request. When creating your token, be sure to specify the origin from which your requests will be run in order to whitelist this origin for [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).


### I want to run requests from a server, and I don't need customer impersonation abilities

Use normal GraphQL Storefront API tokens. According to the [Principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege), you should not create a token that has permissions you do not need.


### I want to run requests from a server, and I need customer impersonation abilities

Use a Customer Impersonation token and store it securely on your server like other secrets. When you need to run requests in the context of a particular customer (for example, if they've logged in to your application), send their BigCommerce Customer ID along with the request as the `X-Bc-Customer-Id` header.

### I want a list of GraphQL error messages

For a list of GraphQL error messages, see [API Status Codes](/api-docs/getting-started/api-status-codes#graphql-api-http-status-codes).


## Related resources

### Tools
* [GraphQL Cheat Sheet](https://devhints.io/graphql)

