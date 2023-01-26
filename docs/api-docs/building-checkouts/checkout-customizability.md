# Checkout Customizability

 

BigCommerce provides significant levels of checkout customizability. If you just want to modify the theme by overriding the style of BigCommerce’s Optimized One-Page Checkout, please see [Restyle Optimized One-Page Checkout](/stencil-docs/customizing-checkout/optimized-one-page-checkout). However, if you want to build a custom checkout, there are two paths that a developer can choose to use.
		
The first path is to render the checkout on the BigCommerce storefront. With the storefront suite of APIs and SDKs, BigCommerce as a platform maintains responsibility for managing shopper sessions using cookies and all our standard mechanisms. 
		
The second path is to render the checkout experience outside of the BigCommerce storefront. The Server to Server APIs are for consumption by other servers on the internet, which in turn are responsible for session management, whether that's a website running on a CMS or a native mobile app.

![Checkout options](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/checkout_options.png "Checkout options")

Once a developer has chosen a path, they can choose the options they want to use to build the custom checkout. The table below provides an overview of the different options available to help developers select the one that best suits their needs.

## Checkout options

| | What is it? | When should I use it? | Where do I find it? |
|-|-|-|-|
|**Open Checkout**| Open checkout is the open-source option of BigCommerce's Optimized One-Page Checkout.<br/><br/> A browser-based application that converts a cart to an order, allowing shoppers to complete checkout.<br/><br/>  Our reference implementation of checkout built on top of the Checkout JS SDK. | This option allows developers to create a custom checkout from a fully functional foundation (as a starting point for their efforts or even contribute to it).<br/> <br/>Add features or make moderate-sized changes to BigCommerce’s checkout (hosted on the BigCommerce storefront). | [Open Checkout Quick Start](/stencil-docs/customizing-checkout/open-checkout-quick-start)
|**Checkout JS SDK**| A client-side vanilla JavaScript library that is a wrapper for the Storefront Checkout API.<br/><br/> The SDK handles all the API calls necessary to move shoppers through the checkout experience. From customer login, fetching shipping quotes, and payment methods through to paying an order.| This option allows developers to build a custom checkout from scratch by creating a presentation layer for checkout. Completely replacing the UI/UX without having to do the heavy lifting of dealing with Storefront API endpoints.<br/><br/> Significant front-end customizations and/or feature additions to checkout (hosted on the BigCommerce storefront).<br/><br/> **Limitations:** <ul><li> SDK does not let you introduce new behavior. While you can filter based on shipping methods, you cannot create new shipping methods or payment methods. </li> <li> Hosted forms do not work with Stencil localhost since forms are served over https and Stencil only supports http. Developers must test the order confirmation flow on Stencil using offline payment methods.</li></ul> | [Checkout SDK](/stencil-docs/customizing-checkout/checkout-sdk) |
| **Storefront Checkout API** | REST APIs to create and update a checkout and convert it to an order. <br/><br/>  | This option allows developers to build a custom checkout experience (within the context of a BigCommerce storefront session) by accessing raw API request/response data.<br/><br/> These are the APIs you would typically access from your browser using JavaScript to retrieve checkout data not available through the SDK. | [Storefront Checkout API](/api-reference/store-management/checkouts)<br/><br/> [Storefront Cart and Checkout](/api-docs/storefront/overview)|
| **Server to server Checkout API** | REST APIs to create and update a checkout and convert it to an order. | This option allows developers to build a custom checkout (outside of a BigCommerce storefront session) and use the [Payments API](/api-reference/store-management/payment-processing) to pay for an order.<br/><br/> When used with the [Server to Server Cart API](/api-reference/store-management/carts) it allows you to make modifications similar to those performed using the control panel option **Orders > Add**. These modifications include the ability to create custom products, modify prices, add custom discounts, set custom prices for shipping, etc.<br/><br/> These are the APIs that will power your headless checkout solutions on channels such as: <ul><li> Content management systems</li> <li> Native mobile apps (non-web view)</li> <li> Internet of Things (IoT) devices</li> <li> Recurring order and/or subscription apps (e.g. OrderGroove)</li></ul> <br/> **Note:** Currently, this API currently does not support using store credit or gift certificates as payment methods. | [Server to Server Checkout API](/api-reference/storefront/checkouts) |

## Resources

### Related articles
- [Open Checkout Quick Start](/stencil-docs/customizing-checkout/open-checkout-quick-start)
- [Installing a Custom Checkout](/stencil-docs/customizing-checkout/installing-custom-checkouts)
- [Installing Custom Checkouts in the Control Panel](https://support.bigcommerce.com/s/blog-article/aAn4O000000CdFGSA0/installing-custom-checkouts-in-the-control-panel)
- [BigCommerce Checkout is Now Open Source (Developer Blog)](https://medium.com/bigcommerce-developer-blog/bigcommerce-checkout-is-now-open-source-39e823bc5b3b)
