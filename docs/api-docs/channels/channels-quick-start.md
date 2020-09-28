# Create a Channel Quick Start

<div class="otp" id="no-index">


### On This Page

- [Create a channel](#create-a-channel)
- [Create a channel with navigation](#create-a-channel-with-navigation)
- [Resources](#resources)

</div>

This article is an advanced quick start tutorial for [bigcommerce technology partners](https://www.bigcommerce.com/partners/) wishing to market their solution within [Channel Manager's](https://developer.bigcommerce.com/api-docs/channels/overview#resources) **Create Channel** flow. For an introduction to channels on BigCommerce, see [Channels Overview](https://developer.bigcommerce.com/api-docs/channels/overview).

### Prerequisites
* Experience [building apps](https://developer.bigcommerce.com/api-docs/apps/guide/intro)
* Familiarity with [Channels Toolkit](https://developer.bigcommerce.com/api-docs/channels/overview)

## Create a channel

At the very least, apps curated as solutions within the **Create Channel** flow must create a basic Channel with a reference to their BigCommerce **App ID**. This enables them to show in the Channel Manager as managing a specific channel.

![XX_TITLE_XX](https://raw.githubusercontent.com/bigcommerce/dev-docs/development/assets/images/XX_FILENAME_XX "XX_TITLE_XX")

And also enables an improved native look and feel for the merchant when using the app.

![XX_TITLE_XX](https://raw.githubusercontent.com/bigcommerce/dev-docs/development/assets/images/XX_FILENAME_XX "XX_TITLE_XX")

To [create a channel](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel), send a `POST` request to `/v3/channels`.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/channels
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json

{
  "name": "Solution Name",
  "type": "storefront",
  "platform": "drupal",
  "external_id": "002",
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
> * For a list of accepted values for `type` and `platform`, see [Channels API Reference](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api#platform)

</div>
</div>
</div>

## Create a channel with navigation

It is recommended that apps also create a navigation section to better guide the merchant within the BigCommerce native control panel.

![XX_TITLE_XX](https://raw.githubusercontent.com/bigcommerce/dev-docs/development/assets/images/XX_FILENAME_XX "XX_TITLE_XX")

To [create a channel with navigation](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel), send a `POST` request to `/stores/{{STORE_HASH}}/v3/channels`.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/channels
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json

{
  "name": "Solution Name",
  "type": "storefront",
  "platform": "drupal",
  "external_id": "002",
  "is_enabled": true,
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

> ### Note
> * For additional information on [channel](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels) `config_meta` properties, see the [create a channel request body schema](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel#request-body).

## Resources
* [Channels Overview](https://developer.bigcommerce.com/api-docs/channels/overview)
* [Channels API Reference](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api)