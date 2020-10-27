# Developers Guide to Headless Commerce

<div class="otp" id="no-index">

### On This Page
- [Ways to implement headless](#ways-to-implement-headless)
- [Storefront channels](#storefront-channels)
- [Multisite](#multisite)
- [Catalog Management](#catalog-management)
- [Cart management](#cart-management)
- [Checkout management](#checkout-management)
- [Customer login](#customer-login)
- [Sample integration](#sample-integration)
- [PCI compliance](#pci-compliance)
- [Sample API workflows](#sample-api-workflows)
- [Resources](#resources)

</div>

This article providers a high level guide to using BigCommerce to power headless storefronts; we'll assume you're already familiar with headless commerce as a concept; if you're not, check out our whitepaper, [A New Era of Ecommerce: Headless Commerce](https://www.bigcommerce.com/new-era-headless-caas/) or the Help Center's [Healdess Commerce Guide](https://support.bigcommerce.com/s/article/The-Headless-Approach).

## Ways to implement headless

Which headless approach fits your business requirements?

* [I want to use BigCommerce headlessly with little or no coding](#pre-built-solutions).
* [I want to build a custom solution, but I don't want to code it from scratch](#starter-apps).
* [I want to extend an existing solution or build one from scratch](#custom-solutions).

### Pre-built solutions

Want to build a headless storefront powered by a BigCommerce back-end, but don't want to write a bunch of code? Use one of the pre-built headless storefront solutions below.

|  Solution | Method of Integration | Platform | Type |
| --- | --- | --- | --- |
| [DEITY Falcon](https://www.bigcommerce.com/apps/deity-falcon-pwa-storefront/) | BigCommerce App | DEITY Faclon | PWA |
| [Bloomreach](https://www.bigcommerce.com/apps/bloomreach/) | BigCommerce App | Bloomreach | CMS / DXP |
| [Sitrecore Extend](https://www.bigcommerce.com/apps/sitecore-extend/) | BigCommerce App | Sitecore | CMS |
| [BigCommerce for Wordpress](https://wordpress.org/plugins/bigcommerce/) | WordPress Plugin | WordPress | CMS |
| [BigCommerce for Drupal](https://www.drupal.org/project/bigcommerce) | Drupal Module | Drupal | CMS |

[See more headless solutions and tools](https://developer.bigcommerce.com/tools-resources).

### Starter apps

Need code up a custom storefront but don't want to start from scratch? Kick-start your development with one of the following starter apps.

|  Starter | Stack |
| --- | --- |
| [gatsby-bigcommerce-netlify-cms-starter](https://github.com/bigcommerce/gatsby-bigcommerce-netlify-cms-starter) | Node / React / Gatsby / Netlify |
| [bc-nuxt-vue-starter](https://github.com/bigcommerce/bc-nuxt-vue-starter) | Node / Vue / Nuxt |
| [acf_bc](https://github.com/thirdandgrove/acf_bc) |PHP / ACF / Drupal |

[See more headless starter apps and tools](https://developer.bigcommerce.com/tools-resources).

### Custom solutions

Need to build a custom solution from scratch? Bigcommerce has APIs, SDKs, and toolkits to help you do whatever you need, headlessly.

* [Create storefront channels with the Channels API.](https://developer.bigcommerce.com/api-docs/channels/quick-start).
* [Mannage sites and routes for headless storefronts with the sites and routes API](https://developer.bigcommerce.com/api-reference/store-management/sites).
* [Manage 301 redirects for one or more storefronts with Redirects V3 API](https://developer.bigcommerce.com/api-reference/store-management/redirects)
* [Create storefront specific product listings with the Channels API](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api).
* [Query storefront data with GraphQL](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview).
* [Use customer impersonation tokens to query data specific to the shopper](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview#customer-impersonation-tokens).
* [Create carts with the Server-to-Server Carts API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api).
* [Fetch and display abandoned cart information using the Abandoned Carts API](https://developer.bigcommerce.com/api-reference/cart-checkout/s2s-abandoned-carts).
* [Create and manage shopper wishlists with the Wislists API](https://developer.bigcommerce.com/api-reference/store-management/wishlists)
* [Manage product data with the Catalog API](https://developer.bigcommerce.com/api-reference/catalog/catalog-api).
* [Embed BigCommerce's checkout in an iFrame with Embedded Checkout](https://developer.bigcommerce.com/api-docs/storefronts/embedded-checkout/embedded-checkout-overview).
* [Redirect to BigCommerce's hosted checkout using the Server-to-Server Checkout API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api)
* [Create custom BigCommerce hosted checkout pages from scratch using Checkout SDK](https://developer.bigcommerce.com/stencil-docs/customizing-checkout/checkout-sdk-quickstart).
* [Create a custom BigCommerce hosted checkout from a fork of BigCommerce's Checkout-JS](https://github.com/bigcommerce/checkout-js).
* [Build a custom checkout experience from scratch using the Server-to-Server Checkout API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api).
* [Restyle the BigCommerce hosted checkout](https://developer.bigcommerce.com/stencil-docs/customizing-checkout/optimized-one-page-checkout).
* [Process payments using the Payments API](https://developer.bigcommerce.com/api-reference/payments/payments-process-payments).
* [Manage orders with Orders V2 and V3 APIs](https://developer.bigcommerce.com/api-docs/store-management/orders).
* [Use webhooks to get notified when specific events occur in BigCommerce](https://developer.bigcommerce.com/api-docs/store-management/webhooks/overview).


## Storefront channels

Want to market your headless storefront as an app in BigCommerce's control panel? Use [Channels Toolkit](https://developer.bigcommerce.com/api-docs/channels/guide/channels-toolkit-reference) to install a storefront channel into [Channel Manager](https://support.bigcommerce.com/s/article/Selling-Everywhere-with-Channel-Manager) during the [single-click app](https://developer.bigcommerce.com/api-docs/apps/guide/types) installation process.

![Channel Manager](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels/channels-sf-new.png "Channel Manager")

[Learn how to build a storefront channel](https://developer.bigcommerce.com/api-docs/channels/tutorials/storefront).

## Multisite

Use BigCommerce as the back-end for several stores. By placing an application layer between the storefront and the APIs, the application can control which catalog information is pushed to which storefront.

[Learn more about multisite ecommerce with WordPress and BigCommerce](https://medium.com/bigcommerce-developer-blog/multi-site-ecommerce-with-wordpress-and-bigcommerce-40dee194f8a) (medium.com).

## Catalog Management

Using the [Catalog API](https://developer.bigcommerce.com/api-reference/catalog/catalog-api) you can return product data to your product details page and product listing page.

### Sync the catalog

Best practice is to get product details and cache them in a database to display them. This will speed up the application and allow you to control what information is shown to the customer. Caching the details also lets you implement search in your application.

### Real time catalog

If your catalog is changing all the time, you can use the Catalog API to return real time product information.

### Real time pricing and inventory

If you prefer working with a local copy of your data, but want to make sure that high priority pieces of data like pricing and inventory are always up to date, you can consider a hybrid model. A hybrid model would cache only certain product details and pull the other information in real time. BigCommerce has webhooks that you can use for listening to store events.

## Cart management

Use the [Server to Server Cart API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api) to create carts for existing customers and guest customers.

### Guest Cart

A guest cart assumes the shopper is not a customer and is not logging in or creating an account during checkout. Handle guest checkouts by displaying the cart data to the customer and then moving them to Checkout using the Checkout API.

### Content management system

Using a CMS is a good way to offer a custom shopper experience without needing build a content engine as well. The CMS needs to have a database so catalog information can be stored and retrieved and a way to store accounts. The [BigCommerce WordPress plugin](https://wordpress.org/plugins/bigcommerce/) loads the catalog into the database while using an embedded checkout to display cart and checkout details to customers.

## Checkout management

Use the [Checkout API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api) to move the cart to checkout and turn an existing checkout into an order.

### Redirect to a BigCommerce checkout

When creating a cart, there is an optional query to create a redirect URL. Use this to redirect the shopper to a BigCommerce hosted checkout page.

If you are using the hosted checkout option, shoppers will be able to navigate to other pages of the store. Here's a few methods to prevent this:

1. Use BigCommerce's [Sites and Routes API](https://developer.bigcommerce.com/api-reference/cart-checkout/sites-routes-api) to create redirects from BigCommerce hosted pages back to the non-BigCommerce storefront (recommended).
2. Hide non essential pages by removing the back links in Cart and Checkout
3. Add a JavaScript redirect on all pages (except `/checkout`) that redirects to the non-BigCommerce storefront
4. Wrap all content in the theme's layouts in a conditional that only renders the BC storefront if certain conditions are met (like an admin customer group, for example), and redirect to the non-BigCommerce storefront otherwise.
5. Replace all content in theme layout files with a redirect to the non-BigCommerce storefront

To customize the checkout when using a redirect URL, use our [Checkout SDK](https://github.com/bigcommerce/checkout-sdk-js). The Checkout JS SDK is a library of methods for interacting with the checkout page's underlying Storefront Checkout API, allowing you to build a custom checkout page UI in the framework of your choice.

### Checkout API
If you need complete control over the checkout page, you have the option to build an external checkout in your CMS or app using the server-to-server Checkout API. Then use the Payments API to process a payment through BigCommerce to take payment for the order. If you are using the Payments API, you are responsible for [PCI compliance](#pci-compliance).

## Customer login

### Associate cart with a customer

If a shopper creates a cart as a guest then logs into the store, you can use the following process to associate the cart to the customer and log them in at the same time. The [Server to Server Cart API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api) is used since it allows for the front end to be bypassed when creating a cart.

When a cart is created, your app should store the `cart_id`.  The `cart_id` is used to generated a `redirect_url`. Using the [Customer Login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api) set the `redirect_to` parameter as the generated cart or checkout redirect url. This will both log the customer in and show them either the cart or checkout depending on which url was used.  To make sure the cart is matched to the right customer you should compare the entered email address to what is the store’s database.

To populate the `customer_id` on the cart with the correct data, use the email address entered to match against the [Customers API](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api). If the email address matches what the customer input and what is in the BigCommerce database then proceed with login. If a match is not found then direct the customer to a [sign up](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api/customers/customerspost) screen.

### Creating a new customer

Our WordPress plugin uses the approach of using the Customer API to [validate the password](https://developer.bigcommerce.com/api-reference/customer-subscribers/customers-api/customer-passwords/validatecustomerpassword) against what is stored in BigCommerce.

If a new account is created in WordPress, the password is written to the customer account in BigCommerce and used as the validation in future requests. The password is never stored in the WordPress database. You can match customers using the email address and the [Customers API](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api).

## Sample integration

In the diagram below, the Storefront is any location the products are being rendered and where the shopper browses for products. With headless the storefront can be a CMS or an app. The Application is making API calls to BigCommerce in order to perform certain actions and return data either to display to the shopper or pass it along to another system. BigCommerce is creating the order and processing payments so you don’t need to worry about building the infrastructure.

![Sample Headless Integration](https://storage.googleapis.com/bigcommerce-production-dev-center/images/developers-guide-to-headless-01.png "Sample Headless Integration")

|Entity|Description|
|-|-|
|**Storefront**|The front end presentation layer where a shopper interacts with products. In a headless architecture, the storefront might be a CMS, native mobile app, kiosk, static site, or any other front end solution you can imagine. The BigCommerce WordPress plugin is built using an existing CMS and injecting a stores catalog. Any CMS that accepts custom integrations can be used. Another option is to build a storefront from scratch using a framework such as [Gatsby](https://www.bigcommerce.com/blog/flexible-headless-commerce-solutions/#overview-of-bigcommerce-for-react-gatsby).|
|**Application**|Solution built by developer to control the requests and responses from the BigCommerce APIs. In addition to handling essential ecommerce tasks like requesting product information or sending the request to process a payment, the application layer can also handle logic for custom functionality, like presenting discount codes based on a shopper's history or pre filling details on the checkout page. |
|**BigCommerce**|BigCommerce will respond to the application with the requested data to power the backend ecommerce functionality. It can handle processing payments, storing customer data, retrieving the catalog and order information.|

## PCI compliance

BigCommerce offers different avenues or channels for integration, depending on your business needs. The ultimate responsibility of PCI compliance lies with you and takes into consideration the architecture of your e-commerce store and multiple channels of integrations.
BigCommerce is a PCI DSS compliant service provider and certifies annually [all requirements (1-12)](https://www.pcisecuritystandards.org/pci_security/standards_overview) including as a shared hosting provider.

The BigCommerce [PCI DSS attestation of compliance (AOC)](https://support.mybigcommerce.com/content/dojo/BigCommerce_PCI_DSS_v3.2.1_AOC_2019_Service_Provider.pdf) outlines the description of the technology stack certified annually.

Merchants can use BigCommerce's [PCI DSS AOC](https://support.mybigcommerce.com/content/dojo/BigCommerce_PCI_DSS_v3.2.1_AOC_2019_Service_Provider.pdf) to satisfy the compliance requirements for the part that outlines its responsibilities.

### Responsibility matrix

| |BigCommerce Responsibility |Merchant Responsibility |
|--|--|--|
| BigCommerce as a storefront and backend | Responsible for all [PCI DSS requirements (1-12)](https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security) of the product to the point that it has control of Merchants stores. | Responsible for ensuring that all modifications that result in external calls to, or integrations with outside parties are done in a PCI DSS compliant manner. |
||| Responsible for ensuring all design modifications are done in a PCI DSS compliant manner.|
||| Responsible for ensuring that all service providers it uses are compliant with PCI DSS.|
| BigCommerce as a backend for example [headless integrations](https://developer.bigcommerce.com/api-docs/developers-guide-headless) or the [BigCommerce WordPress Plugin](https://wordpress.org/plugins/bigcommerce/). | Responsible for all PCI DSS requirements from the point at which cardholder data is handed to a BigCommerce controlled interface (see [BigCommerce Attestation of PCI DSS 2019-2020](https://support.mybigcommerce.com/content/dojo/BigCommerce_PCI_DSS_v3.2.1_AOC_2019_Service_Provider.pdf)). | Responsible for the PCI DSS compliance of its storefront plus all of the above. |
| Checkout and Payments SDK | Responsible for the PCI DSS compliance requirements applicable stated in BigCommerce as a storefront or BigCommerce as a backend<sup>1</sup> | Responsible for the PCI DSS compliance requirements applicable stated in BigCommerce as a storefront or BigCommerce as a backend<sup>1</sup> |
| Checkout and Payments API | Responsible for the PCI DSS compliance requirements applicable stated in BigCommerce as a storefront or BigCommerce as a backend<sup>1</sup> |  Responsible for the PCI DSS compliance requirements applicable stated in BigCommerce as a storefront or BigCommerce as a backend<sup>1</sup> |

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> 1. The way your business consumes the SDKs (either BigCommerce as a storefront and backend or BigCommerce as a backend ) determines BigCommerce's  responsibilities; It is possible to use one more of BigCommerce's technology stack at the same time. Your PCI DSS compliance responsibilities will be a combination of each stack consumed.

</div>
</div>
</div>

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

> If your application handles credit card data, it must be PCI Compliant. self-assessment questionnaires can be submitted to <a href="mailto:compliance@bigcommerce.com">compliance@bigcommerce.com</a>.

</div>
</div>
</div>

## Sample API workflows

### Creating orders from a cart

1.  Create a [Cart](/api-reference/cart-checkout/server-server-cart-api/cart/createacart) with a redirect url
	1.  Add the Customer ID or leave blank if shopper is a guest
	2.  Add Line Items or Custom Line Items
2.  Add a [Billing Address](/api-reference/cart-checkout/server-server-checkout-api/checkout-billing-address/checkoutsbillingaddressbycheckoutidpost) to the [Cart](/api-reference/cart-checkout/server-server-cart-api/cart/createacart) changing it to a Checkout
3.  Add a [Consignment](/api-reference/cart-checkout/server-server-checkout-api/checkout-consignments/checkoutsconsignmentsbycheckoutidpost) to Checkout with the line items and the `consignments.available_shipping_options` query
4. Update each [Consignment](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api/checkout-consignments) with the chosen shipping option from the Add Consignment response.
5.  Create the Order by sending a request to [Create Order](/api-reference/cart-checkout/server-server-checkout-api/checkout/createanorder)
	3.  Returns an `order_id`
	4. Order is created in `incomplete` status
6.  Take a Payment for the Order using one of the two methods below

### Create an Order Directly

1.  Send a request /POST request to [Orders](/api-reference/orders/orders-api/orders/createanorder)
	1. Make sure the `status_id` is 0
	2.  Add the Customer ID or leave blank if the shopper is a guest
	3. Add Line Items or Custom Line Items
	4. Add a Billing Address
	5. Add a Shipping Address
	6. Create a custom shipping quote
2.  Take a Payment for the Order using one of the two methods below
3.  Vaulted Card -- The shopper has saved a credit card
	7. [Get Payment Methods](/api-reference/payments/payments-create-payment-token-api/payment-methods/paymentsmethodsget)
	8.  [Create Access Token](/api-reference/payments/payments-create-payment-token-api/payment-access-token/paymentsaccesstokenspost)
	9.  [Process Payment](/api-reference/payments/payments-process-payments/payment/paymentspost)
4.  Credit Card -- The shopper has not saved a credit card
	10. [Create Access Token](/api-reference/payments/payments-create-payment-token-api/payment-access-token/paymentsaccesstokenspost)
	11. [Process Payment](/api-reference/payments/payments-process-payments/payment/paymentspost)

## Resources

### Tools
- [Checkout SDK](https://github.com/bigcommerce/checkout-sdk-js)
- [WordPress Plugin](https://wordpress.org/plugins/bigcommerce/) (WordPress Plugin Directory)

### Related endpoints

- [Catalog API](https://developer.bigcommerce.com/api-reference/catalog/catalog-api)
- [Server to Server Checkout API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-checkout-api)
- [Server to Server Cart API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api)
- [Orders API](https://developer.bigcommerce.com/api-reference/orders/orders-api)
- [Payments API](https://developer.bigcommerce.com/api-reference/payments)
- [Customers API](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api)
- [Validate Customer Password](https://developer.bigcommerce.com/api-reference/customer-subscribers/customers-api/customer-passwords/validatecustomerpassword)

### Related articles

- [Orders API](https://developer.bigcommerce.com/api-reference/orders/orders-api)
- [Customers Overview](https://developer.bigcommerce.com/api-docs/customers/customers-subscribers-overview)
- [Customer Login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api)
- [Launching your store](https://support.bigcommerce.com/s/article/Launching-Your-Store) (BigCommerce Support)
- [PCI Compliance](https://support.bigcommerce.com/s/article/PCI-Compliance) (BigCommerce Support)
- [Multisite Ecommerce with WordPress and BigCommerce](https://medium.com/bigcommerce-developer-blog/multi-site-ecommerce-with-wordpress-and-bigcommerce-40dee194f8a) (BigCommerce Developers Blog)
- [Matter Makes Waves with a Headless Build using BigCommerce for WordPress](https://medium.com/bigcommerce-developer-blog/matter-makes-waves-with-a-headless-build-using-bigcommerce-for-wordpress-a572bad4bdf8) (BigCommerce Developers Blog)
- [New Era in Headless CaaS](https://www.bigcommerce.com/new-era-headless-caas/) (BigCommerce Whitepaper)
- [BigCommerce Doubles Down on Headless Commerce with BloomReach, Sitecore, Adobe Experience Manager, and More](https://www.bigcommerce.com/blog/flexible-headless-commerce-solutions/) (BigCommerce Blog)

### Additional resources
- [Merchants Classification Levels Visa](https://usa.visa.com/support/small-business/security-compliance.html#3) (Visa USA)
- [Merchants Classification Levels Mastercard](https://www.mastercard.us/en-us/merchants/safety-security/security-recommendations/merchants-need-to-know.html) (Mastercard)
- [Self Assessment Questionaire (SAQ) Types and Identifying which SAQ is for you](https://www.pcisecuritystandards.org/documents/SAQ-InstrGuidelines-v3_2_1.pdf?agreement=true&time=1562173376464) (PCI Security Standards)
- [Maintaining Payment Security](https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security) (PCI Security Standards)