# Shipping Providers

Shipping service providers wishing to offer shipping services and rates to BigCommerce merchants and shoppers can implement BigCommerce Shipping Provider endpoints. Once they implement and accept their service into BigCommerce's shipping carrier registry, merchants will have access to enable and configure the service through their BigCommerce control panel. Once enabled on a store, BigCommerce will automatically retrieve the service options and rates using the provider's endpoints and display them to merchants in the store's control panel and to shoppers on the storefront.

Merchants can also use shipping provider endpoints to retrieve rates from custom shipping tables or an in-house shipping rate calculation service.

Some use cases for the Shipping Provider API are:

- A drop-shipper that requires their own rates
- A merchant that already has a shipping table
- Third-party logistics
- Create a combination of in-store pickup and shipping options for shoppers

This article is a guide to developing an app that will make your shipping rates available to merchants and shoppers on demand.

### Prerequisites

* Required [OAuth](/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes) scopes: `Information and Settings`
* BigCommerce [single-click app](/api-docs/apps/guide/types#single-click)


## Shipping app overview

![Carrier Service API](https://s3.amazonaws.com/user-content.stoplight.io/6012/1552664566834 "Carrier Service API")

### Single-carrier versus multi-carrier apps

You can only associate one registered shipping carrier with an app. This [registered carrier](#definitions) can provide quotes from multiple downstream carriers. 

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

- Your name
- Your app's name
- Your partner ID
- Your app's ID
- Your email
- A description of the app
- [Your service URLs](#your-service-urls) 
- [Whether you prefer single-carrier or multi-carrier status](#single-carrier-versus-multi-carrier-apps)

## Before development

BigCommerce sends requests to your server to get information back about shipping quotes, credential validation, and configuration.  To handle these requests smoothly, consider the following:

### Your service URLs

Because BigCommerce sends your app requests, you need to provide BigCommerce with a URL that accepts quote requests and, optionally, a URL to check and validate connection options during app registration. These can be any valid HTTPS URLs that use port `443`, for example:

`https://example.com/rate`

Replace `example.com` and `rate` with your own host and path.

### Routes

You should create a URL to provide shipping quotes on your API and check the available shipping rates. The second URL (optional) checks to ensure the merchant’s connection settings are valid. It can perform any checks necessary to do so, such as looking up credentials in your database or calling a downstream service to verify them.

### Request and response bodies

BigCommerce will send and receive data using JSON. The request for rates will always be formatted using the [Base Rate Request Model](/api-reference/providers/shipping-provider-api/shipping-provider/requestshippingrates). The response for rates should be formatted using the [Carrier Quote Object](/api-reference/providers/shipping-provider-api/shipping-provider/requestshippingrates). Format the request to check for merchant app credentials as Check Connection Options request payload, and the response should be formatted using the Check Connection Options response payload.

### Error handling

In the case of errors, include human-readable error messages in the response payload under the messages key.

**Example error response**

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

To use the Shipping Provider API to provide shipping quotes, shipping providers must build a BigCommerce [single-click app](/api-docs/apps/guide/types#single-click). 

Using a BigCommerce app enables shipping providers to promote their solution in the BigCommerce App Marketplace, request merchant authorization of API scopes during app install, and enable configuration of shipping provider settings and/or order fulfillment via an iFrame in the BigCommerce control panel.

For more information, see our [Introduction to Building Apps](/api-docs/apps/guide/intro).

## Control Panel installation workflow

During the app setup, if you configure the Check Connection Options URL for the carrier, an attempt to connect the carrier via the Shipping Manager UI or the Connect Carrier API causes a request to be made to that URL with the provided options. The resource should respond by indicating if the credentials are valid and explain what is wrong. If you did not configure this URL, this check is not required and the credentials are assumed valid as long as they pass type checks.


**Example request to validate connection options**

`https://example.com/check_connection_options`

```http lineNumbers

X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
{
  "connection_options": {
    "account_id": "a1ty"
  }
}
```

**Example response**

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

<!-- theme: info -->
> #### Credential validation
> It is best practice to authenticate the user and store against your database or the downstream provider service.

Once you install the app, it will be made available for configuration by merchants and API users. A merchant can navigate to the Shipping Manager and enable, configure, and disable the carrier for any defined zone.

## API installation workflow

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

## Returning shipping quotes

Whenever shipping rates are required, BigCommerce checks its internal cache for valid entries. BigCommerce uses valid entries and does not call the shipping carrier. If a valid cache entry does not exist, BigCommerce makes a request to the Quote URL with details of the items to be shipped, the shipping origin, and the shipping destination. If you configured any connection settings or zone settings, include these. The shipping carrier must then respond with zero or more shipping quotes.


```http title="Example request: Shipping rates" lineNumbers
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
&nbsp;
```json title="Example response: Shipping rates" lineNumbers
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

If no shipping quotes are available, the shipping carrier will send a response with the following format for the shipping quote:

```json title="Example response: No shipping rates" lineNumbers
{
  "quote_id": "example_quote",
  "messages": [],
  "carrier_quotes": []
}
```

When you uninstall an app with an associated shipping carrier, you also automatically remove all the shipping methods and connection info for that carrier from the store. You can no longer make quote requests, and users will no longer see shipping quotes for that carrier.

<!-- theme: info -->
> #### Note
> The response payload will display shipping quotes from lowest to highest price.

## Including product metadata in rate requests

BigCommerce passes carrier-specific product metadata to a carrier service in a rate request via product and variant metafields. This product metadata can be useful if your service depends on specific fields that are not existent on BigCommerce products or variants by default.

To pass metadata in a rate request, the metafield must meet the following requirements:

- it must be a product or variant metafield (you cannot pass category, brand, or other metafields in rate requests)
- the metafield `permission_set` must be `read` or `write`
- the metafield `namespace` must match this format: `shipping_carrier_<carrier_id>` (example: `shipping_carrier_72`)


The carrier registration process described in the [Sign up](#sign-up) section provides the `carrier_id`.

For more information on product and variant metafields, see:

- [API Reference > Store Management > Catalog > Product Metafields](/api-reference/store-management/catalog/product-metafields)
- [API Reference > Store Management > Catalog > Product Variant Metafields](/api-reference/store-management/catalog/product-variants-metafields)

## Submitting the app

Before submitting your app, make sure you have the following information.

**Single-carrier or multi-carrier**

A single-carrier app will offer one service, such as USPS. A multi-carrier app will offer more than one carrier such as USPS, DHL, and Canada Post.

**Name and description**

Name and description of the shipping carrier or carriers.

**Logo**

A 70x70 pixel logo that represents the shipping carrier app.

**Configuration fields**

Any shipping zone-specific or connection-specific fields to be made available to merchants or APIs for configuration. Configuration fields can include which rates to offer, packaging type, or packing method.

To submit your app, send an email to <a href="mailto:shippingproviderapi@bigcommerce.com">shippingproviderapi@bigcommerce.com</a>.


## Definitions

| Name                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Configuration Fields            | The fields the merchant will see in the control panel. Merchants can navigate to the Shipping Manager and enable, configure, and disable the carrier for any defined zone. They will also be able to activate the app using the Carrier Connection API. Then use the Shipping Zones API and Shipping Methods API to configure the app from there.                                                                                                                                                                               |
| Quote URL                       | A URL for a resource of the shipping carrier that accepts quote requests and responds with shipping quotes. For more on the Quote URL, see a typical app workflow below.                                                                                                                                                                                                                                                                                                                                                        |
| Single Carrier or Multi Carrier | A single carrier app will offer only one shipping provider. A multi carrier app will aggregate multiple shipping carriers in one app.                                                                                                                                                                                                                                                                                                                                                                                           |
| Countries Available             | A list of countries where you can use the shipping carrier. The default behavior is that the carrier is available for every shipping origin. In most cases, this list should be as broad as possible. For example, if your carrier operates worldwide, make it available worldwide. You can limit the countries further than what the shipping carrier has provided. If the service is worldwide, then leave this field blank to specify that it is worldwide. Specifying the use of the shipping carrier is an optional step. |
| Shipping Carrier                | A shipping carrier provides quotes to BigCommerce. If a shipping carrier uses more than one shipping provider, then it becomes a multi carrier aggregator. A carrier includes a name, a description, and a logo.                                                                                                                                                                                                                                                                                                                |
| Multi-Carrier Aggregator        | A shipping solution that provides shipping quotes for multiple carriers.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Check Connection Options URL    | A URL for a shipping carrier resource that accepts check requests containing the connection options provided by a user when enabling the carrier and indicates whether or not those settings are valid. This is an optional step.                                                                                                                                                                                                                                                                                               |
| Shipping Quote                  | An estimation of the cost to ship a set of items from an origin to a destination.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Shipping Zone                   | Describes a set of destination addresses and the applicable shipping settings, such as handling fees and available shipping methods.                                                                                                                                                                                                                                                                                                                                                                                            |
| Shipping Origin                 | The location from which goods are shipped. This origin determines which shipping carriers are available for the merchant to configure in the control panel.                                                                                                                                                                                                                                                                                                                                                                     |

## FAQ

**Can I publish more than one app at a time?**

No, you can only publish one app at a time. The others can be for use as testing or as private apps.

## Related resources

### Articles
- [App Store Approval Requirements](/api-docs/apps/guide/requirements)


### Endpoints

- [Shipping Providers](/api-reference/providers/shipping-provider-api)
- [Shipping Zones](/api-reference/store-management/shipping-api/shipping-zones)
- [Shipping Methods](/api-reference/store-management/shipping-api/shipping-method)
- [Shipping Carriers](/api-reference/store-management/shipping-api/shipping-carrier)

### Webhooks

- [Webhooks](/api-docs/store-management/webhooks/webhook-events#shipment)
