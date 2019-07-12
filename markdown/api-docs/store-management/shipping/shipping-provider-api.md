<h1> Shipping Provider API </h1>
<div class="otp" id="no-index">
<h3> On this Page </h3>
<ul>
  <li><a href="#shipping-provider_prerequisites">Prerequisites</a></li>
  <li><a href="#shipping_provider-signup">Sign Up</a></li>
  <li><a href="#shipping_provider-before_development">Before Development</a></li>
  <li><a href="#shipping_provider-developing-app">Developing the App</a></li>
  <li><a href="#shipping_provider-return_shipping_quotes">Return Shipping Quotes</a></li>
  <li><a href="#shipping_provider-submitting-app">Submitting the App</a></li>
   <li><a href="#shipping_provider-app_diagram">App Diagram</a></li>
  <li><a href="#shipping_provider-definitions">Defintions</a></li>
  <li><a href="#shipping_provider-faq">FAQ</a></li>
  <li><a href="https://github.com/bigcommerce/sample-shipping-provider"> Sample Shipping App</br> (PHP & Silex)</a></li>
</ul>
</div>

The Shipping Provider API allows third parties to integrate their own shipping carriers into the BigCommerce checkout and control panel. Once integrated, shoppers can fetch quotes on the front-end from the shipping carrier within the cart and checkout pages as they do with any other shipping provider available today. Merchants have access to configure and customize these providers through the control panel as they would any other shipping provider.

Some use cases for the Shipping Provider API are:

* A dropshipper that requires their own rates
* A merchant that already has a shipping table
* Third-party logistics
* Create a combination of in store pickup and shipping options for shoppers

---

<a href='#shipping-provider_prerequisites' aria-hidden='true' class='block-anchor'  id='shipping-provider_prerequisites'><i aria-hidden='true' class='linkify icon'></i></a>

## Prerequisites

