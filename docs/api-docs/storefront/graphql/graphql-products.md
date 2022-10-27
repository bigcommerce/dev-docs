# Products with the GraphQL Storefront API

BigCommerce's GraphQL Storefront API lets merchants on headless storefronts retrieve products powered by results from our back-end search engine. These built-in capabilities also allow Stencil developers to customize...

The GraphQL Storefront API lets you retrieve the following product features:
- 
-

This page walks you through how to ... for products without variants. For products with variants, see [Variants](/...)instead. See the [GraphQL Storefront Playground](https://developer.bigcommerce.com/graphql-playground) for full schema documentation.


## Product Info

Queries return all products in a store, regardless of storefront. Thus, even if you don't allow purchasing on the storefont, the product is still returned. 

Prod visibility for product needs to be "visible on storefront" to be returned (else get `null`).
However, product still returned even if purchasability is "not purchasable" on product page. 
If category (that product is in) is not "visible", product still shows up.
For Non-MSF stores, only products in categories that are available to "default GUEST customer groups" returned. => what if you login as a customer???

### Basic info

If your product has variants, see [Get variant basic info](/...) to retrieve variant info.

Don't need to check "Show condition on SF" to be able to see condition field 

<!--
type: tab
title: Query
-->

```graphql title="Example" lineNumbers
query {
  site {
    product (entityId: 111) {
        id
        entityId
        sku
        path
        name
        description
        warranty
        minPurchaseQuantity
        maxPurchaseQuantity
        addToCartUrl
        type
        upc
        mpn
        gtin
        condition  
      }
    }
  }
```

<!--
type: tab
title: Response
-->

```json title="Example" lineNumbers
{
  "data": {
    "site": {
      "product": {
        "id": "UHJvZHVjdDoxMTE=",
        "entityId": 111,
        "sku": "SM13",
        "path": "/smith-journal-13/",
        "name": "[Sample] Smith Journal 13",
        "description": "<p>143 Pages</p>",
        "warranty": "example warranty information",
        "minPurchaseQuantity": 1,
        "maxPurchaseQuantity": 10,
        "addToCartUrl": "https://heavens-gate.mybigcommerce.com/cart.php?action=add&product_id=111",
        "type": "Physical",
        "upc": "123456",
        "mpn": "example MPN",
        "gtin": "99999999",
        "condition": "REFURBISHED"
      }
    }
  }
}
```
<!-- type: tab-end -->

### Prices and dimensions

You can get prices and dimensions for a product. 
If your product has variants, see [Get variant prices and dimensions](/...) instead.

If Product values empty (except for required Weight): null

<!--
type: tab
title: Query
-->

```graphql title="Example" lineNumbers
query {
  site {
    product (entityId: 111) {
          prices(currencyCode: USD) {
            price {
                ...PriceFields
            }
            salePrice {
                ...PriceFields
            }
            basePrice {
                ...PriceFields
            }
            retailPrice {
                ...PriceFields
            }
          }
          weight {
                ...DimensionFields
          }
          height {
                ...DimensionFields
          }
          width {
                ...DimensionFields
          }
          depth {
                ...DimensionFields
          }
      }
    }
  }

fragment PriceFields on Money {
    currencyCode
    value
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
{
  "data": {
    "site": {
      "product": {
        "prices": {
          "price": {
            "currencyCode": "USD",
            "value": 5
          },
          "salePrice": {
            "currencyCode": "USD",
            "value": 5
          },
          "basePrice": {
            "currencyCode": "USD",
            "value": 25
          },
          "retailPrice": {
            "currencyCode": "USD",
            "value": 200
          }
        },
        "weight": {
          "value": 4000,
          "unit": "oz"
        },
        "height": {
          "value": 4,
          "unit": "in"
        },
        "width": {
          "value": 4,
          "unit": "in"
        },
        "depth": {
          "value": 4,
          "unit": "in"
        }
      }
    }
  }
}
```
<!-- type: tab-end -->

## Product options 

If your product has variants, use [Get variant product options](/...) to retrieve variant options.

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

If your product has variants, use [Get variant images](/...) instead.

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

If your product has variants, see [Get variant metafields](/...) to retrieve variant metafields.

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

## Custom fields

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

## Gift wrapping options

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

## Reviews

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

## Related Products

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