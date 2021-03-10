/**
 * playground_tabs.js - BigCommerce GraphQL Playground Query Tabs
 *
 * Used to pass all tabs or a specific tab to the GraphQL Playground
 *
 * Ex:
 *
 * var tabs = playgroundTabs("https://buybutton.store/graphql", "Bearer {token}");
 * tabs.get("customerDetails");
 * */

var paginateProductsQuery =
`# Get a few products from the catalog
# Stores in pre-launch or maintenance mode may reject queries.
# Access from Control Panel > Advanced Settings > Storefront API Playground
# or browse privately and query against https://buybutton.store/graphql
query paginateProducts(
  $pageSize: Int = 3
  $cursor: String
  # Use GraphQL variables to change the page size, or inject the endCursor as "cursor"
  # to go to the next page!
) {
  site {
    products (first: $pageSize, after:$cursor) {
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
}`

var categoryTreeQuery =
`# Explicitly fetch the first 3 levels of the category tree,
# and get a few fields on each category
# Stores in pre-launch or maintenance mode may reject queries.
# Access from Control Panel > Advanced Settings > Storefront API Playground
# or browse privately and query against https://buybutton.store/graphql
query CategoryTree3LevelsDeep {
  site {
    categoryTree {
      ...CategoryFields
      children {
        ...CategoryFields
        children {
          ...CategoryFields
        }
      }
    }
  }
}

fragment CategoryFields on CategoryTreeItem {
  name
  path
  entityId
}`

var lookUpUrlQuery =
`# Given a URL path, look it up to see if it matches a Product, Brand, or Category,
# and fetch details about that object
# Stores in pre-launch or maintenance mode may reject queries.
# Access from Control Panel > Advanced Settings > Storefront API Playground
# or browse privately and query against https://buybutton.store/graphql
query LookUpUrl(
  $urlPath: String!
  # Use GraphQL Query Variables to provide a path
) {
  site {
    route(path: $urlPath) {
      node {
        __typename
        id
        # A different response is returned based on which type of object was matched
        ... on Category {
          name
          description
        }
        ... on Brand {
          name
          defaultImage {
            url(width: 200)
          }
        }
        ... on Product {
          name
          description
          images {
            edges {
              node {
                url(width: 500, height: 500)
              }
            }
          }
        }
      }
    }
  }
}`

var singleProductQuery =
`# Fetch details about a product by its ID
# Stores in pre-launch or maintenance mode may reject queries.
# Access from Control Panel > Advanced Settings > Storefront API Playground
# or browse privately and query against https://buybutton.store/graphql
query productById(
  $productId: Int!
  # Use GraphQL Query Variables to inject your product ID
) {
  site {
    product(entityId: $productId) {
      id
      entityId
      name
      plainTextDescription
      defaultImage {
        ...ImageFields
      }
      images {
        edges {
          node {
            ...ImageFields
          }
        }
      }
      reviewSummary {
        summationOfRatings
        numberOfReviews
      }
      prices {
        price {
          ...MoneyFields
        }
        priceRange {
          min {
            ...MoneyFields
          }
          max {
            ...MoneyFields
          }
        }
        salePrice {
          ...MoneyFields
        }
        retailPrice {
          ...MoneyFields
        }
        saved {
          ...MoneyFields
        }
        bulkPricing {
          minimumQuantity
          maximumQuantity
          ... on BulkPricingFixedPriceDiscount {
            price
          }
          ... on BulkPricingPercentageDiscount {
            percentOff
          }
          ... on BulkPricingRelativePriceDiscount {
            priceAdjustment
          }
        }
      }
      brand {
        name
      }
    }
  }
}

fragment ImageFields on Image {
  url320wide: url(width: 320)
  url640wide: url(width: 640)
  url960wide: url(width: 960)
  url1280wide: url(width: 1280)
}

fragment MoneyFields on Money {
  value
  currencyCode
}
`

var singleVariantQuery =
`# Get a particular Product Variant by its SKU code
# This will return variant-level information where relevant,
# and the base product information otherwise
# Stores in pre-launch or maintenance mode may reject queries.
# Access from Control Panel > Advanced Settings > Storefront API Playground
# or browse privately and query against https://buybutton.store/graphql
query VariantById (
  $variantSku: String!
  # Use GraphQL Query Variables to inject your variant ID
) {
  site {
    product(sku: $variantSku) {
      name
      sku
      defaultImage {
        url(width: 500, height: 500)
      }
      prices {
        price {
          ...PriceFields
        }
        salePrice {
          ...PriceFields
        }
        retailPrice {
          ...PriceFields
        }
      }
      width {
        ...DimensionFields
      }
      height {
        ...DimensionFields
      }
      depth {
        ...DimensionFields
      }
    }
  }
}
fragment PriceFields on Money {
  value
  currencyCode
}
fragment DimensionFields on Measurement {
  value
  unit
}`

var extendedProductQuery =
`# Get extended information (options, variants) for several products with a list of IDs
# Stores in pre-launch or maintenance mode may reject queries.
# Access from Control Panel > Advanced Settings > Storefront API Playground
# or browse privately and query against https://buybutton.store/graphql
query ExtendedProductsById(
  $productIds: [Int!]
  # Use GraphQL Query Variables to inject your product IDs
) {
  site {
    products(entityIds: $productIds, first: 5) {
      edges {
        node {
          name
          variants(first: 25) {
            edges {
              node {
                sku
                defaultImage {
                  url(width: 1000)
                }
              }
            }
          }
          productOptions(first: 5) {
            edges {
              node {
                entityId
                displayName
                isRequired
                ... on CheckboxOption {
                  checkedByDefault
                }
                ... on MultipleChoiceOption {
                  values(first: 10) {
                    edges {
                      node {
                        entityId
                        label
                        isDefault
                        ... on SwatchOptionValue {
                          hexColors
                          imageUrl(width: 200)
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
  }
}
`

