<h1> Checkout SDK </h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#checkout-sdk_what-can-i-do"> What Can I Do with the SDK?</a></li>
		<li><a href="#checkout-sdk_where-to-get">Where Can I Get the SDK?
</a></li>
    <li><a href="#checkout-sdk_support-customization">Support and Customization
</a></li>
	</ul>
</div>

The Checkout JS SDK is a wrapper for the BigCommerce Storefront Checkout API.

It allows a developer to create a custom checkout experience to move a customer through the checkout process.
The SDK handles all the ‘heavy-lifting’ such as customer login, getting shipping quotes and submitting payment for an order.
With the Checkout JS SDK, you can build a [custom checkout presentation](https://github.com/bigcommerce/checkout-sdk-js-example) layer in popular frontend frameworks such as React.



<a href='#checkout-sdk_what-can-i-do' aria-hidden='true' class='block-anchor'  id='checkout-sdk_what-can-i-do'><i aria-hidden='true' class='linkify icon'></i></a>

## What Can I Do with the SDK?

-   It can initialize payment and shipping providers that require client-side setup through a common interface. Below are some examples of these providers:
    
    -   PayPal Express
    -   Braintree
    -   Stripe 
    -   Square
    -   Amazon
    -   Klarna
  
-   It provides a JavaScript interface for interacting with the web API.
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
 
The Checkout JS SDK allows you to present the checkout process to the shopper in any way you like, and, through frontend technologies and external web services, augment the checkout with extra information. 

However, the Checkout JS SDK does not allow you to change the underpinnings of the checkout - you must still conform to the model of the Checkout API underpinning the SDK to complete a Checkout and create an Order in BigCommerce. 
The SDK does not allow you to implement custom payment, shipping, or tax calculation providers into the checkout - instead, the configured providers for these services on a given store are expressed via our Checkout API.



<a href='#checkout-sdk_where-to-get' aria-hidden='true' class='block-anchor'  id='checkout-sdk_where-to-get'><i aria-hidden='true' class='linkify icon'></i></a>

## Where Can I Get the SDK?
The Checkout JS SDK and associated documentation is available from the [BigCommerce SDK Repo.]( https://github.com/bigcommerce/checkout-sdk-js)



<a href='#checkout-sdk_support-customization' aria-hidden='true' class='block-anchor'  id='checkout-sdk_support-customization'><i aria-hidden='true' class='linkify icon'></i></a>

## Support and Customization
- Enterprise clients can reach out to their account manager to review services and resources available.
- For more on our design policy please visit [Design Support](https://forum.bigcommerce.com/s/article/BigCommerce-Design-Policy#support).

