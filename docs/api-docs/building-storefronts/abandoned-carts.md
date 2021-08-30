# Creating Abandoned Cart Experience

<div class="otp" id="no-index">

### On this page

- [Abandoned Cart Saver](#abandoned-cart-saver)
- [Recreating the abandoned cart experience](#recreating-the-abandoned-cart-experience)
- [Cart recovery and custom checkout solutions](#cart-recovery-and-custom-checkout-solutions)
- [Resources](#resources)

</div>

BigCommerce offers a powerful abandoned cart recovery system to help merchants recover lost business and effectively convert abandoned carts into orders. Using BigCommerce's built-in marketing tools, merchants can set up automated drip email campaigns to entice customers to return to their carts and complete the checkout process.

This article provides a high-level overview of how to enable the abandoned cart experience on a headless storefront.

## Abandoned Cart Saver

The [Abandoned Cart Saver](https://support.bigcommerce.com/s/article/Using-the-Abandoned-Cart-Saver?language=en_US) is a built-in tool that sends automated drip emails to customers who have abandoned their carts. These cart recovery emails contain a link that routes shoppers back to the cart page where they can complete the order.

![Complete your purchase email](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Abandoned%20Carts/01-abandoned-carts.png "Complete your purchase email")

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> A cart is considered abandoned after a customer leaves the cart without attempting payment and the cart has been inactive for one hour.

</div>
</div>
</div>

The Abandoned Cart Saver will trigger under the following circumstances:
- **Stencil stores**: A logged in customer adds an item to the cart, then leaves the store without attempting payment.
- **Stencil and headless stores using [Optimized One-Page Checkout](https://support.bigcommerce.com/s/article/Optimized-Single-Page-Checkout?language=en_US)**: A guest customer adds an item to the cart, enters their email address, proceeds as far as submitting their shipping and billing information, then leaves the store without attempting payment.
- **Headless stores using custom checkout solutions**: A logged in customer with the `accepts_product_review_abandoned_cart_email` property set to `true` adds an item to the cart, then leaves the store without attempting payment.

To view your Abandoned Cart Emails settings, go to **Marketing > Abandoned Cart Emails** in the control panel.

![Abandoned cart emails](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Abandoned%20Carts/02-abandoned-carts.png "Abandoned cart emails")

## Recreating the abandoned cart experience

To successfully recreate the cart recovery experience on a headless storefront, you need to obtain the cart ID. The abandoned cart email link contains a token in the form of a `t` parameter that you can use to query the [Abandoned Carts API](https://developer.bigcommerce.com/api-reference/store-management/abandoned-carts/abandoned-carts/getabandonedcarts) to retrieve the cart ID.

**Abandoned Cart Saver email link example**:

`http://commerce-zr8y-teststore-bigcommerce.vercel.app/my-abandoned-cart-page/?t=305c6c15f6f0a3c0929770a538cf1ff7`

To [get the abandoned cart](https://developer.bigcommerce.com/api-reference/store-management/abandoned-carts/abandoned-carts/getabandonedcarts) ID, send a `GET` request to `/abandoned-carts/{token}`.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/abandoned-carts/{token}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/abandoned-carts/abandoned-carts/getabandonedcarts#requestrunner)

The response will contain the corresponding cart ID.

```json
{
  "data": {
    "cart_id": "74cd7d0a-c748-4efa-b9bf-cf15751e78b2"
  },
  "meta": {}
}
```

You can now retrieve the cart details using the [Carts API](https://developer.bigcommerce.com/api-reference/store-management/carts) and recreate the cart page on your headless storefront. To [get the cart](https://developer.bigcommerce.com/api-reference/store-management/carts/cart/getacart) details, send a `GET` request to `/carts/{cartId}`.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/carts/{cartId}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/carts/cart/getacart#requestrunner)

### Setting up the abandoned cart route

To point the abandoned cart notification link to your headless storefront, set up a `recover_abandoned_cart` site route. BigCommerce will use this route to send shoppers to the abandoned cart page on your headless storefront.

A channel site ID is required for this operation. If you do not know your channel site ID, you can retrieve it by sending a `GET` request to the [Get a Channel Site](https://developer.bigcommerce.com/api-reference/store-management/channels/channel-site/get-channel-site) endpoint.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/channels/{channel_id}/site
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/channels/channel-site/get-channel-site#requestrunner)

**Example response**

```json
{
  "data": {
    "channel_id": 773240,
    "created_at": "2021-08-23T20:02:11Z",
    "id": 1001,
    "updated_at": "2021-08-23T20:02:11Z",
    "url": "http://commerce-zr8y-teststore-bigcommerce.vercel.app"
  },
  "meta": {}
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> You can locate your channel ID by going to **Channel Manager > Storefronts** in the control panel, clicking on **...** next to your headless storefront, and selecting **Advanced settings** from the dropdown, or by querying the [Channels API](https://developer.bigcommerce.com/api-reference/store-management/channels/channels/listchannels).

</div>
</div>
</div>

To create a `recover_abandoned_cart` site route, send a `POST` request to the [Create a Site Route](https://developer.bigcommerce.com/api-reference/store-management/sites/site-routes/post-site-route) endpoint.


```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/sites/{site_id}/routes
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
 "type": "recover_abandoned_cart",
 "matching": "*",
 "route": "/my-abandoned-cart-page/"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/sites/site-routes/post-site-route#requestrunner)

**Example response**

```json
{
   "data": {
       "id": 11,
       "type": "recover_abandoned_cart",
       "matching": "*",
       "route": "/my-abandoned-cart-page/",
       "created_at": "2021-08-25T18:36:05Z",
       "updated_at": "2021-08-25T18:36:05Z"
   },
   "meta": {}
}
```

To test the route creation, send a `GET` request to the [Get a Site's Routes](https://developer.bigcommerce.com/api-reference/store-management/sites/site-routes/index-site-routes) endpoint. The response will contain all of the routes associated with your headless storefront's domain.

## Cart recovery and custom checkout solutions

To trigger the abandoned cart recovery experience, the cart must be associated with a channel ID and be aware of the shopper's email address. Headless storefronts using custom checkout solutions can leverage BigCommerce's [Customers](https://developer.bigcommerce.com/api-reference/store-management/customers-v3) and [Carts](https://developer.bigcommerce.com/api-reference/store-management/carts) APIs to initiate the abandoned cart recovery experience. 

The following example demonstrates how to create a cart and associate it to the headless storefront without initializing BigCommerce's [Open Checkout](https://github.com/bigcommerce/checkout-js).

1. Link your headless storefront to your sales channel by sending a `POST` request to the `/sites` endpoint.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/sites
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "url": "http://commerce-zr8y-teststore-bigcommerce.vercel.app",
  "channel_id": 773240
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/sites/sites/post-site#requestrunner)

2. Using the [Site Routes](https://developer.bigcommerce.com/api-reference/store-management/sites/site-routes/post-site-route) endpoint, create a `recover_abandoned_cart` route.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/sites/{site_id}/routes
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "matching": "*",
  "route": "/my-abandoned-cart-page/",
  "type": "recover_abandoned_cart"
}

```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/sites/site-routes/post-site-route#requestrunner)

3. To create a customer, send a `POST` request to the `/customers` endpoint. In the request body, set `accepts_product_review_abandoned_cart_emails` to `true` to enable Abandoned Cart Saver notifications. This will create a customer account optimized to receive Abandoned Cart Saver emails.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/customers
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

[
 {
   "email": "test_user@bigcommerce.com",
   "first_name": "Jane",
   "last_name": "Doe",
   "addresses": [
     {
       "address1": "123 Main St",
       "address2": "",
       "address_type": "residential",
       "city": "Austin",
       "country_code": "US",
       "first_name": "Jane",
       "last_name": "Doe",
       "phone": "512-111-0000",
       "postal_code": "78701",
       "state_or_province": "Texas"
     }
   ],
   "accepts_product_review_abandoned_cart_emails": true,
   "origin_channel_id": 773240,
   "channel_ids": [
     773240
   ]
 }
]
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/customers-v3/customers/customerspost#requestrunner)

4. Send a `POST` request to the `/carts` endpoint to create a cart. Include the customer ID and channel ID in the request body so that the correct site and routes are used to create the URL used in transactional emails.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/carts
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "base_amount": 25,
  "cart_amount": 25,
  "channel_id": 773240,
  "currency": {
    "code": "USD"
  },
  "customer_id": 2,
  "discount_amount": 0,
  "line_items": [
      {
        "coupon_amount": 0,
        "coupons": [],
        "discount_amount": 0,
        "discounts": [],
        "extended_list_price": 25,
        "extended_sale_price": 25,
        "id": "5572bddf-f24d-4f4a-a1b6-29d4519494a6",
        "image_url": "https://cdn11.bigcommerce.com/s-hg3tj17dfi/product_images/attribute_rule_images/8_thumb_1629748882.png",
        "is_mutable": true,
        "is_require_shipping": true,
        "list_price": 25,
        "name": "Short sleeve t-shirt",
        "parent_id": null,
        "product_id": 114,
        "quantity": 1,
        "sale_price": 25,
        "sku": "5F6D82D6569C0_8579",
        "taxable": true,
        "url": "https://next-storefront2.mybigcommerce.com/ladies-short-sleeve-t-shirt/",
        "variant_id": 85
      }
    ],
  "locale": "en",
  "tax_included": false
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/carts/cart/createacart#requestrunner)

This will create a cart associated with the headless storefront without using BigCommerce's Open Checkout. Because the payment was never attempted, this cart will be treated as abandoned initiating the abandoned cart recovery experience. 

## Resources

- [Building Storefront Channels](https://developer.bigcommerce.com/api-docs/channels/tutorials/storefront)
- [Open Checkout Quick Start](https://developer.bigcommerce.com/stencil-docs/customizing-checkout/open-checkout-quick-start)
- [Selling Everywhere with Channel Manager](https://support.bigcommerce.com/s/article/Selling-Everywhere-with-Channel-Manager?language=en_US)
- [Using the Abandoned Cart Saver](https://support.bigcommerce.com/s/article/Using-the-Abandoned-Cart-Saver?language=en_US)