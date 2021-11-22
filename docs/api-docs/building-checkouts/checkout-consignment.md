# Checkout Consignment API

<div class="otp" id="no-index">

### On this page
- [Overview](#overview)
- [Creating a consignment](#creating-a-consignment)
- [Updating a consignment](#updating-a-consignment)
- [Further reading](#further-reading)
- [Related documentation](#related-documentation)

</div> 

This article discusses how to create and update a consignment.

## Overview
A _consignment_ is a list of physical products that will travel together to the purchaser, and it specifies how those items can and will ship. It is an object that includes at least one product line item and one shipping address. A checkout containing one or more physical products will always have at least one consignment associated with it. An order that ships to multiple addresses will have at least one consignment per shipping address.

The Storefront Checkout and Server-to-Server Checkout APIs provide methods for creating consignments, which are shipments waiting to happen.  A newly created consignment returns a list of fulfillment options available based on the destination address.  These APIs also provide methods for updating this consignment to change the destination, add or remove items, and select a fulfillment option. 

A checkout containing physical products is not eligible to become an order until each of its consignments contains a `selected_shipping_option`.

### OAuth scopes

Use the following OAuth scopes for the Server-to-Server Checkout API.

| UI Name  | Permission | Parameter                     |
|----------|------------|-------------------------------|
| Checkouts | read-only  | `store_checkout_read_only`    |
| Checkouts | modify     | `store_checkout`              |

For more information on OAuth Scopes and authentication, see [Authentication](https://developer.bigcommerce.com/api-docs/getting-started/authentication).

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

> For limits on the number of line items in a consignment, see the [Create a consignment endpoint](/api-reference/storefront/checkouts/checkout-consignments/checkoutsconsignmentsbycheckoutidpost) documentation.

> The Storefront Checkout API allows developers to build a checkout experience by accessing raw API request/response data.

> The Server-to-Server Checkout API responds quickly when the checkout contains one consignment.  Each additional consignment increases the amount of time the API takes to finish creating a checkout.

</div>
</div>
</div>


## Creating a consignment

Before creating a consignment, you need the checkout ID. The cart ID and checkout ID are the same.

There are two steps to create a new consignment.

1. To add a consignment to a checkout, append `include=consignment.available_shipping_options` to the POST request.

Below is an example `POST` request for creating two simple consignments.
  
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
          "quantity": 2
        }
      ]
    }
  ]

```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/checkouts/checkout-consignments/checkoutsconsignmentsbycheckoutidpost#requestrunner)

## Updating a consignment

The [Update a consignment endpoint](/api-reference/storefront/checkouts/checkout-consignments/checkoutsconsignmentsbycheckoutidandconsignmentidput) requires the `checkoutId` and the `consignmentId`. You can find the consignment ID in the response from the preceding API call. The checkout ID is the same as the cart ID.

There are two distinct kinds of consignment updates. The first selects a fulfillment option. The second can update the recipient's shipping address and adjust the list of included line items. 

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

> You must choose: because changing the shipping address and weight can change available fulfillment options, you can't do both in the same call to the [Update a consignment endpoint](/api-reference/storefront/checkouts/checkout-consignments/checkoutsconsignmentsbycheckoutidandconsignmentidput).

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

## Resources

### Related resources

* [Server-to-Server Checkout API](https://developer.bigcommerce.com/api-reference/store-management/checkouts)
* [Storefront Checkouts](https://developer.bigcommerce.com/api-reference/storefront/checkouts)
