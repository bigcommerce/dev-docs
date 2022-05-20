# Using a 3rd-Party Shipping Provider

Once a merchant installs a Shipping Provider app on their store, merchants and API users can add connection settings. A merchant can navigate to the Shipping Manager and enable your carrier app, input carrier connection settings, and disable your carrier app for any defined zone. An API user can create, update, and delete carrier connections.

## Shipping Carriers 

### Create a Connection

To set up a carrier using the API, first, connect it using the Connect Carrier API. Make a request containing the connection settings required by your carrier. The ID of the carrier is required. The carrier ID will be issued by BigCommerce when your carrier is registered. All connection fields are unique to each carrier. If your carrier doesn’t require any connection settings, send an empty object for the `connection` settings property.

```http title="Example carrier connection request with connection settings" lineNumbers
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
&nbsp;
```http title="Example carrier connection request without connection settings" lineNumbers
POST https://example.com/shipping/carrier/connection
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "carrier_id": "carrier_33",
  "connection": {}
}
```

Once connected, it’s possible to create shipping methods for a connected carrier in any shipping zone. You can query shipping zones using the Shipping Zones resource. For any zone, a request can be made to the Shipping Methods resource using the zone ID from the Shipping Zones resource to create a new method for the connected carrier. You are required to enter the shipping carrier’s ID in the type field.


## Shipping Zones


## Shipping Methohds
```http title="Example request: Create a shipping method in a specified zone" lineNumbers
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
&nbsp;
```json title="Example response: Create a shipping method in a specified zone" lineNumbers
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