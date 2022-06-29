# Use a Real-Time Carrier

Real-time carriers allow merchants and shoppers to obtain **real-time** shipping quotes. There are two types of real-time carriers: native integrations and shipping provider apps. Shipping provider apps require merchants to install the app on their store. Once a merchant installs a shipping provider app on their store, API users and merchants can connect the carrier to the store. API users and merchants can then define and enable a shipping method for a carrier in one or more shipping zones. They can define and enable a different shipping method in each shipping zone for the same carrier. Enabling a zone's real-time shipping method makes the method available to shoppers in that zone during checkout. 

This article is a guide for API users on how to manage carrier connections and real-time shipping methods from carriers using the [Shipping V2 API](/api-reference/store-management/shipping-api).

## Prerequisites
- For shipping provider apps only: Merchant has installed the shipping provider app. 
- You have obtained the required [OAuth Scopes](/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes): `Information & Settings`.
- You or the merchant have created shipping zones. You can create zones with the [Create a shipping zone](/api-reference/store-management/shipping-api/shipping-zones/createashippingzones) endpoint.

<!-- theme:info -->
> #### Native integrations
> BigCommerce offers native integrations with several shipping services, including FedEx, UPS, and select national postal services. For a full list of native integrations, consult our Help Center article on [Setting up Real Time Shipping Quotes](https://support.bigcommerce.com/s/article/Setting-Up-a-Real-Time-Shipping-Quote-Shipping-Method#providers).

## Manage connections to shipping carriers 

When a merchant installs a shipping provider app, the carrier appears in the merchant's control panel under real-time shipping methods, but is not connected to the store by default. You must first connect the carrier to the store.

![Connected vs Installed Carrier](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Installed%20vs%20Connected%20Carrier.png 'Connected versus Installed Carrier. USPS is connected, while FedEx is only installed.')  

### Create a connection

To set up a carrier using the API, connect it using the [Create a Carrier Connection](/api-reference/store-management/shipping-api/shipping-carrier/postshippingcarrierconnection) endpoint. Make a request containing the ID of the carrier and any configuration fields that the carrier requires. All configuration fields are unique to each carrier. 

<!--
type: tab
title: Request
-->

```json title="Example POST request with X-Auth-Token header" lineNumbers
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/shipping/carrier/connection
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{	
  "carrier_id" : "endicia",
  "connection": {
      "account_id" : "example_id",
      "pass_phrase" : "example_passphrase"
  }
}
```

<!--
type: tab
title: Response
-->

```json title="Example POST response" lineNumbers
204 HTTP Status Code. No content
```

<!-- type: tab-end -->

If a carrier doesn’t require any connection settings, send an empty object for the `connection` property.

<!--
type: tab
title: Request
-->

```json title="Example POST request with X-Auth-Token header" lineNumbers
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/shipping/carrier/connection
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "carrier_id": "example_carrier",
  "connection": {}
}
```

<!--
type: tab
title: Response
-->

```json title="Example POST response" lineNumbers
204 HTTP Status Code. No content
```

<!-- type: tab-end -->

### Update a connection

When you update a connection, use the same connection fields as [Create a connection](#create-a-connection). 

<!--
type: tab
title: Request
-->

```json title="Example PUT request with X-Auth-Token header" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/shipping/carrier/connection
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{	
  "carrier_id" : "endicia",
  "connection": {
      "account_id" : "example_id_2",
      "pass_phrase" : "example_passphrase"
  }
}
```

<!--
type: tab
title: Response
-->

```json title="Example PUT response" lineNumbers
204 HTTP Status Code. No content
```

<!-- type: tab-end -->

### Delete a connection

To delete a connection, send the `carrier_id` in the request body.

<!--
type: tab
title: Request
-->

```json title="Example DELETE request with X-Auth-Token header" lineNumbers
DELETE https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/shipping/carrier/connection
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "carrier_id": "example_carrier"
}
```

<!--
type: tab
title: Response
-->

```json title="Example DELETE response" lineNumbers
204 HTTP Status Code. No content
```

<!-- type: tab-end -->


## Manage shipping methods

After you connect a carrier, you must define and enable a shipping method for the carrier in one or more shipping zones. You can define and enable a different shipping method in each shipping zone for the same carrier.    

![Enabled vs Connected Carrier](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Enabled%20vs%20Connected%20Carrier.png 'Enabled versus Connected Carrier. USPS is enabled, while FedEx is only connected.')  


### Create a shipping method

You can define and enable a method for the connected carrier in any shipping zone by using the [Create a shipping method](/api-reference/store-management/shipping-api/shipping-method/createashippingmethod) endpoint. Specify the shipping zone in the path using the zone ID (`id`) from the [Get all shipping zones](/api-reference/store-management/shipping-api/shipping-zones/getallshippingzones) endpoint. The shipping carrier’s ID is required. 

<!--
type: tab
title: Request
-->

```json title="Example POST request with X-Auth-Token header" lineNumbers
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/shipping/zones/{zone_id}/methods
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "name": "USPS",
  "type": "endicia",
  "settings": {
      "carrier_options": {
          "show_transit_time": "1",
          "packaging_type": "FlatRateLegalEnvelope",
          "delivery_services": [
              "PriorityExpress",
              "ParcelSelect",
              "MediaMail"
          ]
      }
  },
  "enabled": true,
  "handling_fees": {
      "fixed_surcharge": "0"
  }
}
```

<!--
type: tab
title: Response
-->

```json title="Example POST response" lineNumbers
{
   "id": "29",
   "name": "USPS",
   "type": "endicia",
   "settings": {
      "carrier_options": {
         "show_transit_time": "1",
         "packaging": "FlatRateLegalEnvelope",
         "packaging_type": "FlatRateLegalEnvelope",
         "delivery_services": [
            "PriorityExpress",
            "ParcelSelect",
            "MediaMail"
         ]
      }
   },
   "enabled": "true",
   "handling_fees": {
      "fixed_surcharge": "0"
   },
   "is_fallback": "false"
}
```

<!-- type: tab-end -->

For more carrier options, see the [Create a shipping method](/api-reference/store-management/shipping-api/shipping-method/createashippingmethod) reference. Contact the carrier to get a full list of available carrier options.

<!-- theme:info -->
> After you enable a connected carrier, you can obtain its real-time shipping quotes by using the [Request shipping rates](/api-reference/providers/shipping-provider-api/shipping-provider/requestshippingrates) endpoint. 

### Update a shipping method

<!--
type: tab
title: Request
-->

```json title="Example PUT request with X-Auth-Token header" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/shipping/zones/{zone_id}/methods/{method_id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "name": "USPS",
  "type": "endicia",
  "settings": {
      "carrier_options": {
        "show_transit_time": "1",
        "packaging_type": "FlatRateLegalEnvelope",
        "delivery_services": [
            "MediaMail"
        ]
      }
  },
  "enabled": true,
  "handling_fees": {
      "fixed_surcharge": "0"
  }
}
```

<!--
type: tab
title: Response
-->

```json title="Example PUT response" lineNumbers
{
   "id": "29",
   "name": "USPS",
   "type": "endicia",
   "settings": {
      "carrier_options": {
          "show_transit_time": "1",
          "packaging": "FlatRateLegalEnvelope",
          "packaging_type": "FlatRateLegalEnvelope",
          "delivery_services": {
              "value": "MediaMail"
          }
      }
   },
   "enabled": "true",
   "handling_fees": {
      "fixed_surcharge": "0"
   },
   "is_fallback": "false"
}
```

<!-- type: tab-end -->


### Get a shipping method

<!--
type: tab
title: Request
-->

```json title="Example GET request with X-Auth-Token header" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/shipping/zones/{zone_id}/methods/{method_id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example GET response" lineNumbers
{
  "id": "29",
  "name": "USPS",
  "type": "endicia",
  "settings": {
      "carrier_options": {
          "show_transit_time": "1",
          "packaging": "FlatRateLegalEnvelope",
          "packaging_type": "FlatRateLegalEnvelope",
          "delivery_services": [
              "MediaMail"
          ]
      }
   },
   "enabled": "true",
   "handling_fees": {
      "fixed_surcharge": "0"
   },
   "is_fallback": "false"
}
```

<!-- type: tab-end -->


<!-- theme:info -->
> #### Note
You can also [Get all shipping methods](/api-reference/store-management/shipping-api/shipping-method/getshippingmethodszone) in one request.

### Delete a shipping method


<!--
type: tab
title: Request
-->

```json title="Example DELETE request with X-Auth-Token header" lineNumbers
DELETE https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/shipping/zones/{zone_id}/methods/{method_id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example DELETE response" lineNumbers
204 HTTP Status Code. No content
```

<!-- type: tab-end -->


## Resources

- [Shipping V2 API](/api-reference/store-management/shipping-api) 
