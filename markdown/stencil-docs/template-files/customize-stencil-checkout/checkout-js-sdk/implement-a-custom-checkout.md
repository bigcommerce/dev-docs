<h1>Implementing a Custom React.js Checkout to Cornerstone using the BigCommerce Checkout SDK</h1>

<div class="otp" id="no-index">
<h3> On This Page </h3>
	<ul>
    <li><a href="#implement_tutorial-overview">Tutorial Overview</a></li>
    <li><a href="#implement_steps">Steps to Implement a Custom React Checkout</a></li>
    <li><a href="#implement_additional">Additional Resources</a></li>	
</ul>
</div>

<a href='#implement_tutorial-overview' aria-hidden='true' class='block-anchor'  id='implement_tutorial-overview'></a>

## Tutorial Overview

This tutorial demonstrates how to implement a custom checkout built with React on the Cornerstone theme. The checkout will utilize BigCommerce's Checkout SDK. This tutorial assumes [Cornerstone 3.4.0](https://github.com/bigcommerce/cornerstone/releases/tag/3.4.0) as a starting point.

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

### Checkout Example not Intended for Production Use
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>

### Prerequisites

Stencil CLI is required to begin this walkthrough. For installation instructions, see [Installing Stencil](/stencil-docs/getting-started/installing-stencil).

<a href='#implement_steps' aria-hidden='true' class='block-anchor'  id='implement_steps'></a>

## Implementing a Custom React Checkout in Cornerstone

### Install Dependencies

The React app used to demonstrate the Checkout SDK has a few additional dependencies; install them with `npm`:

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

In `webpack.common.js`, add the following objects to the `rules` array:

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```js
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
title: ""
subtitle: ""
lineNumbers: true
-->

```js
extensions: ['.js', '.jsx']
```

### Add React Checkout Components to Theme

Next, clone the `checkout-sdk-js-example` repo outside of the theme directory:

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```shell
# make sure you're in your theme's dir
cd ~/path/to/theme/dir

# clone the SDK example outside the theme's dir
git clone git@github.com:bigcommerce/checkout-sdk-js-example.git ../checkout-sdk-example 

# add directory to hold example code
mkdir assets/js/checkout-app

