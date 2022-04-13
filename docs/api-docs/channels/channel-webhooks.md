# Channel Webhooks

Developers building third-party sales channels or multi-storefront capabilities might need notification when a channel in BigCommerce changes so that they can perform downstream actions required to set up or deactivate the channel. To facilitate this, we've added `store/channel` webhook events that fire when you create or update a channel. This article assumes that you're familiar with webhooks and introduces channel-related events. For a more general introduction to webhooks, see [Webhooks Overview](/api-docs/getting-started/webhooks/about-webhooks).

To learn more about sales channels, see the [Channels Overview](/api-docs/channels/guide/overview). To learn more about how sales channels function in the context of multi-storefront or multi-channel sales, see the [channels section of the Multi-Storefront Overview](/api-docs/multi-storefront/overview#channels).

## Channel-related webhooks

### Events

The following webhook events fire in response to actions that govern a store's sales channels:

| Name / Scope          | Description | Corresponding Endpoint |
|:----------------------|:------------|:---------|
| store/channel/*       | Subscribes to all store/channel events | not applicable |
| store/channel/created | Fires when a channel is created using the control panel or the API | [Create a channel](/api-reference/store-management/channels/channels/createchannel) |
| store/channel/updated | Fires when a channel is updated using the control panel or the API | [Update a channel](/api-reference/store-management/channels/channels/updatechannel) |

Updates to any of the following fields trigger a `store/channel/updated` event:

* `name`
* `external_id`
* `status`
* `is_listable_from_ui`
* `is_visible`
* `is_enabled` (to be deprecated)
* `config_meta`

### Creating webhook

To create a webhook that subscribes to channel events, send a `POST` request to the [Create a webhook](/api-reference/webhooks/webhooks/createwebhooks) endpoint. Set the `scope` property value equal to the **Name / Scope** of the webhook you want to create.

```http title="Example request: Create a webhook" lineNumbers
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/hooks
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "scope": "store/channel/updated",
  "destination": "https://yourapp.example.com/webhooks", // custom ports are not supported
  "is_active": true,
  "headers": {}
}
```

To learn more about creating webhooks, see the [Webhooks Tutorial](/api-docs/store-management/webhooks/tutorial).

### Callbacks

When a channel event fires, BigCommerce sends the webhook `destination` URL a channel payload object with the following form:

```json title="Example channel event payload object" lineNumbers
{
 "store_id": "11111",
 "producer": "stores/abcde",
 "scope": "store/channel/created",
 "data": {
    "type": "channel", // will always be channel
    "id": 2 // ID of the channel
  },
 "hash": "3f9ea420af83450d7ef9f78b08c8af25b2213637"
}
 ```

For a complete reference of all BigCommerce webhook events and their callback payloads, see [Webhook Events](https://developer.bigcommerce.com/docs/ZG9jOjIyMDczNA-webhook-events).

## Channel-specific webhooks

### Events

The following webhook events fire in response to actions that affect one specific channel on a store:

| Name / Scope                                           | Description                                               | Corresponding Endpoint |
|:-------------------------------------------------------|:----------------------------------------------------------|:---------|
| store/channel/{channel_id}/product/assigned            | Fires when a product is assigned to the specified channel | [Create product channel assignments](/api-reference/store-management/catalog/products-channel-assignments/createproductchannelassignments) |
| store/channel/{channel_id}/product/unassigned          | Fires when a product is removed from the specified channel | [Delete product channel assignments](/api-reference/store-management/catalog/products-channel-assignments/deleteproductchannelassignments) |
| store/channel/{channel_id}/category/product/assigned   | Fires when a product is assigned to a category in the specified channel's category tree | [Create product category assignments](/api-reference/store-management/catalog/products-category-assignments/deleteproductscategoryassignments) |
| store/channel/{channel_id}/category/product/unassigned | Fires when a product is removed from a category in the specified channel's category tree | [Delete product category assignments](/api-reference/store-management/catalog/products-category-assignments/createproductscategoryassignments) |
| store/channel/{channel_id}/settings/profile/updated    | Fires when any of the store profile settings that apply to the specified channel are updated. Fires for both channel-specific profile settings changes and for changes to any global defaults that the specified channel inherits.  | [Update store profile settings](/api-reference/store-management/settings/store-profile/putstoreprofilesettings) |


### Creating

To create a webhook that subscribes to channel events, send a `POST` request to the [Create a webhook](/api-reference/webhooks/webhooks/createwebhooks) endpoint. Set the `scope` property value equal to the **Name / Scope** of the webhook you want to create.

```http title="Example request: Create a webhook" lineNumbers
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/hooks
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "scope": "store/channel/updated",
  "destination": "https://yourapp.example.com/webhooks", // custom ports are not supported
  "is_active": true,
  "headers": {}
}
```

To learn more about creating webhooks, see the [Webhooks Tutorial](/api-docs/store-management/webhooks/tutorial).

### Callbacks

When a channel event fires, BigCommerce sends the webhook `destination` URL a channel payload object with the following form:

```json title="Example channel event payload object" lineNumbers
{
  "producer": "stores/29iql3rwa6",
  "hash": "3abbb63e98d77de9c5796eb2717acb03a3cda6c0",
  "created_at": 1649875761,
  "store_id": "1001486796",
  "scope": "store/channel/501431/product/assigned",
  "data": {
    "product_id": 156
  }
}
 ```

For a complete reference of all BigCommerce webhook events and their callback payloads, see [Webhook Events](https://developer.bigcommerce.com/docs/ZG9jOjIyMDczNA-webhook-events).

## Resources

### Related articles

* [Webhooks Overview](/api-docs/store-management/webhooks/overview)
* [Webhooks Tutorial](/api-docs/store-management/webhooks/tutorial)
* [Webhooks Events](/api-docs/store-management/webhooks/webhook-events)
* [Channels Overview](/api-docs/channels/guide/overview)
* [Multi-Storefront Overview](/api-docs/multi-storefront/overview)

