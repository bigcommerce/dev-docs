# Variants with the GraphQL Storefront API


## Get a variant

In the following cases, you can query a variant by using the `variants` field and specifying a product identifier, for example, the variant `entityId` or `optionValueId`.

<!--
type: tab
title: Variant entity ID
-->


```graphql title="How to get a variant" lineNumbers
query {
  site {
    product (entityId: 113) {           #This is the product ID 
      variants (entityIds: [98]) {      #This is the variant ID
        ...
      }
    }
  }
}
```

<!--
type: tab
title: Option value ID
-->

```graphql title="How to get a variant" lineNumbers
query {
  site {
    product (entityId: 113) {
      variants (
        optionValueIds: [
          { optionEntityId: 116, valueEntityId: 108 }
          { optionEntityId: 126, valueEntityId: 129 }
        ]
      ) {
        ...
      }
    }
  }
}
```

<!-- type: tab-end -->

You can also query a variant by using the `products` field and specifying a variant identifier, for example, the variant's entity ID or the variant's option value IDs:

<!--
type: tab
title: Variant entity ID
-->


```graphql title="How to get a variant" lineNumbers
query {
  site {
    product(variantEntityId: 27098) {
      ...  
    }
  }
}
```

<!--
type: tab
title: Option value ID
-->

```graphql title="How to get a variant" lineNumbers
query {
  site {
    product(
      entityId: 113 # This is the product ID
      optionValueIds: [
        { optionEntityId: 116, valueEntityId: 108 }
        { optionEntityId: 126, valueEntityId: 129 }
      ]
    ) {
      ...
    }
  }
}

```

<!-- type: tab-end -->

Using the `products` field with a variant identifier returns variant information overlaid on the Product object. For example, if the variant has a different image, dimensions, SKU, or price, than the product,the variant's info will be returned. This allows you to directly query a variant.

## Variant Info

### Basic info

<!--
type: tab
title: Query
-->

```graphql title="Example" lineNumbers
```

<!--
type: tab
title: Response
-->

```json title="Example" lineNumbers
```
<!-- type: tab-end -->

### Prices and dimensions

<!--
type: tab
title: Query
-->

```graphql title="Example" lineNumbers
query {
  site {
    product (entityId: 113) {
      variants (entityIds: [98]) {
        edges {
          node {
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
}
```

<!--
type: tab
title: Response
-->

```json title="Example" lineNumbers
```
<!-- type: tab-end -->

## Variant options

<!--
type: tab
title: Query
-->

```graphql title="Example" lineNumbers
```

<!--
type: tab
title: Response
-->

```json title="Example" lineNumbers
```
<!-- type: tab-end -->

## Images

<!--
type: tab
title: Query
-->

```graphql title="Example" lineNumbers
```

<!--
type: tab
title: Response
-->

```json title="Example" lineNumbers
```
<!-- type: tab-end -->

## Metafields

<!--
type: tab
title: Query
-->

```graphql title="Example" lineNumbers
```

<!--
type: tab
title: Response
-->

```json title="Example" lineNumbers
```
<!-- type: tab-end -->

## Resources