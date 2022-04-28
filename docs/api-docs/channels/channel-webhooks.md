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



## Cart

The following cart webhook events fire in response to actions that affect a cart associated with a specific channel on a store:

| Name / Scope | Description | Corresponding Endpoint |
|:-------------|:------------|:-----------------------|
| store/channel/{channel_id}/cart/*            | Fires on all cart changes associated with a given channel | not applicable |
| store/channel/{channel_id}/cart/created      | Fires on new cart created for a given channel | [Create a cart](/api-reference/store-management/carts/cart/createacart)  |
| store/channel/{channel_id}/cart/updated      | Fires when a cart is updated for a given channel | not applicable |
| store/channel/{channel_id}/cart/deleted      | Fires when a cart is removed for a given channel | [Delete a cart](/api-reference/store-management/carts/cart/deleteacart) |
| store/channel/{channel_id}/cart/couponApplied | Fires when a new coupon code is applied to a cart for a given channel | not applicable  |
| store/channel/{channel_id}/cart/abandoned    | Fires when a cart is abandoned from a given channel  | not applicable |
| store/channel/{channel_id}/cart/converted    | Fires when a cart is converted into an order for a given channel | not applicable |


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
| store/channel/{channel_id}/cart/lineItem/*       | Fires on all cart line item changes associated with a given channel | not applicable |
| store/channel/{channel_id}/cart/lineItem/created      | Fires when a new item is added to a cart for a given channel | [Add cart line items](/api-reference/store-management/carts/cart-items/addcartlineitem) |
| store/channel/{channel_id}/cart/lineItem/updated      | Fires when an item's quantity has changed or the product options change for a given channel  | [Update Cart Line Item](/api-reference/store-management/carts/cart-items/updatecartlineitem) |
| store/channel/{channel_id}/cart/lineItem/deleted      | Fires when items are deleted from the cart for a given channel | [Delete cart line item](/api-reference/store-management/carts/cart-items/deletecartlineitem) |


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
| store/channel/{channel_id}/category/*            | Fires when when subscribed to all category tree events per channel | not applicable |
| store/channel/{channel_id}/category/created      | Fires when a new category is created within a category tree that is assigned to a given channel | [Create categories](/api-reference/store-management/catalog/categories-batch/createcategories) |
| store/channel/{channel_id}/category/updated      | Fires when a category is updated within a category tree that is assigned to a given channel | [Update categories](/api-reference/store-management/catalog/categories-batch/updatecategories)  |
| store/channel/{channel_id}/category/deleted      | Fires when a category is removed from a category tree that is assigned to a given channel | [Delete categories](/api-reference/store-management/catalog/categories-batch/deletecategories)|

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
| store/customer/channel/login/access/updated         |Fires when subscribed to customer login to channel updates | [Update a customer](/api-reference/b3A6MzU5MDQ1Mjk-update-a-customer)  |

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
| store/channel/{channel_id}/order/*                  | Fires on all order events associated with a given channel | not applicable |
| store/channel/{channel_id}/order/created            | Fires on new order creation for a  given channel | [Create an order](/api-reference/store-management/orders/orders/createanorder) |
| store/channel/{channel_id}/order/updated            | Fires when an order is updated for a given channel | [Update an order](/api-reference/store-management/orders/orders/updateanorder) |
| store/channel/{channel_id}/order/archived           | Fires when an order is archived from a given channel | [Archive an order](/api-reference/store-management/orders/orders/deleteanorder) |
| store/channel/{channel_id}/order/statusUpdated        | Fires when an order status has changed for a given channel | not applicable |
| store/channel/{channel_id}/order/message/created      | Fires when an order message is created by customer or in the control panel | not applicable  |
| store/channel/{channel_id}/order/refund/created       | Fires when a refund has been submitted against an order for a given channel | not applicable |

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
## Routes


The following routes webhook events fire in response to actions that affect a specific channel on a store:

| Name / Scope | Description | Corresponding Endpoint |
|:-------------|:------------|:-----------------------|
| store/channel/{channel_id}/settings/route/updated | Fires when a route is updated for a given channel | [Update site's routes](/api-reference/store-management/sites/site-routes/putsitessiteidroutes) or [Update a site route](/api-reference/b3A6MzU5MDUxMDA-update-a-site-route) |

Routes payload objects take the form that follows:

```json title="Example route payload object" lineNumbers
{
 "store_id": "11111",
 "producer": "stores/abcde",
 "created_at": 1641641646,
 "scope": "store/channel/1/settings/route/updated",
 "data": {
    "site_id": 1000
  },
 "hash": "3f9ea420af83450d7ef9f78b08c8af25b2213637"
}
 ``` 

## Settings

The following settings webhook events fire in response to actions that affect a specific channel on a store:


| Name / Scope | Description | Corresponding Endpoint |
|:-------------|:------------|:-----------------------|
| store/settings/*   | Fires when subscribed to all global settings updates  | not applicable |
| store/channel/{channel_id}/settings/*   | Fires when subscribed to all settings updates per channel | not applicable |
| store/settings/locale/updated    | Fires when any of the global locale settings are updated. Fires for both channel-specific locale settings changes and for changes to any global defaults that the specified channel inherits.  | [Update locale settings](/api-reference/store-management/settings/store-locale/putsettingsstorelocale) |
| store/settings/profile/updated    | Fires when any of the global store profile settings are updated. Fires for both channel-specific profile settings changes and for changes to any global defaults that the specified channel inherits.  | [Update store profile settings](/api-reference/store-management/settings/store-profile/putstoreprofilesettings) |
| store/channel/{channel_id}/settings/profile/updated    | Fires when any of the store profile settings that apply to the specified channel are updated. Fires for both channel-specific profile settings changes and for changes to any global defaults that the specified channel inherits.  | [Update store profile settings](/api-reference/store-management/settings/store-profile/putstoreprofilesettings) |
| store/settings/logo/updated    | Fires when any of the global logo settings are updated.| [Update store logo settings](/api-reference/store-management/settings/putstorelogosettings) |
| store/channel/{channel_id}/settings/logo/updated    | Fires when any of the logo settings that apply to the specified channel are updated.| [Update store logo settings](/api-reference/store-management/settings/putstorelogosettings) |
| store/channel/{channel_id}/settings/logo/image/updated  | Fires when any of the logo image settings that apply to the specified channel are updated.| not applicable |
| store/channel/{channel_id}/settings/favicon/image/updated  | Fires when any of the favicon image settings that apply to the specified channel are updated.| not applicable |
| store/channel/{channel_id}/settings/checkout/updated | Fires when checkout settings were updated per given channel. | [Update storefront status](/api-reference/store-management/settings/storefront-status/putsettingsstorefrontstatus) |
| store/channel/{channel_id}/settings/status/updated | Fires when status settings were updated per given channel. | [Update checkout settings](/api-reference/store-management/checkouts/checkout-settings/updatecheckoutsettings) |
| store/channel/{channel_id}/settings/SEO/updated | Fires when SEO settings were updated per given channel. | [Update storefront SEO settings](/api-reference/store-management/settings/storefront-seo/putsettingsstorefrontseo) |
| store/channel/{channel_id}/settings/robots/updated | Fires when search engine robot settings were updated per given channel. | [Update robots.txt settings](/api-reference/store-management/settings/storefront-robotstxt/putsettingsstorefrontrobotstxt) |
| store/channel/{channel_id}/settings/category/updated | Fires when category settings were updated per given channel. | [Update storefront category settings](/api-reference/store-management/settings/storefront-category/putsettingsstorefrontcategory) |
| store/channel/{channel_id}/settings/product/updated | Fires when product settings were updated per given channel. | [Update storefront product settings](/api-reference/store-management/settings/storefront-product/updatestorefrontproductsettings) |
| store/channel/{channel_id}/settings/catalog/updated | Fires when catalog settings were updated per given channel. | [Update catalog settings](/api-reference/store-management/settings/catalog/putcatalogsettings) |
| store/channel/{channel_id}/settings/security/updated | Fires when security settings are updated per given channel. | [Update storefront security settings](/api-reference/store-management/settings/storefront-security/putsettingsstorefrontsecurity) |
| store/channel/{channel_id}/settings/searchContextFilters/updated | Fires when search context filters are updated per given channel. | [Upsert Contextual Filters](/api-reference/store-management/settings/search-filters/upsertcontexts) |
| store/channel/{channel_id}/settings/checkout/updated | Fires when customer settings are updated per given channel. | [Update checkout settings per channel](/api-reference/store-management/checkouts/checkout-settings/updatecheckoutsettings) |
| store/channel/{channel_id}/settings/defaultCustomerGroup/updated | Fires when default customer group is updated per given channel. | [Update a customer group](/api-reference/store-management/customers-v2/customer-groups/updateacustomergroup) |
| store/channel/{channel_id}/settings/customerPrivacy/updated | Fires when customer privacy settings are updated per given channel. | [Update customer settings per channel](/api-reference/store-management/customers-v3/customer-settings-channel/customersettingschannelput) |

Settings payload objects take the form that follows:

```json title="Example settings profile payload object" lineNumbers
{
 "store_id": "11111",
 "producer": "stores/abcde",
 "created_at": 1641641646,
 "scope": "store/channel/1/settings/searchContextFilters/updated",
 "data": {
   "category_id": 29
 },
 "hash": "3f9ea420af83450d7ef9f78b08c8af25b2213637"
}
 ```
 ## Scripts
 
 The following scripts webhook events fire in response to actions that affect a site associated with a specific channel on a store:


| Name / Scope | Description | Corresponding Endpoints |
|:-------------|:------------|:-----------------------|
| store/channel/{channel_id}/script/created       | Fires when a script is created for a given channel | [Create a script](//api-reference/store-management/scripts/scripts/createscript) |
| store/channel/{channel_id}/script/updated       | Fires when a script is updated for a given channel | [Update a script](/api-reference/store-management/scripts/scripts/updatescript) |


Scripts payload objects take the form that follows:

```json title="Example settings profile payload object" lineNumbers
{
 "store_id": "11111",
 "producer": "stores/abcde",
 "created_at": 1641641646,
 "scope": "store/channel/1/script/created",
 "data": {
   "uuid": "0187cc6c-cebf-45f9-93b8-7dd0a2e09774"
 },
 "hash": "3f9ea420af83450d7ef9f78b08c8af25b2213637"
}

 ```
 
 ## Sites

The following sites webhook events fire in response to actions that affect a site associated with a specific channel on a store:


| Name / Scope | Description | Corresponding Endpoints |
|:-------------|:------------|:-----------------------|
| store/channel/{channel_id}/settings/site/updated       | Fires when a site is updated, created, or deleted for a given channel | [Update a channel site](/api-reference/store-management/channels/channel-site/put-channel-site), [Update a site](/api-reference/store-management/sites/sites/put-site), [Create a channel site](/api-reference/store-management/channels/channel-site/postchannelsite), [Create a site](/api-reference/store-management/sites/sites/post-site), [Delete a channel site](/api-reference/store-management/channels/channel-site/deletechannelschannelidsite), or [Delete a site](/api-reference/store-management/sites/sites/delete-site) |


<!-- theme: info -->
> You must include the `site_id` in the payload.



Site payload objects take the form that follows:

```json title="Example site profile payload object" lineNumbers
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
 
 
 ## Web pages

The following web pages webhook events fire in response to actions that affect a specific channel on a store:

| Name / Scope | Description | Corresponding Endpoint |
|:-------------|:------------|:-----------------------|
| store/channel/{channel_id}/page/created             | Fires on page creation for a given channel        | [Create pages](/api-reference/store-management/pages/pages/createpages) |
| store/channel/{channel_id}/page/updated             | Fires when a page is updated for a  given channel | [Update pages](/api-reference/store-management/pages/pages/updatepages) |


Web pages payload objects take the form that follows:

```json title="Example page payload object" lineNumbers
{
 "store_id": "11111",
 "producer": "stores/abcde",
 "created_at": 1641641646,
 "scope": "store/channel/1/page/created",
  "data": {
    "page_id": 11
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

