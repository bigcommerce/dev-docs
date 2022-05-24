# Using a 3rd-Party Shipping Provider

Once a merchant installs and enables a Shipping Provider app on their store, merchants and API users can add connection settings to carriers. Merchants and API users can then create shipping zones and shipping methods. This article is a guide for API users on how to manage carrier connections, shipping zones, and shipping methods.

## Manage connections to shipping carriers 

### Create a Connection

To set up a carrier using the API, first, connect it using the Connect Carrier API. Make a request containing the connection settings required by your carrier. The ID of the carrier is required. The carrier ID will be issued by BigCommerce when your carrier is registered. All connection fields are unique to each carrier. If your carrier doesn’t require any connection settings, send an empty object for the `connection` settings property.

The *code* is what you would use as a property under the connection object for the connections api.

<!--
type: tab
title: Request
-->

```json title="Example POST request with X-Auth-Token header" lineNumbers
POST https://example.com/shipping/carrier/connection
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


<!-- type: tab-end -->

If a carrier has no connection settings, you can use an empty `connection` object: 

<!--
type: tab
title: Request
-->

```http title="Example POST request with X-Auth-Token header" lineNumbers
POST https://example.com/shipping/carrier/connection
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

<!-- type: tab-end -->

Once connected, it’s possible to create shipping methods for a connected carrier in any shipping zone. You can query shipping zones using the Shipping Zones resource. For any zone, a request can be made to the Shipping Methods resource using the zone ID from the Shipping Zones resource to create a new method for the connected carrier. You are required to enter the shipping carrier’s ID in the type field.

### Update a Connection

<!--
type: tab
title: Request
-->

```json title="Example PUT request with X-Auth-Token header" lineNumbers
```

<!--
type: tab
title: Response
-->

```json title="Example PUT response" lineNumbers
```

<!-- type: tab-end -->

### Delete a Connection

<!--
type: tab
title: Request
-->

```json title="Example DELETE request with X-Auth-Token header" lineNumbers
```

<!--
type: tab
title: Response
-->

```json title="Example DELETE response" lineNumbers
```

<!-- type: tab-end -->

## Manage shipping zones

### Create a shipping zone

<!--
type: tab
title: Request
-->

```json title="Example POST request with X-Auth-Token header" lineNumbers
```

<!--
type: tab
title: Response
-->

```json title="Example POST response" lineNumbers
```

<!-- type: tab-end -->

### Update a shipping zone

<!--
type: tab
title: Request
-->

```json title="Example PUT request with X-Auth-Token header" lineNumbers
```

<!--
type: tab
title: Response
-->

```json title="Example PUT response" lineNumbers
```

<!-- type: tab-end -->


### Get a shipping zone

<!--
type: tab
title: Request
-->

```json title="Example GET request with X-Auth-Token header" lineNumbers
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
> It is also possible to [Get all shipping zones](/api-reference/store-management/shipping-api/shipping-zones/getallshippingzones).

### Delete a shipping zone

<!--
type: tab
title: Request
-->

```json title="Example DELETE request with X-Auth-Token header" lineNumbers
```

<!--
type: tab
title: Response
-->

```json title="Example DELETE response" lineNumbers
```

<!-- type: tab-end -->


## Manage shipping methods


### Create a shipping method


<!--
type: tab
title: Request
-->

```json title="Example POST request with X-Auth-Token header" lineNumbers
POST https://api.bigcommerce.com/stores/{{store_hash}}/v2/shipping/zones/{{zone_id}}/methods
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






### Update a shipping method

<!--
type: tab
title: Request
-->

```json title="Example PUT request with X-Auth-Token header" lineNumbers
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
```

<!--
type: tab
title: Response
-->

```json title="Example DELETE response" lineNumbers
```

<!-- type: tab-end -->


## Resources
