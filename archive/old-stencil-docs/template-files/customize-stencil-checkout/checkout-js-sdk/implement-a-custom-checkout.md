<h1>Implementing a Custom React.js Checkout to Cornerstone using the BigCommerce Checkout SDK</h1>
<div class="otp" id="no-index">
<h3> On This Page </h3>
	<ul>
    <li><a href="#implement_tutorial-overview">Tutorial Overview</a></li>
    <li><a href="#implement_steps">Implement a Custom React Checkout</a></li>
    <li><a href="#implement_customization">Additional Customization</a></li>


</ul>
</div>

<a href='#implement_tutorial-overview' aria-hidden='true' class='block-anchor'  id='implement_tutorial-overview'><i aria-hidden='true' class='linkify icon'></i></a>

## Tutorial Overview

This tutorial demonstrates how to implement a custom checkout built with React on the Cornerstone theme. The checkout will utilize BigCommerce's Checkout SDK. This tutorial assumes [Cornerstone 3.4.0](https://github.com/bigcommerce/cornerstone/releases/tag/3.4.0) as a starting point.

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

### Checkout Example not Intended for Production Use
> The checkout example below is a good starting point; however it is **NOT intended for use in production**. Developers should test and make appropriate modifications before deploying.

</div>
</div>
</div>

### Prerequisites

Stencil CLI is required to begin this walkthrough. For installation instructions, see [Installing Stencil](/stencil-docs/getting-started/installing-stencil).

<a href='#implement_steps' aria-hidden='true' class='block-anchor'  id='implement_steps'><i aria-hidden='true' class='linkify icon'></i></a>

## Implementing a Custom React Checkout in Cornerstone

### Install Dependencies

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

In `webpack.common.js`, add the following objects to the `rules` array:

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

### Add React Checkout Components to Theme

Next, clone the `checkout-sdk-js-example` repo outside of the theme directory:

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
import React from 'react';
import ReactDOM from 'react-dom';
import Checkout from './checkout-app/Checkout/checkout';
```

### Define a Function to Initialize React

In `/assets/js/app.js`, add the following lines to the end:

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
window.initReact = function initReact() {
    ReactDOM.render(
        React.createElement(Checkout, null, null),
        document.getElementById('checkout-app')
    );
};
```

### Customize the Checkout Template

In `/templates/pages/checkout.html`, add the following code between `{{{ footer.scripts }}}` and `{{/partial}}`:

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

```html
<script src="{{cdn 'assets/dist/theme-bundle.main.js'}}"></script>
 
<script type="text/javascript" defer>
    // Exported in app.js
    window.initReact();
</script>
```

Then, in `/templates/pages/checkout.html`, replace:

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

```
{{ checkout.checkout_content }}
```

with:

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

```
<div id="checkout-app"></div>
```

### Congratulations!

