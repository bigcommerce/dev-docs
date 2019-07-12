<h1>Price List API</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
        <li><a href="#pricelist_what-is-a-pricelist">What is a Price List?</a></li>
        <li><a href="#pricelist_definitions">Definitions</a></li>
        <li><a href="#pricelist_notes">Notes</a></li>
        <li><a href="#pricelist_oauth-scopes">OAuth Scopes</a></li>
        <li><a href="#pricelist_available-webhooks">Webhooks Available</a></li>
    		<li><a href="#pricelist_related-endpoints">Related Endpoints</a></li>
        <li><a href="#pricelist_object-properties">Object Properties</a></li>
	</ul>
</div>

<a href='#pricelist_what-is-a-pricelist' aria-hidden='true' class='block-anchor'  id='pricelist_what-is-a-pricelist'><i aria-hidden='true' class='linkify icon'></i></a>

A Price List allows you to populate different versions of catalog pricing and assign them to different [Customer Groups](/api-reference/customer-subscribers/customers-api). The prices are specified exclusively at the variant level. 

If an active Price List does not contain prices for a variant then the Catalog pricing will be used. The association of a Price List to a Customer Group can be done either via the Control Panel or using the [Customer Groups API.](/api-reference/customer-subscribers/customers-api)

Price Lists will provide overridden price values to the Stencil storefront. Final price display can be further customized within the Stencil template. See the [Price Object](https://stencil.bigcommerce.com/docs/price-object-properties) in Stencil for further documentation.

### OAuth Scopes
The following OAuth Scopes are required:
* [Products](/api-docs/getting-started/basics/authentication#authentication_oauth-scopes)

---

<a href='#pricelist_definitions' aria-hidden='true' class='block-anchor'  id='pricelist_definitions'><i aria-hidden='true' class='linkify icon'></i></a>

## Definitions

- `Price List` -- A collection of price records. `Price Records` make up a price list.
 
- `Price Record` --  A price override for a particular variant - minimally, this is a variant ID, price, and currency.
        
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

        
- `PriceRecordBatch`: A way to update several `Price Records` in a `Price List` at once. Using this bulk upsert endpoint, you can upsert up to 1000 Price Records in a single API call.

- `Currency`:  A `Price List` can contain records for multiple currencies. At this time, *only price records that match the store's default currency will be used to determine storefront and in-cart prices.* Although BigCommerce supports a storefront currency selection, this is not currently integrated with Price Lists and will merely convert prices from the store's default currency for display convenience.


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

**Example Price List Assigned to a Customer Group**  
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

---

<a href='#pricelist_notes' aria-hidden='true' class='block-anchor'  id='pricelist_notes'><i aria-hidden='true' class='linkify icon'></i></a>

## Notes

- Bulk Pricing Tiers may additionally be associated with a Price Record to indicate different pricing as the quantity in cart increases.
  
- If a variant has a `Price Record` any existing product-level bulk pricing will not apply in the cart.  For variants without `Price Records`, any existing product bulk pricing will apply.

- Price Lists Records accepts bulk upsert. Only one [Bulk upsert](https://developer.bigcommerce.com/api-reference/catalog/pricelists-api/price-lists-records/setpricelistrecordcollection) can done at a time. Running more than one in parallel on the **same store** will cause a 429 error and the request will fail. 

---

## Resources

### Related Endpoints
* [Get Price List Collection](/api-reference/catalog/pricelists-api/price-lists/getpricelistcollection)

### Webhooks Available

There are no direct webhooks available for Price Lists. Since Price Lists directly relate to products, webhooks related to products will fire for corresponding changes such as pricing. 

* [Products](/api-docs/getting-started/webhooks/webhook-events#webhook-events_products)
* [SKU](/api-docs/getting-started/webhooks/webhook-events#webhook-events_sku)
