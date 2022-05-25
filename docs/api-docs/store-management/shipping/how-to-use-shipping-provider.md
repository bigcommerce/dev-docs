# Using a 3rd-Party Shipping Provider

Shipping providers apps allow merchants to use shipping solutions from third-party shipping providers. Once a merchant installs and enables a shipping provider app on their store, API users can connect the carrier. API users can then create shipping zones **for the connected carrier**, as well as shipping methods for the connected carrier in any shipping zone. 

This article is a guide for API users on how to manage carrier connections, shipping zones, and shipping methods.

## Manage connections to shipping carriers 

### Create a Connection

To set up a carrier using the API, connect it using the [Create a Carrier Connection](/api-reference/store-management/shipping-api/shipping-carrier/postshippingcarrierconnection) endpoint. Make a request containing the connection settings required by your carrier. The ID of the carrier is required. All connection fields are unique to each carrier. 

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

<!-- type: tab-end -->

### Update a Connection

<!--
type: tab
title: Request
-->

```json title="Example PUT request with X-Auth-Token header" lineNumbers
PUT https://api.bigcommerce.com/stores/{store_hash}/v2/shipping/carrier/connection
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

## Manage shipping zones

Once you have connected a carrier, create shipping zones for the connected carrier. You can query shipping zones using the Shipping Zones resource. For any zone, a request can be made to the Shipping Methods resource using the zone ID from the Shipping Zones resource to create a new method for the connected carrier. You are required to enter the shipping carrier’s ID in the type field.

### Create a shipping zone

<!--
type: tab
title: Request
-->

```json title="Example POST request with X-Auth-Token header" lineNumbers
POST https://api.bigcommerce.com/stores/{store_hash}/v2/shipping/zones
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

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
PUT https://api.bigcommerce.com/stores/{store_hash}/v2/shipping/zones/{id}
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


### Get a shipping zone

<!--
type: tab
title: Request
-->

```json title="Example GET request with X-Auth-Token header" lineNumbers
GET https://api.bigcommerce.com/stores/{store_hash}/v2/shipping/zones/{id}
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
> It is also possible to [Get all shipping zones](/api-reference/store-management/shipping-api/shipping-zones/getallshippingzones).

### Delete a shipping zone

<!--
type: tab
title: Request
-->

```json title="Example DELETE request with X-Auth-Token header" lineNumbers
DELETE https://api.bigcommerce.com/stores/{store_hash}/v2/shipping/zones/{id}
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


### Create a shipping method


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
