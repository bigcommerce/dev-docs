# Using a Third-Party Shipping Provider

Shipping provider apps (also known as carriers) allow merchants and shoppers to obtain **real-time** shipping quotes. Once a merchant installs a shipping provider app on their store, API users can connect the carrier. API users can then enable the carrier for specific shipping zones. This makes the real-time shipping method available to shoppers for those zones during checkout.

This article is a guide for API users on how to manage carrier connections and real-time shipping methods from these carriers. Managing shipping zones is out of the scope for this article because BigCommerce's shipping zone endpoints are not specific to third-party shipping providers.

## Prerequisites
- Merchant has installed the shipping provider app
- You have obtained OAuth Scopes: `Information & Settings`
- You or the merchant have created shipping zones. You can create zones with the [Create a shipping zone](/api-reference/store-management/shipping-api/shipping-zones/createashippingzones) endpoint.

## Manage connections to shipping carriers 

When a merchant installs a shipping provider app, the carrier appears in the merchant's control panel under real-time shipping methods, but is not connected to the store by default. You must first connect the carrier to the store.

![]('Installed versus Connected Carrier')  

### Create a Connection

To set up a carrier using the API, connect it using the [Create a Carrier Connection](/api-reference/store-management/shipping-api/shipping-carrier/postshippingcarrierconnection) endpoint. Make a request containing the ID of the carrier and any configuration fields that the carrier requires. All configuration fields are unique to each carrier. 

<!--
type: tab
title: Request
-->

```json title="Example POST request with X-Auth-Token header" lineNumbers
POST https://api.bigcommerce.com/stores/{store_hash}/v2/shipping/carrier/connection
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "carrier_id": "carrier_33",
  "connection": {
    "key": "userKey",
    "account_number": "userAccountNumber"
  }
}
```

<!--
type: tab
title: Response
-->

```json title="Example POST response" lineNumbers
No content
```

<!-- type: tab-end -->

If a carrier doesn’t require any connection settings, send an empty object for the `connection` property.

<!--
type: tab
title: Request
-->

```json title="Example POST request with X-Auth-Token header" lineNumbers
POST ttps://api.bigcommerce.com/stores/{store_hash}/v2/shipping/carrier/connection
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "carrier_id": "carrier_33",
  "connection": {}
}
```

<!--
type: tab
title: Response
-->

```json title="Example POST response" lineNumbers
No content
```

<!-- type: tab-end -->

When you connect a carrier, the carrier is disabled by default. To obtain real-time shipping quotes, you must enable it (see [Create a shipping method](#create-a-shipping-method)).

### Update a Connection

You use the same request fields when you update a connection as when you create a connection. 

<!--
type: tab
title: Request
-->

```json title="Example PUT request with X-Auth-Token header" lineNumbers
PUT https://api.bigcommerce.com/stores/{store_hash}/v2/shipping/carrier/connection
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "carrier_id": "carrier_33",
  "connection": {
    "key": "userKey 2",
    "account_number": "userAccountNumber"
  }
}
```

<!--
type: tab
title: Response
-->

```json title="Example PUT response" lineNumbers
No content
```

<!-- type: tab-end -->

### Delete a Connection

<!--
type: tab
title: Request
-->

```json title="Example DELETE request with X-Auth-Token header" lineNumbers
DELETE https://api.bigcommerce.com/stores/{store_hash}/v2/shipping/carrier/connection
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example DELETE response" lineNumbers

```

<!-- type: tab-end -->


## Manage shipping methods

When you connect a carrier, the carrier is disabled by default. To obtain real-time shipping quotes, you must enable it. You can enable a connected carrier for any shipping zone by using the [Create a shipping method](/api-reference/store-management/shipping-api/shipping-method/createashippingmethod) endpoint. 

![]('Connected versus Enabled Carrier')  


### Create a shipping method

To specify the shipping zone, use the zone ID (`id`) from the [Get all shipping zones](/api-reference/store-management/shipping-api/shipping-zones/getallshippingzones) endpoint. The shipping carrier’s ID is required. 

<!--
type: tab
title: Request
-->

```json title="Example POST request with X-Auth-Token header" lineNumbers
POST https://api.bigcommerce.com/stores/{store_hash}/v2/shipping/zones/{zone_id}/methods
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
{
  "name": "Example Shipping Carrier",
  "type": "carrier_33",
  "settings": {
    "carrier_options": {
      "account_id": "a1ty"
    }
  },
  "enabled": true
}
```

<!--
type: tab
title: Response
-->

```json title="Example POST response" lineNumbers
{
  "id": 24,
  "name": "Per Order Test",
  "type": "perorder",
  "settings": {
    "rate": 8.3
  },
  "enabled": true,
  "handling_fees": {
    "fixed_surcharge": 3
  },
  "is_fallback": false
}
```

<!-- type: tab-end -->


<!-- theme:info -->
> After you enable a connected carrier, you can obtain its real-time shipping quotes by using the [Request shipping rates](/api-reference/providers/shipping-provider-api/shipping-provider/requestshippingrates) endpoint. 

### Update a shipping method

<!--
type: tab
title: Request
-->

```json title="Example PUT request with X-Auth-Token header" lineNumbers
PUT https://api.bigcommerce.com/stores/{store_hash}/v2/shipping/zones/{zone_id}/methods/{method_id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example PUT response" lineNumbers
```

<!-- type: tab-end -->


### Get a shipping method

<!--
type: tab
title: Request
-->

```json title="Example GET request with X-Auth-Token header" lineNumbers
GET https://api.bigcommerce.com/stores/{store_hash}/v2/shipping/zones/{zone_id}/methods/{method_id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example GET response" lineNumbers
```

<!-- type: tab-end -->


<!-- theme:info -->
> #### Note
> It is also possible to [Get all shipping methods](/api-reference/store-management/shipping-api/shipping-method/getshippingmethodszone).

### Delete a shipping method


<!--
type: tab
title: Request
-->

```json title="Example DELETE request with X-Auth-Token header" lineNumbers
DELETE https://api.bigcommerce.com/stores/{store_hash}/v2/shipping/zones/{zone_id}/methods/{method_id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example DELETE response" lineNumbers
```

<!-- type: tab-end -->


## Resources
