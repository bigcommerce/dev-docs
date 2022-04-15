#  Checkout SDK

The Checkout JS SDK is a wrapper for the BigCommerce Storefront Checkout API.

It allows a developer to create a custom checkout experience to move a customer through the checkout process.
The SDK handles all the ‘heavy-lifting’ such as customer login, getting shipping quotes, and submitting payment for an order.
With the Checkout JS SDK, you can build a [custom checkout presentation](https://github.com/bigcommerce/checkout-js) layer in popular front-end frameworks such as React.

## What can I do with the SDK?

-   You can initialize payment and shipping providers that require client-side setup through a common interface. Below are some examples of these providers:

    -   [Amazon](#required-payment-method-initialization-options)
    -   Braintree
    -   [PayPal](#required-payment-method-initialization-options)
    -   Square
    -   Stripe

 

-   You can use its JavaScript interface for interacting with the web API.

    -   Fetch and submit resources:
        -   Cart
        -   Customer 
        -   Order

    -   Fetch available options:
        -   Billing addresses
        -   Billing countries
        -   Billing states
        -   Payment methods 
        -   Shipping addresses
        -   Shipping countries
        -   Shipping methods 
        -   Shipping states
      

 

The Checkout JS SDK allows you to present the checkout process to the shopper in any way you like and, through front-end technologies and external web services, augment the checkout with extra information.

However, the Checkout JS SDK does not allow you to change the checkout's underpinnings   - you must still conform to the model of the Checkout API underpinning the SDK to complete a Checkout and create an Order in BigCommerce.
The SDK does not allow you to implement custom payment, shipping, or tax calculation providers into the checkout. Instead, you can use the configured providers for these services on a given store via our Checkout API.

### Required payment method initialization options 
Some payment methods, like PayPal, Amazon, etc., require you to provide additional initialization options. Amazon requires a container ID to initialize its payment widget. The PayPal method requires specific options to initialize the PayPal Smart Payment button on the checkout page that substitutes a standard submit button. For more details on adjusting your code to make it work with the PayPal method, see the [BigCommerce SDK Repo](https://github.com/bigcommerce/checkout-sdk-js/blob/master/docs/interfaces/paypalcommercepaymentinitializeoptions.md).

![Checkout Button](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/checkout-sdk-01.png "Checkout Button")

## Where can I get the SDK?
The Checkout JS SDK and associated documentation is available from the [BigCommerce SDK Repo.](https://github.com/bigcommerce/checkout-sdk-js)

## How can I update the SDK?
The following steps describe how you can update your Checkout SDK when using a custom checkout.

1. Fork and clone [checkout-js](https://github.com/bigcommerce/checkout-js); then, install dependencies.

```bash
# Clone the repo
git clone https://github.com/bigcommerce/checkout-js

# Install dependencies
cd checkout-js
npm ci
```

2. Open your store's `package.json` file in your text editor.
3. Update the value for "@bigcommerce/checkout-sdk". Enter the minimum version for the gateway to work. 
For Apple Pay, this value needs to be "1.215.0" or greater. 

| Previous checkout-sdk value |  New checkout-sdk value |
| - | - |
| "@bigcommerce/checkout-sdk": "^1.199.0", | "@bigcommerce/checkout-sdk": "^1.215.0",|

4. Run `npm install` in your terminal to update your store to reflect the change.
5. Enable the gateway in your control panel.

The payment gateway will appear in every checkout.

## Support and customization
- Enterprise clients can reach out to their account manager to review services and resources available.
- For more on our design policy, please visit [Design Support](https://support.bigcommerce.com/s/article/BigCommerce-Design-Policy#support).