You should now be able to view your example React checkout by running the `stencil start` command in your theme directory and navigating to your storefront at [http://localhost:3000](http://localhost:3000).

---

<a id="implement_customization"></a>

## Customizations

You can make further customizations to the checkout by modifying the React components in `/assets/js/checkout-app`.

### `webpack.common.js`
```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
      CleanPlugin = require('clean-webpack-plugin'),
      LodashPlugin = require('lodash-webpack-plugin'),
      path = require('path'),
      webpack = require('webpack');

// Common configuration, with extensions in webpack.dev.js and webpack.prod.js.
module.exports = {
    bail: true,
    context: __dirname,
    entry: {
        main: './assets/js/app.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: /(assets\/js|assets\\js|stencil-utils)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            '@babel/plugin-syntax-dynamic-import', // add support for dynamic imports (used in app.js)
                            'lodash', // Tree-shake lodash
                        ],
                        presets: [
                            ['@babel/preset-env', {
                                loose: true, // Enable "loose" transformations for any plugins in this preset that allow them
                                modules: false, // Don't transform modules; needed for tree-shaking
                                useBuiltIns: 'usage', // Tree-shake babel-polyfill
                                targets: '> 1%, last 2 versions, Firefox ESR',
                            }],
                        ],
                    },
                },
            },
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
        ],
    },
    output: {
        chunkFilename: 'theme-bundle.chunk.[name].js',
        filename: 'theme-bundle.[name].js',
        path: path.resolve(__dirname, 'assets/dist'),
    },
    performance: {
        hints: 'warning',
        maxAssetSize: 1024 * 300,
        maxEntrypointSize: 1024 * 300,
    },
    plugins: [
        new CleanPlugin(['assets/dist'], {
            verbose: false,
            watch: false,
        }),
        new LodashPlugin, // Complements babel-plugin-lodash by shrinking its cherry-picked builds further.
        new webpack.ProvidePlugin({ // Provide jquery automatically without explicit import
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        }),
    ],
    resolve: {
        alias: {
            jquery: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js'),
            jstree: path.resolve(__dirname, 'node_modules/jstree/dist/jstree.min.js'),
            lazysizes: path.resolve(__dirname, 'node_modules/lazysizes/lazysizes.min.js'),
            nanobar: path.resolve(__dirname, 'node_modules/nanobar/nanobar.min.js'),
            'slick-carousel': path.resolve(__dirname, 'node_modules/slick-carousel/slick/slick.min.js'),
            'svg-injector': path.resolve(__dirname, 'node_modules/svg-injector/dist/svg-injector.min.js'),
            sweetalert2: path.resolve(__dirname, 'node_modules/sweetalert2/dist/sweetalert2.min.js'),
            
        },
        extensions: ['.js', '.jsx']
    },
};
```

### `app.js`

```js
__webpack_public_path__ = window.__webpack_public_path__; // eslint-disable-line

import Global from './theme/global';
import React from 'react';
import ReactDOM from 'react-dom';
import Checkout from './checkout-app/Checkout/checkout';

const getAccount = () => import('./theme/account');
const getLogin = () => import('./theme/auth');
const noop = null;

const pageClasses = {
    account_orderstatus: getAccount,
    account_order: getAccount,
    account_addressbook: getAccount,
    shippingaddressform: getAccount,
    account_new_return: getAccount,
    'add-wishlist': () => import('./theme/wishlist'),
    account_recentitems: getAccount,
    account_downloaditem: getAccount,
    editaccount: getAccount,
    account_inbox: getAccount,
    account_saved_return: getAccount,
    account_returns: getAccount,
    account_paymentmethods: getAccount,
    account_addpaymentmethod: getAccount,
    account_editpaymentmethod: getAccount,
    login: getLogin,
    createaccount_thanks: getLogin,
    createaccount: getLogin,
    getnewpassword: getLogin,
    forgotpassword: getLogin,
    blog: noop,
    blog_post: noop,
    brand: () => import('./theme/brand'),
    brands: noop,
    cart: () => import('./theme/cart'),
    category: () => import('./theme/category'),
    compare: () => import('./theme/compare'),
    page_contact_form: () => import('./theme/contact-us'),
    error: noop,
    404: noop,
    giftcertificates: () => import('./theme/gift-certificate'),
    giftcertificates_balance: () => import('./theme/gift-certificate'),
    giftcertificates_redeem: () => import('./theme/gift-certificate'),
    default: noop,
    page: noop,
    product: () => import('./theme/product'),
    amp_product_options: () => import('./theme/product'),
    search: () => import('./theme/search'),
    rss: noop,
    sitemap: noop,
    newsletter_subscribe: noop,
    wishlist: () => import('./theme/wishlist'),
    wishlists: () => import('./theme/wishlist'),
};

const customClasses = {};

/**
 * This function gets added to the global window and then called
 * on page load with the current template loaded and JS Context passed in
 * @param pageType String
 * @param contextJSON
 * @returns {*}
 */
window.stencilBootstrap = function stencilBootstrap(pageType, contextJSON = null, loadGlobal = true) {
    const context = JSON.parse(contextJSON || '{}');

    return {
        load() {
            $(() => {
                // Load globals
                if (loadGlobal) {
                    Global.load(context);
                }

                const importPromises = [];

                // Find the appropriate page loader based on pageType
                const pageClassImporter = pageClasses[pageType];
                if (typeof pageClassImporter === 'function') {
                    importPromises.push(pageClassImporter());
                }

                // See if there is a page class default for a custom template
                const customTemplateImporter = customClasses[context.template];
                if (typeof customTemplateImporter === 'function') {
                    importPromises.push(customTemplateImporter());
                }

                // Wait for imports to resolve, then call load() on them
                Promise.all(importPromises).then(imports => {
                    imports.forEach(imported => {
                        imported.default.load(context);
                    });
                });
            });
        },
    };
};

window.initReact = function initReact() {
    ReactDOM.render(
        React.createElement(Checkout, null, null),
        document.getElementById('checkout-app')
    );
};
```

### `checkout.html`
```html
{{#partial "head"}}

{{{ checkout.checkout_head }}}
{{{ stylesheet '/assets/css/optimized-checkout.css' }}}
{{ getFontsCollection }}

<script type="text/javascript">
    window.language = {{{langJson 'optimized_checkout'}}};
</script>

{{{head.scripts}}}

{{/partial}}

{{#partial "page"}}
<header class="checkoutHeader optimizedCheckout-header">
    <div class="checkoutHeader-content">
        <h1 class="is-srOnly">{{lang 'checkout.title'}}</h1>
        <h2 class="checkoutHeader-heading">
            <a class="checkoutHeader-link" href="{{urls.home}}">
                {{#if checkout.header_image}}
                    <img alt="{{settings.store_logo.title}}" class="checkoutHeader-logo" id="logoImage" src="{{ checkout.header_image }}"/>
                {{ else }}
                    <span class="header-logo-text">{{settings.store_logo.title}}</span>
                {{/if}}
            </a>
        </h2>
    </div>
</header>

<div id="checkout-app"></div>

{{{ footer.scripts }}}

<script src="{{cdn 'assets/dist/theme-bundle.main.js'}}"></script>
 
<script type="text/javascript" defer>
    // Exported in app.js
    window.initReact();
</script>
{{/partial}}

{{> layout/empty}}
```
## Additional Resources

* [www.reactjs.org](https://reactjs.org/)
* [www.reactjs.org/tutorial/tutorial.html](https://reactjs.org/tutorial/tutorial.html) (Tutorial on the basics of React)
* [https://webpack.js.org/concepts/](https://webpack.js.org/concepts/)
