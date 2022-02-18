# Checkout SDK Tutorial



This tutorial demonstrates how to implement a custom checkout built with React on the Cornerstone theme. The checkout will utilize BigCommerce's Checkout SDK. This tutorial assumes [Cornerstone 3.4.0](https://github.com/bigcommerce/cornerstone/releases/tag/3.4.0) as a starting point.

<!-- theme: danger -->
> #### Checkout example not intended for production
> The checkout example below is a good starting point; however it is **NOT intended for use in production**. Developers should test and make appropriate modifications before deploying.

### Prerequisites

Stencil CLI is required to begin this walkthrough. For installation instructions, see [Installing Stencil](/stencil-docs/getting-started/installing-stencil).

## Implementing React Checkout in Cornerstone

### Install dependencies

The React app used to demonstrate the Checkout SDK has a few additional dependencies; install them with `npm`:

<!--
title: "Install dependencies"
subtitle: ""
lineNumbers: true
-->

```shell
# move into your theme's dir
cd ~/path/to/theme/dir

# install dependencies
npm install --save react react-dom react-text-mask classnames accounting @babel/preset-react css-loader node-sass sass-loader style-loader @bigcommerce/checkout-sdk
```

### Edit webpack.common.js

The React app includes `.jsx` files which will not be resolved using the default webpack configuration in Cornerstone. Additionally, loaders must be registered for `.jsx` and `.scss` files.

In `webpack.common.js`, add the following objects to the `rules` array:


<!--
title: "Add objects to the 'rules' array"
subtitle: "webpack.common.js"
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


<!--
title: "Add property to 'resolve' object"
subtitle: "webpack.common.js"
lineNumbers: true
-->

```js
extensions: ['.js', '.jsx']
```

### Creating a checkout-loader.js file


In your text editor, create a file called checkout-loader.js.  Add content from the [Checkout SDK Quickstart](/stencil-docs/customizing-checkout/checkout-sdk-quickstart#creating-a-checkoutjs-file) to the file.

### Congratulations!

You should now be able to view your example React checkout by running the `stencil start` command in your theme directory and navigating to your storefront at http://localhost:3000/.

<a id="implement_customization"></a>



## Additional resources

* [ReactJS](https://reactjs.org/) (React)
* [Tutorial: Intro to React](https://reactjs.org/tutorial/tutorial.html) (React)
* [Concepts](https://webpack.js.org/concepts/) (Webpack)