var refinedProductQuery =
`# Get a refined version of a product by applying some option selections to it,
# via their IDs.
# This will return an updated version of the product information with these selections
# factored in, which may affect the SKU, Prices, Image, or other details based on the
# catalog configuration of the store.
# Stores in pre-launch or maintenance mode may reject queries.
# Access from Control Panel > Advanced Settings > Storefront API Playground
# or browse privately and query against https://buybutton.store/graphql
query ProductsWithOptionSelections (
  $productId: Int!,
  $optionValueIds: [OptionValueId!]
  # Use GraphQL Query Variables to inject your product ID
  # and Option Value IDs
) {
  site {
    productWithSelectedOptions: product(
      entityId: $productId
      optionValueIds: $optionValueIds
    ) {
      ...ProductFields
    }
  }
}

fragment ProductFields on Product {
  name
  defaultImage {
    url(width: 1000)
  }
  sku
  availabilityV2 {
    status
  }
}`

var refinedProductQueryVariables =
`{
  "productId": 123,
  "optionValueIds": [
    {
      "optionEntityId": 4,
      "valueEntityId": 543
    },
    {
      "optionEntityId": 5,
      "valueEntityId": 443
    }
  ]
}`

var metafieldsQuery =
`# Access metafields attached to products, brands, categories, or variants
# Adjust this query with your metafield namespace and key(s) to access them
# Stores in pre-launch or maintenance mode may reject queries.
# Access from Control Panel > Advanced Settings > Storefront API Playground
# or browse privately and query against https://buybutton.store/graphql
query metafields {
  site {
    products(first: 3) {
      edges {
        cursor
        node {
          metafields(
            namespace: "my-namespace"
            keys: ["my-key", "my-other-key"]
            first: 2
          ) {
            edges {
              node {
                key
                id
                value
              }
            }
          }
          variants(first: 5) {
            edges {
              node {
                sku
                metafields(
                  namespace: "my-namespace"
                  keys: ["my-key", "my-other-key"]
                  first: 2
                ) {
                  edges {
                    node {
                      key
                      id
                      value
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
}`

var loginMutation =
`# Log in a customer using email and password
#
# If this is being used in a browser, a cookie will be set
# to authenticate future requests
#
# Otherwise, the success message can be used to determine
# that the credentials are valid
#
# Chrome incognito and Safari by default block cross-origin
# requests containing third-party cookies; this causes
# subsequent customer queries from the playground to fail.
#
# Credentials should ALWAYS be passed as GraphQL Variables
# Stores in pre-launch or maintenance mode may reject queries.
# Access from Control Panel > Advanced Settings > Storefront API Playground
mutation Login($email: String!, $pass: String!) {
  login(email: $email, password: $pass) {
    result
  }
}`;

var loginMutationVariables = `{"email": "email@goes.here", "pass": "password"}`;

var playgroundTabs = function(endpoint, authHeader){
    var predefined = {
        firstThreeProducts: {
            name: "Paginate products",
            endpoint: endpoint,
            query: paginateProductsQuery,
            headers: {
                Authorization: authHeader
            },
        },
        categoryTree: {
            name: "Category Tree",
            endpoint: endpoint,
            query: categoryTreeQuery,
            headers: {
                Authorization: authHeader
            },
        },
        objectsByUrl: {
            name: "Objects by URL",
            endpoint: endpoint,
            query: lookUpUrlQuery,
            variables: '{"urlPath": "/shop-all"}',
            headers: {
                Authorization: authHeader
            },
        },
        singleProduct: {
            name: "Single Product",
            endpoint: endpoint,
            query: singleProductQuery,
            variables: '{"productId": 123}',
            headers: {
                Authorization: authHeader
            },
        },
        variantDetails: {
            name: "Single Variant",
            endpoint: endpoint,
            query: singleVariantQuery,
            variables: '{"variantSku": "abc123"}',
            headers: {
                Authorization: authHeader
            },
        },
        extendedProduct: {
            name: "Options & Variants",
            endpoint: endpoint,
            query: extendedProductQuery,
            variables: '{"productIds": [1,2,3]}',
            headers: {
                Authorization: authHeader
            },
        },
        refinedProduct: {
            name: "Product w/ Option Selections",
            endpoint: endpoint,
            query: refinedProductQuery,
            variables: refinedProductQueryVariables,
            headers: {
                Authorization: authHeader
            },
        },
        metafields: {
            name: "Metafields",
            endpoint: endpoint,
            query: metafieldsQuery,
            headers: {
                Authorization: authHeader
            },
        },
        login: {
            name: "Login",
            endpoint: endpoint,
            query: loginMutation,
            variables: loginMutationVariables,
            headers: {
                Authorization: authHeader
            },
        },
    };

    var get = function(key) {
        if (key.toLowerCase() === "all") {
           return  Object.values(predefined);
        }

        if (key === undefined) {
            return predefined.slice(0,3)
        }

        return (key in predefined ? [predefined[key]] : []);
    }

    return {
        get: get
    };
}
