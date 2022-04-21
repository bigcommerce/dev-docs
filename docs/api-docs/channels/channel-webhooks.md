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

## Abandoned Cart

The following abandoned cart webhook event fires in response to actions that affect a specific channel on a store:

| Name / Scope | Description | Corresponding Endpoint |
|:-------------|:------------|:-----------------------|
| store/channel/{channel_id}/notifications/abandonedCart/updated     |Fires when a abandoned cart notification is updated for a given channel. | [Update channel abandoned cart settings](/api-reference/store-management/abandoned-carts/abandoned-carts-settings/updatechannelabandonedcartsettings) |


Abandoned cart payload objects take the form that follows:

```json title="Example Abandoned cart profile payload object" lineNumbers

 ```


## Carts

The following carts webhook events fire in response to actions that affect a cart associated with a specific channel on a store:

| Name / Scope | Description | Corresponding Endpoint |
|:-------------|:------------|:-----------------------|
| store/channel/{channel_id}/cart/*            | Fires on all cart changes associated with a given channel | [store/cart/\*]() |
| store/channel/{channel_id}/cart/created      | Fires on new cart created for a given channel | [Create a cart](/api-reference/store-management/carts/cart/createacart)  |
| store/channel/{channel_id}/cart/updated      | Fires when a cart is updated for a given channel | [store/cart/updated](/api-reference/store-management/webhooks/models/store-cart-updated) |
| store/channel/{channel_id}/cart/deleted      | Fires when a cart is removed for a given channel | [store/cart/deleted](/api-reference/store-management/webhooks/models/store-cart-deleted) |
| store/channel/{channel_id}/cart/couponApplied | Fires when a new coupon code is applied to a cart for a given channel | [store/cart/couponApplied](/api-reference/store-management/webhooks/models/store-cart-couponapplied)  |
| store/channel/{channel_id}/cart/abandoned    | Fires when a cart is abandoned from a given channel  | [store/cart/abandoned](/api-reference/store-management/webhooks/models/store-cart-abandoned) |
| store/channel/{channel_id}/cart/converted    | Fires when a cart is converted into an order for a given channel | [store/cart/converted](/api-reference/store-management/webhooks/models/store-cart-converted) |


<!-- theme: info -->
> You must include the `cart_id` in the payload.



Cart payload objects take the form that follows:

```json title="Example cart profile payload object" lineNumbers
{
 "store_id": "11111",
 "producer": "stores/abcde",
 "created_at": 1641641646,
 "scope": "store/channel/1/cart/created",
  "data": {
    "cart_id": "41696c19-486f-40a8-ae2a-389d5d24e0c9"
  },
 "hash": "3f9ea420af83450d7ef9f78b08c8af25b2213637"
}
 ```


## Cart line item

The following cart line item webhook events fire in response to actions that affect a cart items associated with a specific channel on a store:

| Name / Scope | Description | Corresponding Endpoint |
|:-------------|:------------|:-----------------------|
| store/channel/{channel_id}/cart/lineItem/*       | Fires on all cart line item changes associated with a given channel | [store/cart/lineItem/\*](/api-reference/store-management/webhooks/models/store-cart-lineitem-wildcard) |
| store/channel/{channel_id}/cart/lineItem/created      | Fires when a new item is added to a cart for a given channel | [Create a cart](/api-reference/store-management/carts/cart/createacart) and [Update Cart Line Item](/api-reference/store-management/carts/cart-items/updatecartlineitem) |
| store/channel/{channel_id}/cart/lineItem/updated      | Fires when an item's quantity has changed or the product options change for a given channel  | [store/cart/lineItem/updated](/api-reference/store-management/webhooks/models/store-cart-lineitem-updated) |
| store/channel/{channel_id}/cart/lineItem/deleted      | Fires when items are deleted from the cart for a given channel | [store/cart/lineItem/deleted](/api-reference/store-management/webhooks/models/store-cart-lineitem-deleted) |


<!-- theme: info -->
> You must include the `channel_id` in the payload.

Cart line items payload objects take the form that follows:

```json title="Example cart line items profile payload object" lineNumbers
{
 "store_id": "11111",
 "producer": "stores/abcde",
 "created_at": 1641641646,
 "scope": "store/channel/1/cart/lineItems/created",
  "data": {
    "cart_id": "41696c19-486f-40a8-ae2a-389d5d24e0c9",
    "cart_item_id":  "af133539-0d83-464d-870d-776e2672e8f4"
  },
 "hash": "3f9ea420af83450d7ef9f78b08c8af25b2213637"
}
 ```


## Categories

The following categories webhook events fire in response to actions that affect a specific channel on a store:

| Name / Scope | Description | Corresponding Endpoint |
|:-------------|:------------|:-----------------------|
| store/channel/{channel_id}/category/*            | Fires when a product is assigned to the specified channel | [Create product channel assignments](/api-reference/store-management/catalog/products-channel-assignments/createproductchannelassignments) |
| store/channel/{channel_id}/category/created      | Fires when a product is removed from the specified channel | [Delete product channel assignments](/api-reference/store-management/catalog/products-channel-assignments/deleteproductchannelassignments) |
| store/channel/{channel_id}/category/updated      | Fires when a product is assigned to a category in the specified channel's category tree | [Create product category assignments](/api-reference/store-management/catalog/products-category-assignments/createproductscategoryassignments)     |
| store/channel/{channel_id}/category/deleted      | Fires when a product is removed from a category in the specified channel's category tree | [Delete product category assignments](/api-reference/store-management/catalog/products-category-assignments/deleteproductscategoryassignments) |

<!-- theme: info -->
> You must include the `tree_id` or `category_id` in the payload.


Categories payload objects take the form that follows:

```json title="Example categories payload object" lineNumbers
{
 "store_id": "11111",
 "producer": "stores/abcde",
 "created_at": 1641641646,
 "scope": "store/channel/1/category/created",
 "data": {
    "category_id": 35,
    "tree_id": 1
  },
 "hash": "3f9ea420af83450d7ef9f78b08c8af25b2213637"
}
 ```
## Category tree

The following category tree webhook event fires in response to actions that affect a specific channel on a store:

| Name / Scope | Description | Corresponding Endpoint |
|:-------------|:------------|:-----------------------|
| store/channel/{channel_id}/categoryTree/updated     |Fires when a site is updated, created, or deleted for a given channel. | [Upsert category trees](/api-reference/store-management/catalog/category-trees/upsertcategorytrees) or [Delete category trees](/api-reference/store-management/catalog/category-trees/deletecategorytrees) |

<!-- theme: info -->
> You must include the `tree_id` in the payload.


Category tree payload objects take the form that follows:

```json title="Example Category tree profile payload object" lineNumbers
{
 "store_id": "11111",
 "producer": "stores/abcde",
 "created_at": 1641641646,
 "scope": "store/channel/1/categoryTree/updated",
 "data": {
    "tree_id": 1
  },
 "hash": "3f9ea420af83450d7ef9f78b08c8af25b2213637"
}
 ```

## Customers

The following customers webhook event fires in response to actions that affect a specific channel on a store:

| Name / Scope | Description | Corresponding Endpoint |
|:-------------|:------------|:-----------------------|
| store/customer/channel/login/access/updated         |Fires when subscribed to customer login to channel updates | [Update customers](/api-reference/store-management/customers-v3/customers/customersput) or [Delete category trees](/api-reference/store-management/catalog/category-trees/deletecategorytrees) |

<!-- theme: info -->
> You must include the `channel_id` in the payload.


Customers payload objects take the form that follows:

```json title="Example Customers profile payload object" lineNumbers
{
 "store_id": "11111",
 "producer": "stores/abcde",
 "created_at": 1641641646,
 "scope": "store/customer/channel/login/access/updated",
 "data": {
    "customer_id": 22,
    "channel_ids": [
      1
   ]
  },
 "hash": "3f9ea420af83450d7ef9f78b08c8af25b2213637"
}
 ```


## Orders

The following orders webhook events fire in response to actions that affect a specific channel on a store:

| Name / Scope | Description | Corresponding Endpoint |
|:-------------|:------------|:-----------------------|
| store/channel/{channel_id}/order/*                  | Fires on all order events associated with a given channel | [Create an order](/api-reference/store-management/orders/orders/createanorder) |
| store/channel/{channel_id}/order/created            | Fires on new order creation for a  given channel | [Create an order](/api-reference/store-management/orders/orders/createanorder) |
| store/channel/{channel_id}/order/updated            | Fires when an order is updated for a given channel | [Update an order](/api-reference/store-management/orders/orders/updateanorder) |
| store/channel/{channel_id}/order/archived           | Fires when an order is archived from a given channel | [Archive an order](/api-reference/store-management/orders/orders/deleteanorder) |
| store/channel/{channel_id}/order/statusUpdated        | Fires when an order status has changed for a given channel | [store/order/statusUpdated](/api-reference/store-management/webhooks/models/store-order-statusupdated) |
| store/channel/{channel_id}/order/message/created      | Fires when an order message is created by customer or in the control panel | [store/order/message/created](/api-reference/store-management/webhooks/models/store-order-message-created)  |
| store/channel/{channel_id}/order/refund/created       | Fires when a refund has been submitted against an order for a given channel | [store/order/refund/created](/api-reference/store-management/webhooks/models/store-order-refund-created) |

<!-- theme: info -->
> You must include the `order_id` in the payload.

Order payload objects take the form that follows:

```json title="Example order payload object" lineNumbers
{
 "store_id": "11111",
 "producer": "stores/abcde",
 "created_at": 1641641646,
 "scope": "store/channel/1/order/updated",
 "data": {
    "order_id": 127
  },
 "hash": "3f9ea420af83450d7ef9f78b08c8af25b2213637"
}
 ```


## Product assignments


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

The following settings webhook events fire in response to actions that affect a specific channel on a store:


| Name / Scope | Description | Corresponding Endpoint |
|:-------------|:------------|:-----------------------|
| store/channel/{channel_id}/settings/profile/updated    | Fires when any of the store profile settings that apply to the specified channel are updated. Fires for both channel-specific profile settings changes and for changes to any global defaults that the specified channel inherits.  | [Update store profile settings](/api-reference/store-management/settings/store-profile/putstoreprofilesettings) |
| store/channel/{channel_id}/settings/SEO/updated | Fires when SEO settings were updated per given channel. | [Update storefront SEO settings](/api-reference/store-management/settings/storefront-seo/putsettingsstorefrontseo) |
| store/channel/{channel_id}/settings/robots/updated | Fires when search engine robot settings were updated per given channel. | [Update robots.txt settings](/api-reference/store-management/settings/storefront-robotstxt/putsettingsstorefrontrobotstxt) |
| store/channel/{channel_id}/settings/category/updated | Fires when category settings were updated per given channel. | [Update storefront category settings](/api-reference/store-management/settings/storefront-category/putsettingsstorefrontcategory) |
| store/channel/{channel_id}/settings/product/updated | Fires when product settings were updated per given channel. | [Update storefront product settings](/api-reference/store-management/settings/storefront-product/updatestorefrontproductsettings) |
| store/channel/{channel_id}/settings/catalog/updated | Fires when catalog settings were updated per given channel. | [Update catalog settings](/api-reference/store-management/settings/catalog/putcatalogsettings) |
| store/channel/{channel_id}/notifications/inventory/updated | Fires when inventory notification settings were updated per given channel. | [Update inventory notifications settings](/api-reference/store-management/settings/inventory/putinventorynotificationssettings) |


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
 
 ## Sites


The following sites webhook events fire in response to actions that affect a site associated with a specific channel on a store:


| Name / Scope | Description | Corresponding Endpoints |
|:-------------|:------------|:-----------------------|
| store/channel/{channel_id}/settings/site/updated       | Fires when a site is updated, created, or deleted for a given channel | [Update a channel site](/api-reference/store-management/channels/channel-site/put-channel-site), [Update a site](/api-reference/store-management/sites/sites/put-site), [Create a channel site](/api-reference/store-management/channels/channel-site/postchannelsite), [Create a site](/api-reference/store-management/sites/sites/post-site), [Delete a channel site](/api-reference/store-management/channels/channel-site/deletechannelschannelidsite), or [Delete a site](/api-reference/store-management/sites/sites/delete-site) |
| store/channel/{channel_id}/settings/route/updated | Fires when a site is created, updated, or deleted for a given channel | [Create a site route](/api-reference/store-management/sites/site-routes/post-site-route), [Update site's routes](/api-reference/store-management/sites/site-routes/putsitessiteidroutes), [Update a site route](/api-reference/b3A6MzU5MDUxMDA-update-a-site-route), or [Delete a site route](/api-reference/b3A6MzU5MDUxMDE-delete-a-site-route) |


<!-- theme: info -->
> You must include the `site_id` in the payload.



Site payload objects take the form that follows:

```json title="Example settings profile payload object" lineNumbers
{
 "store_id": "11111",
 "producer": "stores/abcde",
 "created_at": 1641641646,
 "scope": "store/channel/1/settings/site/updated",
  "data": {
    "site_id": 1001
  },
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

