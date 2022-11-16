# Managing Carts



In this section, we will explain how to use the Carts API to create and manage carts. Additionally, we will discuss how to redirect shoppers from a headless storefront to the BigCommerce hosted cart and checkout pages.

<!-- theme: info -->
> #### Note
> The Carts API supports selling in different countries by allowing overrides for locale and product details. Merchants can supply a cart's locale, alternative product names, and option values.  

## Creating a cart

The [Carts API](/api-reference/store-management/carts) lets you create carts for both existing and guest customers. 

To create a cart, send a request to the [Create a Cart](/api-reference/store-management/carts/cart/createacart) endpoint.

```http title="Create a cart"
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/carts
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}

{
  //example request bodies follow
}

```

Several example request bodies follow:

```json title="Example request body: Create a cart" lineNumbers
{
  "channel_id": 704181,
  "line_items": [
    {
      "quantity": 1,
      "product_id": 80,
      "variant_id": 64
    }
  ],
  "locale": "en-us"
}
```
<!-- theme: info -->
> #### Note
> The locale field supports the ISO standard format for language, script, and region codes.


To create a cart with option selections, include an `option_id` and `option_value` for each selection. 

```json title="Example request body: option selections" lineNumbers
{
  "channel_id": 704181,
  "customer_id": 1,
  "line_items": [
    {
      "quantity": 1,
      "product_id": 80,
      "option_selections": [
        {
          "option_id": 123,
          "option_value": "Hello!"
        }
      ]
    }
  ],
  "locale": "en-us"
}
```

To create a cart for an existing customer, include the `customer_id` in your request body.

```json title="Example request body: existing customer" lineNumbers
{
  "channel_id": 704181,
  "customer_id": 1,
  "line_items": [
    {
      "quantity": 1,
      "product_id": 80,
      "variant_id": 64
    }
  ],
  "locale": "en-us"
}
```

<!-- theme: info -->
> #### Note
> The `id` returned with the response corresponds to the `cart_id` required to generate a cart redirect URL.


### Guest cart

A guest cart assumes the shopper is not a customer and is not signing in or creating an account during checkout. You can handle guest carts by displaying the cart data to the customer and then moving them to checkout using the [Checkouts API](/api-reference/store-management/checkouts).

## Redirecting to checkout

A cart redirect URL redirects a shopper to a BigCommerce hosted checkout page. You can generate a cart redirect URL only from a cart created using the Carts API.

To generate a cart redirect URL, send a request to the [Create cart redirect URL](/api-reference/store-management/carts/cart-redirect-urls/createcartredirecturl) endpoint. Use the `id` returned with the [Create a cart](/api-reference/store-management/carts/cart/createacart) response for the `cartId` path parameter.

```http title="Create cart redirect URL"
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/carts/{{cartId}}/redirect_urls
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
```

The response will contain `cart_url` and `checkout_url` properties. Use these URLs to redirect the customer to the BigCommerce hosted cart or checkout pages. You can use the `embedded_checkout_url` with the [Checkout SDK](/stencil-docs/customizing-checkout/checkout-sdk) to embed the BigCommerce hosted checkout into a headless site using an iFrame.

```json title="Example response: Create cart redirect URL" lineNumbers
{
  "cart_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?action=load&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b",
  "checkout_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b",
  "embedded_checkout_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?embedded=1&action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b"
}
```

### Creating a redirect using the include query parameter

It is possible to generate a redirect URL when creating a cart using the [Create a Cart](/api-reference/store-management/carts/cart/createacart) endpoint by appending the `include=redirect_urls` query parameter to the request URL.

```http title="Create a cart"
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/carts?include=redirect_urls
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}

{
  // request body
}

```

### Signing in and redirecting a customer

Registered customers have personally-identifiable information, or _PII_, saved in their accounts. If you passed a `customer_id` in the [Create a Cart](/api-reference/store-management/carts/cart/createacart) request, send the customer to a sign-in page before redirecting them to cart or checkout pages. You can use the [Customer Login API](/api-docs/storefront/customer-login-api) to manage the redirection flow.

<!-- theme: info -->
> #### API account notes
> The Customer Login API requires **app API credentials**. To learn more, see the articles on the [Customer Login API](/api-docs/storefront/customer-login-api#api-account-notes) and [Authentication](/api-docs/getting-started/authentication#user-generated-jwts).

The Customer Login API requires your application to generate a JWT, then send it as a path parameter of the [Send login token](/api-reference/storefront/customer-login/login-token/get-login-token) endpoint.

The following table is a reference for the specifics of JWT claims in the context of this use case. For a complete listing of payload claims, both required and optional, see the [Customer Login API JWT payload reference](/api-docs/storefront/customer-login-api#customer-login-jwt-payload-reference).

| Field Name | Type | Description |
|:-----------|:-----|:------------|
| `iss` | string | The API account client ID.|
| `store_hash` | string | The subject store hash.|
| `channel_id` | integer | The `channel_id` of the subject storefront. Required for this use case; see [Channel ID is mandatory](#channel-id-is-mandatory). |
| `customer_id` | integer | The ID of the shopper you associated with the cart.|
| `redirect_to` | string | One of the redirect URLs you generated per the section on [Redirecting to checkout](#redirecting-to-checkout). |

A successful call to the [Send login token](/api-reference/storefront/customer-login/login-token/get-login-token) endpoint will redirect the user to the supplied relative URL. If you're calling the Customer Login API server-side, pass the redirect along to the frontend.

<!-- theme: info -->
> #### Channel ID is mandatory
> The Customer Login JWT must include a `channel_id` property. If you omit the `channel_id`, CORS checks will fail and the checkout will not load.

If you are using [Embedded Checkout](/api-docs/storefronts/embedded-checkout/embedded-checkout-overview), create the Customer Login JWT, then pass the full URL for a call to the [Send login token](/api-reference/storefront/customer-login/login-token/get-login-token) endpoint to the Checkout SDK. The SDK will sign the customer in, then redirect them to the Embedded Checkout iFrame.

## Deleting a line item

To delete a line item from a cart, send a request to the [Delete Cart Line Item](/api-reference/store-management/carts/cart-items/deletecartlineitem) endpoint, passing the associated `cartId` and `itemId` as path parameters.

```http title="Delete a line item"
DELETE https://api.bigcommerce.com/stores/{{store_hash}}/v3/carts/{{cartId}}/items/{{itemId}}
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
```

## Clearing the cart

Removing all cart items essentially deletes the cart. To clear the cart, send a request to the [Delete a Cart](/api-reference/store-management/carts/cart/deleteacart) endpoint.

```http title="Delete a cart"
DELETE https://api.bigcommerce.com/stores/{{store_hash}}/v3/carts/{{cartId}}
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
```

## Next step

- [Learn how to move a cart to checkout](/api-docs/storefronts/guide/checkout)

## Resources

- [Carts API](/api-reference/store-management/carts)
- [Storefront Carts API](/api-reference/storefront/carts)
- [Persistent Cart](https://support.bigcommerce.com/s/article/Persistent-Cart)
