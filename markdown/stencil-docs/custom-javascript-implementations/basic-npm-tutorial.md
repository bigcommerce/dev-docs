<h1>Basic <code>NPM</code> Tutorial</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#basic_what-were-building">What We're Building</a></li>
    <li><a href="#basic_set-up">Set Up Your Store</a></li>
    <li><a href="#basic_install-dependencies">Install Dependencies</a></li>
    <li><a href="#basic_configure-webpack">Configure Webpack Loaders</a></li>
    <li><a href="#basic_import-dependencies">Import Dependencies</a></li>
    <li><a href="#basic_configured-loaded-method">Configure the loaded() Method</a></li>
	</ul>
</div>

## What We're Building

This example will use the [Foundation-datepicker.js](http://foundation-datepicker.peterbeno.com/#basic-example) plugin to implement a datepicker for product pages' Delivery/Event Date fields.

<!--
    title: #### Screenshot of final product

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1539276603841
-->

#### Screenshot of final product
![#### Screenshot of final product
](//s3.amazonaws.com/user-content.stoplight.io/6116/1539276603841 "#### Screenshot of final product
")

## Set Up Your Store

To test this example, you'll want your (sandbox or production) store to include at least a couple of products that have a `Delivery/Event Date` configured. (In production, you'd typically use this feature for things like seasonally themed products, temporary promotions, or event tickets.)

For product configuration steps in the BigCommerce control panel, please see this support article.

## Install Dependencies

Use the following command to install this example's required dependencies:

`npm install --save-dev css-loader moment foundation-datepicker style-loader`

The above command's options are:

* `--save-dev` saves the dependencies as `DevDependencies`; this flags them as required for development, but not at runtime. [This stack overflow thread](https://stackoverflow.com/questions/18875674/whats-the-difference-between-dependencies-devdependencies-and-peerdependencies) provides further context to this concept.

* `css-loader` and `style-loader` are webpack loaders, used together:
	* [`css-loader`](https://github.com/webpack-contrib/css-loader) resolves `@import` and `url()` expressions in CSS files.
	* [`style-loader`](https://github.com/webpack-contrib/style-loader) generically loads stylesheets by injecting a `<style>` tag.

* [`moment`](https://momentjs.com/) is a JavaScript component parses, validates, and displays dates and times.

* `foundation-datepicker` specifies the datepicker package to install.

## Configure Webpack Loaders

The `style` and `css` loaders are used to import CSS and to inject it into the DOM. To configure, add the following object to the `rules` array in the appropriate webpack.*.js file (if you're not sure, use `webpack.common.js` or `webpack.config.js`):

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle">webpack.common.js</div>
</div>

<!--
title: ""
subtitle: "webpack.common.js"
lineNumbers: true
-->

```js
{
    test: /\.css$/,
    loader: 'style-loader!css-loader',
}
```

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Cornerstone 3.4.4 Example</div>
    </div><div class="HubBlock-header-subtitle">webpack.common.js</div>
</div>

<!--
title: "Cornerstone 3.4.4 Example"
subtitle: "webpack.common.js"
lineNumbers: true
-->

```js
// ...

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
            }, {
                test:/\.css$/,
                loader: 'style-loader!css-loader'
            }
        ],
    },
  
  //...
```

## Import the Dependencies

Import these new dependencies into `<theme-name>/assets/js/theme/product.js`.

In `<theme-name>/assets/js/app.js`, notice that there is a mapping between the product page and the `product.js` script:

```
const PageClasses = {
    mapping: {
        ...
        'pages/product': product,
```

That is, when a user navigates to the product page, the `product.js` script is run. First its constructor will be run, followed by the methods `before`, `loaded`, and `after` – in that order.

## Configure the loaded() Method

We'll use the `loaded` method to initialize our datepicker widget:

```
import $ from 'jquery';
import PageManager from '../page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import { classifyForm } from './common/form-utils';
import 'foundation-datepicker/js/foundation-datepicker.min.js';
import 'foundation-datepicker/css/foundation-datepicker.min.css';
import moment from 'moment';

...

loaded(next) {
    let validator;

    // Init collapsible
    collapsibleFactory();

    this.productDetails = new ProductDetails($('.productView'), this.context);

    videoGallery();

    const $reviewForm = classifyForm('.writeReview-form');
    const review = new Review($reviewForm);

    $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
        validator = review.registerValidation();
    });

    $reviewForm.on('submit', () => {
        if (validator) {
            validator.performCheck();
            return validator.areAll('valid');
        }

        return false;
    });

    let $deliveryDateMth = $('#deliveryDateMth');
    let $deliveryDateDay = $('#deliveryDateDay');
    let $deliveryDateYr = $('#deliveryDateYr');
    let earliestDate = moment(this.context.product.event_date.date_start, "MMM Do YYYY");
    let latestDate = moment(this.context.product.event_date.date_end, "MMM Do YYYY");

    $('#deliveryDate').fdatepicker({
        leftArrow:'<<',
        rightArrow:'>>',
        onRender: function (date) {
            return moment(date).isBetween(earliestDate, latestDate, null, '[]') ? '' : 'disabled';
        }
    })
    .on('changeDate', function(event) {
        let date = event.date;
        $deliveryDateMth.val(date.getMonth() + 1);
        $deliveryDateDay.val(date.getDate());
        $deliveryDateYr.val(date.getFullYear());
    })
    .data('datepicker');

    next();
}
```

Highlighted below is the new code added to the `loaded` method:

<!--
    title: #### Code addition to loaded method in product.js

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1539275148248
-->

#### Code addition to loaded method in product.js
![#### Code addition to loaded method in product.js
](//s3.amazonaws.com/user-content.stoplight.io/6116/1539275148248 "#### Code addition to loaded method in product.js
")

Update the `<theme-name>/templates/components/products/product-view.html` template, replacing the existing `{{#if product.event_date}}` block with the following:

```
{{#if product.event_date}}
    {{inject 'product' product}}
    <div class="form-field">
        <label class="form-label form-label--alternate form-label--inlineSmall">
        {{product.event_date.name}}:
        <small>{{lang 'common.required'}}</small>
        </label>
        <input type="text" class="form-input" id="deliveryDate" name="EventDate[Date]" required>
        <input type="hidden" id="deliveryDateMth" name="EventDate[Mth]">
        <input type="hidden" id="deliveryDateDay" name="EventDate[Day]">
        <input type="hidden" id="deliveryDateYr" name="EventDate[Yr]">
    </div>
{{/if}}
```

Note that we're "injecting" the product here, so we have access to its properties. This could be done closer to the root of the tree, but it's been placed here for proximity to the code that requires it.

We also needed to add form fields for the `EventDate[Mth]`, `EventDate[Day]`, and `EventDate[Yr]` data, which we update whenever the `changeDate` event occurs. This conforms to the data format that the server expects. These fields are hidden from the user.


