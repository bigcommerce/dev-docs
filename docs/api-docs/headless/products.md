# Working with Products



This section demonstrates how to use BigCommerce's GraphQL Storefront API and REST Products API to query and manage product data for headless storefronts.

## Retrieving product data

BigCommerce's [GraphQL Storefront API](/api-reference/graphql/graphql) makes it possible to query storefront data from a remote site. By leveraging the power of GraphQL, you can access product information for any product from any page.

The following example demonstrates how to fetch product data using the GraphQL Storefront API. It relies on the [GraphQL Cursor Connections Specification model](https://relay.dev/graphql/connections.htm) to handle pagination.

**Product Listing Page query example**

```graphql
function getProductInfo(params) {
    const storeUrl = new URL(params.store_url);

    // Use the store's canonical URL which should always resolve
    const graphQLUrl = `${storeUrl.origin}/graphql`;

    // Set up GraphQL query
    const graphQLQuery = `
        query productListing {
            site {
                products {
                    pageInfo {
                        startCursor
                        endCursor
                        }
                    edges {
                        cursor
                        node {
                            id
                            entityId
                            name
                            sku
                            description
                            prices {
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

    // Fetch data from the GraphQL Storefront API
    return fetch(graphQLUrl, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${params.token}`},
            body: JSON.stringify({ query: graphQLQuery}),
        })
        .then(res => res.json())
        .then(res => res.data);
    }

    // Set up default params
    let params = {
        store_url: null,
        token: null
    };
```
Following the same API fetching logic, you can retrieve data for a single product.

**Product Details Page query example**

```graphql
query SingleProduct {
  site {
    product (entityId: ${params.id}) {
      id
      entityId
      name
      sku
      description
      prices {
        price {
          value
          currencyCode
        }
      }
    }
  }
}
```

<!-- theme: info -->
> #### Note
> We recommend using the GraphQL Storefront API to query the product data. It lets you specify the information needed from the server and retrieve multiple resources in a single call. For example, using the GraphQL Storefront API, you can fetch product pricing, options, and variations in a single request, improving performance and minimizing the need for subsequent API calls.


## Managing products

The GraphQL Storefront API provides read-only data and cannot be used to manipulate products at this time. You will need to use BigCommerce's REST [Products API](/api-reference/store-management/catalog/products/) to manage products data. 

To update products in batches, send a `PUT` request to the [Update Products (Batch)](/api-reference/store-management/catalog/products/updateproducts) endpoint. 

```http
PUT https://api.bigcommerce.com/stores/{store_hash}/v3/catalog/products
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}

[
  {
    "id": 77,
    "name": "Fog Linen Chambray Towel - Beige Stripe",
    "inventory_level": 11,
    "price": 55.97
  },
  {
    "id": 80,
    "name": "Orbit Terrarium - Large",
    "inventory_level": 15,
    "price": 100.99
  }
]
```

<!-- [![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/store-management/catalog/products/updateproducts#requestrunner) -->

To update a single product, send a `PUT` request to the [Update a Product](/api-reference/store-management/catalog/products/updateproduct) endpoint.

```http
PUT https://api.bigcommerce.com/stores/{store_hash}/v3/catalog/products/{product_id}
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}

{
    "name": "Fog Linen Chambray Towel - Beige Stripe",
    "inventory_level": 10,
    "price": 55.97
}
```

<!-- [![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/store-management/catalog/products/updateproduct#requestrunner) -->

### Cache the catalog

It is best practice to cache product details in a database to improve performance and increase operational efficiency. Caching product information will allow you to implement search functionality and control the information displayed to the customers.
 
## Next step

- [Learn how to create a cart](/api-docs/storefronts/guide/carts)

## Resources

- [Catalog API Overview](/api-docs/store-management/catalog/catalog-overview)