# copy example source code to directory you just created
cp ../checkout-sdk-example/src/* assets/js/checkout-app/
```

### Import Dependencies

In `/assets/js/app.js`, add the following lines blow the existing `import` statements:

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Checkout from './checkout-app/Checkout/checkout';
```

### Define a Function to Initialize React

In `/assets/js/app.js`, add the following lines to the end:

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```js
window.initReact = function initReact() {
    ReactDOM.render(
        React.createElement(Checkout, null, null),
        document.getElementById('checkout-app')
    );
};
```

### Customize the Checkout Template

In `/templates/pages/checkout.html`, add the following code between `{{{ footer.scripts }}}` and `{{/partial}}`:

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```html
<script src="{{cdn 'assets/dist/theme-bundle.main.js'}}"></script>
 
<script type="text/javascript" defer>
    // Exported in app.js
    window.initReact();
</script>
```

Then, in `/templates/pages/checkout.html`, replace:

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```
{{ checkout.checkout_content }}
```

with:

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```
<div id="checkout-app"></div>
```

### Congratulations!

You should now be able to view your example React checkout by running the `stencil start` command in your theme directory and navigating to your storefront at [http://localhost:3000](http://localhost:3000).

You can make further customizations to the checkout by modifying the React components in `/assets/js/checkout-app`.

<div class="tab-block">
    {'children': [{'title': 'webpack.common.js', 'blocks': [{'type': 'code', 'data': 'const BundleAnalyzerPlugin = require(\'webpack-bundle-analyzer\').BundleAnalyzerPlugin,\n      CleanPlugin = require(\'clean-webpack-plugin\'),\n      LodashPlugin = require(\'lodash-webpack-plugin\'),\n      path = require(\'path\'),\n      webpack = require(\'webpack\');\n\n// Common configuration, with extensions in webpack.dev.js and webpack.prod.js.\nmodule.exports = {\n    bail: true,\n    context: __dirname,\n    entry: {\n        main: \'./assets/js/app.js\',\n    },\n    module: {\n        rules: [\n            {\n                test: /\\.js$/,\n                include: /(assets\\/js|assets\\\\js|stencil-utils)/,\n                use: {\n                    loader: \'babel-loader\',\n                    options: {\n                        plugins: [\n                            \'@babel/plugin-syntax-dynamic-import\', // add support for dynamic imports (used in app.js)\n                            \'lodash\', // Tree-shake lodash\n                        ],\n                        presets: [\n                            [\'@babel/preset-env\', {\n                                loose: true, // Enable "loose" transformations for any plugins in this preset that allow them\n                                modules: false, // Don\'t transform modules; needed for tree-shaking\n                                useBuiltIns: \'usage\', // Tree-shake babel-polyfill\n                                targets: \'> 1%, last 2 versions, Firefox ESR\',\n                            }],\n                        ],\n                    },\n                },\n            },\n            {\n                test: /\\.jsx$/,\n                exclude: /node_modules/,\n                use: {\n                    loader: "babel-loader",\n                    options: {\n                        presets: [\'@babel/preset-react\'],\n                    },\n                }\n              },\n              \n              {\n                test: /\\.scss$/,\n                use:  [\n                    \'style-loader\',\n                    {\n                        loader: \'css-loader\',\n                        options: {\n                            modules: true\n                        }\n                    },\n                    \'sass-loader\'\n                ],\n              },\n        ],\n    },\n    output: {\n        chunkFilename: \'theme-bundle.chunk.[name].js\',\n        filename: \'theme-bundle.[name].js\',\n        path: path.resolve(__dirname, \'assets/dist\'),\n    },\n    performance: {\n        hints: \'warning\',\n        maxAssetSize: 1024 * 300,\n        maxEntrypointSize: 1024 * 300,\n    },\n    plugins: [\n        new CleanPlugin([\'assets/dist\'], {\n            verbose: false,\n            watch: false,\n        }),\n        new LodashPlugin, // Complements babel-plugin-lodash by shrinking its cherry-picked builds further.\n        new webpack.ProvidePlugin({ // Provide jquery automatically without explicit import\n            $: \'jquery\',\n            jQuery: \'jquery\',\n            \'window.jQuery\': \'jquery\',\n        }),\n        new BundleAnalyzerPlugin({\n            analyzerMode: \'static\',\n            openAnalyzer: false,\n        }),\n    ],\n    resolve: {\n        alias: {\n            jquery: path.resolve(__dirname, \'node_modules/jquery/dist/jquery.min.js\'),\n            jstree: path.resolve(__dirname, \'node_modules/jstree/dist/jstree.min.js\'),\n            lazysizes: path.resolve(__dirname, \'node_modules/lazysizes/lazysizes.min.js\'),\n            nanobar: path.resolve(__dirname, \'node_modules/nanobar/nanobar.min.js\'),\n            \'slick-carousel\': path.resolve(__dirname, \'node_modules/slick-carousel/slick/slick.min.js\'),\n            \'svg-injector\': path.resolve(__dirname, \'node_modules/svg-injector/dist/svg-injector.min.js\'),\n            sweetalert2: path.resolve(__dirname, \'node_modules/sweetalert2/dist/sweetalert2.min.js\'),\n            \n        },\n        extensions: [\'.js\', \'.jsx\']\n    },\n};', 'header': {'title': 'webpack.common.js'}, 'config': {'mode': 'js'}}]}, {'title': 'app.js', 'blocks': [{'type': 'code', 'data': "__webpack_public_path__ = window.__webpack_public_path__; // eslint-disable-line\n\nimport Global from './theme/global';\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport Checkout from './checkout-app/Checkout/checkout';\n\nconst getAccount = () => import('./theme/account');\nconst getLogin = () => import('./theme/auth');\nconst noop = null;\n\nconst pageClasses = {\n    account_orderstatus: getAccount,\n    account_order: getAccount,\n    account_addressbook: getAccount,\n    shippingaddressform: getAccount,\n    account_new_return: getAccount,\n    'add-wishlist': () => import('./theme/wishlist'),\n    account_recentitems: getAccount,\n    account_downloaditem: getAccount,\n    editaccount: getAccount,\n    account_inbox: getAccount,\n    account_saved_return: getAccount,\n    account_returns: getAccount,\n    account_paymentmethods: getAccount,\n    account_addpaymentmethod: getAccount,\n    account_editpaymentmethod: getAccount,\n    login: getLogin,\n    createaccount_thanks: getLogin,\n    createaccount: getLogin,\n    getnewpassword: getLogin,\n    forgotpassword: getLogin,\n    blog: noop,\n    blog_post: noop,\n    brand: () => import('./theme/brand'),\n    brands: noop,\n    cart: () => import('./theme/cart'),\n    category: () => import('./theme/category'),\n    compare: () => import('./theme/compare'),\n    page_contact_form: () => import('./theme/contact-us'),\n    error: noop,\n    404: noop,\n    giftcertificates: () => import('./theme/gift-certificate'),\n    giftcertificates_balance: () => import('./theme/gift-certificate'),\n    giftcertificates_redeem: () => import('./theme/gift-certificate'),\n    default: noop,\n    page: noop,\n    product: () => import('./theme/product'),\n    amp_product_options: () => import('./theme/product'),\n    search: () => import('./theme/search'),\n    rss: noop,\n    sitemap: noop,\n    newsletter_subscribe: noop,\n    wishlist: () => import('./theme/wishlist'),\n    wishlists: () => import('./theme/wishlist'),\n};\n\nconst customClasses = {};\n\n/**\n * This function gets added to the global window and then called\n * on page load with the current template loaded and JS Context passed in\n * @param pageType String\n * @param contextJSON\n * @returns {*}\n */\nwindow.stencilBootstrap = function stencilBootstrap(pageType, contextJSON = null, loadGlobal = true) {\n    const context = JSON.parse(contextJSON || '{}');\n\n    return {\n        load() {\n            $(() => {\n                // Load globals\n                if (loadGlobal) {\n                    Global.load(context);\n                }\n\n                const importPromises = [];\n\n                // Find the appropriate page loader based on pageType\n                const pageClassImporter = pageClasses[pageType];\n                if (typeof pageClassImporter === 'function') {\n                    importPromises.push(pageClassImporter());\n                }\n\n                // See if there is a page class default for a custom template\n                const customTemplateImporter = customClasses[context.template];\n                if (typeof customTemplateImporter === 'function') {\n                    importPromises.push(customTemplateImporter());\n                }\n\n                // Wait for imports to resolve, then call load() on them\n                Promise.all(importPromises).then(imports => {\n                    imports.forEach(imported => {\n                        imported.default.load(context);\n                    });\n                });\n            });\n        },\n    };\n};\n\nwindow.initReact = function initReact() {\n    ReactDOM.render(\n        React.createElement(Checkout, null, null),\n        document.getElementById('checkout-app')\n    );\n};", 'header': {'title': 'app.js'}, 'config': {'mode': 'js'}}]}, {'title': 'checkout.html', 'blocks': [{'type': 'code', 'data': '{{#partial "head"}}\n\n{{{ checkout.checkout_head }}}\n{{{ stylesheet \'/assets/css/optimized-checkout.css\' }}}\n{{ getFontsCollection }}\n\n<script type="text/javascript">\n    window.language = {{{langJson \'optimized_checkout\'}}};\n</script>\n\n{{{head.scripts}}}\n\n{{/partial}}\n\n{{#partial "page"}}\n<header class="checkoutHeader optimizedCheckout-header">\n    <div class="checkoutHeader-content">\n        <h1 class="is-srOnly">{{lang \'checkout.title\'}}</h1>\n        <h2 class="checkoutHeader-heading">\n            <a class="checkoutHeader-link" href="{{urls.home}}">\n                {{#if checkout.header_image}}\n                    <img alt="{{settings.store_logo.title}}" class="checkoutHeader-logo" id="logoImage" src="{{ checkout.header_image }}"/>\n                {{ else }}\n                    <span class="header-logo-text">{{settings.store_logo.title}}</span>\n                {{/if}}\n            </a>\n        </h2>\n    </div>\n</header>\n\n<div id="checkout-app"></div>\n\n{{{ footer.scripts }}}\n\n<script src="{{cdn \'assets/dist/theme-bundle.main.js\'}}"></script>\n \n<script type="text/javascript" defer>\n    // Exported in app.js\n    window.initReact();\n</script>\n{{/partial}}\n\n{{> layout/empty}}', 'header': {'title': 'checkout.html'}, 'config': {'mode': 'html'}}]}]}
</div>

<a href='#implement_additional"' aria-hidden='true' class='block-anchor'  id='implement_additional"'></a>

## Additional Resources

* [www.reactjs.org](https://reactjs.org/)
* [www.reactjs.org/tutorial/tutorial.html](https://reactjs.org/tutorial/tutorial.html) (Tutorial on the basics of React)
* [https://webpack.js.org/concepts/](https://webpack.js.org/concepts/)

