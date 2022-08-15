# Become a Shipping Provider

Shipping providers can offer shipping services and rates to BigCommerce merchants and shoppers. They must implement endpoints through BigCommerce. 

Benefits of using a shipping provider include the following: 
- Drop-shippers can set their own rates
- Merchants can retrieve rates from custom shipping tables
- Merchants can retrieve rates from in-house calculation services
- Shoppers can create a combination of in-store pickup and shipping options

This article guides you on how to create and register a shipping provider app at BigCommerce. 

## Prerequisites

* Get familiar with the [Introduction to Building Apps](/api-docs/getting-started/building-apps-bigcommerce/building-apps) article for building [single-click apps](/api-docs/apps/guide/types#single-click).

## Shipping app overview

Once shipping providers implement their endpoints and BigCommerce registers their shipping provider app, a merchant designated as store owner can install their app on the store. Merchants and API users can then connect the service on their store via the Shipping Manager UI and the [Shipping V2 API](/api-reference/store-management/shipping-api), respectively. Merchants and API users can define and enable a real-time shipping method for your carrier app in one or more shipping zones. They may set up a different shipping method for each shipping zone your carrier services. BigCommerce will then automatically retrieve the service options and rates using the provider's endpoints, displaying them to merchants in the store's control panel and to shoppers on the storefront. The following figure illustrates the workflow:

![Shipping Provider Overview](https://storage.googleapis.com/bigcommerce-production-dev-center/images/shipping-provider-figure.png)
![Shipping App Overview](https://storage.googleapis.com/bigcommerce-production-dev-center/images/ship%20prov%20api.png 'Shipping Provider API')

### Single-carrier versus multi-carrier shipping providers

A single-carrier shipping provider offers one service, for example, USPS. A multi-carrier shipping provider offers more than one service, for example, USPS, DHL, and Canada Post. In both cases, BigCommerce registers only one shipping carrier for a provider during [sign up](#sign-up). If you are a multi-carrier shipping provider, the registered carrier provides quotes from multiple downstream carriers. 

BigCommerce makes a distinction between single-carrier and multi-carrier shipping providers when you sign up. Your carrier status affects how your quotes display in the customer's cart at checkout. Specifically, if you sign up as a single carrier, the name of the carrier providing the quote appears beside the name of the shipping quote in the customer's list of shipping rate options. The carrier name does not appear in quotes if you sign up as a multi-carrier shipping provider. The following images illustrate the difference:

![Single-carrier quote example](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Single%20Carrier%20Example.png 'Single-carrier quote')

![Multi-carrier quote example](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Multi%20Carrier%20Example.png 'Multi-carrier quote')

## Develop the app

To use the Shipping Provider API to provide shipping quotes, you must build a BigCommerce [single-click app](/api-docs/apps/guide/types#single-click). For more info on how to get started, see the [BigCommerce Apps Quick Start](/api-docs/partner/getting-started/app-development/tutorials/quick-start) article.

Building a BigCommerce app allows you to create [app API credentials](/api-docs/getting-started/authentication/authenticating-bigcommerce-apis#app-api-credentials) and promote your solution in the BigCommerce app marketplace. Having a BigCommerce app allows merchants to configure shipping provider settings and/or order fulfillment via an iFrame in the BigCommerce control panel.

For more information, see our [Introduction to Building Apps](/api-docs/apps/guide/intro) article.

### Your app ID

BigCommerce assigns your app an ID when you create an app. You will need the app ID when you [sign up](#sign-up) as a shipping provider. To get your app ID, [create a draft app](/api-docs/apps/guide/development#registering-a-draft-app) in [Developer Tools](https://devtools.bigcommerce.com/), and fill in the information requested on the [Technical tab](/api-docs/apps/guide/publishing#add-technical-information). After you save the app, the developer tools control panel will navigate to a URL that includes your app's unique ID. 

![App ID](https://s3.amazonaws.com/user-content.stoplight.io/6012/1552664114224 "App ID")

### Your service URLs

BigCommerce sends requests to your server to validate merchant credentials and obtain shipping quotes. To handle these requests smoothly, you need to provide BigCommerce with the following when you [sign up](#sign-up):

- **Quote URL**: a URL that accepts quote requests from BigCommerce. You will provide shipping quotes from this URL.
- **Check Connection Options URL** (optional): a URL to check and validate connection options during app registration. BigCommerce will send requests to this URL to ensure that a merchant’s connection settings are valid. You can perform any necessary checks, such as looking up a merchant's app credentials in your database or calling a downstream service to verify them. 

These urls can be any valid HTTPS URLs that use port `443`, for example `https://example.com/rate`. Replace `example.com` and `rate` with your own host and path. 

### Request and response bodies

BigCommerce will send and receive data from your service URLs using JSON.  

- To see how BigCommerce will format requests for rates and how you will need to format responses, see the [Request shipping rates](/api-reference/providers/shipping-provider-api/shipping-provider/requestshippingrates) endpoint. 

- To see how BigCommerce will format requests for validating merchant connection options and how you will need to format responses, see the [Validate connection options](/api-reference/providers/shipping-provider-api/shipping-provider/validateconnectionoptions) endpoint.

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

### Configuration fields

Configuration fields are optional connection options or shipping settings options that you would like merchants or API users to use with your carrier. For example, connection options include keys/passwords and are set for the entire store. Settings options can be set for each shipping zone and include which rates to offer, packaging type, packing method, and more. The following figures show how your setting options and connection options will appear in the merchant control panel when a merchant [connects your app to their store](#how-your-app-will-be-connected-to-a-store):

![FedEx Settings](https://storage.googleapis.com/bigcommerce-production-dev-center/images/FedEx%20Settings.png 'Setting options')

![FedEx Connection Settings](https://storage.googleapis.com/bigcommerce-production-dev-center/images/FedEx%20Connection%20Settings.png 'Connection options')


#### How configuration fields are used
 
- **API users** and **merchants** use connection options when they [connect your app to a store](#how-your-app-will-be-connected-to-a-store). They will use the settings options when defining shipping methods that use your carrier. 
- **BigCommerce** will include values for connection options when we when we need you to [vaiidate connection options](#validate-connection-options) and [provide shipping rates](#provide-shipping-rates-to-bigcommerce). BigCommerce also sends settings options when we need you to provide shipping rates. 

#### Types of configuration options
These are the types of configuration (connection or settings) options that we currently allow:
- Text
- Checkbox 
- Select
- Multi-select
- Password

If you would like configuration options to be set up for your carrier, specify the following for each configuration option when you [sign up](#sign-up):
- **Label**: This is the text that will be displayed on the merchant's UI when they connect
- **Code**: This is an identifying code for the configuration option. Use snake case for codes. For a list of where these codes will be sent, see [How configuration fields are used](#how-configuration-fields-are-used)
- **Required**: Whether or not the configuration option is required 
- **Type**: Type of configuration option

For the select and multi-select configuration options, you need to specify the values that are available for merchants and API users.

Here are examples of what you would specify for the various types of configuration option:

<!-- 
type: tab
title: Text 
-->

```text title="Example connection option" lineNumbers 
- Label: Display Name
- Required: true
- Type: text
```

<!-- 
type: tab
title: Checkbox 
-->

```text title="Example connection option" lineNumbers 
- Label: Shipping Rate
- Required: false
- Type: Checkbox
- Values: Enable Expedited Shipping
```

<!-- 
type: tab
title: Select 
-->

```text title="Example connection option" lineNumbers 
- Label: Packaging Type
- Required: false
- Type: select
- Values: Anti-corrosive, Plastics, Cardboard
```

<!-- 
type: tab
title: Multi-select
-->

```text title="Example connection option" lineNumbers 
- Label: Packaging Method
- Required: false
- Type: Multi-select
- Values: Extra primary packaging, Extra secondary packaging, Extra tertiary packaging
```

<!-- 
type: tab
title: Password 
--> 

```text title="Example connection option" lineNumbers 
- Label: Password
- Required: true
- Type: password
```

<!-- type: tab-end -->


## Sign up
After you finish developing the app, you can sign up to be a shipping provider. Submit your app to BigCommerce and BigCommerce will register your app as a shipping provider. 

### What you should provide BigCommerce
Send an email to [ShippingProviderAPI@bigcommerce.com](mailto:shippingproviderapi@bigcommerce.com) that includes the following information:



- Name of app
- [Your app ID](#your-app-id)
- Your email
- A description of the app. The description is displayed to merchants in the store control panel.
- Logo: A 70x70 pixel logo that represents the shipping carrier app
- [Your service URLs](#your-service-urls) 
- [Whether you prefer single-carrier or multi-carrier status](#single-carrier-versus-multi-carrier-shipping-providers)
- [Configuration fields](#configuration-fields) (optional): For a list of items you need to provide, see [types of configuration options](#types-of-configuration-options).
- Countries Available (optional): A list of countries where merchants can use your carrier. Merchants who have a store origin address outside this list will not be able to use your carrier. 
  
  In most cases, this list should be as broad as possible. For example, if your carrier operates worldwide, make it available worldwide. You can limit the countries further than what your shipping carrier offers. If you don't provide the countries available, your carrier is available worldwide (i.e. for every shipping origin). 

After submitting your app, you will receive the a carrier ID. Both single-carrier and multi-carrier shipping providers receive one `carrier_id`.

### What you should document for API users
 
We recommend that you document your carrier ID and configuration option codes for API users who wish to use your carrier. For example, API users will specify the `carrier_id` and `code` for connections options when they [connect your carrier to their store](#how-your-app-will-be-connected-to-a-store). API users specify the `code` for settings options when they define your carrier's shipping method for their shipping zones.  


## How your app will be connected to a store

Once a merchant installs your app on their store, merchants and API users can connect your carrier to their store by using the connection options that you provided when you submitted your app.    

### How merchants will use your app
A merchant can navigate to the Shipping Manager UI to input carrier connection options. The UI displays the connection option's `label` that you provided when you submitted your app. The following figure is an example of how connection options are shown to merchants in the control panel:

![Connect Carrier via UI](https://storage.googleapis.com/bigcommerce-production-dev-center/images/connection%20options%20example.png 'Connection options in Shipping Manager') 

After connecting your carrier, a merchant can define and enable a real-time shipping method for your carrier app in one or more shipping zones. 

### How API users will use your app
API users can connect your carrier to the store by using the [Create a carrier connection](/api-reference/store-management/shipping-api/shipping-carrier/postshippingcarrierconnection) endpoint. In the request, API users will send the carrier ID that you received when you signed up, as well as values for your app's connection options. Specifically, API users will specify the `code` for each connection option as a property under the `connection` object when they connect to your carrier, for example:    

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

<!-- theme:info -->
> #### Document connection options

> We recommend that you document your connection option codes for API users who wish to connect your carrier.

API users can then define and enable a shipping method for your carrier in one or more shipping zones by using the [Create a shipping method](/api-reference/store-management/shipping-api/shipping-method/createashippingmethod) endpoint. In the request, API users will send values for your app's settings options which help determine the rates that your app sends to BigCommerce when BigCommerce requests a quote. For more info on how API users will use your carrier, see the [Use a Real-Time Carrier](/api-docs/store-management/shipping/use-real-time-carrier) article.

<!-- theme:info  -->
> #### Note 
> If a merchant uninstalls your app from the store, the merchant removes all shipping methods and connection info for your carrier(s) from the store. BigCommerce will no longer be able to make quote requests and receive shipping quotes from your carrier.

## API requests to your app

### Validate connection options

When a merchant tries to [connect your carrier to their store](#how-your-app-will-be-connected-to-a-store), BigCommerce will send a request to validate the connection options that the merchant provides if you configured a Check Connection Options URL for your carrier during app setup. Your response should indicate if the credentials are valid and explain what is wrong. For more info, see the [Validate connection options](/api-reference/providers/shipping-provider-api/shipping-provider/validateconnectionoptions) endpoint.  

<!--
type: tab
title: Request
-->

```json title="Example POST request with with X-Auth-Token header" lineNumbers
POST https://example.com/check_connection_options
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
> It is best practice to authenticate the user and store against your database or the downstream provider service. However, if you did not provide a Check Connection Options URL, a merchant's credentials are assumed to be valid as long as they pass type checks. 

Note that you can also authenticate merchant credentials when BigCommerce requests rates from your shipping provider in real time, as the connection options are also included in those requests.

### Provide shipping rates to BigCommerce

When BigCommerce needs shipping rates, BigCommerce checks its internal cache for valid entries. If valid entries are present, BigCommerce uses these entries and does not make a request to your carrier. If a valid cache entry does not exist, BigCommerce makes a request to the [Quote URL](#your-service-urls) that you provided. The request will include details of the items to be shipped, the shipping origin, the shipping destination, and [connection or zone settings options](#configuration-fields) for your carrier. Note that the `code` for each connection and settings option is included in the request under the `connection_options` and `zone_options` objects, respectively. Your carrier must then respond with shipping quote(s). For more info, see the [Request shipping rates](/api-reference/providers/shipping-provider-api/shipping-provider/requestshippingrates) endpoint.

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
> BigCommerce will display the shipping quotes that you return from lowest to highest price.

#### Product metadata in rate requests

When requesting rates, BigCommerce passes product metadata specifc to your carrier via product and variant metafields. This product metadata can be useful if your service depends on specific fields that are not existent on BigCommerce products or variants by default.

The metafields you receive from BigCommerce requests have the following characteristics:   

- Are product or variant metafields (category, brand, or other metafields cannot be passed in rate requests) 
- Have a metafield `permission_set` of `read`, `write`, `read_and_sf_access`, and `write_and_sf_access`.
- Have a metafield `namespace` that matches this format: `shipping_carrier_<carrier_id>` (for example, `shipping_carrier_72`)

  You receive the `carrier_id` when you [sign up](#sign-up) as a shipping provider.

For more information on product and variant metafields, see the following Catalog V3 API endpoints:

- Product Metafields, e.g. [Get All Product Metafields](/api-reference/store-management/catalog/product-metafields/getproductmetafieldsbyproductid)
- Product Variant Metafields, e.g. [Get All Product Variant Metafields](/api-reference/store-management/catalog/product-variants-metafields/getvariantmetafieldsbyproductidandvariantid)


## Definitions

| Name | Description |
| ---- | ---- |
| Check Connection Options URL | An optional URL for a shipping carrier resource that accepts check requests containing the connection options provided by a user when connecting the carrier and indicates whether or not those settings are valid. You provide this URL when you [sign up](#sign-up).|
| Configuration Fields | Connection and settings options. Merchants and API users use these fields to connect your carrier to their store and define shipping methods for your carrier in a zone. For more info, see [Configuration fields](#configuration-fields). |
| Connection Options | Optional fields that merchants and API users can use to connect your carrier to a store, including keys and passwords. |
| Settings Options | Optional fields that merchants and API users can use to specify your real-time shipping method, including available rates, packaging types, and packing methods. 
| Shipping Carrier | A service that facilitates delivery, such as UPS and FedEx. |
| Shipping Provider | A shipping solution that provides shipping rates to BigCommerce. A shipping provider can provide rates for one or more carriers. For more info, see [Single-carrier versus multi-carrier shipping providers](#single-carrier-versus-multi-carrier-shipping-providers). |
| Shipping Quote | An estimation of the cost to ship a set of items from an origin to a destination.|
| Shipping Zone | Describes a set of destination addresses and the applicable shipping settings, such as handling fees and available shipping methods.|
| Shipping Origin | The location from which goods are shipped. This origin determines which shipping carriers are available for the merchant to configure in the control panel.|
| Quote URL | A URL you provide when you [sign up](#sign-up) that accepts quote requests from BigCommerce and responds with shipping quotes. |

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
