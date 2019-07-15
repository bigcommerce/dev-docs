<h1>Checkout SDK Example App</h1>

<div class="otp" id="no-index">
<h3> On This Page </h3>
	<ul>
    <li><a href="#implement_steps">Steps to Implement a Custom React Checkout</a></li>
    <li><a href="#implement_additional">Additional Resources</a></li>	
</ul>
</div>


<a href='#implement_tutorial-overview' aria-hidden='true' class='block-anchor'  id='implement_tutorial-overview'><i aria-hidden='true' class='linkify icon'></i></a>

This tutorial will take you through the steps to implement a custom checkout built with React to the Cornerstone Theme. The checkout will utilize BigCommerce's Checkout SDK. This tutorial assumes Cornerstone 2.4.0 as a starting point.

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

### Checkout Example NOT production ready!
> Please note that the provided checkout example is a good starting and reference point, but is **NOT production ready**. You should **not** use this custom checkout in production as it stands.

</div>
</div>
</div>

<a href='#implement_steps' aria-hidden='true' class='block-anchor'  id='implement_steps'><i aria-hidden='true' class='linkify icon'></i></a>

## Steps to Implement a Custom React Checkout in Cornerstone

### Tutorial Prerequisites

Before beginning this tutorial, you will need to have the Stencil CLI installed.

If you do not yet have Stencil CLI installed, complete the steps in [Installing Stencil](stencil-docs/getting-started/installing-and-launching/installing-stencil).

### Install Dependencies

The React app used to demonstrate the Checkout SDK has a few additional dependencies.
In your theme directory (e.g. /stencil/cornerstone), run the following command:

`npm install --save react react-dom react-text-mask classnames accounting babel-preset-react css-loader node-sass sass-loader style-loader @bigcommerce/checkout-sdk`


### Update webpack.common.js

The React app includes .jsx files which will not be resolved using the default webpack configuration in Cornerstone. Additionally, loaders must be registered for .jsx and .scss files.

**Note:** _Cornerstone 2.0 and above uses Webpack 4 which does **not** use a `webpack.conf.js` file like earlier Webpack versions. Instead, we will modify `webpack.common.js`._

#### Register .jsx and .scss loaders

In webpack.common.js, add the following objects to the `rules` array:

```
{
  test: /\.jsx$/,
  exclude: /node_modules/,
  use: {
      loader: "babel-loader",
      options: {
          presets: ['react'],
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

Next, in webpack.common.js, add the following property to the `resolve` object:


`extensions: ['.js', '.jsx']`


### Add React Checkout Components to Theme

1. Clone or download BigCommerce's [Checkout SDK JS Example](https://github.com/bigcommerce/checkout-sdk-js-example) **outside** of your theme directory

`git clone https://github.com/bigcommerce/checkout-sdk-js-example.git`

If the above command fails, and you are accessing GitHub anonymously, give the URL this alternate prefix:

`git clone git@github.com:bigcommerce/checkout-sdk-js-example.git`

2. In your theme directory, navigate to `/assets/js/` and create a `checkout-app` directory (i.e. `/assets/js/checkout-app`)

3. Copy the contents of `/checkout-sdk-js-example/src` into your new `/assets/js/checkout-app` directory 


### Import Dependencies

Edit `/assets/js/app.js` and add the following lines toward the beginning with the other import statements:

```
import React from 'react';
import ReactDOM from 'react-dom';
import Checkout from './checkout-app/Checkout/checkout';
```

### Define a Function to Initialize React

Edit `/assets/js/app.js` and add the following lines to the end:

```
window.initReact = function initReact() {
    ReactDOM.render(
        React.createElement(Checkout, null, null),
        document.getElementById('checkout-app')
    );
};
```

### Customize the Checkout Template

1. Edit `/templates/pages/checkout.html` and add the following lines between `{{{ footer.scripts }}}` and `{{/partial}}`

```
<script src="{{cdn 'assets/dist/theme-bundle.main.js'}}"></script>
 
<script type="text/javascript" defer>
    // Exported in app.js
    window.initReact();
</script>
```

2. In `/templates/pages/checkout.html`, replace `{{{ checkout.checkout_content }}}` with the following:

```<div id="checkout-app"></div>```

### Congratulations!

