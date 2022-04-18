# Channel Webhooks

Developers building third-party sales channels or multi-storefront capabilities might need notification when a channel in BigCommerce changes so that they can perform downstream actions required to set up or deactivate the channel. To facilitate this, we've added `store/channel` webhook events that fire when you create or update a channel. This article assumes that you're familiar with webhooks. It introduces channel-related events and is a reference for all BigCommerce channel webhook events and their callback payloads. For an introduction to webhooks on BigCommerce, see [Webhooks Overview](/api-docs/store-management/webhooks/overview#callback-payload). For a more general introduction to webhooks, see [Webhooks Overview](/api-docs/getting-started/webhooks/about-webhooks).

To learn more about sales channels, see the [Channels Overview](/api-docs/channels/guide/overview). To learn more about how sales channels function in the context of multi-storefront or multi-channel sales, see the [channels section of the Multi-Storefront Overview](/api-docs/multi-storefront/overview#channels).

There are three kinds of webhooks events that relate to channels: settings, product assignment, and channel event webhooks.

## Creating a webhook

To see an example request-response pair for creating a webhook, consult the [creating a webhook section of the Webhooks Overview](/api-docs/getting-started/webhooks/about-webhooks#creating-a-webhook).

## Callback structure

For webhook callback structure reference, see [Webhook Events](/api-docs/store-management/webhooks/webhook-events#callback-structure)

## Channel events 

The following webhook events fire in response to actions that govern a store's sales channels:

| Name / Scope          | Description | Corresponding Endpoint |
|:----------------------|:------------|:---------|
| store/channel/*       | Subscribes to all store/channel events | not applicable |
| store/channel/created | Fires when a channel is created using the control panel or the API | [Create a channel](/api-reference/store-management/channels/channels/createchannel) |
| store/channel/updated | Fires when a channel is updated using the control panel or the API | [Update a channel](/api-reference/store-management/channels/channels/updatechannel) |

Channel event payloads take the form that follows:

```json title="Example channel event payload object" lineNumbers
{
 "store_id": "11111",
 "producer": "stores/abcde",
 "created_at": 1335335335,
 "scope": "store/channel/created",
 "data": {
    "type": "channel", // will always be channel
    "id": 2 // ID of the channel
  },
 "hash": "3f9ea420af83450d7ef9f78b08c8af25b2213637"
}
 ```

### Channel update events

Changes to any of the following fields trigger a `store/channel/updated` event:

* name
* external_id
* status
* is_listable_from_ui
* is_visible
* is_enabled (to be deprecated)
* config_meta

## Categories

The following categories webhook events fire in response to actions that affect a specific channel on a store:

| Name / Scope | Description | Corresponding Endpoint |
|:-------------|:------------|:-----------------------|
| store/channel/{channel_id}/category/*            | Fires when a product is assigned to the specified channel | [Create product channel assignments](/api-reference/store-management/catalog/products-channel-assignments/createproductchannelassignments) |
| store/channel/{channel_id}/category/created      | Fires when a product is removed from the specified channel | [Delete product channel assignments](/api-reference/store-management/catalog/products-channel-assignments/deleteproductchannelassignments) |
| store/channel/{channel_id}/category/updated      | Fires when a product is assigned to a category in the specified channel's category tree | [Create product category assignments](/api-reference/store-management/catalog/products-category-assignments/createproductscategoryassignments)     |
| store/channel/{channel_id}/category/deleted      | Fires when a product is removed from a category in the specified channel's category tree | [Delete product category assignments](/api-reference/store-management/catalog/products-category-assignments/deleteproductscategoryassignments) |

Categories payload objects take the form that follows:

```json title="Example product assignment payload object" lineNumbers
{
 "store_id": "11111",
 "producer": "stores/abcde",
 "created_at": 1641641646,
 "scope": "store/channel/1/product/assigned",
 "data": {
    "product_id": 127
  },
 "hash": "3f9ea420af83450d7ef9f78b08c8af25b2213637"
}
 ```

## Product assignment

The following product assignment webhook events fire in response to actions that affect a specific channel on a store:

| Name / Scope | Description | Corresponding Endpoint |
|:-------------|:------------|:-----------------------|
| store/channel/{channel_id}/product/assigned            | Fires when a product is assigned to the specified channel | [Create product channel assignments](/api-reference/store-management/catalog/products-channel-assignments/createproductchannelassignments) |
| store/channel/{channel_id}/product/unassigned          | Fires when a product is removed from the specified channel | [Delete product channel assignments](/api-reference/store-management/catalog/products-channel-assignments/deleteproductchannelassignments) |
| store/channel/{channel_id}/category/product/assigned   | Fires when a product is assigned to a category in the specified channel's category tree | [Create product category assignments](/api-reference/store-management/catalog/products-category-assignments/createproductscategoryassignments) |
| store/channel/{channel_id}/category/product/unassigned | Fires when a product is removed from a category in the specified channel's category tree | [Delete product category assignments](/api-reference/store-management/catalog/products-category-assignments/deleteproductscategoryassignments) |

Product assignment payload objects take the form that follows:

```json title="Example product assignment payload object" lineNumbers
{
 "store_id": "11111",
 "producer": "stores/abcde",
 "created_at": 1641641646,
 "scope": "store/channel/1/product/assigned",
 "data": {
    "product_id": 127
  },
 "hash": "3f9ea420af83450d7ef9f78b08c8af25b2213637"
}
 ```
## Settings

The following settings webhook event fires in response to actions that affect a specific channel on a store:

| Name / Scope | Description | Corresponding Endpoint |
|:-------------|:------------|:-----------------------|
| store/channel/{channel_id}/settings/profile/updated    | Fires when any of the store profile settings that apply to the specified channel are updated. Fires for both channel-specific profile settings changes and for changes to any global defaults that the specified channel inherits.  | [Update store profile settings](/api-reference/store-management/settings/store-profile/putstoreprofilesettings) |

Settings payload objects take the form that follows:

```json title="Example settings profile payload object" lineNumbers
{
 "store_id": "11111",
 "producer": "stores/abcde",
 "created_at": 1641641646,
 "scope": "store/channel/1/settings/profile/updated",
 "data": {},
 "hash": "3f9ea420af83450d7ef9f78b08c8af25b2213637"
}
 ```
 
 ## Site

The following settings webhook event fires in response to actions that affect a specific channel on a store:

| Name / Scope | Description | Corresponding Endpoint |
|:-------------|:------------|:-----------------------|
| store/channel/{channel_id}/settings/site/updated       | Fires when a site is updated, created, or deleted for a given channel | [Update a channel site](/api-reference/store-management/channels/channel-site/put-channel-site), [Update a site](/api-reference/store-management/sites/sites/put-site), [Create a channel site](/api-reference/store-management/channels/channel-site/postchannelsite), [Create a site](/api-reference/store-management/sites/sites/post-site), [Delete a channel site](/api-reference/store-management/channels/channel-site/deletechannelschannelidsite), or [Delete a site](/api-reference/store-management/sites/sites/delete-site) |


Site payload objects take the form that follows:

```json title="Example settings profile payload object" lineNumbers
{
 "store_id": "11111",
 "producer": "stores/abcde",
 "created_at": 1641641646,
 "scope": "store/channel/1/settings/profile/updated",
 "data": {},
 "hash": "3f9ea420af83450d7ef9f78b08c8af25b2213637"
}
 ```
 
For a complete reference of all BigCommerce webhook events and their callback payloads, see [Webhook Events](/api-docs/store-management/webhooks/webhook-events).

## Resources

### Related articles

* [Webhooks Overview](/api-docs/store-management/webhooks/overview)
* [Webhooks Tutorial](/api-docs/store-management/webhooks/tutorial)
* [Webhooks Events](/api-docs/store-management/webhooks/webhook-events)
* [Channels Overview](/api-docs/channels/guide/overview)
* [Multi-Storefront Overview](/api-docs/multi-storefront/overview)

