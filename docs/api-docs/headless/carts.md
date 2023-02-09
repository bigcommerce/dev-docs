# Managing Carts

This article explains how to use the Carts API to create and manage carts. It also discusses how to redirect shoppers from headless storefronts to BigCommerce-hosted cart and checkout pages.

<Callout type="info">
  #### Locale support
  The Carts API supports selling in different markets by allowing locale-based overrides for product details. Supply a cart's locale and add `option_selections` to the cart's line items to configure alternative product names, option names, and modifier values. The Carts API stores the locale and makes it available to the Checkout and Orders APIs.
</Callout>

## Creating a cart

The [Carts API](/api-reference/store-management/carts) lets you create carts for both existing and guest customers.

To create a cart, send a request to the [Create a cart](/api-reference/store-management/carts/cart/createacart) endpoint.

```http filename="Create a cart" showLineNumbers
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/carts
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
```

Several example request bodies follow:


<Tabs items={['With option selections', 'Minimal detail', 'With currency, locale']}>
  <Tab>

    To create a cart with option selections, include an `option_id` and `option_value` for each selection. Make sure to specify a locale.

    ```json filename="Example request body: option selections" showLineNumbers
    {
      "customer_id": 0,
      "line_items": [
        {
          "quantity": 2,
          "product_id": 118,
          "list_price": 25,
          "variant_id": 140,
          "name": "قميص",
          "option_selections": [
            {
              "option_id": 125,
              "option_value": 127,
              "name": "بحجم",
              "value": "صغير"
            }
          ]
        }
      ],
      "channel_id": 1,
      "currency": {
        "code": "JOD"
      },
      "locale": "ar-JO"
    }
    ```

  </Tab>
  <Tab>

    ```json filename="Example request body: Create a cart" showLineNumbers
    {
      "channel_id": 1,
      "line_items": [
        {
          "quantity": 1,
          "product_id": 80,
          "variant_id": 64
        }
      ]
    }
    ```

  </Tab>
  <Tab>

    ```json filename="Example request body: Create a cart" showLineNumbers
    {
      "customer_id": 0,
      "line_items": [],
      "custom_items": [
        {
          "sku": "custom-item-sku",
          "name": "table",
          "quantity": 1,
          "list_price": 30,
          "gift_wrapping": {
            "wrap_together": true,
            "wrap_details": [
              {
                "id": 0,
                "message": "Happy Birthday"
              }
            ]
          }
        }
      ],
      "gift_certificates": [
        {
          "name": "Tobi Day",
          "theme": "Birthday",
          "amount": 1,
          "quantity": 1,
          "sender": {
            "name": "Brandi Tyler",
            "email": "Brandi.Tyler@mail.com"
          },
          "recipient": {
            "name": "Tobi Day",
            "email": "Tobi.Day@mail.com"
          },
          "message": "Happy Birthday"
        }
      ],
      "channel_id": 1,
      "currency": {
        "code": "usd"
      },
      "locale": "en-US"
    }
    ```
  </Tab>
</Tabs>

<Callout type="info">
  #### Locale format
  The locale field supports language, script, and region codes in the [ISO-639 standard](https://www.iso.org/iso-639-language-codes.html) format.
</Callout>

## Customer support

To create a cart for an existing customer, include the `customer_id` in your request body.

```json filename="Example request body: existing customer" showLineNumbers
{
  "channel_id": 1,
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

### Guest cart

Guest carts assume the shopper is not a customer and is not signing in or creating an account during checkout. You can handle guest carts by displaying the cart data to the customer and then moving them to checkout using the [Checkouts API](/api-reference/store-management/checkouts).

## Redirecting to checkout

A cart redirect URL redirects a shopper to a BigCommerce hosted checkout page. You can only generate a cart redirect URL from a cart created using the Carts API.

### Using the Create a cart redirect URL endpoint

To generate a cart redirect URL, send a request to the [Create cart redirect URL](/api-reference/store-management/carts/cart-redirect-urls/createcartredirecturl) endpoint. Use the `id` returned with the [Create a cart](/api-reference/store-management/carts/cart/createacart) response for the `cartId` path parameter.

```http filename="Create cart redirect URL" showLineNumbers
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/carts/{{cartId}}/redirect_urls
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
```

The response will contain `cart_url` and `checkout_url` properties. Use these URLs to redirect the customer to the BigCommerce-hosted cart or checkout pages. You can use the `embedded_checkout_url` with the [Checkout SDK](/stencil-docs/customizing-checkout/checkout-sdk) to embed the BigCommerce-hosted checkout into a headless site using an iFrame.

```json filename="Example response: Create cart redirect URL" showLineNumbers
{
  "cart_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?action=load&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b",
  "checkout_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b",
  "embedded_checkout_url": "https://store-id30h7ohwf.mybigcommerce.com/cart.php?embedded=1&action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b"
}
```

### Using Create a cart with the include query parameter

It is possible to generate a redirect URL when creating a cart using the [Create a cart](/api-reference/store-management/carts/cart/createacart) endpoint by appending the `include=redirect_urls` query parameter to the request URL.

```http filename="Create a cart" showLineNumbers
POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/carts?include=redirect_urls
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}

{
  // request body
}
```

## Signing customers in before redirecting

Registered customers have personally-identifiable information, or _PII_, saved in their accounts. If you passed a `customer_id` in the [Create a cart](/api-reference/store-management/carts/cart/createacart) request, send the customer to a sign-in page before redirecting them to cart or checkout pages. You can use the [Customer Login API](/api-docs/storefront/customer-login-api) to manage the redirection flow.

<Callout type="info">
  #### API account notes
  The Customer Login API requires **app API credentials**. To learn more, see the articles on the [Customer Login API](/api-docs/storefront/customer-login-api#api-account-notes) and [Authentication](/api-docs/getting-started/authentication#user-generated-jwts).
</Callout>

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

<Callout type="info">
  #### Channel ID is mandatory
  The Customer Login JWT must include a `channel_id` property. If you omit the `channel_id`, CORS checks will fail and the checkout will not load.
</Callout>

If you are using [Embedded Checkout](/api-docs/storefronts/embedded-checkout/embedded-checkout-overview), create the Customer Login JWT, then pass the full URL for a call to the [Send login token](/api-reference/storefront/customer-login/login-token/get-login-token) endpoint to the Checkout SDK. The SDK will sign the customer in, then redirect them to the Embedded Checkout iFrame.

## Deleting a line item

To delete a line item from a cart, send a request to the [Delete cart line item](/api-reference/store-management/carts/cart-items/deletecartlineitem) endpoint, passing the associated `cartId` and `itemId` as path parameters.

```http filename="Delete a line item" showLineNumbers
DELETE https://api.bigcommerce.com/stores/{{store_hash}}/v3/carts/{{cartId}}/items/{{itemId}}
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
```

## Clearing the cart

To clear the cart, send a request to the [Delete a cart](/api-reference/store-management/carts/cart/deleteacart) endpoint.

```http filename="Delete a cart" showLineNumbers
DELETE https://api.bigcommerce.com/stores/{{store_hash}}/v3/carts/{{cartId}}
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
```

In practice, removing all cart items also essentially deletes the cart.

## Next step

- [Learn how to move from cart to checkout](/api-docs/storefronts/guide/checkout)

## Resources

- [Carts API](/api-reference/store-management/carts)
- [Storefront Carts API](/api-reference/storefront/carts)
- [Persistent Cart](https://support.bigcommerce.com/s/article/Persistent-Cart)
