# Price List API
<div class="otp" id="no-index">
	
### On this page
- [What is a price list?](#what-is-a-price-list)

- [Price list definitions](#price-list-definitions)
- [Price list assignments](#price-list-assignments)
- [Price list notes](#price-list-notes)      
- [Price list resources](#price-list-resources)

       
</div>

## What is a price list?


A Price List allows you to populate different versions of catalog pricing and assign them to different [Customer Groups](/api-reference/customer-subscribers/customers-api). The prices are specified exclusively at the variant level.

If an active Price List does not contain prices for a variant, then the Catalog pricing will be used. You can associate a Price List to a Customer Group via the Control Panel or the [Customer Groups API.](/api-reference/customer-subscribers/customers-api)

Price Lists will provide overridden price values to the Stencil storefront. You can further customize the final price display within the Stencil template. For more information, see the [Theme Objects](https://developer.bigcommerce.com/stencil-docs/reference-docs/global-objects-and-properties).


### OAuth scopes
The following OAuth Scopes are required:
* [Products](/api-docs/getting-started/basics/authentication#authentication_oauth-scopes)

## Price List definitions

- **Price List:** a collection of price records; price records make up a price list.



- **Price Record:** a price override for a particular variant - minimally, a variant ID, price, and currency.


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


- `PriceRecordBatch`: a way to update several price records in a price list at once. Using this bulk upsert endpoint, you can upsert up to 1000 price records in a single API call.



- **Currency:** a price list can contain records for multiple currencies. *Only price records that match the store's default currency determine storefront and in-cart prices.* Although BigCommerce supports a storefront currency selection, this is not currently integrated with price lists and will merely convert prices from the store's default currency for display convenience.


<!--
title: "Example Price List"
subtitle: ""
lineNumbers: true
-->

**Example Get All Price Lists**

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

## Price list assignments

The price list assignment assigns a price list to a specific sales channel. This association lets you define custom pricing for shoppers only on a specific external site or platform. Price list assignments combined with a customer group assignment allows you to target specifically more logged in customers shopping on that channel.



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
