# Customers and Subscribers

<div class="otp" id="no-index">

### On this page
- [OAuth scopes](#oauth-scopes)
- [What is a customer?](#what-is-a-customer)
- [What is a subscriber?](#what-is-a-subscriber)
- [Subscribers vs. customers](#subscribers-vs-customers)
- [What is a guest?](#what-is-a-guest)
- [Customer Login API](#customer-login-api)
- [Current Customer API](#current-customer-api)
- [Customers API](#customers-api)
- [Differences between V2 and V3 Customers APIs](#differences-between-v2-and-v3-customers-apis)
- [Subscribers API](#subscribers-api)
- [FAQ](#faq)
- [Related resources](#related-resources)

</div> 

## OAuth scopes

| Name | Permission | Parameter |
| -- | -- | -- |
| Customers | modify | `store_v2_customers` |
| Customers | read-only | `store_v2_customers_read_only` |

For more information on available authentication methods, see [Authentication](https://developer.bigcommerce.com/api-docs/getting-started/authentication).

## What is a customer?

A customer is anyone who makes a purchase on a store and creates an account. BigCommerce stores an email address, customer address, and name against the customer as a record. There are two APIs you can use to manipulate customer data. You can extend the data for customer records using the custom [account sign-up form fields](https://developer.bigcommerce.com/api-reference/store-management/customers-v3/customer-form-field-values/customerformfieldsget) and [customer attributes](https://developer.bigcommerce.com/api-reference/store-management/customers-v3/customer-attributes/customersattributesget) endpoints (V3). 

 
### Customer groups

Customer groups allow you to organize your customers, give them discounts, and restrict access to specific products or categories. For more information, see [Customer Groups](https://support.bigcommerce.com/s/article/Customer-Groups).

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->
### Customer groups by plan
> Customer groups are only available on specific plans. See [BigCommerce Pricing](https://support.bigcommerce.com/s/article/Pricing) to learn more.

</div>
</div>
</div>

## What is a subscriber?

A subscriber is someone who has signed up for a store's newsletter. The location of the sign-up field is in the footer of most storefront themes. 

Subscribers can also be added by:

- Signing up for the newsletter during checkout
- Sending a `POST` request to the [Subscribers API](https://developer.bigcommerce.com/api-reference/customer-subscribers/subscribers-api/)

Where possible, the API indicates the origin of the subscriber. When customers sign up for the newsletter using One-Page Checkout, the Order ID becomes part of the subscriber's record. When customers use Optimized One-Page Checkout, the customer becomes a subscriber before checking out, resulting in a subscriber record without an Order ID.

## Subscribers vs. customers

- A subscriber is not always a customer. Someone can sign up for the newsletter without creating an account.
- A customer is not always a subscriber. Signing up for the newsletter is a separate action from creating an account and purchasing an item.
- A customer and a subscriber can be the same. If a shopper checks out on the storefront, creates an account and opts into the newsletter, they are both a customer and a subscriber.

## What is a guest?

Store [settings](https://forum.bigcommerce.com/s/article/Checkout-Settings#checkout-settings) can be configured to allow a shopper to complete checkout without creating an account. These shoppers are not captured as customers or stored on BigCommerce. If you want to capture guest data, using the [Storefront APIs](https://developer.bigcommerce.com/api-docs/cart-and-checkout/cart-and-checkout-overview) can help.

## Customer Login API

The [Customer Login API](https://developer.bigcommerce.com/api-docs/storefront/customer-login-api) allows for single sign-on. Once a customer has authenticated by logging in to a third-party system (CMS, portal, or app), you can use the Customer Login API to seamlessly log the customer into their BigCommerce customer account.

## Current Customer API

The [Current Customer API](https://developer.bigcommerce.com/api-docs/storefront/current-customer-api) allows your application to identify logged-in customers. This identification is useful when you need to show customer-specific information.

## Customers API

There are two Customers API endpoints available:

* V3 Customers API
* V2 Customers API

### V3 Customers API

The [V3 Customers API](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api) is comprised of customers, customer attributes, customer address, and customer form fields. 

A customer makes a purchase on a store and creates an account. The customers object comprises a customer's address, attributes, form fields and authentication. The V3 Customers API can accomplish the same tasks as the existing V2 Customers API, with greater efficiency. 

[Customer Attributes](https://developer.bigcommerce.com/api-reference/store-management/customers-v3/customer-attributes/) and [Customer Attribute Values](https://developer.bigcommerce.com/api-reference/store-management/customers-v3/customer-attribute-values/) let you store additional information against a customer. Customer Attributes define the name of a name-value pair and the type of information stored (for example, `"name": "Shoe size"`, `"type": "number"`). The Customer Attribute Values endpoint lets you define the values for the attributes.


<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Name-value pairs

> Each customer can have up to 50 name-value pairs stored.

</div>
</div>
</div>

Customer attributes are created separately from the customer. After the name and type are created, then the attributes can be added to the customer using the name-value pair.

[Customer addresses](https://developer.bigcommerce.com/api-reference/store-management/customers-v3/customer-addresses/) consist of a customers address and phone number. Customers can have multiple addresses stored against them.

[Customer form field values](https://developer.bigcommerce.com/api-reference/store-management/customers-v3/customer-form-field-values/) are fields on either the customer address or customer signup that accept any string data. For example, a signup field can have a customer input a wholesaler ID or, for an address field, have them input any special delivery instructions. For more information about creating form fields, see [Account Signup Fields](https://support.bigcommerce.com/s/article/Editing-Form-Fields#account-fields). 

You can access and edit the values for the fields on customer and customer address records using the API. 

### V2 Customers API

The V2 Customers API is comprised of customers, customer addresses, and customer groups. The customers object is comprised of basic customer information such as customer name and phone number. 

[Customer addresses](https://developer.bigcommerce.com/api-reference/store-management/customers-v2/customer-addresses/) consist of a customer's address and phone number. Customers can have multiple addresses stored against them.

[Customer groups](https://developer.bigcommerce.com/api-reference/store-management/customers-v2/customer-groups/) allow you to organize your customers, give them discounts, and restrict access to specific products or categories. Customer groups are not yet available on the V3 Customers API.

## Differences between V2 and V3 Customers APIs

When resources are available through both APIs, we recommend using the V3 Customers API as BigCommerce will eventually migrate all existing V2 resources to V3. 

This section covers the important differences between V2 and V3 Customers APIs.

### Making requests

The V3 Customers API is easier to use. It reduces the number of API calls needed to accomplish a task. For example, to create a new customer with the V2 API, you have to make multiple API calls. With the V3 API, you can create customer attributes and address in one step, allowing you to batch create multiple customers and their subresources in a single API call.

**Create a customer**

Single customer on V3: 

* `/customers`

Single customer on V2:

* `/customers/{customer_id}`
* `/customers/{customer_id}/addresses`

### Queries

With the V3 Customers API, queries become a powerful tool. There is one `GET` endpoint per resource with filters to refine the request. The V2 API necessitates using a different endpoint to get customer subresources. 

**Get customer addresses**

Get customer address by name and company on V3:

`/customers/addresses?company:in=bigcommerce,commongood&customer_id:in1,2,3`

Get customer address by name and company on V2:

`/customers/{customer_id}/addresses/{customer_address_id}`

### Requests

V3 Customers `POST` and `PUT` requests require an array object.

<!--
title: "Update a Customer V3"
subtitle: "/customer"
lineNumbers: true
-->

**Example Update a Customer (V3)**  

`/PUT https://api.bigcommerce.com/stores/{store_hash}/v3/customers`

```json
[
  {
    "id": 12,
    "email": "janedoe@email.com",
    "first_name": "Jane",
    "last_name": "Doe"
  }
]
```

<!--
title: "Update a Customer on V2"
subtitle: "/customers/{customer_id}"
lineNumbers: true
-->

**Example Update a Customer (V2)**  

`/PUT https://api.bigcommerce.com/stores/{store_hash}/v2/customer_groups/{customer_group_id}`

```json
{
  "first_name": "Jane",
  "email": "jane@email.com",
  "phone": "1234567890"
}
```

### Upsert

You can use the V3 Customers API [Upsert Customer Attribute Values](https://developer.bigcommerce.com/api-reference/store-management/customers-v3/customer-attribute-values/customersattributevaluesput) operation to upsert form field values and customer attributes. Upsert looks for a match to the existing record and makes an update if there is one. If there is no match, it creates a new record.

### Authentication object

The V3 Customers API offers two ways to set a customer's password:

- You can set a new password under the `authentication > new_password` object in a `PUT` or `POST` request. 
- To prompt a customer to reset their password, set `force_password_reset` to `true` under `authentication > new_password` object in a `PUT` or `POST` request.

[Password confirmation](https://developer.bigcommerce.com/api-reference/customer-subscribers/customers-api/customers/createanewcustomer) and [validation](https://developer.bigcommerce.com/api-reference/customer-subscribers/customers-api/customer-passwords/validatecustomerpassword) are still available under the V2 Customers API. 

## Subscribers API

The Subscribers API allows you to manage subscribers who have signed up for the store’s newsletter.

## FAQ

**Which API should I use?**

When possible, use the V3 Customers API as BigCommerce will eventually deprecate the existing V2 Customers API. 

**How can I validate customer passwords?**

Password validation is only available on the V2 Customers API at this time. We recommend using the V3 Customers API to reset or input a new password as BigCommerce intends to deprecate the V2 Customers API.

## Related resources

### Articles
- [Adding and Editing Fields in the Account Signup Form](https://support.bigcommerce.com/s/article/Editing-Form-Fields#account-fields)
- [Checkout Settings](https://support.bigcommerce.com/s/article/Optimized-Single-Page-Checkout#checkout-settings)

### Endpoints
- [Customer Login API](https://developer.bigcommerce.com/api-docs/storefront/customer-login-api)
- [Current Customer API](https://developer.bigcommerce.com/api-docs/storefront/current-customer-api)
- [Customers V3 API](https://developer.bigcommerce.com/api-reference/store-management/customers-v3)
- [Customer Groups](https://developer.bigcommerce.com/api-reference/store-management/customers-v2/customer-groups/getallcustomergroups) (Customers V2 API)
- [Password Validation](https://developer.bigcommerce.com/api-reference/store-management/customers-v2/customer-passwords/validatecustomerpassword) (Customers V2 API)
- [Password Confirmation](https://developer.bigcommerce.com/api-reference/store-management/customers-v2/customers/createanewcustomer) (Customers V2 API)
- [Storefront Subscriptions](https://developer.bigcommerce.com/api-reference/storefront/storefront-subscriptions)
- [Subscribers API](https://developer.bigcommerce.com/api-reference/store-management/subscribers)

### Webhooks
- [Customer](https://developer.bigcommerce.com/api-docs/store-management/webhooks/events#customer)