### Scopes 
The following [OAuth](/api-docs/getting-started/authentication#authentication_oauth-scopes) scopes are required:
- Information and Settings 

### Endpoints 
Be familiar with the following API Endpoints:
- [Shipping Zones](/api-reference/store-management/shipping-api/shipping-zones)
- [Shipping Methods](/api-reference/store-management/shipping-api/shipping-method)
- [Shipping Carriers](/api-reference/store-management/shipping-api/shipping-carrier)

---

<a href='#shipping_provider-signup' aria-hidden='true' class='block-anchor'  id='shipping_provider-signup'><i aria-hidden='true' class='linkify icon'></i></a>

## Sign Up

When creating your app, the shipping data needs to be added to our Carrier Registry so it returns to shoppers on the front-end.

To get your app setup send an email to: 
<a href="mailto:shippingproviderapi@bigcommerce.com">shippingproviderapi@bigcommerce.com</a>.

Please include:
* Name
* Partner ID
* App ID (see below)
* Email
* Description of the app

To get your app ID, create an app in [Developer Tools](https://devtools.bigcommerce.com/) and fill out the information on [Step 3 Technical](https://developer.bigcommerce.com/api-docs/partner/app-store-approval-requirements). In the URL the app will have a unique ID. This is what is sent in exchange for a carrier ID which can be used to test the app.

<!--
    title: #### App ID

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1552664114224
-->

#### App ID
![#### App ID
](//s3.amazonaws.com/user-content.stoplight.io/6012/1552664114224 "#### App ID
")

---

<a href='#shipping_provider-before_development' aria-hidden='true' class='block-anchor'  id='shipping_provider-before_development'><i aria-hidden='true' class='linkify icon'></i></a>

## Before Development

BigCommerce will send requests to your server to get information back about shipping quotes, credential validation and configuration. 

### Your Service URLs
Since BigCommerce will be sending requests, you will need to provide BigCommerce with URLs that can accept quote requests and optionally a URL to check and validate connection options during app registration. These can be any valid HTTPS URL using port 443, for example:

`https://yourhost.com/rate`

Your host and rate should be replaced with your own host and path. 

### Routes

You should create a URL to provide shipping quotes on your API. This is the URL used to check the available shipping rates. The second URL (optional) checks the merchant’s connection settings are valid. It can perform any checks necssary to do so such as looking up credentials in your database or calling a downstream service to verify them.

### Requests and Responses

BigCommerce will send and receive data using JSON. The request for rates will always be formatted using the [Base Rate Request Model](https://developer.bigcommerce.com/api-reference/store-management/shipping-provider-api/models/baseraterequest). The response for rates should be formatted using the [Carrier Quote Object](https://developer.bigcommerce.com/api-reference/store-management/shipping-provider-api/models/carrierquoteobject). The request to check for merchant app credentials will be formatted as Check Connection Options Request Payload and the response should be formatted using the  Check Connection Options Response Payload. 

### Error Handling
In the case of errors, error messages should be included in the response payload under the messages key.

Example:

```json
{
  "valid": false,
  "messages" [
    {
      "text": "Your account ID is invalid",
      "type": "ERROR"
    }
  ]
}
```

---

<a href='#shipping_provider-developing-app' aria-hidden='true' class='block-anchor'  id='shipping_provider-developing-app'><i aria-hidden='true' class='linkify icon'></i></a>

## Developing the App

The intended use of the Shipping Provider API is to create an app that merchants can install on their store. This can be a standalone app or part of an existing application. When developing the app there are a few things to consider which are listed below.

### Control Panel Installation Workflow

During the app setup, if the Check Connection Options URL is configured for the carrier, an attempt to connect the carrier via the Shipping Manager UI or the Connect Carrier API causes a request to be made to that URL with the provided options. The resource should respond indicating if the credentials are valid and should provide an explanation of what is wrong. If no such URL is configured, this check will be skipped and the credentials are assumed valid as long as they pass type checks.

<!--
title: "Sample Request"
subtitle: "POST https://developerserver.com/check_connection_options"
lineNumbers: true
-->

**Example Request Check Connection**  
`/POST https://developerserver.com/check_connection_options`

```json
{
  "connection_options" {
    "account_id": "a1ty"
  }
}
```

<!--
title: "Sample Response"
subtitle: "POST https://developerserver.com/check_connection_options"
lineNumbers: true
-->

**Example Response Check Connection**  
`/POST https://developerserver.com/check_connection_options`

```json
{
  "valid": false,
  "messages" [
    {
      "text": "Your account ID is invalid",
      "type": "ERROR"
    }
  ]
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Validation Credentials
> The step of validating the credentials is optional. It does not change how the app operates. It is best practice to authenticate the user against your database or the downstream provider service. 

</div>
</div>
</div>

Once the app is installed, it will be made available for configuration by merchants and API users. A merchant can navigate to the Shipping Manager and enable, configure and disable the carrier for any defined zone.

### API Installation Workflow

To set up a carrier using the API, first connect it using the Connect Carrier API. Make a request containing the connection settings required by your carrier. The ID of the carrier is required. The carrier ID will be issued by BigCommerce when your carrier is registered. All connection fields are unique per carrier. If your carrier doesn’t require any connection settings then this object can be left empty.


<!--
title: "Sample Request "
subtitle: "POST https://developerserver.com/shipping/carrier/connection"
lineNumbers: true
-->

**Example Request Carrier Connection**  
`/POST https://developerserver.com/shipping/carrier/connection`

```json
{
  "carrier_id": "carrier_33",
  "connection": {
    "key": "userKey",
    "account_number": "userAccountNumber"
  }
}
```

<!--
title: "Sample Request with Empty Object"
subtitle: "POST https://developerserver.com/shipping/carrier/connection"
lineNumbers: true
-->


**Exampe Request with Empty Object**  
`/POST https://developerserver.com/shipping/carrier/connection`

```json
{
  "carrier_id": "carrier_33",
  "connection": {}
}
```

Once connected, it’s possible to create shipping methods for a connected carrier in any shipping zone. Shipping zones can be queried using the Shipping Zones resource. For any zone, a request can be made to the Shipping Methods resource using the zone ID from the Shipping Zones resource to create a new method for the connected carrier. The shipping carrier’s ID is required in the type field.
<!--
title: "Sample Request"
subtitle: "POST https://api.bigcommerce.com/stores/{store_hash}/v2/shipping/zones/{zone_id}/methods"
lineNumbers: true
-->

**Example Request Shipping Method**  
`/POST https://api.bigcommerce.com/stores/{store_hash}/v2/shipping/zones/{zone_id}/methods`

```json
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
title: "Sample Response"
subtitle: "POST https://api.bigcommerce.com/stores/{store_hash}/v2/shipping/zones/{zone_id}/methods"
lineNumbers: true
-->

**Example Response Shipping Methods**  
`/POST https://api.bigcommerce.com/stores/{store_hash}/v2/shipping/zones/{zone_id}/methods`

```json
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

---

<a href='#shipping_provider-return_shipping_quotes' aria-hidden='true' class='block-anchor'  id='shipping_provider-return_shipping_quotes'><i aria-hidden='true' class='linkify icon'></i></a>

## Returning Shipping Quotes

Whenever shipping rates are required, BigCommerce checks its internal cache for valid entries. If a valid entry exists, it will be used and the shipping carrier will not be called. If a valid cache entry does not exist, a request is made to the Quote URL with details of the items to be shipped, the shipping origin, and shipping destination. If any connection settings or zone settings are configured, these are also included. The shipping carrier must then respond with zero or more Shipping Quotes.

<!--
title: "Sample Request"
subtitle: "POST https://developerserver.com/rate"
lineNumbers: true
-->
**Example Request Shipping Rates**  
`/POST https://developerserver.com/rate`

```json
{
  "base_options": {
    "origin": {
      "street_1": "685 MARKET ST",
      "street_2": "",
      "zip": "94105",
      "city": "SAN FRANCISCO",
      "state_iso2": "CA",
      "country_iso2": "US",
      "address_type": "commercial"
    },
    "destination": {
      "street_1": "",
      "street_2": "",
      "zip": "94103",
      "city": "",
      "state_iso2": "CA",
      "country_iso2": "US",
      "address_type": "residential"
    },
    "items": [
      {
        "sku": "SKU-100",
        "variant_id": "1",
        "product_id": "1",
        "name": "Shirt",
        "length": {
          "units": "in",
          "value": 1
        },
        "width": {
          "units": "in",
          "value": 1
        },
        "height": {
          "units": "in",
          "value": 1
        },
        "weight": {
          "units": "oz",
          "value": 1
        },
        "discounted_price": {
          "currency": "USD",
          "amount": "10"
        },
        "declared_value": {
          "currency": "USD",
          "amount": "10"
        },
        "quantity": 1,
        "attributes": []
      }
    ],
    "customer": {
      "customer_groups": [
        {
          "customer_group_id": 5,
          "customer_group_name": "Retail"
        }
      ],
      "customer_id": 6
    },
    "store_id": "ru7t7fv9",
    "request_context": {
      "reference_values": [
        {
          "name": "cart_id",
          "value": "8"
        }
      ]
    }
  },
  "connection_options": {
    "key": "userKey",
    "account_number": "userAccountNumber"
  },
  "zone_options": {
    "show_transit_time": true
  },
  "rate_options": []
}
```

<!--
title: "Sample Response"
subtitle: "POST https://developerserver.com/rate"
lineNumbers: true
-->

**Example Response Shipping Rates**  
`POST https://developerserver.com/rate`

```json
{
  "quote_id": "sample_quote",
  "messages": [],
  "carrier_quotes": [
    {
      "carrier_info": {
        "code": "usps_pitney_bowes",
        "display_name": "USPS"
      },
      "quotes": [
        {
          "code": "",
          "rate_id": "9vcV1JfckPJZW2pjeNXcKP5y",
          "display_name": "USPS Priority Mail",
          "cost": {
            "currency": "USD",
            "amount": 6.35
          },
          "transit_time": {
            "units": "BUSINESS_DAYS",
            "duration": 1
          },
          "dispatch_date": "2018-08-29T00:00:00-05:00"
        },
        {
          "code": "",
          "rate_id": "EakTRTvck2XYGVAQw9Mza8WW",
          "display_name": "USPS Priority Mail Express",
          "cost": {
            "currency": "USD",
            "amount": 22.98
          },
          "transit_time": {
            "units": "BUSINESS_DAYS",
            "duration": 1
          },
          "dispatch_date": "2018-08-29T00:00:00-05:00"
        }
      ]
    },
    {
      "carrier_info": {
        "code": "fedex",
        "display_name": "FedEx"
      },
      "quotes": [
        {
          "code": "GND",
          "rate_id": "JnQ2MPqkAMX9cBsw0jyt551R",
          "display_name": "FedEx Ground",
          "cost": {
            "currency": "USD",
            "amount": 8.53
          },
          "transit_time": {
            "units": "BUSINESS_DAYS",
            "duration": 1
          },
          "dispatch_date": "2018-09-05T11:00:00-05:00"
        },
        {
          "code": "2DA",
          "rate_id": "QwygEz9XjZx1bT9rfDZsVxSy",
          "display_name": "FedEx 2 Day",
          "cost": {
            "currency": "USD",
            "amount": 10.47
          },
          "transit_time": {
            "units": "BUSINESS_DAYS",
            "duration": 2
          },
          "dispatch_date": "2018-09-05T11:00:00-05:00"
        }
      ]
    }
  ]
}
```

When an app with an associated shipping carrier is uninstalled, all of the shipping methods and the connection info for that carrier is automatically removed from the store. Quote requests will no longer be made and users will no longer see shipping quotes for that carrier.

---

<a href='#shipping_provider-submitting-app' aria-hidden='true' class='block-anchor'  id='shipping_provider-submitting-app'><i aria-hidden='true' class='linkify icon'></i></a>

## Submitting the App

Before submitting your app make sure you have the following information. 

**Single Carrier vs Multi Carrier**

Whether the app is a single carrier or multiple carriers. A single carrier app will offer one service such as USPS. A multi carrier app will offer more than one carrier such as USPS, DHL and Canada Post. 

**Name and Description**

Name and description of the shipping carrier or carriers. 

**Logo**

A 70x70 pixel logo that represents the shipping carrier app. 

**Configuration Fields**

Any shipping zone-specific or connection-specific fields to be made available to merchants or APIs for configuration. Configuration fields can include which rates to offer, packaging type or packing method.  

To sumbit your app send an email to <a href="shippingproviderapi@bigcommerce.com">shippingproviderapi@bigcommerce.com</a>.

---

<a href='#shipping_provider-app_diagram' aria-hidden='true' class='block-anchor'  id='shipping_provider-app_diagram'><i aria-hidden='true' class='linkify icon'></i></a>

## App Diagram

<!--
    title: #### Carrier Service API

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1552664566834
-->

#### Carrier Service API
![#### Carrier Service API
](//s3.amazonaws.com/user-content.stoplight.io/6012/1552664566834 "#### Carrier Service API
")

Only one registered shipping carrier may be associated with an app. This [registered carrier](#shipping_provider-definitions) can provide quotes from multiple downstream carriers if desired. In this case it will become a multi-carrier aggregator.

---

<a href='#shipping_provider-definitions' aria-hidden='true' class='block-anchor'  id='shipping_provider-definitions'><i aria-hidden='true' class='linkify icon'></i></a>

## Definitions

| Name | Description |
| -- | -- |
| Configuration Fields | The fields the merchant will see in the control panel. Merchants can navigate to the Shipping Manager and enable, configure and disable the carrier for any defined zone. They will also be able to activate the app using the Carrier Connection API. Then use the Shipping Zones API and Shipping Methods API to configure the app from there. |
| Quote URL | A URL for a resource of the shipping carrier that accepts quote requests and responds with shipping quotes. For more on the Quote URL see typical app workflow below.| 
| Single Carrier vs Multi Carrier | A single carrier app will offer only one shipping provider. A multi carrier app will aggregate multiple shipping carriers in one app.| 
| Countries Available | A list of countries where the shipping carrier can be used. The default behavior is that the carrier is available for every shipping origin. In most cases this list should be as broad as possible. For example, if your carrier operates worldwide, make it available worldwide. The countries can be limited further than what the shipping carrier has provided. If the service is worldwide, then leave this field blank to specify that it is worldwide. This is an optional step. |
| Shipping Carrier |  A shipping carrier is what is built to provide quotes to BigCommerce. If a shipping carrier uses more than one shipping provider then it becomes a multi carrier aggregator. A carrier includes a name, description and a logo. |
| Multi-Carrier Aggregator | A shipping solution that provides shipping quotes for multiple carriers.|
| Check Connection Options URL | A URL for a shipping carrier resource that accepts check requests containing the connection options provided by a user when enabling the carrier and indicates whether or not those settings are valid. This is an optional step. |
| Shipping Quote | An estimation of cost to ship a set of items from an origin to a destination. |
| Shipping Zone | Describes a set of destination addresses and the applicable shipping settings, such as handling fees and available shipping methods.|
| Shipping Origin | The location from which goods are shipped. This determines which shipping carriers are available for the merchant to configure in the control panel. |

---

<a href='#shipping_provider-faq' aria-hidden='true' class='block-anchor'  id='shipping_provider-faq'><i aria-hidden='true' class='linkify icon'></i></a>

## FAQ
**Can I publish more than one app at a time?**  
No, only one app at a time can be published. The others can be for use as testing or as private apps.

---

## Resources
### Webhooks
- [Shipping](/api-docs/getting-started/webhooks/webhook-events#webhook-events_shipment)
### Related Endpoints
- [Shipping Provider](/api-reference/store-management/shipping-provider-api)
- [Shipping Zones](/api-reference/store-management/shipping-api/shipping-zones)
- [Shipping Methods](/api-reference/store-management/shipping-api/shipping-method)
- [Shipping Carriers](/api-reference/store-management/shipping-api/shipping-carrier)
### Related Articles
- [App Store Approval Requirements](https://developer.bigcommerce.com/api-docs/partner/app-store-approval-requirements)

