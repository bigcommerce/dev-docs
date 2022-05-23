# Shipping Providers

Shipping service providers who wish to offer shipping services and rates to BigCommerce merchants and shoppers can implement endpoints through BigCommerce. Once they implement and accept their service into BigCommerce's shipping carrier registry, merchants can then enable and configure the service through their BigCommerce control panel. Once enabled on a store, BigCommerce will automatically retrieve the service options and rates using the provider's endpoints and display them to merchants in the store's control panel and to shoppers on the storefront.

The Shipping Provider API allows many functionalities:

- Drop-shippers can require their own rates
- Merchants can retrieve rates from custom shipping tables or in-house shipping rate calculation services 
- Shoppers can create a combination of in-store pickup and shipping options

This article guides developers on how to create a shipping provider app that will make your shipping rates available to merchants and shoppers on demand.

### Prerequisites

* Required [OAuth Scopes](/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes) scopes: `Information and Settings`
* Get familiar with [Introduction to Building Apps](/api-docs/getting-started/building-apps-bigcommerce/building-apps) for building [single-click apps](/api-docs/apps/guide/types#single-click).


## Shipping app overview

![Shipping App Overview](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Shipping%20App%20Overview.png)

### Single-carrier versus multi-carrier apps

A single-carrier app offers one service, for example, USPS. A multi-carrier app offers more than one carrier, for example, USPS, DHL, and Canada Post. You can only associate one registered shipping carrier with an app. This [registered carrier](#definitions) can provide quotes from multiple downstream carriers. 

BigCommerce makes a distinction between single-carrier and multi-carrier shipping providers. The primary difference is how the quote displays in the customer's cart at checkout. If your app is registered as a single carrier, the name of the carrier providing the quote will appear beside the name of the shipping quote in the customer's list of shipping rate options. The carrier name will not appear in quotes from multi-carrier apps. The following images illustrate the difference:

**Single-carrier quote example**

![Single-carrier quote example](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Single%20Carrier%20Example.png)

**Multi-carrier quote example**

![Multi-carrier quote example](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Multi%20Carrier%20Example.png)

## Sign up
When your app is complete, it will be listed in our carrier registry, so that your shipping rates are available for merchants and shoppers to use. Register your app and get a carrier ID to get started.


### Register your app

We need your app ID to generate a carrier ID for your shipping service. To get your app ID, [create a draft app](/api-docs/apps/guide/development#registering-a-draft-app) in [Developer Tools](https://devtools.bigcommerce.com/), and fill in the information requested on the [Step 3: Technical tab](/api-docs/apps/guide/publishing#add-technical-information). After you save the app, the developer tools control panel will navigate to a URL that includes your app's unique ID. 

![App ID](https://s3.amazonaws.com/user-content.stoplight.io/6012/1552664114224 "App ID")

### Request a carrier ID

To get your app set up and request a carrier ID, send an email to
<a href="mailto:shippingproviderapi@bigcommerce.com">shippingproviderapi@bigcommerce.com</a>.

Please include the following information:

- Name of app
- Your app's ID
- Your email
- A description of the app
- [Your service URLs](#your-service-urls) 
- [Whether you prefer single-carrier or multi-carrier status](#single-carrier-versus-multi-carrier-apps)

<!-- theme:info -->
> #### Note
> The description of the app is displayed to merchants in the store control panel.

## Before development

BigCommerce sends requests to your server to validate merchant credentials and obtain shipping quotes. To handle these requests smoothly, consider the following:

### Your service URLs

Because BigCommerce sends requests to your app, you need to provide BigCommerce with the following:

- **Request Shipping Rates URL**: a URL that accepts quote requests from BigCommerce. You will provide shipping quotes from this URL.
- **Validate Connection Options URL** (optional): a URL to check and validate connection options during app registration. BigCommerce will send requests to this URL to ensure that a merchant’s connection settings are valid. You can perform any necessary checks, such as looking up a merchant's app credentials in your database or calling a downstream service to verify them. 

These urls can be any valid HTTPS URLs that use port `443`, for example `https://example.com/rate`. Replace `example.com` and `rate` with your own host and path. 

### Request and response bodies

BigCommerce will send and receive data from your service URLs using JSON.  

- To see how BigCommerce will format requests for rates and how you will need to format responses, see [Request shipping rates](/api-reference/providers/shipping-provider-api/shipping-provider/requestshippingrates). 

- To see how BigCommerce will format requests for validating merchant connection options and how you will need to format responses, see [Validate connection options](/api-reference/providers/shipping-provider-api/shipping-provider/validateconnectionoptions).

### Error handling

To handle errors, include human-readable error messages in the responses that you send. Here are example responses that include error messages for the [Request shipping rates](/api-reference/providers/shipping-provider-api/shipping-provider/requestshippingrates) endpoint and the [Validate Connection Options](/api-reference/providers/shipping-provider-api/shipping-provider/validateconnectionoptions) endpoint. The error message appears under the `messages` key.

<!--
type: tab
title: Request Shipping Rates
-->

```json title="Example response with error message" lineNumbers
{
  "quote_id": "example id",
  "messages": [
    {
      "text": "Invalid connection options",
      "type": "ERROR"
    }
  ],
  "carrier_quotes": []
}
```

<!--
type: tab
title: Validate Connection Options
-->

```json title="Example response with error message" lineNumbers
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

<!-- type: tab-end  -->

## Develop the app

To use the Shipping Provider API to provide shipping quotes, you must build a BigCommerce [single-click app](/api-docs/apps/guide/types#single-click). For more info on how to get started, see [BigCommerce Apps Quick Start](/api-docs/partner/getting-started/app-development/tutorials/quick-start).

Building a BigCommerce app allows you to create [app API credentials](/api-docs/getting-started/authentication/authenticating-bigcommerce-apis#app-api-credentials) and promote your solution in the BigCommerce app marketplace. Having a BigCommerce app allows merchants to configure shipping provider settings and/or order fulfillment via an iFrame in the BigCommerce control panel.

For more information, see our [Introduction to Building Apps](/api-docs/apps/guide/intro).

### Configuration fields

Connection fields are any shipping zone-specific or connection-specific fields that you would like merchants or API users to use when they [connect your app to their store](#how-your-app-will-be-connected-to-a-store). 

Configuration fields can include which rates to offer, packaging type, or packing method. 

If you would like connection options to be set up for your carrier, please specify the following for each connection option:
- Label: This is the text that will be displayed on the merchant's UI
- Whether or not the connection option is required 
- Type of connection option

These are the types of connection options that we currently allow:
- Text
- Checkbox 
- Select
- Multi Select
- Password

Here are examples of a what you may have for a connection option:

<!-- 
type: tab
title: Text 
-->

```text title="Example Connection Option" lineNumbers 
- Label: Special ID
- Required: false
- Type: text
```

<!-- 
type: tab
title: Checkbox 
-->

```text title="Example Connection Option" lineNumbers 
- Label: Shipping Rate
- Required: false
- Type: Checkbox
- Values: Enable Expedited Shipping
```

<!-- 
type: tab
title: Select 
-->

```text title="Example Connection Option" lineNumbers 
- Label: Packaging Type
- Required: false
- Type: select
- Values: Anti-corrosive, Plastics, Cardboard
```

<!-- 
type: tab
title: Multi Select
-->

```text title="Example Connection Option" lineNumbers 
- Label: Packaging Method
- Required: false
- Type: Multi Select
- Values: Extra primary packaging, Extra secondary packaging, Extra tertiary packaging
```

<!-- 
type: tab
title: Password 
--> 

```text title="Example Connection Option" lineNumbers 
- Label: API Key
- Required: true
- Type: password
```

<!-- type: tab-end -->


You can submit the configuration fields when you [submit the app](#submit-the-app). We will then send you a `code` for each connection option. API users will specify each `code` as a property under the `connection` object when they [connect your carrier to their store](#...). BigCommerce will also include each `code` when we [request rates from your carrier](#provide-shipping-rates-to-bigcommerce) as properties under the `connection` object. 


For example, if you choose to have an API key and expedited shipping connection option as a text and checkbox 

![Connect Carrier via UI](https://storage.googleapis.com/bigcommerce-production-dev-center/images/connection%20settings.png) 

## Submit the app

To submit your app, send an email to <a href="mailto:shippingproviderapi@bigcommerce.com">shippingproviderapi@bigcommerce.com</a>. Include the following information when you submit your app:

- Whether your app is single-carrier or multi-carrier

- Name and description of the shipping carrier(s)

- Logo: A 70x70 pixel logo that represents the shipping carrier app

- Configuration fields: If you would like connection options to be set up for your carrier, specify the properties you would like to use as connection options (see [Configuration Fields](#configuration-fields)). 

## What's Next?

### How your app will be connected to a store

Once a merchant installs your app on their store, merchants and API users can connect your carrier to the store (your carrier can be connected via UI or API). 

A merchant can navigate to the Shipping Manager UI to enable your carrier app, input carrier connection settings, and disable your carrier app for any defined zone. This figure shows an example of how the connection fields that you provided BigCommerce will be shown to merchants in the control panel:

![Connect Carrier via UI](https://storage.googleapis.com/bigcommerce-production-dev-center/images/connection%20settings.png) 

An API user can connect your carrier to the store by using the [Create a carrier connection](/api-reference/store-management/shipping-api/shipping-carrier/postshippingcarrierconnection) endpoint. The connection fields that you provided BigCommerce are sent in the request.

<!-- theme:info  -->
> #### Note 
> When a merchant uninstalls your app from the store, the merchant removes all shipping methods and connection info for your carrier(s) from the store. BigCommerce will no longer be able to make quote requests and receive shipping quotes from your carrier.

### Validate connection options

When a merchant or API user tries to [connect your carrier to their store](#how-your-app-will-be-connected-to-a-store), BigCommerce will send a request to validate the connection options that they provide if you configured a Validate Connection Options URL for the carrier during app setup. Your response should indicate if the credentials are valid and explain what is wrong. 

<!--
type: tab
title: Request
-->

```json title="Example POST request with with X-Auth-Token header" lineNumbers
POST https://example.com/check_connection_options_example
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
{
  "connection_options": {
    "account_id": "example"
  }
}
```

<!--
type: tab
title: Response
--> 

```json title="Example POST response" lineNumbers
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
<!-- type: tab-end  -->

<!-- theme: info -->
> #### Credential validation
> It is best practice to authenticate the user and store against your database or the downstream provider service. However, if you did not provide a Validate Connection Options URL, a merchant's credentials are assumed to be valid as long as they pass type checks.


### Provide shipping rates to BigCommerce

When BigCommerce needs shipping rates, BigCommerce checks its internal cache for valid entries. If valid entries are present, BigCommerce uses these entries and does not make a request to your carrier. If a valid cache entry does not exist, BigCommerce makes a request to the [Request Shipping Rates URL](#your-service-urls) that you provided. The request will include details of the items to be shipped, the shipping origin, the shipping destination, and any connection or zone settings for your carrier. Your carrier must then respond with shipping quote(s).

<!--
type: tab
title: Request
--> 

```json title="Example POST request with X-Auth-Token header" lineNumbers
POST https://example.com/rate
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

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
type: tab
title: Response
--> 

```json title="Example POST response" lineNumbers
{
  "quote_id": "example_quote",
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

<!-- type: tab-end  -->

If no shipping quotes are available, the your carrier will send a response with the following format for the shipping quote:

```json title="Example POST response" lineNumbers
{
  "quote_id": "example_quote",
  "messages": [],
  "carrier_quotes": []
}
```

<!-- theme: info -->
> #### Note
> The response displays shipping quotes from lowest to highest price.

#### Product metadata in rate requests

When requesting rates, BigCommerce passes product metadata specifc to your carrier via product and variant metafields. This product metadata can be useful if your service depends on specific fields that are not existent on BigCommerce products or variants by default.

The metafields you receive from BigCommerce requests have the following characteristics:   

- Are product or variant metafields (category, brand, or other metafields cannot be passed in rate requests) 
- Have a metafield `permission_set` of `read` or `write`
- Have a metafield `namespace` that matches this format: `shipping_carrier_<carrier_id>` (for example, `shipping_carrier_72`)

The carrier registration process described in the [Sign up](#sign-up) section provides the `carrier_id`.

For more information on product and variant metafields, see:

- [API Reference > Store Management > Catalog > Product Metafields](/api-reference/store-management/catalog/product-metafields)
- [API Reference > Store Management > Catalog > Product Variant Metafields](/api-reference/store-management/catalog/product-variants-metafields)


## Definitions

| Name | Description |
| ---- | ---- |
| Configuration Fields | The fields the merchant will see in the control panel. Merchants can navigate to the Shipping Manager and enable, configure, and disable the carrier for any defined zone. They will also be able to activate the app using the Carrier Connection API. Then use the Shipping Zones API and Shipping Methods API to configure the app from there.|
| Quote URL | A URL for a resource of the shipping carrier that accepts quote requests and responds with shipping quotes. For more on the Quote URL, see a typical app workflow below.|
| Single Carrier or Multi Carrier | A single carrier app will offer only one shipping provider. A multi carrier app will aggregate multiple shipping carriers in one app.|
| Countries Available | A list of countries where you can use the shipping carrier. The default behavior is that the carrier is available for every shipping origin. In most cases, this list should be as broad as possible. For example, if your carrier operates worldwide, make it available worldwide. You can limit the countries further than what the shipping carrier has provided. If the service is worldwide, then leave this field blank to specify that it is worldwide. Specifying the use of the shipping carrier is an optional step. |
| Shipping Carrier | A shipping carrier provides quotes to BigCommerce. If a shipping carrier uses more than one shipping provider, then it becomes a multi carrier aggregator. A carrier includes a name, a description, and a logo.|
| Multi-Carrier Aggregator | A shipping solution that provides shipping quotes for multiple carriers. |
| Check Connection Options URL | A URL for a shipping carrier resource that accepts check requests containing the connection options provided by a user when enabling the carrier and indicates whether or not those settings are valid. This is an optional step.|
| Shipping Quote | An estimation of the cost to ship a set of items from an origin to a destination.|
| Shipping Zone | Describes a set of destination addresses and the applicable shipping settings, such as handling fees and available shipping methods.|
| Shipping Origin | The location from which goods are shipped. This origin determines which shipping carriers are available for the merchant to configure in the control panel.|

## FAQ

**Can I publish more than one app at a time?**

No, you can only publish one app at a time. The others can be for use as testing or as private apps.

## Resources

### Articles
- [App Store Approval Requirements](/api-docs/apps/guide/requirements)


### Endpoints

- [Shipping Providers](/api-reference/providers/shipping-provider-api)
- [Shipping Zones](/api-reference/store-management/shipping-api/shipping-zones)
- [Shipping Methods](/api-reference/store-management/shipping-api/shipping-method)
- [Shipping Carriers](/api-reference/store-management/shipping-api/shipping-carrier)

### Webhooks

- [Webhooks](/api-docs/store-management/webhooks/webhook-events#shipment)
