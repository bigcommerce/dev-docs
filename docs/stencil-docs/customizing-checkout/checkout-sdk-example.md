# Checkout SDK Tutorial

<div class="otp" id="no-index">

### On this page
- [Implementing React Checkout in Cornerstone](#implementing-react-checkout-in-cornerstone)
- [Additional customizations](#additional-customizations)
- [Additional resources](#additional-resources)

</div>

This tutorial demonstrates how to implement a custom checkout built with React on the Cornerstone theme. The checkout will utilize BigCommerce's Checkout SDK. This tutorial assumes [Cornerstone 3.4.0](https://github.com/bigcommerce/cornerstone/releases/tag/3.4.0) as a starting point.

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">

<!-- theme: error -->

### Checkout example not intended for production
> The checkout example below is a good starting point; however it is **NOT intended for use in production**. Developers should test and make appropriate modifications before deploying.

</div>
</div>
</div>

### Prerequisites

Stencil CLI is required to begin this walkthrough. For installation instructions, see [Installing Stencil](/stencil-docs/getting-started/installing-stencil).

## Implementing React Checkout in Cornerstone

### Install dependencies

The React app used to demonstrate the Checkout SDK has a few additional dependencies; install them with `npm`:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```shell
# move into your theme's dir
cd ~/path/to/theme/dir

# install depencies
npm install --save react react-dom react-text-mask classnames accounting @babel/preset-react css-loader node-sass sass-loader style-loader @bigcommerce/checkout-sdk
```

### Edit `webpack.common.js`

The React app includes `.jsx` files which will not be resolved using the default webpack configuration in Cornerstone. Additionally, loaders must be registered for `.jsx` and `.scss` files.

In `webpack.common.js`, add the following objects to the `rules` arraypr:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```javascript
{
  test: /\.jsx$/,
  exclude: /node_modules/,
  use: {
      loader: "babel-loader",
      options: {
          presets: ['@babel/preset-react'],
      },
  }
},
{
  test: /\.scss$/,
  use:  [
      'style-loader',
      {
          loader: 'css-loader',
          options: {
              modules: true
          }
      },
      'sass-loader'
  ],
},
```

Next, in `webpack.common.js`, add the following property to the `resolve` object:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```js
extensions: ['.js', '.jsx']
```

### Creating a checkout-loader.js file


In your text editor, create a file called checkout-loader.js.  Add content from the [Checkout SDK Quickstart](https://developer.bigcommerce.com/stencil-docs/customizing-checkout/checkout-sdk-quickstart#creating-a-checkoutjs-file) to the file.

### Congratulations!

You should now be able to view your example React checkout by running the `stencil start` command in your theme directory and navigating to your storefront at http://localhost:3000/.

<a id="implement_customization"></a>



## Additional resources

* [ReactJS](https://reactjs.org/) (React)
* [Tutorial: Intro to React](https://reactjs.org/tutorial/tutorial.html) (React)
* [Concepts](https://webpack.js.org/concepts/) (Webpack)
