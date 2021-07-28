# Carts

<div class="otp" id="no-index">

### On this page
- [Creating a cart](#creating-a-cart)
- [Redirecting to checkout](#redirecting-to-checkout)
- [Deleting a line item](#deleting-a-line-item)
- [Clearing the cart](#clearing-the-cart)
- [Next steps](#next-steps)
- [Resources](#resources)

</div>

This section demonstrates how to use the Carts API to generate and manage carts.

## Creating a cart

The [Carts API](https://developer.bigcommerce.com/api-reference/store-management/carts) allows you to create carts for both existing and guest customers. 

To create an active cart, send a `POST` request to the [Create a Cart](https://developer.bigcommerce.com/api-reference/store-management/carts/cart/createacart) endpoint.

```http
POST https://api.bigcommerce.com/stores/{store_hash}/v3/carts
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
```

**Create a Cart request example**

```json
{
    "channel_id": 20266,
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
    "channel_id": 20266,
	"customer_id": 42,
	"line_items": [
		{
			"quantity": 5,
			"product_id": 191
		}
	]
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/carts/cart/createacart#requestrunner)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> The `id` returned in the response will correspond to the `cart_id` required to generate cart redirect URLs.

</div>
</div>
</div>

### Guest cart

A guest cart assumes the shopper is not a customer and is not logging in or creating an account during checkout. You can handle guest carts by displaying the cart data to the customer and then moving them to checkout using the [Checkouts API](https://developer.bigcommerce.com/api-reference/store-management/checkouts).

## Redirecting to checkout

A cart redirect URL redirects a shopper to a BigCommerce hosted checkout page. You can generate a cart redirect URL only from a cart created using the Carts API.

To generate a cart redirect URL, send a `POST` request to the [Create Cart Redirect URL](https://developer.bigcommerce.com/api-reference/store-management/carts/cart-redirect-urls/createcartredirecturl) endpoint. The `cartId` path parameter corresponds to the `id` returned in the [Create a Cart](https://developer.bigcommerce.com/api-reference/store-management/carts/cart/createacart) response.

```http
POST https://api.bigcommerce.com/stores/{store_hash}/v3/carts/{cartId}/redirect_urls
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/carts/cart-redirect-urls/createcartredirecturl#requestrunner)

### Creating a redirect using the include query parameter

It is possible to generate a redirect URL when creating a cart using the [Create a Cart](https://developer.bigcommerce.com/api-reference/store-management/carts/cart/createacart) endpoint by appending the `include=redirect_urls` query parameter to the request URL.

```http
POST https://api.bigcommerce.com/stores/{store_hash}/v3/carts?include=redirect_urls
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
```

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

- [Learn how to move the cart to checkout]()

## Resources

- [Carts API](https://developer.bigcommerce.com/api-reference/store-management/carts)
- [Storefront Carts API](https://developer.bigcommerce.com/api-reference/storefront/carts)
- [Persistent Cart](https://support.bigcommerce.com/s/article/Persistent-Cart)