# Checkout Consignment API

<div class="otp" id="no-index">

### On this page
- [Overview](#overview)
- [Creating a consignment](#creating-a-consignment)
- [Updating a consignmnet](#updating-a-consignment)
- [Resources](#resources)

</div> 

This article discusses how to create and update a consignment.

## Overview
A consignment is a step in the checkout process. It is an object that includes at least one physical line item, one shipping address, and one shipping method. An order that ships to multiple addresses will have multiple consignments.

### OAuth scopes

| UI Name  | Permission | Parameter                     |
|----------|------------|-------------------------------|
| Checkouts| read-only  | `store_checkout_read_only`    |
| Checkouts| modify     | `store_checkout`              |

For more information on OAuth Scopes and authentication, see [Authentication](https://developer.bigcommerce.com/api-docs/getting-started/authentication).

### Limits
* 50 consignment limit

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

### Note
BigCommerce S2S Checkout API responds quickly when only one consignment is present on the checkout; however, as you add more and more consignments to the order, these API calls take more and more time to complete.	

</div>
</div>
</div>

## Creating a consignment

Before creating a consignment, you will need a checkout ID. The cart ID and checkout ID are the same.

There are two steps to create a new consignment.

1. To add a consignment to a checkout, append `include=consignment.available_shipping_options` to the POST request.

Below is an example `POST` request for creating a simple consignment.
  
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

Before updating a consignment, you will need the checkoutID and the consignmentID. You can find the consignmentID in the consignment object displayed in the response generated in step 1. The checkoutID is the same as the Cart ID.

2. To update a consignment to a checkout, assign a shipping option by sending a PUT request to update the consignment’s `shipping_option_id` with the `available_shipping_options` returned from step 1.

Below is an example PUT request for updating an existing consignment.

  ```http
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/checkouts/{checkoutId}/consignments/{consignmentId}
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}

{
  "shipping_address": {
    "email": "jane2@example.com",
    "country_code": "US",
    "first_name": "Testing",
    "last_name": "BigCommerce",
    "company": "BigCommerce",
    "address1": "1234 Main Street",
    "address2": "1234",
    "city": "Austin",
    "state_or_province": "Texas",
    "state_or_province_code": "TX",
    "postal_code": "78751",
    "phone": "+481526687548x4{1-5}",
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

```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/checkouts/checkout-consignments/checkoutsconsignmentsbycheckoutidandconsignmentidput#requestrunner)


## Related resources

Endpoints
* [Checkout API](https://developer.bigcommerce.com/api-reference/store-management/checkouts)
