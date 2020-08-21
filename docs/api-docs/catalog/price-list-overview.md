# Price List API
<div class="otp" id="no-index">
	<h3> On this page </h3>
	<ul>
        <li><a href="#what-is-a-price-list?">What is a Price List?</a></li>
        <li><a href="#price-list-definitions">Price List definitions</a></li>
        <li><a href="#price-list-assignments">Price List Assignments</a></li>


        <li><a href="#price-list-notes">Price List notes</a></li>
        <li><a href="#price-list-resources">Price List resources</a></li>
	</ul>
</div>

## What is a Price List?

A Price List allows you to populate different versions of catalog pricing and assign them to different [Customer Groups](/api-reference/customer-subscribers/customers-api). The prices are specified exclusively at the variant level.

If an active Price List does not contain prices for a variant, then the Catalog pricing will be used. You can associate a Price List to a Customer Group via the Control Panel or the [Customer Groups API.](/api-reference/customer-subscribers/customers-api)

Price Lists will provide overridden price values to the Stencil storefront. You can further customize the final price display within the Stencil template. For more information, see the [Theme Objects](https://developer.bigcommerce.com/stencil-docs/reference-docs/global-objects-and-properties).


### OAuth scopes
The following OAuth Scopes are required:
* [Products](/api-docs/getting-started/basics/authentication#authentication_oauth-scopes)

## Price List definitions

- **Price List:** a collection of price records; price records make up a price list.



- `Price Record` --  A price override for a particular variant - minimally, a variant ID, price, and currency.

```json
	{
		"variant_id": 3121,
		"price": 10.0,
		"sale_price": 8.0,
		"retail_price": 12.0,
		"map_price": 6.0,
		"currency": "EUR"
	}
```


- `PriceRecordBatch` -- A way to update several price records in a `Price List` at once. Using this bulk upsert endpoint, you can upsert up to 1000 price records in a single API call.


- `Currency` --  A `Price List` can contain records for multiple currencies. *Only price records that match the store's default currency determine storefront and in-cart prices.* Although BigCommerce supports a storefront currency selection, this is not currently integrated with Price Lists and will merely convert prices from the store's default currency for display convenience.

<!--
title: "Example Price List"
subtitle: ""
lineNumbers: true
-->

**Example Get all Price Lists**
`/GET https://api.bigcommerce.com/stores/{store_hash}/v3/pricelists`

```json
[{
  "variant_id": 3121,
  "price": 10.0,
  "sale_price": 8.0,
  "retail_price": 12.0,
  "map_price": 6.0,
  "currency": "USD"
}, {
  "variant_id": 3255,
  "price": 11.0,
  "sale_price": 9.0,
  "retail_price": 13.0,
  "map_price": 7.0,
  "currency": "USD"
}, {
  "variant_id": 3256,
  "price": 12.0,
  "sale_price": 10.0,
  "retail_price": 14.0,
  "map_price": 8.0,
  "currency": "USD"
}, {
  "variant_id": 3257,
  "price": 13.0,
  "sale_price": 11.0,
  "retail_price": 15.0,
  "map_price": 9.0,
  "currency": "USD"
}, {
  "variant_id": 3258,
  "price": 14.0,
  "sale_price": 12.0,
  "retail_price": 16.0,
  "map_price": 10.0,
  "currency": "USD"
}]
```

<!--
title: "Example Price List assigned to a customer group"
subtitle: ""
lineNumbers: true
-->

**Example Price List assigned to a customer group**
`https://api.bigcommerce.com/stores/{store_hash}/v2/customer_groups/{customer_group_id}`

```json
[

    {
        "id": 1,
        "name": "Price List Test",
        "is_default": false,
        "category_access": {
            "type": "all"
        },
        "discount_rules": [
            {
                "type": "price_list",
                "price_list_id": 1
            }
        ]
    }
]
```

Under `discount_rules` the `type` is set to `price_list` and the `price_list_id` is 1. Which is the id of the price list the group has been assigned to.

## Price List Assignments
Price List Assignment assigns a Price List to a specific sales Channel. This association lets you define custom pricing for shoppers only on a specific external site or platform. Price List Assignments combined with a Customer Group assignment allows you to target specifically more logged in customers shopping on that channel.


See [Channels, Sites, and Routes](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api) for further documentation.

**Example Price List assigned to channel**
`https://api.bigcommerce.com/stores/{store_hash}/v2/pricelists/assignments`

```js
{
  "customer_group_id": 3,
  "price_list_id": 2,
  "channel_id": 1
}

```


## Price List notes

- Bulk Pricing Tiers may additionally be associated with a Price Record to indicate different pricing as the quantity in cart increases.

- If a variant has a `Price Record`, any existing product-level bulk pricing will not apply in the cart.  For variants without `Price Records`, any existing product bulk pricing will apply.

- `Price Lists Records` accepts bulk upsert. You can only do one [Bulk upsert](https://developer.bigcommerce.com/api-reference/catalog/pricelists-api/price-lists-records/setpricelistrecordcollection) at a time. Running more than one in parallel on the **same store** will cause a 429 error, and the request will fail.


## Price List resources

### Related endpoints
* [Get Price List Collection](/api-reference/catalog/pricelists-api/price-lists/getpricelistcollection)

### Webhooks available

There are no direct webhooks available for Price Lists. Since Price Lists directly relate to products, webhooks related to products will fire for corresponding changes such as pricing.

* [Products](/api-docs/getting-started/webhooks/webhook-events#webhook-events_products)
* [SKU](/api-docs/getting-started/webhooks/webhook-events#webhook-events_sku)
