# Creating Abandoned Cart Experience

<div class="otp" id="no-index">

### On this page

- [Cart abandonment](#cart-abandonment)
- [Abandoned Cart Saver](#abandoned-cart-saver)
- [Recreating abandoned cart experiece](#recreating-abandoned-cart-experiece)
- [Support and customization](#support-and-customization)
- [Resources](#resources)

</div>

BigCommerce offers a powerful abandoned cart recovery system to help merchants recover lost business and effectively convert abandoned carts into orders. Using BigCommerce's built-in marketing tools merchants can set up automated drip email campaigns to entice customers to return to their carts and complete the checkout process. Headless storefronts can leverage the BigCommerce's native abandoned cart notifications to drive sales by getting more shoppers to convert.

This article provides a high-level overview of how to enable the abandoned cart experience on a headless storefront.

## Abandoned Cart Saver

The [Abandoned Cart Saver](https://support.bigcommerce.com/s/article/Using-the-Abandoned-Cart-Saver?language=en_US) is a built-in tool that sends automated drip emails to customers who have abandoned their carts. These cart recovery emails contain a link to recover the cart. When a shopper clicks the **Complete order** button, they are routed to the abandoned cart page where they can complete their order.

![Complete your purchase email](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Abandoned%20Carts/01-abandoned-carts.png "Complete your purchase email")

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> A cart is considered abandoned after a customer leaves the cart without completing the checkout and the cart has been inactive for one hour.

</div>
</div>
</div>

The Abandoned Cart Saver will trigger under the following circumstances:
- **Stencil stores**: A logged in customer adds an item to the cart, then leaves the store without attempting to checkout.
- **Headless stores using the [Optimized One-Page Checkout](https://support.bigcommerce.com/s/article/Optimized-Single-Page-Checkout?language=en_US)**: A guest customer adds an item to the cart, enters their email address, proceed as far as submitting their shipping and billing information, then leaves the store without completing the checkout.
- **Headless stores using a custom checkout solution**: A logged in customer with the `accepts_product_review_abandoned_cart_email` property set to `true` adds an item to the cart, then leaves the store without attemting to checkout.

You can access BigCommerce email settings in the control panel by going to **Store Setup › Store Settings**, under the **Miscellaneous** tab. To view Abandoned Cart Emails settings, go to **Marketing > Abandoned Cart Emails**.

![Abandoned cart emails](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Abandoned%20Carts/02-abandoned-carts.png "Abandoned cart emails")

## Recreating abandoned cart experiece

For this portion of the article, we will assume that you have already integrated your headless frontend with the BigCommerce backend. 

To successfully recreate the abandoned cart experience on a headless storefront, you need to obtain the ID of the cart abandoned by the shopper. That is where cart recovery emails sent by the Abandoned Cart Saver tool come in. A cart recovery link contains an abandoned cart token in the form of a `t` parameter. You can use this token to query the [Abandoned Carts API](https://developer.bigcommerce.com/api-reference/store-management/abandoned-carts/abandoned-carts/getabandonedcarts) to retrieve the cart ID corresponding to the cart abandoned by the shopper.

**Example Complete order link**:

`http://commerce-zr8y-teststore-bigcommerce.vercel.app/my-abandoned-cart-page/?t=305c6c15f6f0a3c0929770a538cf1ff7`

In this example, when the `http://commerce-zr8y-teststore-bigcommerce.vercel.app` headless store gets a request from a user clicking the **Complete order** button in the abandoned cart email, you can query the Abandoned Carts API using the `305c6c15f6f0a3c0929770a538cf1ff7` token to fetch cart ID which you can then use to retrieve the contents of the cart and render the equivalent page on your headless storefront.

To [get an abandoned cart](https://developer.bigcommerce.com/api-reference/store-management/abandoned-carts/abandoned-carts/getabandonedcarts) ID, send a `GET` request to `/abandoned-carts/{token}`.

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

You can now retrieve the cart details by querying the [Carts API](https://developer.bigcommerce.com/api-reference/store-management/carts) and recreate the cart page on your headless storefront. To [get the cart](https://developer.bigcommerce.com/api-reference/store-management/carts/cart/getacart) send a `GET` request to `/carts/{cartId}`.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/carts/{cartId}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/carts/cart/getacart#requestrunner)

### Retrieving the abandoned cart token

To retrieve the abandoned cart token generated by BigCommerce, you need to create a `recover_abandoned_cart` route to point the abandoned cart email notification link to your headless storefront using the [Sites API](https://developer.bigcommerce.com/api-reference/store-management/sites). The purpose of the Sites API is to tell BigCommerce what resource on the headless storefront a link should point to.

To create a `recover_abandoned_cart` route, you need to identify the site ID for the channel that reflects your headless storefront.

You can retrieve the channel ID associated with your headless storefront by quering the [Channels API](https://developer.bigcommerce.com/api-reference/store-management/channels/channels/listchannels) or by going to **Channel Manager > Storefronts** in the control panel, clicking on **...** next to your headless storefornt, and choosing **Advanced settings** from the dropdown. 

![Channel ID](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Abandoned%20Carts/03-abandoned-carts.png "Channel ID")

A **channel site** is the domain associated with the channel. To access site data for your channel ID, send a `GET` request to [Get a Channel Site](https://developer.bigcommerce.com/api-reference/store-management/channels/channel-site/get-channel-site) endpoint.

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

Now that you have the site ID for your headless channel, you can create a site route for the abandoned cart page using the Sites API. To create a site route, send a `POST` request to the [Create a Site Route](https://developer.bigcommerce.com/api-reference/store-management/sites/site-routes/post-site-route) endpoint.


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

You can test the route creation by sending a `GET` request to [Get a Site's Routes](https://developer.bigcommerce.com/api-reference/store-management/sites/site-routes/index-site-routes) endpoint to retrieve the routes associated with your headless storefront's domain.

After you set up the `recover_abandoned_cart` site route, BigCommerce will use it to point shoppers to the abandoned cart page on your headless store.

## Resources

- [Building Storefront Channels](https://developer.bigcommerce.com/api-docs/channels/tutorials/storefront)
- [Open Checkout Quick Start](https://developer.bigcommerce.com/stencil-docs/customizing-checkout/open-checkout-quick-start)
- [Selling Everywhere with Channel Manager](https://support.bigcommerce.com/s/article/Selling-Everywhere-with-Channel-Manager?language=en_US)
- [Using the Abandoned Cart Saver](https://support.bigcommerce.com/s/article/Using-the-Abandoned-Cart-Saver?language=en_US)