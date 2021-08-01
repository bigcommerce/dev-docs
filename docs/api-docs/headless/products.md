# Rendering Products

<div class="otp" id="no-index">

### On this page
- [Retrieving product data](#retrieving-product-data)
- [Managing product data](#managing-product-data)
- [Next steps](#next-steps)
- [Resources](#resources)

</div>

This section demonstrates how to use BigCommerce's GraphQL Storefront API and REST Products API to query and manage product data for headless storefronts.

## Retrieving product data

BigCommerce's [GraphQL Storefront API](https://developer.bigcommerce.com/api-reference/storefront/graphql) makes it possible to query storefront data from a remote site. By leveraging the power of GraphQL, you can access product information for any product from any page.

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
    products (entityIds: ${props.id}) {
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

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> We recommend using the GraphQL Storefront API to consume the product data as it can retrieve pricing and other product-related information in a single call and orchestrate an aggregated response.

</div>
</div>
</div>

## Managing product data

The GraphQL Storefront API provides read-only data as seen by shoppers on storefronts. You can manage products data using the BigCommerce's [Products API](https://developer.bigcommerce.com/api-reference/store-management/catalog/products/). To retrieve the complete list of products, send a `GET` request to [`/v3/catalog/products`](https://developer.bigcommerce.com/api-reference/store-management/catalog/products/getproducts). If you need to influence the response, optional query string parameters can be passed with the request.

```http
GET https://api.bigcommerce.com/stores/{store_hash}/v3/catalog/products
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/catalog/products/getproducts#requestrunner)

### Cache the catalog

It is best practice to cache product details in a database to improve performance and increase operational efficiency. Caching product information will allow you to implement search functionality and enable you to control the information displayed to the customers.
 
## Next steps

- [Learn how to create carts headlessly](https://developer.bigcommerce.com/api-docs/storefronts/guide/developers-guide-headless/carts)

## Resources

- [Catalog API Overview](https://developer.bigcommerce.com/api-docs/store-management/catalog/catalog-overview)