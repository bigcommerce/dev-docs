# Installing a Custom Checkout

<div class="otp" id="no-index">

### On this page

- [Obtaining the JavaScript loader file](#obtaining-the-javascript-loader-file)
- [Hosting a custom checkout](#hosting-a-custom-checkout)
- [Installing a custom checkout](#installing-a-custom-checkout)
- [Additional resources](#additional-resources)

</div>

You can create unique shopping experiences that fit with the look and feel of a store's brand using custom checkouts. This article will outline how to package a custom checkout file, and then install a custom checkout via the control panel.

This article will address using both [Open Source Checkout](https://github.com/bigcommerce/checkout-js) and [Checkout SDK](https://github.com/bigcommerce/checkout-sdk-js) powered checkouts.

## Obtaining the JavaScript loader file
Custom checkouts must have a single JS loader file. The first step to using a custom checkout is generating this file. The loader file must be responsible for the following:

* Loading all the required assets, including CSS files
* Running the app

### Packaging custom checkouts with Open Source Checkout

If using Open Source Checkout, you can generate the loader file by following these steps:

1. Navigate to the folder where Open Source Checkout is located using the terminal, and run `npm ci` to download dependancies
2. Run `npm run build` to generate a `/dist/` folder with all the files

### Properties available on checkout page
When a store is using custom checkout, some properties will be attached to the window object (`window.checkoutConfig`) on the checkout page. These properties are:

* `containerId`: ID of the HTML component where the checkout app should be loaded.
* `orderId`: if present, it means we should render an order confirmation page for the given order Id
* `checkoutId`: if present, the ID of the active checkout. You cant have both orderId and checkoutId

To use the data exposed in the window object, include relevant code in your loader file. Here is an example of this code :

```js
ReactDOM.render(
  <Checkout checkoutId={ window.checkoutConfig.checkoutId } />,
  document.getElementById(window.checkoutConfig.containerId)
);
```

## Hosting a custom checkout

You will need to host the custom checkout file online so it can be served by the store. You can use a hosting service such as [Amazon S3](https://aws.amazon.com/s3/). Using an external host will allow you the freedom to automate the build process if you wish and push updates automatically from your local machine.

### Using WebDav to host a custom checkout

You can upload a custom checkout to your store's server using WebDav, but we recommend hosting checkouts externally. See [Uploading and Linking to a File in Your Store](https://support.bigcommerce.com/s/article/How-do-I-add-and-link-to-a-file-in-my-store) for instructions to do this.

## Installing a custom checkout  

To install a custom checkout on a store, follow these steps:

1. Navigate to **Advanced Settings > Checkout Settings**
2. Paste a link to your custom checkout in the **Script URL** field and **Save**
3. Navigate to your live storefront to view your new custom checkout

## Additional resources
- [Checkout SDK](https://developer.bigcommerce.com/stencil-docs/customizing-checkout/checkout-sdk)
- [File Access (WebDav)](https://support.bigcommerce.com/s/article/File-Access-WebDAV)
