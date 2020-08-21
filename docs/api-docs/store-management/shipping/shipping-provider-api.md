#  Shipping Providers

<div class="otp" id="no-index">

### On this page
- [Sign-up](#sign-up)
- [Before development](#before-development)
- [Developing the app](#developing-the-app)
- [Control panel installation workflow](#control-panel-installation-workflow)
- [Validation credentials](#validation-credentials)
- [API installation workflow](#api-installation-workflow)
- [Returning shipping quotes](#returning-shipping-quotes)
- [Including product metatadata in rate requests](#including-product-metatadata-in-rate-requests)
- [Submitting the app](#submitting-the-app)
- [App diagram](#app-diagram)
- [Definitions](#definitions)
- [FAQ](#faq)
- [Resources](#resources)

</div>

Shipping service providers wishing to offer shipping services and rates to BigCommerce merchants and shoppers can implement BigCommerce Shipping Provider endpoints. Once they implement and accept their service into BigCommerce's shipping Carrier Registry, merchants will have access to enable and configure the service through their BigCommerce control panel. Once enabled on a store, BigCommerce will automatically retrieve the service options and rates via the provider's endpoints and display them to merchants in the store's control panel and to shoppers on the storefront.

Shipping Provider endpoints can also be used by merchants to retrieve rates from custom shipping tables or an in-house shipping rate calculation service.

Some use cases for the Shipping Provider API are:

* A drop-shipper that requires their own rates
* A merchant that already has a shipping table
* Third-party logistics
* Create a combination of in-store pickup and shipping options for shoppers

### Prerequisites
Required [OAuth](/api-docs/getting-started/authentication#authentication_oauth-scopes) scopes: `Information and Settings`

## Sign-up

When creating your app, add the shipping data to our Carrier Registry, so it returns to shoppers on the front-end.

To get your app setup, send an email to
<a href="mailto:shippingproviderapi@bigcommerce.com">shippingproviderapi@bigcommerce.com</a>.

Please include:
* Name
* Partner ID
* App ID (see below)
* Email
* Description of the app

To get your app ID, create an app in [Developer Tools](https://devtools.bigcommerce.com/), and fill out the information on [Step 3 Technical](https://developer.bigcommerce.com/api-docs/apps/guide/requirements#technical). In the URL, the app will have a unique ID. Send the unique ID in exchange for a carrier ID to test the app.

![#### App ID](//s3.amazonaws.com/user-content.stoplight.io/6012/1552664114224 "#### App ID")

## Before development

BigCommerce will send requests to your server to get information back about shipping quotes, credential validation, and configuration.

### Your service URLs
Since BigCommerce will be sending requests, you will need to provide BigCommerce with URLs that can accept quote requests and optionally a URL to check and validate connection options during app registration. These can be any valid HTTPS URL using port `443`, for example:

`https://yourhost.com/rate`

Replace your host and rate with your own host and path.

### Routes

You should create a URL to provide shipping quotes on your API and check the available shipping rates. The second URL (optional) checks to ensure the merchant’s connection settings are valid. It can perform any checks necessary to do so, such as looking up credentials in your database or calling a downstream service to verify them.

### Requests and responses

BigCommerce will send and receive data using JSON. The request for rates will always be formatted using the [Base Rate Request Model](https://developer.bigcommerce.com/api-reference/store-management/shipping-provider-api/shipping-provider/requestshippingrates). The response for rates should be formatted using the [Carrier Quote Object](https://developer.bigcommerce.com/api-reference/store-management/shipping-provider-api/shipping-provider/requestshippingrates). Format the request to check for merchant app credentials as Check Connection Options Request Payload, and the response should be formatted using the Check Connection Options Response Payload.

### Error handling
In the case of errors, include error messages in the response payload under the messages key.

Example:

```json
{
  "valid": false,
  "messages": [
    {
      "text": "Your account ID is invalid",
      "type": "ERROR"
    }
  ]
}
```

## Developing the app

The intended use of the Shipping Provider API is to create an app that merchants can install on their store. The Shipping Provider API can be a standalone app or part of an existing application. When developing the app, there are a few things to consider, which are listed below.

## Control Panel installation workflow

During the app setup, if you configure the Check Connection Options URL for the carrier, an attempt to connect the carrier via the Shipping Manager UI or the Connect Carrier API causes a request to be made to that URL with the provided options. The resource should respond by indicating if the credentials are valid and explain what is wrong. If you did not configure this URL, this check is not required and the credentials are assumed valid as long as they pass type checks.

**Example request check connection**
`/POST https://developerserver.com/check_connection_options`

```json
{
  "connection_options": {
    "account_id": "a1ty"
  }
}
```

**Example response check connection**
`/POST https://developerserver.com/check_connection_options`

```json
{
  "valid": false,
  "messages": [
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

## Validation credentials
> The step of validating the credentials is optional. It does not change how the app operates. It is best practice to authenticate the user against your database or the downstream provider service.

</div>
</div>
</div>

Once you install the app, it will be made available for configuration by merchants and API users. A merchant can navigate to the Shipping Manager and enable, configure, and disable the carrier for any defined zone.

## API installation workflow

To set up a carrier using the API, first, connect it using the Connect Carrier API. Make a request containing the connection settings required by your carrier. The ID of the carrier is required. The carrier ID will be issued by BigCommerce when your carrier is registered. All connection fields are unique per carrier. If your carrier doesn’t require any connection settings, then this object can be left empty.

<!--
title: "Sample Request "
subtitle: "POST https://developerserver.com/shipping/carrier/connection"
lineNumbers: true
-->

**Example request carrier connection**
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

**Example request with empty object**
`/POST https://developerserver.com/shipping/carrier/connection`

```json
{
  "carrier_id": "carrier_33",
  "connection": {}
}
```

Once connected, it’s possible to create shipping methods for a connected carrier in any shipping zone. You can query shipping zones using the Shipping Zones resource. For any zone, a request can be made to the Shipping Methods resource using the zone ID from the Shipping Zones resource to create a new method for the connected carrier. You are required to enter the shipping carrier’s ID in the type field.
<!--
title: "Sample Request"
subtitle: "POST https://api.bigcommerce.com/stores/{store_hash}/v2/shipping/zones/{zone_id}/methods"
lineNumbers: true
-->

**Example request shipping method**
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

**Example response shipping methods**
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

## Returning shipping quotes

Whenever shipping rates are required, BigCommerce checks its internal cache for valid entries. BigCommerce uses valid entries and does not call the shipping carrier. If a valid cache entry does not exist, BigCommerce makes a request to the Quote URL with details of the items to be shipped, the shipping origin, and the shipping destination. If you configured any connection settings or zone settings, include these. The shipping carrier must then respond with zero or more shipping quotes.

<!--
title: "Sample Request"
subtitle: "POST https://developerserver.com/rate"
lineNumbers: true
-->
**Example request shipping rates**
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

**Example response shipping rates**
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

When you uninstall an app with an associated shipping carrier, you also automatically remove all of the shipping methods and connection info for that carrier from the store. You can no longer make quote requests, and users will no longer see shipping quotes for that carrier.

## Including product metatadata in rate requests

BigCommerce passes carrier-specific product metadata to a carrier service in a rate request via product and variant metafields. This product metadata can be useful if your service depends on specific fields that are not existent on BigCommerce products or variants by default.

To pass metadata in a rate request, the metafields must meet the following requirements:

* must be a product or variant metafields (you cannot pass category, brand, and other metafields in rate requests)
* `permission_set` on the metafield must be `read` or `write`
* `namespace` on the metafield must match this format: `shipping_carrier_carrier_id` (example: `shipping_carrier_72`)

The carrier registration process described in the [Sign-up Section](https://developer.bigcommerce.com/api-docs/store-management/shipping/shipping-provider-api#sign-up) provides the `carrier_id`.

For more information on product and variant metafields, see:
* [API Reference > Store Management > Catalog > Product Metafields](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-metafields)
* [API Reference > Store Management > Catalog > Product Variant Metafields](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants-metafields)

## Submitting the app

Before submitting your app, make sure you have the following information.

**Single carrier vs. multi carrier**

Whether the app is a single carrier or multiple carriers. A single carrier app will offer one service, such as USPS. A multi carrier app will offer more than one carrier such as USPS, DHL, and Canada Post.

**Name and description**

Name and description of the shipping carrier or carriers.

**Logo**

A 70x70 pixel logo that represents the shipping carrier app.

**Configuration fields**

Any shipping zone-specific or connection-specific fields to be made available to merchants or APIs for configuration. Configuration fields can include which rates to offer, packaging type, or packing method.

To submit your app, send an email to <a href="mailto:shippingproviderapi@bigcommerce.com">shippingproviderapi@bigcommerce.com</a>.

## App diagram

<!--
    title: #### Carrier Service API

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1552664566834
-->

#### Carrier Service API
![#### Carrier Service API
](//s3.amazonaws.com/user-content.stoplight.io/6012/1552664566834 "#### Carrier Service API
")

Only one registered shipping carrier may be associated with an app. This [registered carrier](#shipping_provider-definitions) can provide quotes from multiple downstream carriers if desired. In this case, it will become a multi-carrier aggregator.

## Definitions

| Name | Description |
| -- | -- |
| Configuration Fields | The fields the merchant will see in the control panel. Merchants can navigate to the Shipping Manager and enable, configure, and disable the carrier for any defined zone. They will also be able to activate the app using the Carrier Connection API. Then use the Shipping Zones API and Shipping Methods API to configure the app from there. |
| Quote URL | A URL for a resource of the shipping carrier that accepts quote requests and responds with shipping quotes. For more on the Quote URL, see a typical app workflow below.|
| Single Carrier vs Multi Carrier | A single carrier app will offer only one shipping provider. A multi carrier app will aggregate multiple shipping carriers in one app.|
| Countries Available | A list of countries where you can use the shipping carrier. The default behavior is that the carrier is available for every shipping origin. In most cases, this list should be as broad as possible. For example, if your carrier operates worldwide, make it available worldwide. The countries can be limited further than what the shipping carrier has provided. If the service is worldwide, then leave this field blank to specify that it is worldwide. Specifying the use of the shipping carrier is an optional step. |
| Shipping Carrier |  A shipping carrier provides quotes to BigCommerce. If a shipping carrier uses more than one shipping provider, then it becomes a multi carrier aggregator. A carrier includes a name, a description, and a logo. |
| Multi-Carrier Aggregator | A shipping solution that provides shipping quotes for multiple carriers.|
| Check Connection Options URL | A URL for a shipping carrier resource that accepts check requests containing the connection options provided by a user when enabling the carrier and indicates whether or not those settings are valid. This is an optional step. |
| Shipping Quote | An estimation of the cost to ship a set of items from an origin to a destination. |
| Shipping Zone | Describes a set of destination addresses and the applicable shipping settings, such as handling fees and available shipping methods.|
| Shipping Origin | The location from which goods are shipped. This origin determines which shipping carriers are available for the merchant to configure in the control panel. |

## FAQ
**Can I publish more than one app at a time?**

No, you can only publish one app at a time. The others can be for use as testing or as private apps.

## Resources
### Webhooks
- [Shipping](/api-docs/getting-started/webhooks/webhook-events#webhook-events_shipment)
### Related endpoints
- [Shipping Provider](/api-reference/store-management/shipping-provider-api)
- [Shipping Zones](/api-reference/store-management/shipping-api/shipping-zones)
- [Shipping Methods](/api-reference/store-management/shipping-api/shipping-method)
- [Shipping Carriers](/api-reference/store-management/shipping-api/shipping-carrier)
### Related articles
- [App Store Approval Requirements](https://developer.bigcommerce.com/api-docs/partner/app-store-approval-requirements)
