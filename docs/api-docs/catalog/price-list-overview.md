# Price List API


## What is a price list?


You can use price lists to populate different versions of catalog pricing and assign them to different [Customer Groups](/api-reference/customer-subscribers/customers-api). The prices are specified exclusively at the variant level. If an active price list doesn't contain prices for a variant, the catalog pricing will be used. 

You can use price list assignments in the [Price List Assignment API](/api-reference/store-management/price-lists/price-lists-assignments/createpricelistassignments) to assign a price list to a specific sales channel, customer group, or customer group on a specific sales channel.  You can also use the Control Panel or the [Customer Groups API](/api-reference/store-management/customers-v2) to associate a price list with a customer group. 
Assigning pice list to specific customer groups allows you to specifically target the signed-in customers shopping on a specific channel.

Price lists allow for target price values that have been overriden by the price lists to be displayed on the Stencil storefront. You can further customize the final price displayed within the Stencil template. For more information, see [Theme Objects](/stencil-docs/reference-docs/global-objects-and-properties).


### OAuth scopes
The following OAuth Scopes are required for authentication:
* [Products](/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes)

## Price list definitions
* A **price list** consists of a collection of price records. 
* A **price record** is a price override for a particular variant. At a minimum, it contains a variant ID, a price, and a currency.

The following code sample displays a price record.


```json title="Price Record" lineNumbers
	{
		"variant_id": 3121,
		"price": 10.0,
		"sale_price": 8.0,
		"retail_price": 12.0,
		"map_price": 6.0,
		"currency": "EUR"
	}
```


-  You can use a `PriceRecordBatch` to update several price records in a price list at once. Using this bulk upsert endpoint, you can upsert up to 1000 price records in a single API call.

- **Note**: A price list can contain records for multiple currencies. If you use a [transactional currency](/api-docs/multi-currency/guide/introduction#display-vs-transactional), the customer group or channel uses price records in that currency. If a multi-currency price list is unavailable, BigCommerce automaticlly converts the catalog price to the appropriate currency. The customer group or channel uses price records in the default currency and performs a currency conversion for [display-only currencies](/api-docs/multi-currency/guide/introduction#display-vs-transactional).

The following example shows how to retrieve all price lists for a store.


```http title="Example request: Get all price lists" lineNumbers
GET https://api.bigcommerce.com/stores/{{store_hash}}/v3/pricelists
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json
Content-Type: application/json

[
  {
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
  }
]
```
&nbsp;

## Price list assignments

The price list assignment API assigns a price list to a specific sales channel. This association lets you define custom pricing for shoppers on storefront channels, but doesn't affect pricing in different omnichannel environments, such as Facebook, Amazon, Instagram, and eBay. 

For additional information, see [Channels, Sites, and Routes](/api-reference/store-management/channels).

The following example shows how to create a price list assignment for a store.

```http title="Example request: Create a price list assignment" lineNumbers
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/pricelists/assignments
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json
Content-Type: application/json

[
  {
    "customer_group_id": 3,
    "price_list_id": 2,
    "channel_id": 1
  }
]
```

## Price lists assigned to customer groups 

The following example shows how to assign a price list fo a customer group.

```http title="Example request: Assign a price list to a customer group" lineNumbers
PUT https://api.bigcommerce.com/stores/{{store_hash}}/v2/customer_groups/{{customer_group_id}}
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json
Content-Type: application/json

[
    {
        "id": 1,
        "name": "VIP Price List",
        "is_default": false,
        "category_access": {
            "type": "all"
        },
        "discount_rules": [
            {
                "type": "price_list",
                "price_list_id": 2
            }
        ]
    }
]
```

Under `discount_rules` the `type` is set to `price_list`. The `price_list_id` is 1, which is the id of the price list assigned to the group.

## Addiditional information about price lists

- Bulk pricing tiers may additionally be associated with a Price Record to indicate different pricing as the quantity in cart increases.

- If a variant has a `Price Record` specified, any existing product-level bulk pricing will not apply to any merchandise in the cart. For variants without `Price Records`, any existing product bulk pricing will apply.

- `Price Lists Records` accepts bulk upsert. You can only perform one [Bulk upsert](/api-reference/catalog/pricelists-api/price-lists-records/setpricelistrecordcollection) at a time. Performing more than one bulk upsert action at the same time on the same store will cause a 429 error, and the request will fail.

## Related resources

### Endpoints
* [Get Price List Collection](/api-reference/catalog/pricelists-api/price-lists/getpricelistcollection)

### Webhooks
There are no direct webhooks available for price lists. Because price lists directly relate to products, any webhooks that are related to products will also be triggered for corresponding changes such as pricing.

* [Products](/api-docs/getting-started/webhooks/webhook-events#webhook-events_products)
* [SKU](/api-docs/getting-started/webhooks/webhook-events#webhook-events_sku)
