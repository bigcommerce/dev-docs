# Managing Carts



In this section, we will explain how to use the Carts API to create and manage carts. Additionally, we will discuss how to redirect shoppers from a headless storefront to the BigCommerce hosted cart and checkout pages.

## Creating a cart

The [Carts API](https://developer.bigcommerce.com/api-reference/store-management/carts) lets you create carts for both existing and guest customers. 

To create a cart, send a `POST` request to the [Create a Cart](https://developer.bigcommerce.com/api-reference/store-management/carts/cart/createacart) endpoint.

```http
POST https://api.bigcommerce.com/stores/{store_hash}/v3/carts
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
```

**Create a Cart request example**

```json
{
    "channel_id": 704181,
    "line_items": [
        {
            "quantity": 1,
            "product_id": 80,
            "variant_id": 64
        }
    ]
}
```

To create a cart for an existing customer, include the `customer_id` in your `POST` request.

```json
{
    "channel_id": 704181,
    "customer_id": 1,
    "line_items": [
        {
            "quantity": 1,
            "product_id": 80,
            "variant_id": 64
        }
    ]
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/carts/cart/createacart#requestrunner)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> **Note**
> The `id` returned in the response will correspond to the `cart_id` required to generate a cart redirect URL.

</div>
</div>
</div>

### Guest cart

A guest cart assumes the shopper is not a customer and is not logging in or creating an account during checkout. You can handle guest carts by displaying the cart data to the customer and then moving them to checkout using the [Checkouts API](https://developer.bigcommerce.com/api-reference/store-management/checkouts).

## Redirecting to checkout

A cart redirect URL redirects a shopper to a BigCommerce hosted checkout page. You can generate a cart redirect URL only from a cart created using the Carts API.

To generate a cart redirect URL, send a `POST` request to the [Create Cart Redirect URL](https://developer.bigcommerce.com/api-reference/store-management/carts/cart-redirect-urls/createcartredirecturl) endpoint. Use the `id` returned in the [Create a Cart](https://developer.bigcommerce.com/api-reference/store-management/carts/cart/createacart) response for the `cartId` path parameter.

```http
POST https://api.bigcommerce.com/stores/{store_hash}/v3/carts/{cartId}/redirect_urls
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/carts/cart-redirect-urls/createcartredirecturl#requestrunner)

The response will contain `cart_url` and `checkout_url` parameters - use these URLs to redirect the customer to the BigCommerce hosted cart or checkout pages. You can use the `embedded_checkout_url` with the [Checkout SDK](https://developer.bigcommerce.com/stencil-docs/customizing-checkout/checkout-sdk) to embed the BigCommerce hosted checkout into a headless site via an iFrame.

```json
{
  "cart_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?action=load&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b",
  "checkout_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b",
  "embedded_checkout_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?embedded=1&action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b"
}
```

### Creating a redirect using the include query parameter

It is possible to generate a redirect URL when creating a cart using the [Create a Cart](https://developer.bigcommerce.com/api-reference/store-management/carts/cart/createacart) endpoint by appending the `include=redirect_urls` query parameter to the request URL.

```http
POST https://api.bigcommerce.com/stores/{store_hash}/v3/carts?include=redirect_urls
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
```

### Logging in and redirecting a customer

If you passed the `customer_id` in the [Create a Cart](https://developer.bigcommerce.com/api-reference/store-management/carts/cart/createacart) request, redirect the customer to the login URL first before redirecting them to the cart or checkout pages. To do so, create a customer login JWT using the same `customer_id` and set the `redirect_to` parameter to the relative path of the desired redirect URL. 

**Customer login JWT payload example**

```js
{
  "iss": {{CLIENT_ID}},
  "iat": 1535393113,
  "jti": {{UUID}},
  "operation": "customer_login",
  "store_hash": {{STORE_HASH}},
  "customer_id": {{CUSTOMER_ID}},
  "channel_id": {{CHANNEL_ID}},
  "redirect_to": "/cart.php?embedded=1&action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b",
  "request_ip": "111.222.333.444"
}
```

Use the payload to generate the customer login JWT. Then, create a customer login URL by appending the JWT to `https://{{YOUR_BIGCOMMERCE_DOMAIN}}.com/login/token/`. 

For example:

`https://store.example.com/login/token/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ7Y2xpZW50X2lkfSIsImlhdCI6MTUzNTM5MzExMywianRpIjoie3V1aWR9Iiwib3BlcmF0aW9uIjoiY3VzdG9tZXJfbG9naW4iLCJzdG9yZV9oYXNoIjoie3N0b3JlX2hhc2h9IiwiY3VzdG9tZXJfaWQiOjJ9.J-fAtbjRFGdLsT744DhoprFEDqIfVq72HbDzrbFy6Is`

The customer login JWT must include a `channel_id` property. If you omit the `channel_id`, CORS checks will fail and the checkout will not load.

If you are using [Embedded Checkout](https://developer.bigcommerce.com/api-docs/storefronts/embedded-checkout/embedded-checkout-overview), pass the customer login URL to the Checkout SDK to log in the customer, then redirect to checkout within the embedded checkout iFrame.

## Deleting a line item

To delete a line item from a cart, send a `DELETE` request to the [Delete Cart Line Item](https://developer.bigcommerce.com/api-reference/store-management/carts/cart-items/deletecartlineitem) endpoint passing in the associated `cartId` and `itemId`.

```http
DELETE https://api.bigcommerce.com/stores/{store_hash}/v3/carts/{cartId}/items/{itemId}
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/carts/cart-items/deletecartlineitem#requestrunner)

## Clearing the cart

Removing all cart items essentially deletes the cart. To clear the cart, call the [Delete a Cart](https://developer.bigcommerce.com/api-reference/store-management/carts/cart/deleteacart) endpoint.

```http
DELETE https://api.bigcommerce.com/stores/{store_hash}/v3/carts/{cartId}
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/carts/cart/deleteacart#requestrunner)

## Next steps

- [Learn how to move a cart to checkout](https://developer.bigcommerce.com/api-docs/storefronts/guide/checkout)

## Resources

- [Carts API](https://developer.bigcommerce.com/api-reference/store-management/carts)
- [Storefront Carts API](https://developer.bigcommerce.com/api-reference/storefront/carts)
- [Persistent Cart](https://support.bigcommerce.com/s/article/Persistent-Cart)
