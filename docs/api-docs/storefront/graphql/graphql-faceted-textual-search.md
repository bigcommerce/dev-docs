# Using Storefront GraphQL's Faceted and Textual Search

With Storefront GraphQL's Faceted and Textual Search, you can ...

This can be done using the `SearchProducts` field. 

This page walks you through how to query products and facets. See [GraphQL Playground](/graphql-playground) for full schema documentation.  

## How to Filter for Products and Facets

At least one filter must be specified in the argument for `SearchProducts`. You may filter by price, rating, among other features and attributes of products: 

```GraphQL title=Filters for Products and Facets" lineNumbers
...
  searchProducts(
  filters: {
    searchTerm: "Sample"
    price:{
      minPrice:11,
      maxPrice:200
    },
    rating:{
      minRating:3,
      maxRating:5
    },
    categoryEntityId:24,
    searchSubCategories:false,
    categoryEntityIds:[23],
    brandEntityIds:[35],
    productAttributes:[
      {
        attribute:"Color",
        values:["Black"]
      }
    ],
    isFreeShipping:true,
    isFeatured:true,
    isInStock:true
  }
  ... 
) { 
...
```
These filters affect **both** the products and facets that are returned. For example, filtering by rating returns only products that are within the specified rating range, as well as only facets that have products within the rating range. 

See [GraphQL Playground](/graphql-playground) for descriptions of each filter. 

## How to Get Products


## How to Get Facets

## Putting it all Together

## Related Resources
