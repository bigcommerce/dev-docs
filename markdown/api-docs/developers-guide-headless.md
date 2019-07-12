<h1>Developers Guide to Headless Commerce</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
        <li><a href="#headless-commerce_prerequisites">Prerequisites</a></li>
        <li><a href="#headless-commerce_ways-to-implement-headless">Ways to Implement Headless</a></li>
        <li><a href="#headless-commerce-customer_login">Customer Login</a></li>
        <li><a href="#headless-commerce_sample-integration">Sample Integration</a></li>
        <li><a href="#headless-commerce_pci-compliance">PCI Compliance</a></li>
        <li><a href="#headless-commerce_sample-api-workflows">Sample API Workflows</a></li>
	</ul>
</div>


Headless commerce decouples the front end from the ecommerce platform that powers it, allowing developers to build flexible and content-rich storefronts. BigCommerce provides APIs for the Catalog, Cart, Checkout, Orders, Customers, Authentication and Payments. The APIs can be plugged into an existing CMS or website for flexible content management. BigCommerce used this approach to create our [WordPress Plugin](https://www.bigcommerce.com/solutions/wordpress-ecommerce-plugin/). The WordPress Plugin allows for a developer to take advantage of WordPress content management while using our APIs to manage the catalog and shopper checkout.
For a deeper guide on Headless, see our Whitepaper, [A New Era of Ecommerce: Headless Commerce](https://www.bigcommerce.com/new-era-headless-caas/).  

### Multisite

With headless, developers can use BigCommerce as the back-end for several stores. By placing an application layer between the storefront and the APIs, the application can control which catalog information is pushed to which storefront. To learn more about Multisite, see [Multisite Ecommerce with WordPress and BigCommerce](https://medium.com/bigcommerce-developer-blog/multi-site-ecommerce-with-wordpress-and-bigcommerce-40dee194f8a).

In this article we will review ways you can implement headless, what requires PCI compliance audits and go through sample workflows for cart and checkout.


---

<a href='#headless-commerce_prerequisites' aria-hidden='true' class='block-anchor'  id='headless-commerce_prerequisites'><i aria-hidden='true' class='linkify icon'></i></a>

## Prerequisites
To use the BigCommerce platform for headless commerce, you must have a store on an active plan. The store does not need to be [launched](https://support.bigcommerce.com/s/article/Launching-Your-Store).

---

<a href='#headless-commerce_ways-to-implement-headless' aria-hidden='true' class='block-anchor'  id='headless-commerce_ways-to-implement-headless'><i aria-hidden='true' class='linkify icon'></i></a>

## Ways to Implement Headless
There are many ways to implement headless commerce. Below are just a few ways to start with Headless commerce.
* Use our Wordpress Plugin to leverage a custom CMS powered by the BigCommerce Catalog, Cart and Checkout APIs.
* Create a custom shopper experience by creating your own storefront and checkout using our APIs to manage the Catalog, Cart, Checkout and Payments. 
* Use the BigCommerce storefront with a customized checkout using the Checkout SDK. 

Below are ways to manage the catalog, cart and checkout. With the flexibility of using APIs, you can use one or all the options for a store.

### Catalog Management
Using the [Catalog API](https://developer.bigcommerce.com/api-reference/catalog/catalog-api) you can return product data to your product details page and product listing page.

**Sync the Catalog**  
Best practice is to get product details and cache them in a database to display them. This will speed up the application and allow you to control what information is shown to the customer. Caching the details also lets you implement search in your application.

**Real Time Catalog**  
If your catalog is changing all the time, you can use the Catalog API to return real time product information.

**Real Time Pricing + Inventory**  
If you prefer working with a local copy of your data, but want to make sure that high priority pieces of data like pricing and inventory are always up to date, you can consider a hybrid model. A hybrid model would cache only  certain product details and pull the other information in real time. BigCommerce has webhooks that you can use for listening to store events.

### Cart Management 
Use the [Server to Server Cart API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api) to create carts for existing customers and guest customers.

**Guest Cart**  
A guest cart assumes the shopper is not a customer and is not logging in or creating an account during checkout. Handle guest checkouts by displaying the cart data to the customer and then moving them to Checkout using the Checkout API.

**Content Management System**  
Using a CMS is a good way to offer a custom shopper experience without needing build a content engine as well. The CMS needs to have a database so catalog information can be stored and retrieved and a way to store accounts. The [BigCommerce WordPress plugin](https://wordpress.org/plugins/bigcommerce/) loads the catalog into the database while using an embedded checkout to display cart and checkout details to customers. 

### Checkout Management
Use the [Checkout API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api) to move the cart to checkout and turn an existing checkout into an order.

**Redirect to a BigCommerce Checkout**  
When creating a cart, there is an optional query to create a redirect URL. Use this to redirect the shopper to a BigCommerce hosted checkout page.

If you are using the hosted checkout option shoppers will be able to navigate to other pages of the store. To prevent this, there are two options: 

* Hide non essential pages by removing the back links in Cart and Checkout.
* Edit the theme files to hide the other pages from all visitors except for those who need to see them for maintenance. The steps to edit the theme files are outlined below.


<!--
title: "Edit the schema.json file"
subtitle: " Add the following object to the settings array"
lineNumbers: true
-->
Edit the schema.json file and add the following object to the settings array.

```json
{
   "name": "Administrators",
   "settings": [
     {
       "type": "text",
       "label": "Administrator Emails (separated by commas)",
       "id": "admin_emails"
     }
   ]
 }
```

Edit the <span class=”fn”>config.json</span> file and add `"admin_emails": ""` to the settings object. Add the emails to the object that should have access to all store pages.

Modify the following pages to gate all pages except checkout, order confirmation, down for maintenance, and order invoices:
* <span class=”fn”>layout/amp-iframe</span>
* <span class=”fn”>layout/amp</span>
* <span class=”fn”>layout/base</span>

Add the following conditional wrapper to each page:

<!--
title: "Conditional Wrapper"
subtitle: ""
lineNumbers: true
-->

```html
{{#contains theme_settings.admin_emails customer.email}}
<-- page content -->
{{#else}}
<-- display login form -->
{{/contains}}
```

To customize the checkout when using a redirect URL, use our [Checkout SDK](https://github.com/bigcommerce/checkout-sdk-js). The Checkout JS SDK is a library of methods for interacting with the checkout page's underlying Storefront Checkout API, allowing you to build a custom checkout page UI in the framework of your choice.

**Checkout API**  
If you need complete control over the checkout page, you have the option to build an external checkout in your CMS or app using the server-to-server Checkout API. Then use the Payments API to process a payment through BigCommerce to take payment for the order. If you are using the Payments API, you are responsible for [PCI compliance](#headless-commerce_pci-compliance).

---

<a href='#headless-commerce-customer_login' aria-hidden='true' class='block-anchor'  id='headless-commerce-customer_login'><i aria-hidden='true' class='linkify icon'></i></a>

## Customer Login

### Associate Cart with a Customer

If a shopper creates a cart as a guest then logs into the store, you can use the following process to associate the cart to the customer and log them in at the same time. The [Server to Server Cart API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api) is used since it allows for the front end to be bypassed when creating a cart.

When a cart is created, your app should store the `cart_id`.  The `cart_id` is used to generated a [`redirect_url`](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api/cart/createcartredirecturl). Using the [Customer Login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api) set the `redirect_to` parameter as the generated cart or checkout redirect url. This will both log the customer in and show them either the cart or checkout depending on which url was used.  To make sure the cart is matched to the right customer you should compare the entered email address to what is the store’s database.

To populate the `customer_id` on the cart with the correct data, use the email address entered to match against the [Customers API](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api). If the email address matches what the customer input and what is in the BigCommerce database then proceed with login. If a match is not found then direct the customer to a [sign up](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api/customers/customerspost) screen.

### Creating a New Customer
Our WordPress plugin uses the approach of using the Customer API to [validate the password](https://developer.bigcommerce.com/api-reference/customer-subscribers/customers-api/customer-passwords/validatecustomerpassword) against what is stored in BigCommerce.

If a new account is created in WordPress, the password is written to the customer account in BigCommerce and used as the validation in future requests. The password is never stored in the WordPress database. You can match customers using the email address and the [Customers API](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api).

---

<a href='#headless-commerce_sample-integration' aria-hidden='true' class='block-anchor'  id='headless-commerce_sample-integration'><i aria-hidden='true' class='linkify icon'></i></a>

## Sample Integration

In the diagram below, the Storefront is any location the products are being rendered and where the shopper browses for products. With headless the storefront can be a CMS or an app. The Application is making API calls to BigCommerce in order to perform certain actions and return data either to display to the shopper or pass it along to another system. BigCommerce is creating the order and processing payments so you don’t need to worry about building the infrastructure.

### Storefront

The storefront is the front end presentation layer where a shopper interacts with products. In a headless architecture, the storefront might be a CMS, native mobile app, kiosk, static site, or any other front end solution you can imagine. The BigCommerce WordPress plugin is built using an existing CMS and injecting a stores catalog. Any CMS that accepts custom integrations can be used. Another option is to build a storefront from scratch using a framework such as [Gatsby](https://www.bigcommerce.com/blog/flexible-headless-commerce-solutions/#overview-of-bigcommerce-for-react-gatsby).

### Application
The application is what a developer builds to control the requests and responses from the BigCommerce APIs. In addition to handling essential ecommerce tasks like requesting product information or sending the request to process a payment, the application layer can also handle logic for custom functionality, like presenting discount codes based on a shopper's history or pre filling details on the checkout page. 


### BigCommerce
BigCommerce will respond to the application with the requested data to power the backend ecommerce functionality. It can handle processing payments, storing customer data, retrieving the catalog and order information.

<!--
    title: #### Sample Headless Integration

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1554323466855
-->

#### Sample Headless Integration
![#### Sample Headless Integration
](//s3.amazonaws.com/user-content.stoplight.io/6012/1554323466855 "#### Sample Headless Integration
")

---

<a href='#headless-commerce_pci-compliance' aria-hidden='true' class='block-anchor'  id='headless-commerce_pci-compliance'><i aria-hidden='true' class='linkify icon'></i></a>

## PCI Compliance

BigCommerce offers different avenues or channels for integration, depending on your business needs. The ultimate responsibility of PCI compliance lies with you and takes into consideration the architecture of your e-commerce store and multiple channels of integrations.
BigCommerce is a PCI DSS compliant service provider and certifies annually [all requirements (1-12)](https://www.pcisecuritystndards.org/pci_security/maintaining_payment_security) including as a shared hosting provider. 

The BigCommerce [PCI DSS attestation of compliance (AOC)](https://support.mybigcommerce.com/content/dojo/BigCommerce_PCI_DSS_v3.2.1_AOC_2019_Service_Provider.pdf) outlines the description of the technology stack certified annually.

Merchants can use BigCommerce's [PCI DSS AOC](https://support.mybigcommerce.com/content/dojo/BigCommerce_PCI_DSS_v3.2.1_AOC_2019_Service_Provider.pdf) to satisfy the compliance requirements for the part that outlines its responsibilities.

### Integrations with BigCommerce and Responsibility Matrix

|  |BigCommerce Responsibility  |Merchant Responsibility |
|--|--| -- |
| BigCommerce as a storefront and backend | Responsible for all [PCI DSS requirements (1-12)](https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security) of the product to the point that it has control of Merchants stores. | Responsible for ensuring that all modifications that result in external calls to, or integrations with outside parties are done in a PCI DSS compliant manner.<br><br>Responsible for ensuring all design modifications are done in a PCI DSS compliant manner.<br><br>Responsible for ensuring that all service providers it uses are compliant with PCI DSS. |
| BigCommerce as a backend for example [headless integrations](https://developer.bigcommerce.com/api-docs/developers-guide-headless) or the [BigCommerce WordPress Plugin](https://wordpress.org/plugins/bigcommerce/). | Responsible for all PCI DSS requirements from the point at which cardholder data is handed to a BigCommerce controlled interface. (see [BigCommerce Attestation of PCI DSS 2019-2020](https://support.mybigcommerce.com/content/dojo/BigCommerce_PCI_DSS_v3.2.1_AOC_2019_Service_Provider.pdf)) | Responsible for the PCI DSS compliance of its storefront plus all of the above. |
| Checkout and Payments SDK | Not Responsible<br> The way your business consumes the SDKs (either BigCommerce as a storefront and backend or BigCommerce as a backend ) would determine BigCommerce's  responsibilities. | Responsible for the PCI DSS compliance requirements applicable stated in BigCommerce as a storefront or BigCommerce as a backend. <br><br> The way your business consumes the SDKs (either BigCommerce as a storefront and backend or BigCommerce as a backend ) would determine BigCommerce's responsibilities.|
| Checkout and Payments API | Not Responsible* <br> The way your business consumes the SDKs (either BigCommerce as a storefront and backend or BigCommerce as a backend ) would determine BigCommerce's  responsibilities. | Responsible for the PCI DSS compliance requirements applicable stated in BigCommerce as a storefront or BigCommerce as a backend. <br><br> The way your business consumes the SDKs (either BigCommerce as a storefront and backend or BigCommerce as a backend ) would determine BigCommerce's responsibilities. |

It is possible to use one more of BigCommerce's technology stack at the same time. Your PCI DSS compliance responsibilities will be a combination of each stack consumed.

### Additional Resources
-   [Merchants Classification Levels Visa](https://usa.visa.com/support/small-business/security-compliance.html#3)
-   [Merchants Classification Levels Mastercard](https://www.mastercard.us/en-us/merchants/safety-security/security-recommendations/merchants-need-to-know.html)
-   [Self Assessment Questionaire (SAQ) Types and Identifying which SAQ is for you](https://www.pcisecuritystandards.org/documents/SAQ-InstrGuidelines-v3_2_1.pdf?agreement=true&time=1562173376464)


<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

> If your application handles credit card data, you will need to be PCI Compliant. SAQs (self-assessment questionnaires) can be submitted to <a href="mailto:compliance@bigcommerce.com">compliance@bigcommerce.com</a>.

</div>
</div>
</div>

---

<a href='#headless-commerce_sample-api-workflows' aria-hidden='true' class='block-anchor'  id='headless-commerce_sample-api-workflows'><i aria-hidden='true' class='linkify icon'></i></a>

## Sample API Workflows

Below are example workflows that list which APIs are needed to create a Cart, Checkout and Order on BigCommerce. Our headless implementation is based on the Server to Server Cart and Checkout APIs. There are currently two ways to handle this:

* Create an order from a cart
* Creating an order directly to bypass the cart and checkout


### Create an Order from a Cart
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f4dbc360974d4b5eff77)

1.  Create a [Cart](/api-reference/cart-checkout/server-server-cart-api/cart/createacart) with a redirect url
	1.  Add the Customer ID or leave blank if shopper is a guest
	2.  Add Line Items or Custom Line Items
2.  Add a [Billing Address](/api-reference/cart-checkout/server-server-checkout-api/checkout/checkoutsbillingaddressbycheckoutidpost) to the [Cart](/api-reference/cart-checkout/server-server-cart-api/cart/createacart) changing it to a Checkout
3.  Add a [Consignment](/api-reference/cart-checkout/server-server-checkout-api/checkout/checkoutsconsignmentsbycheckoutidpost) to Checkout with the line items and the `consignments.available_shipping_options` query
4. Update each [Consignment](/api-reference/cart-checkout/server-server-checkout-api/checkout/checkoutsconsignmentsbycheckoutidandconsignmentidput) with the chosen shipping option from the Add Consignment response.
5.  Create the Order by sending a request to [Create Order](/api-reference/cart-checkout/server-server-checkout-api/checkout/createanorder)
	6.  Returns an `order_id`
	7. Order is created in Incomplete status
6.  Take a Payment for the Order using one of the two methods below
7.  Vaulted Card -- The shopper has saved a credit card
	8. [Get Payment Methods](/api-reference/payments/payments-create-payment-token-api/payment-methods/paymentsmethodsget)
	9.  [Create Access Token](/api-reference/payments/payments-create-payment-token-api/payment-access-token/paymentsaccesstokenspost)
	10. [Process Payment](/api-reference/payments/payments-process-payments/payment/paymentspost)
8.  Credit Card -- The shopper has not saved a credit card
	9. [Create Access Token](/api-reference/payments/payments-create-payment-token-api/payment-access-token/paymentsaccesstokenspost)
	10. [Process Payment](/api-reference/payments/payments-process-payments/payment/paymentspost)

### Create an Order Directly
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f4dbc360974d4b5eff77)

1.  Send a request /POST request to [Orders](/api-reference/orders/orders-api/orders/postorders)
	2. Make sure the `status_id` is 0
	3.  Add the Customer ID or leave blank if the shopper is a guest
	4. Add Line Items or Custom Line Items
	5. Add a Billing Address
	6. Add a Shipping Address
	7. Create a custom shipping quote
2.  Take a Payment for the Order using one of the two methods below
3.  Vaulted Card -- The shopper has saved a credit card
	8. [Get Payment Methods](/api-reference/payments/payments-create-payment-token-api/payment-methods/paymentsmethodsget)
	9.  [Create Access Token](/api-reference/payments/payments-create-payment-token-api/payment-access-token/paymentsaccesstokenspost)
	10. [Process Payment](/api-reference/payments/payments-process-payments/payment/paymentspost)
4.  Credit Card -- The shopper has not saved a credit card
	9. [Create Access Token](/api-reference/payments/payments-create-payment-token-api/payment-access-token/paymentsaccesstokenspost)
	10. [Process Payment](/api-reference/payments/payments-process-payments/payment/paymentspost)






---

## Resources

### Tools
- [Cart, Checkout and Order Postman Collection](https://www.getpostman.com/collections/f4dbc360974d4b5eff77)
- [Checkout SDK](https://github.com/bigcommerce/checkout-sdk-js)
- [WordPress Plugin](https://wordpress.org/plugins/bigcommerce/) (WordPress Plugin Directory)

### Related Endpoints

- [Catalog API](https://developer.bigcommerce.com/api-reference/catalog/catalog-api)
- [Server to Server Checkout API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api)
- [Server to Server Cart API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api)
- [Orders API](https://developer.bigcommerce.com/api-reference/orders/orders-api)
- [Payments API](https://developer.bigcommerce.com/api-reference/payments)
- [Customers API](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api)
- [Validate Customer Password](https://developer.bigcommerce.com/api-reference/customer-subscribers/customers-api/customer-passwords/validatecustomerpassword)

### Related Articles

- [Orders API](https://developer.bigcommerce.com/api-reference/orders/orders-api)
- [Customers Overview](https://developer.bigcommerce.com/api-docs/customers/customers-subscribers-overview)
- [Customer Login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api)
- [Launching your store](https://support.bigcommerce.com/s/article/Launching-Your-Store) (BigCommerce Support)
- [PCI Compliance](https://support.bigcommerce.com/s/article/PCI-Compliance) (BigCommerce Support)
- [Multisite Ecommerce with WordPress and BigCommerce](https://medium.com/bigcommerce-developer-blog/multi-site-ecommerce-with-wordpress-and-bigcommerce-40dee194f8a) (BigCommerce Developers Blog)
- [Matter Makes Waves with a Headless Build using BigCommerce for WordPress](https://medium.com/bigcommerce-developer-blog/matter-makes-waves-with-a-headless-build-using-bigcommerce-for-wordpress-a572bad4bdf8) (BigCommerce Developers Blog)
- [New Era in Headless CaaS](https://www.bigcommerce.com/new-era-headless-caas/) (BigCommerce Whitepaper)
- [BigCommerce Doubles Down on Headless Commerce with BloomReach, Sitecore, Adobe Experience Manager, and More](https://www.bigcommerce.com/blog/flexible-headless-commerce-solutions/) (BigCommerce Blog)

### Additional Resources
-   [Merchants Classification Levels Visa](https://usa.visa.com/support/small-business/security-compliance.html#3) (Visa USA)
-   [Merchants Classification Levels Mastercard](https://www.mastercard.us/en-us/merchants/safety-security/security-recommendations/merchants-need-to-know.html) (Mastercard)
-   [Self Assessment Questionaire (SAQ) Types and Identifying which SAQ is for you](https://www.pcisecuritystandards.org/documents/SAQ-InstrGuidelines-v3_2_1.pdf?agreement=true&time=1562173376464) (PCI Security Standards)
- [Maintaining Payment Security](https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security) (PCI Security Standards)

