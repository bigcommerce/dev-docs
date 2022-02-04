# Checkout Consignment API

 

This article discusses how to create and update a consignment.

## Overview
A _consignment_ is a list of physical products that will travel together to the purchaser, and it specifies how those items can and will ship. It is an object that includes at least one product line item and one shipping address. A checkout containing one or more physical products will always have at least one consignment associated with it. An order that ships to multiple addresses will have at least one consignment per shipping address. It is also possible to create multiple consignments for the same address.

The Storefront Checkout and Server-to-Server Checkout APIs provide methods for creating consignments, which are shipments waiting to happen.  A newly created consignment returns a list of fulfillment options available based on the destination address.  These APIs also provide methods for updating this consignment to change the destination, add or remove items, and select a fulfillment option. 

A checkout containing physical products is not eligible to become an order until each of its consignments contains a `selected_shipping_option`.

### OAuth scopes

<!-- theme: info -->
  
> The Storefront Checkout API allows developers to manage a shopper’s cart, checkout, and order data using client-side JavaScript on BigCommerce Stencil-powered storefronts. The Storefront Checkout API requests do not require OAuth scopes.
  
</div>
</div>
</div>

Use the following OAuth scopes for the Server-to-Server Checkout API.

| UI Name  | Permission | Parameter                     |
|----------|------------|-------------------------------|
| Checkouts | read-only  | `store_checkout_read_only`    |
| Checkouts | modify     | `store_checkout`              |

For more information on OAuth Scopes and authentication, see [Authentication](https://developer.bigcommerce.com/api-docs/getting-started/authentication).

<!-- theme: info -->

<!-- theme: info -->

> For limits on the number of line items in a consignment, see the [Create a consignment endpoint](https://developer.bigcommerce.com/api-reference/store-management/checkouts/checkout-consignments/checkoutsconsignmentsbycheckoutidpost) documentation.

> The Server-to-Server Checkout API responds quickly when the checkout contains one consignment.  Each additional consignment increases the amount of time the API takes to finish creating a checkout. The example API calls in this article use the Server-to-Server Checkout API.
  

</div>
</div>
</div>


## Creating a consignment



<!-- theme: info -->

<!-- theme: info -->

> Prerequisites: Prior to working with consignments, your code will need to create or retrieve a cart or checkout.  The cart ID and checkout ID are the same.

</div>
</div>
</div>

The [Create a consignment endpoint](/api-reference/storefront/checkouts/checkout-consignments/checkoutsconsignmentsbycheckoutidpost) requires a `checkoutID`.  You can create consignments associated with a cart before it becomes a checkout.  This endpoint supports creating multiple consignments in a single call.

The following is an example `POST` request for creating two consignments. Append `include=consignment.available_shipping_options` to the endpoint so that you will have the information to select one of them in the next step.

  
  ```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/checkouts/{checkoutId}/consignments?include=consignments.available_shipping_options
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}

  [
    {
      "shipping_address": {
        "email": "jane2@example.com",
        "country_code": "US",
        "first_name": "BigCommerce",
        "last_name": "Cart/Checkout",
        "address1": "123 Main Street",
        "city": "Austin",
        "state_or_province": "Texas",
        "state_or_province_code": "TX",
        "postal_code": "78751",
        "phone": "688546",
        "custom_fields": [
          {
            "field_id": "field_25",
            "field_value": "Great!"
          }
        ]
      },
      "line_items": [
        {
          "item_id": "00a8e1c3-996f-4786-96ca-2a8a887b6648",
          "quantity": 1
        }
      ]
    },
    {
      "shipping_address": {
        "email": "testing@example.com",
        "country_code": "US",
        "first_name": "Testing",
        "last_name": "BigCommerce",
        "company": "BigCommerce",
        "address1": "111 Main Street",
        "address2": "#1324",
        "city": "Austin",
        "state_or_province": "Texas",
        "state_or_province_code": "TX",
        "postal_code": "78751",
        "phone": "+5185158x1{1-5}",
        "custom_fields": [
          {
            "field_id": "field_25",
            "field_value": "You're Welcome"
          }
        ]
      },
      "line_items": [
        {
          "item_id": "00a8e1c3-996f-4786-96ca-2a8a887b6648",
          "quantity": 1
        }
      ]
    }
  ]

```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/checkouts/checkout-consignments/checkoutsconsignmentsbycheckoutidpost#requestrunner)

Copy and paste your `store_hash`,`access_token`, and `checkoutId` into the form, then click **Send**.

## Updating a consignment

The [Update a consignment endpoint](https://developer.bigcommerce.com/api-reference/store-management/checkouts/checkout-consignments/checkoutsconsignmentsbycheckoutidandconsignmentidput) requires the `checkoutId` and the `consignmentId`. You can find the consignment ID in the response from the preceding API call. The checkout ID is the same as the cart ID.

There are two distinct kinds of consignment updates. The first selects a fulfillment option. The second can update the recipient's shipping address and adjust the list of included line items. 

<!-- theme: warning -->

<!-- theme: warning -->

> You must choose one type of consignment update because changing the shipping address and weight can change available fulfillment options. You can't do both in the same call to the [Update a consignment endpoint](https://developer.bigcommerce.com/api-reference/store-management/checkouts/checkout-consignments/checkoutsconsignmentsbycheckoutidandconsignmentidput).

</div>
</div>
</div>


The following is an example `PUT` request that updates a consignment’s `shipping_option_id` with one of the `available_shipping_options.id` returned in the response from the [Create a consignment endpoint](/api-reference/storefront/checkouts/checkout-consignments/checkoutsconsignmentsbycheckoutidpost).

  ```http
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/checkouts/{checkoutId}/consignments/{consignmentId}
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}

{
  "shipping_option_id": "9241669174884c2f2e83b3adabf03f83"
}

```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/checkouts/checkout-consignments/checkoutsconsignmentsbycheckoutidandconsignmentidput#requestrunner)

Copy and paste your `store_hash`,`access_token`, `checkoutId`, `consignmentId` and query parameter (`consignments.available_shipping_options`) into the form, then click **Send**.

## Further reading

* [BigCommerce Checkout is Now Open Source](https://medium.com/bigcommerce-developer-blog/bigcommerce-checkout-is-now-open-source-39e823bc5b3b)
<!-- link to forthcoming flow chart of headless calls -- cart > checkout > order > payment flow -->

## Related documentation

* [Server-to-Server Checkout API Reference](https://developer.bigcommerce.com/api-reference/store-management/checkouts)
* [Storefront Checkout API Reference](https://developer.bigcommerce.com/api-reference/storefront/checkouts)
