# GraphQL Storefront API Overview

<div class="otp" id="no-index">

### On this Page

- [See it in Action](#see-it-in-action)
- [Accessing the GraphQL Playground](#accessing-the-graphql-playground)
- [Using the GraphQL Playground](#using-the-graphql-playground)
- [Authentication](#authentication)
- [Querying Within a BigCommerce Storefront](#querying-within-a-bigcommerce-storefront)
- [Querying From External Systems](#querying-from-external-systems)
- [Pagination](#pagination)
- [Complexity Limits](#complexity-limits)
- [Resources](#resources)

</div>

BigCommerce's GraphQL Storefront API makes it possible to query storefront data from within a [Stencil](https://developer.bigcommerce.com/stencil-docs/getting-started/about-stencil) theme or remote site. This means information previously only available on the back-end via [Stencil's template logic](https://developer.bigcommerce.com/stencil-docs/reference-docs/global-objects-and-properties) can now be accessed via front-end javascript. For example, with the Storefront API, it is possible to:

* Access product options, variations, and custom fields for any product from any page
* Request any product's images at any resolution
* Ask for customer details such as name, email address, and attributes (if logged in)
* Look up objects (e.g. categories or brands) by URL, and fetch their details
* Build front-end applications on top of a BigCommerce [Stencil](https://developer.bigcommerce.com/stencil-docs/getting-started/about-stencil) theme or on a remote site

Additionally, by leveraging the power of [GraphQL](https://graphql.org/), data for multiple resources can be returned from a single API call, which simplifies integration and increases performance so that developers can focus on building delightful shopper experiences.

This article is a general overview of the capabilities and usage of BigCommerce's GraphQL Storefront API; it includes sections on authentication and how to access a store's GraphQL Playground. To see specific examples of how GraphQL can be used to query storefront data, see [GraphQL Storefront API Code Samples](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-samples).

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Note

> * GraphQL Storefront API is in open beta
> * As new features are added to the API, they will be called out in our [Developer Changelog](https://developer.bigcommerce.com/changelog#labels/storefront-api)
> * BigCommerce legacy Blueprint themes currently do not support the GraphQL API and Playground

</div>
</div>
</div>

<a id="see-it-in-action" class="devdocsAnchor"></a>

## See it in Action

To see the GraphQL Storefront API in action, checkout the [Bootstrap + Vanilla JS Storefront API Example](https://bigcommerce.github.io/storefront-api-examples/html-bootstrap-vanillajs/) hosted on GitHub. This example shows how a static HTML site can be used to render dynamic product information via the GraphQL Storefront API.

Open the link and click submit with the sample data in the form. To see the example page with your store's data, [create a Storefront API Token](https://developer.bigcommerce.com/api-reference/storefront/graphql-api-tokens/api-token/createtoken) against your store and paste the token into the example form (be sure to create a token valid for this origin: `https://bigcommerce.github.io`).

For a full list of examples, see the [Storefront API Examples repo](https://github.com/bigcommerce/storefront-api-examples).

<a id="accessing-the-graphql-playground" class="devdocsAnchor"></a>

## Accessing the GraphQL Playground

To access the GraphQL Storefront API Playground and documentation:

* Login to a BigCommerce store
* Navigate to **Advanced Settings** > **Storefront API Playground**

The GraphQL Storefront API Playground will be opened:

![GraphQL Storefront API Playground](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/graphql-storefront-api-playground.png "GraphQL Storefront API Playground")

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: info -->

### Note

> * GraphQL Playground is a GraphQL IDE built on Electron. For more information, see [GraphQL Playground](https://electronjs.org/apps/graphql-playground) on [electrongjs.org](https://electronjs.org)

> * If the **Storefront API Playground** link is not visible, the store may not be using a Stencil theme. Apply a Stencil theme to use the Storefront GraphQL API.

</div> 
</div>
</div>

<a id="using-the-graphql-playground" class="devdocsAnchor"></a>

## Using the GraphQL Playground

To use the request runner, input queries on the left side and then click the play button. Query results will be displayed on the the right side:

![GraphQL Playground Query](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/graphql-storefront-api-playground2.png "GraphQL Playground Query")

Here's a sample Query to get you started:

```javascript
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

To explore the storefront GraphQL schema, checkout the Docs and Schema tabs on the right:

![GraphQL Playground Docs](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/graphql-playground-docs.png "GraphQL Playground Docs")

<a id="authentication" class="devdocsAnchor"></a>

## Authentication

GraphQL Storefront API requests are authenticated with tokens sent via the HTTP `Authorization` header:

```bash
curl 'https://{bigcommerce_storefront_domain}.com/graphql'\
  # ...
  -H 'Authorization: Bearer {token}'\
  # ...
```

### Creating a Token

JWT tokens for authenticating cross-origin requests to the Storefront API can be created using the [Storefront API Token endpoint](https://developer.bigcommerce.com/api-reference/storefront/graphql-api-tokens/api-token/createtoken):

**`POST`** `https://api.bigcommerce.com/stores/{store_hash}/v3/storefront/api-token`

```javascript
{
  "channel_id": 1,            // int (must be a valid channel ID on the store)
  "expires_at": 1602288000,   // double utc unix timestamp (required)
  "allowed_cors_origins": [   // array (accepts 1 origin currently)
    "https://example.com"
  ]  
}
```

**Response:**

```json
{
  "token":"...eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9...",
  "meta": {
    // ...
  }
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
<!-- theme: warning -->

### Authenticating with an auto-generated Stencil Token
Client code in BigCommerce Stencil themes can be passed a token at render time with the `{{settings.storefront_api.token}}` Handlebars object:

```html
<script>
fetch('/graphql', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer {{settings.storefront_api.token}}'
       },
       body: JSON.stringify({
           query: `
            query MyFirstQuery {...}
  `
// ...
</script>
```

### Note
> * `1` can be passed in for the `channel_id` for generating tokens for use on the default Stencil storefront.
> * To create a channel for a remote site, see [Create Channel].(https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel) in the API Reference.
> * `allowed_cors_origins` array accepts only a single origin currently -- one token must be generated for each origin.
> * `/storefront/api-token` endpoint requires the `Manage` `Storefront API Tokens` OAuth Scope.
> * `storefront/api-token-customer-impersonation` endpoint requires the `Manage` `Storefront API Customer Impersonation Tokens` OAuth Scope.

</div> 
</div>
</div>

### Customer Impersonation Tokens

It's also possible to generate tokens for use in server-to-server interactions with a trusted consumer by POSTing to the [API Token Customer Impersonation Endpoint](https://developer.bigcommerce.com/api-reference/storefront/graphql-api-tokens/api-token-customer-impersonation/createtokenwithcustomerimpersonation):


**`POST`** `https://api.bigcommerce.com/stores/{store_id}/v3/storefront/api-token-customer-impersonation`

```json
{
  "channel_id": 1,
  "expires_at": 1602288000
}
```

**Response**:

```json
{
  "data":
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
  "meta": {}
}
```

Customer Impersonation Token authenticated requests made to the GraphQL API receive store information from the perspective of the customer corresponding to the customer ID specified in the `X-Bc-Customer-Id` header sent with the GraphQL POST request -- for example: pricing, product availability, customer account, and customer details will be reflected.

Customer Impersonation Tokens should **never** be exposed publicly (e.g. to JavaScript or HTML), and should not be used for frontend requests. Unlike normal GraphQL Storefront API tokens, they are sensitive and should be treated like secrets, just as you might treat an OAuth token for BigCommerce's administrative APIs. Attempts to run requests using these tokens from a web browser will be rejected.

Consider this sample request using a Customer Impersonation token to run a request in the context of customer ID `123`:


```
curl 'https://store.com/graphql' -H 'Authorization: Bearer TOKEN_GOES_HERE' -H 'X-Bc-Customer-Id: 123' --data-binary '{"query":"query CustomerInformation {\n  customer {\n    firstName\n    lastName\n    email\n  }\n}"}'
```


<a id="querying-within-a-bigcommerce-storefront" class="devdocsAnchor"></a>

## Querying Within a BigCommerce Storefront

GraphQL Storefront API calls can be made directly from within a Stencil theme or from a script in [Storefront > Script Manager](https://support.bigcommerce.com/s/article/Using-Script-Manager).

Here's an an example request using the  `{{settings.storefront_api.token}}` handlebars object and [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API):

```html
<script>
   fetch('/graphql', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer {{ settings.storefront_api.token }}'
       },
       body: JSON.stringify({
           query: `
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
            `
       }),
   })
   .then(res => res.json())
   .then(json => console.log(json));
</script>
```

In addition to using `fetch()`, there's a other ways to query the API:
* **Using [Apollo Client](https://www.apollographql.com/docs/react/)** - Apollo is a popular GraphQL client that's easy to use in BigCommerce themes. For a a quick example of adding Apollo Client to cornerstone, checkout this [Cornerstone commit](https://github.com/bigcommerce/cornerstone/commit/508feeb1b00d2bb2940771e5e91250a08b6be4d9) on GitHub.
* **Using any GraphQL Client** - GraphQL is a standard with client libraries in many languages, so feel free to explore your options. The focus of the beta is on using the API from frontend JavaScript within Stencil; however, in the future, the API will also be opened up for server-to-server requests.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: info -->

### Note

> * If pasted directly into a script in [**Storefront** > **Script Manager**](https://support.bigcommerce.com/s/article/Using-Script-Manager), the output from `console.log(json)` will be viewable in the browser's Javascript Console.
> * The above code must be used in a place where the `{{settings.storefront_api.token}}` handlebars variable can be accessed in order to get credentials for the API request.

</div>
</div>
</div>

<a id="querying-from-external-systems" class="devdocsAnchor"></a>

## Querying From External Systems

If you wish to use the GraphQL Storefront API from an external system, there are a few considerations:

- Which Channel do you wish to run requests in the context of?
- Are you running requests from a server or a frontend application/browser?

- If you are running requests from a frontend application, do you need to show customer-specific information or only anonymous information?

- If you are running requests from a server, do you need the ability to impersonate customers?

As a best practice, you should create tokens that expire and rotate them regularly before their expiry. However, you are also permitted to create long-lived tokens.

#### I want to run requests in the context of the store's default channel (Channel ID 1)

You have two options for public URLs you can use to run requests:


- The store's default storefront URL, e.g. `https://store.com/graphql`
- The store's permanent URL, e.g. `https://store-STOREHASH.mybigcommerce.com/graphql`

#### I want to run requests from the perspective of another Channel

In this case, you should use the Channel's Permanent URL instead, of the form  `https://store-STOREHASH-CHANNELID.mybigcommerce.com/graphql`.

For example, if your store hash is `abc123` and your channel ID is `456`, the correct URL would be `https://store-abc123-456.mybigcommerce.com/graphql`.


Note that you must create your Storefront API Token with the same channel ID, or your request will be rejected.

In order for the Channel's Permanent URL to be available, you must [create a Site](https://developer.bigcommerce.com/api-reference/cart-checkout/sites-routes-api/sites/post-site) for the channel.

#### I want to run requests from a frontend application or browser (e.g. React app), and I only show anonymous information/I do not support logging in as a customer

Use a normal Storefront API Token. You can use an anonymous `fetch` or `XHR` mode that does not send cookies along with the request. When creating your token, be sure to specify the origin from which your requests will be run in order to whitelist this origin for [CORS.](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)


#### I want to run requests from a frontend application or browser (e.g. React app), and I wish to support logging in directly from that frontend application

Use a normal Storefront API Token and make your requests [with credentials (cookies) included.](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Requests_with_credentials) When creating your token, be sure to specify the origin from which your requests will be run, in order to whitelist this origin for [CORS.](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)


By default, users will be assumed to be guest shoppers and receive anonymous information in response to GraphQL requests. If you use the Customer Login GraphQL mutation, a cookie will be set as a response to a successful login, and future GraphQL requests will return customer-specific information as long as that cookie is sent with the request.

#### I want to run requests from a server and I don't need customer impersonation abilities

You should use normal Storefront API Tokens, as according to the [Principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) you should not create a token that has permissions you do not need.

#### I want to run requests from a server and I need customer impersonation abilities

You should use a Customer Impersonation Storefront API Token, and store it securely on your server like other secrets. When you need to run requests in the context of a particular Customer (for example, if they've logged in to your application), send their BigCommerce Customer ID along with the request as the `X-Bc-Customer-Id` header.

<a id="complexity-limits" class="devdocsAnchor"></a>

## Pagination

The GraphQL Storefront API follows the [GraphQL Cursor Connections Specification](https://facebook.github.io/relay/graphql/connections.htm) (facebook.github.io) for pagination. If this is your first time working with GraphQL pagination, see [Apollo's Blog Post "Explaining GraphQL Connections"](https://blog.apollographql.com/explaining-graphql-connections-c48b7c3d6976) for an accessible introduction. If you've worked with other GraphQL APIs, pagination on BigCommerce should look familiar.

To demonstrate, here's a query for a store's first three products (notice `first: 3` passed to `products`):

```js
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

You can run this query against an example storefront using the [GraphQL Playground](https://developer.bigcommerce.com/graphql-playground?tabs=firstThreeProducts)

The results will look something like this:

```json
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

```js
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

```json
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

This same approach can be used to *slice* any GraphQL connection and paginate through the *slices* via `startCursor` and `endCursor`. For example, we could get the first thirty brands with the following query: 

```javascript
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

```json
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
```

the next thirty could be retrieved by making a new query and passing in the `endCursor` from the first page of results: 

```js
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

## Complexity Limits

The GraphQL Storefront API uses an algorithm to calculate a complexity score for queries made against the API. Queries that exceed the complexity score will receive an error response:

```json
{
  "error": {
    "error": "The query is too complex as it has a complexity score of 1223 out of 1000. Please remove some elements and try again"
  }
}
```

The complexity limit error is usually caused by queries for a large quantity of deeply nested objects, for example, this query for first 50 products and their prices, variants, options, and option values: 

```js
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

```js
query {
  site {
    products(first:10) { // <--- reducing quantity requested reduces complexity score
      // ...
```

In general, to reduce complexity, reduce the number of objects requested: 
* limit collections to a smaller page size (for example `first:10` instead of `first:50`)
* reduce the number of items in nested collections
* request less fields

## Resources

### Examples
* [Bootstrap + Vanilla JS Storefront API Example](https://bigcommerce.github.io/storefront-api-examples/html-bootstrap-vanillajs/) (bigcommerce.github.io)
* [All BigCommerce Storefront API Examples](https://github.com/bigcommerce/storefront-api-examples) (github.com)

### Pull Requests
* [Simple GraphQL Example Using Apollo Client with Cornerstone](https://github.com/bigcommerce/cornerstone/compare/graphQL-example)

### Additional Resources
* [GraphQL Cheat Sheet](https://devhints.io/graphql) (devhints.io)
* [GraphQL IDE](https://github.com/andev-software/graphql-ide) (github.com)
* [GraphQL Playground](https://www.npmjs.com/package/graphql-playground-react) (npmjs.com)
