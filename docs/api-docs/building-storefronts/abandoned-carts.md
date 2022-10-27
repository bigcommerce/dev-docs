# Recovering Abandoned Carts



BigCommerce offers a powerful cart recovery system to help merchants recover lost business by effectively converting abandoned carts into orders. Using BigCommerce's built-in [Abandoned Cart Saver](https://support.bigcommerce.com/s/article/Using-the-Abandoned-Cart-Saver?language=en_US) tool, merchants can automate email campaigns to encourage customers to complete transactions after leaving items in their cart.

This article provides a high-level overview of how headless storefronts can leverage the Abandoned Cart Saver and BigCommerce's APIs to recover abandoned carts.

## Abandoned Cart Saver

BigCommerce considers a cart _abandoned_ when a shopper leaves the cart without attempting payment and the cart has been inactive for one hour. [Abandoned Cart Saver](https://support.bigcommerce.com/s/article/Using-the-Abandoned-Cart-Saver?language=en_US) emails contain a link that routes shoppers back to the cart page where they can complete the order.

![Complete your purchase email](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Abandoned%20Carts/01-abandoned-carts.png "Complete your purchase email")

To enable the Abandoned Cart Saver notifications on your store, go to **Settings > General > Miscellaneous** in an active MSF-enabled control panel. To access your Abandoned Cart Emails settings, visit **Marketing > Abandoned Cart Emails**.

![Abandoned cart emails](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Abandoned%20Carts/02-abandoned-carts.png "Abandoned cart emails")

### Triggering Abandoned Cart Saver notifications

The Abandoned Cart Saver will trigger under the following circumstances:

- **Stencil stores**: a logged-in customer adds an item to the cart, then leaves the store without attempting payment.
- **Stores using [Optimized One-Page Checkout](https://support.bigcommerce.com/s/article/Optimized-Single-Page-Checkout?language=en_US)**: a guest customer adds an item to the cart, begins checkout by entering their email address, then leaves the store without attempting payment.
- **Headless stores using custom checkout solutions**:
  - a logged-in customer with the `accepts_product_review_abandoned_cart_email` property set to `true` creates a cart, then leaves the store without attempting payment.
  - a guest customer creates a cart and add his email address to the cart, then leaves the store without attempting payment.

## Setting up the abandoned cart route

The Abandoned Cart Saver email link points to the Stencil storefront (channel ID 1) by default. To point the Abandoned Cart Saver email link to your headless storefront, you need to set up a `recover_abandoned_cart` site route.

This operation requires a channel site ID. If you do not know your channel site ID, you can retrieve it by sending a `GET` request to the [Get a Channel Site](/api-reference/store-management/channels/channel-site/get-channel-site) endpoint.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/channels/{channel_id}/site
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

```

<!-- [![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/store-management/channels/channel-site/get-channel-site#requestrunner) -->

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

You can locate your channel ID by:

- going to **Channel Manager > Storefronts** in the control panel, clicking on **...** next to your headless storefront, and selecting **Edit settings** from the dropdown

**or**

- sending a `GET` request to the [Get All Channels](/api-reference/store-management/channels/channels/listchannels) endpoint.

To create a `recover_abandoned_cart` site route, send a `POST` request to the [Create a Site Route](/api-reference/store-management/sites/site-routes/post-site-route) endpoint.

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

<!-- [![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/store-management/sites/site-routes/post-site-route#requestrunner) -->

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

To test the route creation, send a `GET` request to the [Get a Site's Routes](/api-reference/store-management/sites/site-routes/index-site-routes) endpoint. The response will contain all of the routes associated with your headless storefront's domain.

## Leveraging the Abandoned Carts API

The Abandoned Cart Saver email link contains a token in the form of a `t` parameter that you can use to call the [Abandoned Carts API](/api-reference/store-management/abandoned-carts/abandoned-carts/getabandonedcarts) to get the corresponding cart ID. A headless storefront can then use this cart ID to request the cart details from the [Carts API](/api-reference/store-management/carts).

**Abandoned Cart Saver email link example**:

`http://commerce-zr8y-teststore-bigcommerce.vercel.app/my-abandoned-cart-page/?t=305c6c15f6f0a3c0929770a538cf1ff7`

To get the abandoned cart ID, send a `GET` request to the [Get an Abandoned Cart](/api-reference/store-management/abandoned-carts/abandoned-carts/getabandonedcarts) endpoint.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/abandoned-carts/{token}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

```

<!-- [![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/store-management/abandoned-carts/abandoned-carts/getabandonedcarts#requestrunner) -->

The response will contain the corresponding cart ID.

```json
{
  "data": {
    "cart_id": "74cd7d0a-c748-4efa-b9bf-cf15751e78b2"
  },
  "meta": {}
}
```

To retrieve the cart details, send a `GET` request to the [Get a Cart](/api-reference/store-management/carts/cart/getacart) endpoint.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/carts/{cartId}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

```

<!-- [![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/store-management/carts/cart/getacart#requestrunner) -->

The response will contain the cart details.

## Implementing cart recovery on headless storefronts

To trigger the abandoned cart recovery sequence, the cart must be associated with a channel ID and be aware of the shopper's email address. Headless storefronts using custom checkout solutions can leverage BigCommerce's [Customers](/api-reference/store-management/customers-v3) and [Carts](/api-reference/store-management/carts) APIs to initiate the abandoned cart recovery sequence.

The following example demonstrates how a headless storefront can recover abandoned cart details without relying on Optimized One-Page Checkout.

1. Link your headless storefront to your sales channel by sending a `POST` request to the [Create a Site](/api-reference/store-management/sites/sites/post-site) endpoint.

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

   <!-- [![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/store-management/sites/sites/post-site#requestrunner) -->

2. Using the [Site Routes](/api-reference/store-management/sites/site-routes/post-site-route) endpoint, create a `recover_abandoned_cart` route.

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

   <!-- [![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/store-management/sites/site-routes/post-site-route#requestrunner) -->

### Create cart with customer

1. To create a customer, send a `POST` request to the [Create Customers](/api-reference/store-management/customers-v3/customers/customerspost) endpoint. In the request body, set `accepts_product_review_abandoned_cart_emails` to `true` to enable Abandoned Cart Saver notifications. This will create a customer account optimized to receive Abandoned Cart Saver emails.

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

   <!-- [![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/store-management/customers-v3/customers/customerspost#requestrunner) -->

2. Send a `POST` request to the [Create a Cart](/api-reference/store-management/carts/cart/createacart) endpoint to create a cart. Include the customer ID and channel ID in the request body so that the URL inserted in transactional emails contains the correct site and routes.

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

   <!-- [![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/store-management/carts/cart/createacart#requestrunner) -->

### Create cart with guest customer

1. Send a `POST` request to the [Create a Cart](/api-reference/store-management/carts/cart/createacart) endpoint to create a cart.

   ```http
   POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/carts
   X-Auth-Token: {{ACCESS_TOKEN}}
   Content-Type: application/json
   Accept: application/json

   {
     "channel_id": 773240,
     "line_items": [
       {
         "quantity": 5,
         "product_id": 191
       }
     ]
   }
   ```

   <!-- [![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/store-management/carts/cart/createacart#requestrunner) -->

2. Send a `POST` request to the [Add Checkout Billing Address](/api-reference/store-management/checkouts/checkout-billing-address/checkoutsbillingaddressbycheckoutidpost) endpoint to add checkout billing address. Include the email address in the request body so that the abandoned cart saver notification could be triggered.

   ```http
   POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/checkouts/{checkoutId}/billing-address
   X-Auth-Token: {{ACCESS_TOKEN}}
   Content-Type: application/json
   Accept: application/json

   {
     "first_name": "Jane",
     "last_name": "Doe",
     "email": "jane@example.com",
     "address1": "123 Main Street",
     "address2": "",
     "city": "Austin",
     "state_or_province": "Texas",
     "state_or_province_code": "TX",
     "country_code": "US",
     "postal_code": "78751",
     "phone": "1234567890"
   }
   ```

   <!-- [![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/store-management/checkouts/checkout-billing-address/checkoutsbillingaddressbycheckoutidpost#requestrunner) -->

This request creates a cart associated with the headless storefront without using BigCommerce's Optimized One-Page Checkout. Because the checkout is incomplete, the store treats this cart as abandoned and initiates the abandoned cart recovery sequence.

## Resources

- [Building Storefront Channels](/api-docs/channels/tutorials/storefront)
- [Open Checkout Quick Start](/stencil-docs/customizing-checkout/open-checkout-quick-start)
- [Selling Everywhere with Channel Manager](https://support.bigcommerce.com/s/article/Selling-Everywhere-with-Channel-Manager?language=en_US)
- [Using the Abandoned Cart Saver](https://support.bigcommerce.com/s/article/Using-the-Abandoned-Cart-Saver?language=en_US)
