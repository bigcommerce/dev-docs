# Customizing Javascript

<div class="otp" id="no-index">

### On this page
- [Modifying a page's Javascript](#modifying-a-pages-javascript)
- [Bringing in handlebars context](#bringing-in-handlebars-context)
- [Installing libraries](#installing-libraries)

</div>

Most [Cornerstone theme](https://github.com/bigcommerce/cornerstone) page template files located in `templates/pages/` have a corresponding `.js` file in `assets/js/theme/`. These JavaScript files contain event handlers and logic for managing page specific elements and actions.

For example, `assets/js/theme/product.js` corresponds to `templates/pages/product.html` and contains a `productReviewHandler()` and `bulkPricingHandler()`; these functions are implemented within a derived `Product` class which extends an abstract class called `PageManager` (this same pattern is repeated in all `assets/js/theme/*.js` files).

By default, all derived `PageManager` classes contain an `onReady` method functionally similar to `JQuery.ready()`. Additionally, certain pages have unique event handlers. For example the `cartUpdate` handler in `assets/js/cart.js` runs each time certain cart elements are changed. Developers can customize and enhance page behavior and functionality by editing code within these event handlers (or by creating their own event handlers).

To demonstrate, this article describes how to add some very simple JavaScript to `product.js`.

## Modifying a page's Javascript

In this example, we will add some "hello world" text to the product page's `onReady` event. We'll first add a call to the function; then, we will implement the function itself.

In `assets/js/theme/product.js` file, add a call to `this.helloWorld()` to the bottom of the `onReady()` method (implemented in next step).

```js
export default class Product extends PageManager {
    constructor(context) {
        super(context);
        this.url = window.location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
        this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    }

    onReady() {
      // ...
      // Example Code
      this.helloWorld();
    }
    // ...
}
```

Next, implement the `helloWorld()` function by adding it to the `Product` class just after the closing `onReady()` bracket.

```javascript
export default class Product extends PageManager {
    constructor(context) {
        super(context);
        this.url = window.location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
        this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    }

    onReady() {
      // ...

      // Example Code
      this.helloWorld();
    }

    // Example Code
    helloWorld() {
        console.log("[assets/js/theme/product.js]: Hello World!");
    }
    // ...
}
```

In your browser, refresh any product-details pop-up or page to see your new `"Hello World"` message. If you are using the Stencil CLI and browsing to localhost, you may need to restart for the most recent changes to be reflected.

## Bringing in handlebars context

You can inject any variables from the Handlebars context into your client-side JavaScript by using the `{{inject...}}` expression.

```html
{{inject 'productThumbSize' theme_settings.productthumb_size}}
```

To inject `theme_settings.productthumb_size` into the product page's context, add `{{inject 'productThumbSize' theme_settings.productthumb_size}}` just under `{{#partial "page"}}` in `templates/pages/product.html<`:

```html
product:
    videos:
        limit: {{theme_settings.productpage_videos_count}}
    reviews:
        limit: {{theme_settings.productpage_reviews_count}}
    related_products:
        limit: {{theme_settings.productpage_related_products_count}}
    similar_by_views:
        limit: {{theme_settings.productpage_similar_by_views_count}}

{{#partial "page"}}
    <!-- Context Injection Example: -->
    {{inject 'productThumbSize' theme_settings.productthumb_size}}
    <!-- End Context Injection Example -->
    <!-- ... -->
{{/partial}}
{{> layout/base}}
```

The injected `productThumbSize` property can then be accessed from `product.js` by calling `this.context.productThumbSize`.

```js
export default class Product extends PageManager {
    constructor(context) {
        super(context);
        this.url = window.location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
        this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    }

    onReady() {
      //...
        // Example Code
        this.helloWorld();
    }

    // Example Code
    helloWorld() {
      console.log("[assets/js/theme/product.js]: Hello World!");
      console.log("[assets/js/theme/product.js]: " + this.context.productThumbSize);
    }
    // ...
}
```

Note that the `console.log(this.context.themeImageSizes);` statement will report the configured image size, following the `"Hello World"` message previously defined in the [Customizing JavaScript for Individual Pages](#customizing-javascript_customizing) above.

```
[/assets/js/theme/product.js]: Hello World!
product.js:63 [/assets/js/theme/product.js]: 100x100
```

## Installing libraries

Once you have installed the default Stencil theme, you can add custom JavaScript libraries with `npm`.

```shell
npm install jquery
```

Next, you would open `assets/js/theme/product.js`, and insert the statements excerpted below:

```js
import $ from 'jquery';

$('.myElement').click(() => {
    alert("You clicked myElement");
});
```

For additional installation instructions, refer to your chosen library's documentation.
