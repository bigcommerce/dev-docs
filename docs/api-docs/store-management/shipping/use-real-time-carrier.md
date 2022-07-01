# Use a Real-Time Carrier

Real-time carriers allow merchants and shoppers to obtain **real-time** shipping quotes. There are two types of real-time carriers: native integrations and shipping provider apps. 

The following figure shows how to make real-time carrier quotes available during checkout. Installing an app can only be done through the UI (i.e. by a merchant). All other steps can be performed through the UI or API (i.e. by an API user). Note that you can set up a different shipping method for each shipping zone a carrier services.     

![Real-Time Carrier Workflow](https://storage.googleapis.com/bigcommerce-production-dev-center/images/real-time-carrier-workflow.png 'Workflow for setting up a real-time carrier')

This article is a guide for API users on how to manage carrier connections and real-time shipping methods from carriers using the [Shipping V2 API](/api-reference/store-management/shipping-api).

## Prerequisites
- For shipping provider apps only: Merchant has installed the shipping provider app. 
- You have obtained an `access_token` from the merchant [store's API account](/api-docs/getting-started/authentication/rest-api-authentication) that has the [OAuth Scope](/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes): `Information & Settings`.
- You or the merchant have created shipping zones. You can create zones with the [Create a shipping zone](/api-reference/store-management/shipping-api/shipping-zones/createashippingzones) endpoint.

<!-- theme:info -->
> #### Native integrations
> BigCommerce offers native integrations with several shipping services, including FedEx, UPS, and select national postal services. For a full list of native integrations, consult our Help Center article on [Setting up Real Time Shipping Quotes](https://support.bigcommerce.com/s/article/Setting-Up-a-Real-Time-Shipping-Quote-Shipping-Method#providers).

## Manage connections to shipping carriers 

When a merchant installs a shipping provider app, the carrier appears in the **Settings > Shipping** section of the store control panel, in the **Real-time Shipping Quotes** view. However, you or the merchant must first connect the carrier before merchants or shoppers can request real-time quotes. The following section shows how you can use the API to connect the carrier to the store. 

![Connected vs Installed Carrier](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Installed%20vs%20Connected%20Carrier.png 'Connected versus Installed Carrier. USPS is connected, while FedEx is only installed.')  

### Create a connection

To use the API to connect with a carrier, use the [Create a carrier connection](/api-reference/store-management/shipping-api/shipping-carrier/postshippingcarrierconnection) endpoint. Make a request containing the ID of the carrier and any connection fields that the carrier requires. Connection fields are unique to each carrier. 

<!--
type: tab
title: Request
-->

```json title="Example request: Create a connection" lineNumbers
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

```json title="Example response: Create a connection" lineNumbers
204 HTTP Status Code. No content
```

<!-- type: tab-end -->

If a carrier doesn’t require any connection settings, send an empty object for the `connection` property.

<!--
type: tab
title: Request
-->

```json title="Example request: Create a connection without connection fields" lineNumbers
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/shipping/carrier/connection
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "carrier_id": "carrier_name",
  "connection": {}
}
```

<!--
type: tab
title: Response
-->

```json title="Example response: Create a connection without connection fields" lineNumbers
204 HTTP Status Code. No content
```

<!-- type: tab-end -->

### Update a connection

When you update a connection, use the same connection fields as [Create a connection](#create-a-connection). 

<!--
type: tab
title: Request
-->

```json title="Example request: Update a connection" lineNumbers
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

```json title="Example response: Update a connection" lineNumbers
204 HTTP Status Code. No content
```

<!-- type: tab-end -->

### Delete a connection

To delete a connection, send the `carrier_id` in the request body.

<!--
type: tab
title: Request
-->

```json title="Example request: Delete a connection" lineNumbers
DELETE https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/shipping/carrier/connection
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "carrier_id": "carrier_name"
}
```

<!--
type: tab
title: Response
-->

```json title="Example response: Delete a connection" lineNumbers
204 HTTP Status Code. No content
```

<!-- type: tab-end -->


## Manage shipping methods

After you connect a carrier, set up a shipping method that uses the carrier in one or more shipping zones. You can define and enable a different shipping method for each zone the carrier services.    

![Enabled vs Connected Carrier](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Enabled%20vs%20Connected%20Carrier.png 'Enabled versus Connected Carrier. USPS is enabled, while FedEx is only connected.')  


### Create a shipping method

You can define and enable a method for the connected carrier in any shipping zone by using the [Create a shipping method](/api-reference/store-management/shipping-api/shipping-method/createashippingmethod) endpoint. Specify the shipping zone in the path using the zone ID (`id`) from the [Get all shipping zones](/api-reference/store-management/shipping-api/shipping-zones/getallshippingzones) endpoint. The shipping carrier’s ID is required. 

<!--
type: tab
title: Request
-->

```json title="Example request: Create a real-time shipping method" lineNumbers
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

```json title="Example response: Create a real-time shipping method" lineNumbers
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

After you enable a connected carrier, you can obtain its real-time shipping quotes by using the [Request shipping rates](/api-reference/providers/shipping-provider-api/shipping-provider/requestshippingrates) endpoint. 

### Update a shipping method

<!--
type: tab
title: Request
-->

```json title="Example request: Update a real-time shipping method" lineNumbers
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

```json title="Example response: Create a real-time shipping method" lineNumbers
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

```json title="Example request: Get a real-time shipping method" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/shipping/zones/{zone_id}/methods/{method_id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get a real-time shipping method" lineNumbers
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

```json title="Example request: Delete a real-time shipping method" lineNumbers
DELETE https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/shipping/zones/{zone_id}/methods/{method_id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example response: Delete a real-time shipping method" lineNumbers
204 HTTP Status Code. No content
```

<!-- type: tab-end -->


## Resources

- [Shipping V2 API](/api-reference/store-management/shipping-api) 
