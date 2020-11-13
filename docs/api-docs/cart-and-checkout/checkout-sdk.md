#  Checkout SDK

<div class="otp" id="no-index">

### On this page
- [What can I do with the SDK?](#what-can-i-do-with-the-sdk)
- [Where can I get the SDK?](#where-can-i-get-the-sdk)
- [Support and customization](#support-and-customization)

</div>

The Checkout JS SDK is a wrapper for the BigCommerce Storefront Checkout API.

It allows a developer to create a custom checkout experience to move a customer through the checkout process.
The SDK handles all the ‘heavy-lifting’ such as customer login, getting shipping quotes, and submitting payment for an order.
With the Checkout JS SDK, you can build a [custom checkout presentation](https://github.com/bigcommerce/checkout-sdk-js-example) layer in popular front-end frameworks such as React.

## What can I do with the SDK?

-   You can initialize payment and shipping providers that require client-side setup through a common interface. Below are some examples of these providers:

    -   [PayPal](#required-payment-method-initialization-options)
    -   Braintree
    -   Stripe
    -   Square
    -   Amazon

-   You can use its JavaScript interface for interacting with the web API.

    -   Fetch and submit resources:
        -   Cart
        -   Order
        -   Customer
    -   Fetch available options:
        -   Shipping addresses
        -   Shipping countries
        -   Shipping states
        -   Billing addresses
        -   Billing countries
        -   Billing states
        -   Shipping methods
        -   Payment methods

The Checkout JS SDK allows you to present the checkout process to the shopper in any way you like and, through front-end technologies and external web services, augment the checkout with extra information.

However, the Checkout JS SDK does not allow you to change the checkout's underpinnings   - you must still conform to the model of the Checkout API underpinning the SDK to complete a Checkout and create an Order in BigCommerce.
The SDK does not allow you to implement custom payment, shipping, or tax calculation providers into the checkout. Instead, you can use the configured providers for these services on a given store via our Checkout API.

### <a name="required-payment-method-initialization-options"> </a>Required payment method initialization options 
Some payment methods, like PayPal, Amazon, etc., require you to provide additional initialization options. Amazon requires a container ID to initialize its payment widget. The PayPal method requires specific options to initialize the PayPal Smart Payment button on the checkout page that substitutes a standard submit button. For more details on adjusting your code to make it work with the PayPal method, see the [BigCommerce SDK Repo](https://github.com/bigcommerce/checkout-sdk-js/blob/master/docs/interfaces/paypalcommercepaymentinitializeoptions.md).

![Checkout Button](http://raw.githubusercontent.com/bigcommerce/dev-docs/master/asset/images/checkout-sdk-01 "Checkout Button")

## Where can I get the SDK?
The Checkout JS SDK and associated documentation is available from the [BigCommerce SDK Repo.](https://github.com/bigcommerce/checkout-sdk-js)

## Support and customization
- Enterprise clients can reach out to their account manager to review services and resources available.
- For more on our design policy, please visit [Design Support](https://forum.bigcommerce.com/s/article/BigCommerce-Design-Policy#support).
