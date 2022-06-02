<!-- Dev Center URL: https://developer.bigcommerce.com/api-docs/channels/quick-start -->

# Building Channels Quick Start



This advanced, quick-start tutorial is for [BigCommerce partners](https://www.bigcommerce.com/partners/) wishing to market their solution within [Channel Manager's](/api-docs/channels/overview#resources) **Create Channel** flow. For an introduction to channels on BigCommerce, see [Channels Overview](/api-docs/channels/overview).


### Prerequisites


- Experience [building apps](/api-docs/apps/guide/intro)
- Familiarity with [Channels Toolkit](/api-docs/channels/overview)

## Create a channel

Apps curated as solutions within the **Create Channel** flow must create a basic channel with a reference to their BigCommerce [App ID](/api-docs/apps/tutorials/id). This enables them to be shown in the [Channel Manager](/api-docs/channels/overview) as managing a specific channel; it also improves the native look and feel for the merchant using the app.

![Channel Manager](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels-channel-manager.png "Channel Manager")

To [create a channel](/api-reference/store-management/channels/channels/createchannel), send a `POST` request to `/v3/channels`.

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

<!-- theme: info -->
> **Note**
> - For a list of accepted `type` and `platform` values, see [Channels API Reference](/api-reference/store-management/channels#platform).
> - For instructions on finding your app's ID, see [Find and App's ID](/api-docs/apps/tutorials/id).

## Create a channel with navigation

We recommend that apps also create navigation sections to better integrate the app's interface within the BigCommerce control panel.

![Channel Settings Overview Tab](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels/channels-channel-overview.png "Channel Settings Overview Tab")

To create a channel with navigation, use the [Channel Menus API](/api-reference/store-management/channels/channels/postChannelMenus) after creating a channel record.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/channels/{{CHANNEL_ID}}/channel-menus
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
    "bigcommerce_protected_app_sections": [
      "domains",
      "currencies",
      "storefront_settings"
    ],
    "custom_app_sections": [
      {
        "title": "Overview",
        "query_path": "overview"
      }
    ]  
}
```

## Related resources

### Articles

- [Channels Overview](/api-docs/channels/overview)
- [Find an App's ID](/api-docs/apps/tutorials/id)
- [Build a Storefront Channel](/api-docs/channels/tutorials/storefront)

### Endpoints

- [Channels API Reference](/api-reference/store-management/channels)