You should now be able to view your example React checkout by running the `stencil start` command in your theme directory and navigating to your storefront at [http://localhost:3000](http://localhost:3000).

You can make further customizations to the checkout by modifying the React components in `/assets/js/checkout-app`.

<div class="tab-block">
    {'children': [{'title': 'webpack.common.js', 'blocks': [{'type': 'code', 'data': 'LodashPlugin = require(\'lodash-webpack-plugin\'),\npath = require(\'path\'),\nwebpack = require(\'webpack\');\n\n// Common configuration, with extensions in webpack.dev.js and webpack.prod.js.\nmodule.exports = {\nbail: true,\ncontext: __dirname,\nentry: {\n  main: \'./assets/js/app.js\',\n},\nmodule: {\n  rules: [\n      {\n          test: /\\.js$/,\n          include: /(assets\\/js|assets\\\\js|stencil-utils)/,\n          use: {\n              loader: \'babel-loader\',\n              options: {\n                  plugins: [\n                      \'dynamic-import-webpack\', // Needed for dynamic imports.\n                      \'lodash\', // Automagically tree-shakes lodash.\n                      \'transform-regenerator\', // Transforms async and generator functions.\n                  ],\n                  presets: [\n                      [\'env\', {\n                          loose: true, // Enable "loose" transformations for any plugins in this preset that allow them.\n                          modules: false, // Don\'t transform modules; needed for tree-shaking.\n                          useBuiltIns: true, // Tree-shake babel-polyfill.\n                      }],\n                  ],\n              },\n          },\n      },\n      {\n          test: /jquery-migrate/,\n          use: \'imports-loader?define=>false\',\n      },\n      {\n          test: /\\.jsx$/,\n          exclude: /node_modules/,\n          use: {\n              loader: "babel-loader",\n              options: {\n                  presets: [\'react\'],\n              },\n          }\n      },\n      {\n          test: /\\.scss$/,\n          use:  [\n              \'style-loader\',\n              {\n                  loader: \'css-loader\',\n                  options: {\n                      modules: true\n                  }\n              },\n              \'sass-loader\'\n          ]\n      }\n  ],\n},\noutput: {\n  chunkFilename: \'theme-bundle.chunk.[name].js\',\n  filename: \'theme-bundle.[name].js\',\n  path: path.resolve(__dirname, \'assets/dist\'),\n},\nplugins: [\n  new CleanPlugin([\'assets/dist\'], {\n      verbose: false,\n      watch: false,\n  }),\n  new LodashPlugin, // Complements babel-plugin-lodash by shrinking its cherry-picked builds further.\n  new webpack.ProvidePlugin({\n      $: \'jquery\',\n      jQuery: \'jquery\',\n      \'window.jQuery\': \'jquery\',\n  }),\n],\nresolve: {\n  alias: {\n      \'jquery-migrate\': path.resolve(__dirname, \'node_modules/jquery-migrate/dist/jquery-migrate.min.js\'),\n      jstree: path.resolve(__dirname, \'node_modules/jstree/dist/jstree.min.js\'),\n      lazysizes: path.resolve(__dirname, \'node_modules/lazysizes/lazysizes.min.js\'),\n      pace: path.resolve(__dirname, \'node_modules/pace/pace.min.js\'),\n      \'slick-carousel\': path.resolve(__dirname, \'node_modules/slick-carousel/slick/slick.min.js\'),\n      \'svg-injector\': path.resolve(__dirname, \'node_modules/svg-injector/dist/svg-injector.min.js\'),\n      sweetalert2: path.resolve(__dirname, \'node_modules/sweetalert2/dist/sweetalert2.min.js\'),\n  },\n  extensions: [\'.js\', \'.jsx\'],\n},\n};\n', 'header': {'title': 'webpack.common.js'}, 'config': {'mode': 'js'}}]}, {'title': 'app.js', 'blocks': [{'type': 'code', 'data': "__webpack_public_path__ = window.__webpack_public_path__; // eslint-disable-line\n\nimport 'babel-polyfill';\nimport $ from 'jquery';\nimport 'jquery-migrate';\nimport Global from './theme/global';\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport Checkout from './checkout-app/Checkout/checkout';\n\nconst getAccount = () => import('./theme/account');\nconst getLogin = () => import('./theme/auth');\nconst pageClasses = {\n    account_orderstatus: getAccount,\n    account_order: getAccount,\n    account_addressbook: getAccount,\n    shippingaddressform: getAccount,\n    account_new_return: getAccount,\n    'add-wishlist': () => import('./theme/wishlist'),\n    account_recentitems: getAccount,\n    account_downloaditem: getAccount,\n    editaccount: getAccount,\n    account_inbox: getAccount,\n    account_saved_return: getAccount,\n    account_returns: getAccount,\n    login: getLogin,\n    createaccount_thanks: getLogin,\n    createaccount: getLogin,\n    getnewpassword: getLogin,\n    forgotpassword: getLogin,\n    blog: () => import('./theme/blog'),\n    blog_post: () => import('./theme/blog-post'),\n    brand: () => import('./theme/brand'),\n    brands: () => import('./theme/brands'),\n    cart: () => import('./theme/cart'),\n    category: () => import('./theme/category'),\n    compare: () => import('./theme/compare'),\n    page_contact_form: () => import('./theme/contact-us'),\n    error: () => import('./theme/errors'),\n    404: () => import('./theme/404-error'),\n    giftcertificates: () => import('./theme/gift-certificate'),\n    giftcertificates_balance: () => import('./theme/gift-certificate'),\n    giftcertificates_redeem: () => import('./theme/gift-certificate'),\n    default: () => import('./theme/home'),\n    page: () => import('./theme/page'),\n    product: () => import('./theme/product'),\n    amp_product_options: () => import('./theme/product'),\n    search: () => import('./theme/search'),\n    rss: () => import('./theme/rss'),\n    sitemap: () => import('./theme/sitemap'),\n    newsletter_subscribe: () => import('./theme/subscribe'),\n    wishlist: () => import('./theme/wishlist'),\n    wishlists: () => import('./theme/wishlist'),\n};\n\n/**\n * This function gets added to the global window and then called\n * on page load with the current template loaded and JS Context passed in\n * @param pageType String\n * @param contextJSON\n * @returns {*}\n */\nwindow.stencilBootstrap = function stencilBootstrap(pageType, contextJSON = null, loadGlobal = true) {\n    const context = JSON.parse(contextJSON || '{}');\n\n    return {\n        load() {\n            $(async () => {\n                // Load globals\n                if (loadGlobal) {\n                    Global.load(context);\n                }\n\n                // Find the appropriate page loader based on pageType\n                const pageClassImporter = pageClasses[pageType];\n                if (typeof pageClassImporter === 'function') {\n                    const PageClass = (await pageClassImporter()).default;\n                    PageClass.load(context);\n                }\n            });\n        },\n    };\n};\n\nwindow.initReact = function initReact() {\n    ReactDOM.render(\n        React.createElement(Checkout, null, null),\n        document.getElementById('checkout-app')\n    );\n};\n", 'header': {'title': 'app.js'}, 'config': {'mode': 'js'}}]}, {'title': 'checkout.html', 'blocks': [{'type': 'code', 'data': '\n{{#partial "head"}}\n \n{{{ checkout.checkout_head }}}\n{{{ stylesheet \'/assets/css/optimized-checkout.css\' }}}\n{{ getFontsCollection }}\n \n<script type="text/javascript">\n    window.language = {{{langJson \'optimized_checkout\'}}};\n</script>\n \n{{{head.scripts}}}\n \n{{/partial}}\n \n{{#partial "page"}}\n<header class="checkoutHeader optimizedCheckout-header">\n    <div class="checkoutHeader-content">\n        <h1 class="is-srOnly">{{lang \'checkout.title\'}}</h1>\n        <h2 class="checkoutHeader-heading">\n            <a class="checkoutHeader-link" href="{{urls.home}}">\n                {{#if checkout.header_image}}\n                    <img alt="{{settings.store_logo.title}}" class="checkoutHeader-logo" id="logoImage" src="{{ checkout.header_image }}"/>\n                {{ else }}\n                    <span class="header-logo-text">{{settings.store_logo.title}}</span>\n                {{/if}}\n            </a>\n        </h2>\n    </div>\n</header>\n \n<div id="checkout-app"></div>\n \n{{{ footer.scripts }}}\n<script src="{{cdn \'assets/dist/theme-bundle.main.js\'}}"></script>\n \n<script type="text/javascript" defer>\n    // Exported in app.js\n    window.initReact();\n</script>\n{{/partial}}\n \n{{> layout/empty}}', 'header': {'title': 'checkout.html'}, 'config': {'mode': 'html'}}]}]}
</div>

<a href='#implement_additional"' aria-hidden='true' class='block-anchor'  id='implement_additional"'><i aria-hidden='true' class='linkify icon'></i></a>

## Resources

### Additional Resources

* [www.reactjs.org](www.reactjs.org)
* [www.reactjs.org/tutorial/tutorial.html](www.reactjs.org/tutorial/tutorial.html) (Tutorial on the basics of React)
* [https://webpack.js.org/concepts/](https://webpack.js.org/concepts/)

