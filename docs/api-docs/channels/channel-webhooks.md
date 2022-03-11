# Channel Webhooks



Developers building third-party sales channels or multi-storefront capabilities might need notification when a channel in BigCommerce changes so that they can perform downstream actions required to set up or deactivate the channel. To facilitate this, we've added `store/channel` webhook events that fire when you create or update a channel. We'll assume you're familiar with webhooks and briefly introduce the channel events in this article; however, if you would like an introduction to webhooks, see [Webhooks Overview](/api-docs/getting-started/webhooks/about-webhooks).



## Channel webhook events

| Name                  | Description |
|-----------------------|-------------|
| store/channel/*       | Subscribe to all store/channel events|
| store/channel/created | Fires when a channel is created via control panel or API |
| store/channel/updated | Fires when a channel is updated via control panel or API |

Updates to the following fields trigger a `store/channel/updated` event:


* `name`
* `external_id`
* `status`
* `is_listable_from_ui`
* `is_visible`
* `is_enabled` (to be deprecated)
* `config_meta`

## Channel-aware webhook events

| Name                                                   | Description                                                    |
|-----------------------------------------------------   |----------------------------------------------------------      |
| store/channel/{channel_id}/product/assigned            | New product assigned to channel (or new listing creating)      | 
| store/channel/{channel_id}/product/unassigned          | Existing product on channel has been unassigned (or de-listed) |
| store/channel/{channel_id}/category/product/assigned   | Product assigned to category within a specific channel         |
| store/channel/{channel_id}/category/product/unassigned | Product unassigned from category within a specific channel     |
| store/channel/{channel_id}/settings/profile/updated    | Store profile settings updated per channel                     |

For a complete reference of all BigCommerce webhook events and their callback payloads, see [Webhook] Events(https://developer.bigcommerce.com/docs/ZG9jOjIyMDczNA-webhook-events).

## Channel webhook callbacks

The following is an example of a callback BigCommerce sends to the `destination` URL when a channel event fires:

```json title="Channel event destination callback" lineNumbers
{
 "store_id":11111,
 "producer":"stores/abcde",
 "scope":"store/channel/created",
 "data":{
    "type":"channel",
    "id":173331
  },
 "hash":"3f9ea420af83450d7ef9f78b08c8af25b2213637"
 }
 ```

| Property | Description |
|-|-|
|`type`| Will always be `"channel"` |
|`id`  | The ID of the channel  |

## Creating a channel webhook

To create a webhook that subscribes to channel events, send a `POST` request to [/stores/{{STORE_HASH}}/v2/hooks](/api-reference/webhooks/webhooks/createwebhooks) with `scope` set to `store/channel/created`, `store/channel/updated`, or `store/channel/*`.



```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/hooks
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "scope": "store/order/updated",
  "destination": "https://yourapp.example.com/webhooks", # custom ports not supported
  "is_active": true
}
```

To learn more about creating webhooks, see [Webhooks Tutorial](/api-docs/store-management/webhooks/tutorial).


## Resources

### Related articles

* [Webhooks Overview](/api-docs/store-management/webhooks/overview)

* [Webhooks Tutorial](/api-docs/store-management/webhooks/tutorial)

* [Webhooks Events](/api-docs/store-management/webhooks/webhook-events)

