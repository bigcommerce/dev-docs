<!-- https://developer.bigcommerce.com/api-docs/channels/quick-start -->

# Building Channels Quick Start

<div class="otp" id="no-index">

### On this page


 - [Prerequisites](#prerequisites)
 - [Create a channel](#create-a-channel)
 - [Create a channel with navigation](#create-a-channel-with-navigation)
 - [Related resources](#related-resources)

</div>

This advanced quick start tutorial is for [BigCommerce partners](https://www.bigcommerce.com/partners/) wishing to market their solution within [Channel Manager's](https://developer.bigcommerce.com/api-docs/channels/overview#resources) **Create Channel** flow. For an introduction to channels on BigCommerce, see [Channels Overview](https://developer.bigcommerce.com/api-docs/channels/overview).

### Prerequisites


- Experience [building apps](https://developer.bigcommerce.com/api-docs/apps/guide/intro)
- Familiarity with [Channels Toolkit](https://developer.bigcommerce.com/api-docs/channels/overview)

## Create a channel

Apps curated as solutions within the **Create Channel** flow must create a basic channel with a reference to their BigCommerce [App ID](https://developer.bigcommerce.com/api-docs/apps/tutorials/id). This enables them to be shown in the [Channel Manager](https://developer.bigcommerce.com/api-docs/channels/overview) as managing a specific channel; it also improves the native look and feel for the merchant using the app.

![Channel Manager](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels-channel-manager.png "Channel Manager")

To [create a channel](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel), send a `POST` request to `/v3/channels`.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/channels
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "name": "Solution Name",
  "type": "storefront",
  "platform": "drupal",
  "external_id": "",
  "is_enabled": true,
  "status": "connected",
  "is_listable_from_ui": true,
  "is_visible": true,
  "config_meta": {
    "app": {
      "id": 24483
    }
  }
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel#requestrunner)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note

>
> - For a list of accepted `type` and `platform` values, see [Channels API Reference](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api#platform).
> - For instructions on finding your app's ID, see [Find and App's ID](https://developer.bigcommerce.com/api-docs/apps/tutorials/id).

</div>
</div>
</div>

## Create a channel with navigation

We recommend that apps also create navigation sections to better integrate the app's interface within the BigCommerce control panel.

![Channel Settings Overview Tab](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels/channels-channel-overview.png "Channel Settings Overview Tab")

To create a channel with navigation, include a `config_meta` object in the [create a channel](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel) request.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/channels
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "name": "Solution Name",
  "type": "storefront",
  "platform": "drupal",
  "external_id": "",
  "status": "connected",
  "is_listable_from_ui": true,
  "is_visible": true,
  "config_meta": {
    "app": {
      "id": 24483,
      "sections": [
        {
          "title": "Overview",
          "query_path": "overview"
        },
        {
          "title": "Import",
          "query_path": "import"
        },
        {
          "title": "Settings",
          "query_path": "settings"
        }
      ]
    }
  }
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel#requestrunner)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> **Note**
>
> - For additional information on [channel](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels) `config_meta` properties, see the [create a channel request body schema](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel#request-body).

## Related resources

### Articles

- [Channels Overview](https://developer.bigcommerce.com/api-docs/channels/overview)
- [Find an App's ID](https://developer.bigcommerce.com/api-docs/apps/tutorials/id)
- [Build a Storefront Channel](https://developer.bigcommerce.com/api-docs/channels/tutorials/storefront)

### Endpoints

- [Channels API Reference](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api)
