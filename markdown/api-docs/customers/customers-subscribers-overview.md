<h1>Customers and Subscribers</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
        <li><a href="#customers-subscribers_what-is-a-customer">What is a Customer?</a></li>
    		<li><a href="#customers-subscribers_what-is-a-subscriber">What is a Subscriber</a></li>
        <li><a href="#customers-subscribers_subscribers-v-customers">Subscribers vs. Customers</a></li>
        <li><a href="#customers-subscribers_what-is-a-guest">Guests</a></li>
        <li><a href="#customers-subscribers_customer-login">Customer Login API</a></li>
        <li><a href="#customers-subscribers_current-customer">Current Customer API</a></li>
        <li><a href="#customer-subscribers_customer-api">Customer API</a></li>
        <li><a href="#customer-subscribers_difference-v2-v3">Differences Between V2 and V3 Customer API</a></li>
        <li><a href="#customer-subscribers_faq">FAQ</a></li>
	</ul>
</div>

## Introduction

### Prerequisites
**Scopes**

The following [OAuth](https://developer.bigcommerce.com/api-docs/getting-started/authentication#authentication_oauth-scopes) scopes are required:
- Customers View/Modify
- Customers Login

---

<a href='#customers-subscribers_what-is-a-customer' aria-hidden='true' class='block-anchor'  id='customers-subscribers_what-is-a-customer'><i aria-hidden='true' class='linkify icon'></i></a>

## What is a Customer?

A customer is anyone who has made a purchase on a store and created an account. BigCommerce then stores email address, customer address, and name against the customer as a record. You can also extend the data for your customer records using custom account sign up form fields and the customer attributes API. 
 
### Customer Groups

Customer groups allow you to organize your customers, give them discounts, and restrict access to specific products or categories. For more information see [Customer Groups](https://support.bigcommerce.com/s/article/Customer-Groups).

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->
### Customer Groups by Plan
> Customer Groups are only available on specific plans.

</div>
</div>
</div>

---

<a href='#customers-subscribers_what-is-a-subscriber' aria-hidden='true' class='block-anchor'  id='customers-subscribers_what-is-a-subscriber'><i aria-hidden='true' class='linkify icon'></i></a>

## What is a Subscriber?

A subscriber is someone who has signed up for a store’s newsletter.  
Subscribers can be added by:

-   Signing up for the newsletter via the signup box located in the footer of most storefront themes
-   Signing up for the newsletter during checkout
-   POSTing to the Subscribers API

Where possible, the API indicates the origin of the subscriber. If the subscriber was added during checkout, the Order ID is included.

---

<a href='#customers-subscribers_subscribers-v-customers' aria-hidden='true' class='block-anchor'  id='customers-subscribers_subscribers-v-customers'><i aria-hidden='true' class='linkify icon'></i></a>

## Subscribers vs. Customers

- A subscriber is not always a customer. Someone can sign up for the newsletter only and not create an account.
- A customer is not always a subscriber. Signing up for the newsletter is a separate action from creating an account and purchasing an item.
- A customer and a subscriber can be the same. If a shopper checks out on the storefront, creates an account and opts into the newsletter, they are a customer and a subscriber.

---

<a href='#customers-subscribers_what-is-a-guest' aria-hidden='true' class='block-anchor'  id='customers-subscribers_what-is-a-guest'><i aria-hidden='true' class='linkify icon'></i></a>

## What is a Guest?

Store [settings](https://forum.bigcommerce.com/s/article/Checkout-Settings#checkout-settings) can be set to allow a shopper to complete checkout without creating an account. These shoppers are not captured as customers or stored in the BigCommerce system. If you want to capture guest data, using the [Storefront APIs](https://developer.bigcommerce.com/api-docs/cart-and-checkout/cart-and-checkout-overview) can help.

---

<a href='#customers-subscribers_customer-login' aria-hidden='true' class='block-anchor'  id='customers-subscribers_customer-login'><i aria-hidden='true' class='linkify icon'></i></a>

## Customer Login API

The Customer Login API allows for single sign-on. Once a customer has authenticated by logging in to a third-party system (CMS, portal, or app), you can use the customer login API to seamlessly log the customer into their BigCommerce customer account.

---

<a href='#customers-subscribers_current-customer' aria-hidden='true' class='block-anchor'  id='customers-subscribers_current-customer'><i aria-hidden='true' class='linkify icon'></i></a>

## Current Customer API
The Current Customer API allows your application to identify logged in customers. This is useful when you need to show customer specific information.

---

<a href='#customer-subscribers_customer-api' aria-hidden='true' class='block-anchor'  id='customer-subscribers_customer-api'><i aria-hidden='true' class='linkify icon'></i></a>

## Customer API
There are two Customer API endpoints available:
- V3 Customers API
- V2 Customers API

### V3 Customers API

The [V3 Customers API](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api) is comprised of Customers, Customer Attributes, Customer Address, and Customer Form Fields. 

Customers are any shopper that has created an account on the store. The Customers object comprises customers address, attributes, form fields and authentication. The V3 Customers API can accomplish the same tasks as the existing V2 Customers API, with greater efficiency. 

[Customer Attributes](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api/models/customerattribute) are a name, value key pair that are stored against a Customer. For example, if you want to keep a list of hat sizes, the name can be “Hat Sizes” and the value can be 10. Each customer can have several name, value pairs stored.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Name Value Pairs
> Each customer can have up to 100 name, value pairs stored

</div>
</div>
</div>

Customer Attributes are created separately from the customer. After the name and type are created, then the attributes can be added to the customer using the name, value pair.

[Customer Addresses](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api/models/address) consist of a customers address and phone number. Customers can have multiple addresses stored against them.

[Customer Form Fields Values](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api/models/customerformfieldvalue) are fields on either the customer address or customer signup that accept any string data. An example of a signup field can have a customer input a Wholesaler ID or for an address field, have them input any special delivery instructions. Creating form fields needs to be done from the [Control Panel](https://support.bigcommerce.com/s/article/Editing-Form-Fields#account-fields). 
Using the API you are able to access and edit the values for the fields on your Customer and Customer Address records. 

### V2 Customers API

The V2 Customers API is comprised of Customers, Customer Addresses and Customer Groups. The Customers object is comprised of basic customer information such as customer name and phone number. 

[Customer Addresses](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api/models/address) consist of a customers address and phone number. Customers can have multiple addresses stored against them.

[Customer Groups](https://developer.bigcommerce.com/api-reference/customer-subscribers/customers-api/models/customergroup) allow you to organize your customers, give them discounts, and restrict access to specific products or categories. Customer groups are not yet available on the V3 Customers API.

---

<a href='#customer-subscribers_difference-v2-v3' aria-hidden='true' class='block-anchor'  id='customer-subscribers_difference-v2-v3'><i aria-hidden='true' class='linkify icon'></i></a>

## Differences Between V2 and V3 Customer API

### Making Requests

The new Customers API is easier to use. It reduces the API calls needed to accomplish a task. For example, creating a new Customer with the V2 API there was a need to hit several endpoints. Now the customer attributes and address are created in one step with Create a Customer, allowing you to batch create multiple customers, and their subresources, in a single API call.

**Create a Customer**

Single Customer on V3
- `/customers`

Single Customer on V2
* `/customers/{customer_id}`
* `/customers/{customer_id}/addresses`


### Queries

With the V3 Customers API, queries become a powerful tool. Instead of using a different endpoint to get customer sub-resources, there is one GET endpoint per resource with filters to refine the request. 

**Get Customer Addresses**

Get Customer Address by name and company on V3
`/customers/addresses?company:in=bigcommerce,commongood&customer_id:in1,2,3`

Get Customer Address by name and company on V2
`/customers/{customer_id}/addresses/{customer_address_id}`

### Requests

Requests on this endpoint require an array object for all Create and Update Actions.


<!--
title: "Update a Customer V3"
subtitle: "/customer"
lineNumbers: true
-->

**Example Update a Customer V3**  
`/PUT https://api.bigcommerce.com/stores/{store_hash}/v3/customers`

```json
[
  {
    “id”: 12,
    “email”: 'janedoe@email.com',
    “first_name”: 'Jane',
    “last_name”: 'Doe'
  }
]
```


<!--
title: "Update a Customer on V2"
subtitle: "/customers/{customer_id}"
lineNumbers: true
-->

**Example Update a Customer V2**  
`/PUT https://api.bigcommerce.com/stores/{store_hash}/v2/customer_groups/{customer_group_id}`

```json
{
  “first_name”: 'Jane',
  “email”: 'jane@email.com',
  “phone”: '1234567890'
}
```

### Upsert

Upsert is used for Form Field Values and Customer Attributes. Upsert looks for a match to the existing record, and if one is found, then it makes an update. If a match is not found, it creates a new record.

### Authentication Object

On the new Customers endpoint, when creating a customer there are two ways to set customers passwords. 
- A new password can be set under the `authentication > new password` object in a /PUT or /POST. 
- To have customers reset the password set `force_password_reset` to `true` under `authentication > new password` object in a /PUT or /POST

[Password Confirmation](https://developer.bigcommerce.com/api-reference/customer-subscribers/customers-api/customers/createanewcustomer) and [Validation](https://developer.bigcommerce.com/api-reference/customer-subscribers/customers-api/customer-passwords/validatecustomerpassword) are still available under V2 Customers. 

---

<a href='#customer-subscribers_faq' aria-hidden='true' class='block-anchor'  id='customer-subscribers_faq'><i aria-hidden='true' class='linkify icon'></i></a>

## FAQ

**Which API should I use?**

When possible use the V3 Customers API since we will eventually begin the process of deprecating the existing V2 Customers API. 

**How can I validate customer passwords?**

Password validation is only available on V2 Customers API. Validation will return a true or false. The V3 Customers API can reset a customers password or input a new password. 

---

## Resources
### Related Endpoints
-   [Customer Login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api)
-   [Current Customer API](https://developer.bigcommerce.com/api-docs/customers/current-customer-api)
-   [Customers API](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api)
- [Customer Groups](https://developer.bigcommerce.com/api-reference/customer-subscribers/customers-api/customer-groups/getallcustomergroups) (Customer V2 API)
- [Password Validation](https://developer.bigcommerce.com/api-reference/customer-subscribers/customers-api/customer-passwords/validatecustomerpassword) (Customer V2 API)
- [Password Confirmation](https://developer.bigcommerce.com/api-reference/customer-subscribers/customers-api/customers/createanewcustomer) (Customer V2 API)
-   [Subscribers API](https://developer.bigcommerce.com/api-reference/customer-subscribers/subscribers-api)

### Webhooks
- [Customers](https://developer.bigcommerce.com/api-docs/getting-started/webhooks/webhook-events#webhook-events_customer)
### Related Articles
- [Adding and Editing Fields in the Account Signup Form](https://support.bigcommerce.com/s/article/Editing-Form-Fields#account-fields) (Knowledge Base)
- [Checkout Settings](https://support.bigcommerce.com/s/article/Checkout-Settings#checkout-settings) (Knowledge Base)

