<h1>Customizing Javascript</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#customizing-javascript_customizing">Modifying a Page's Javascript</a></li>
    	<li><a href="#customizing-javascript_bringing-handlebars">Bringing In Handlebars Context</a></li>
		<li><a href="#customizing-javascript_installing-various">Installing Libraries</a></li>
    <li><a href="#customizing-javascript_installing-various">Example Links</a></li>
	</ul>
</div>

Most [Cornerstone theme](https://github.com/bigcommerce/cornerstone) page template files located in <span class="fp">templates/pages/</span>  have a corresponding `.js` file in <span class="fp">assets/js/theme/</span>.  These JavaScript files contain event handlers and logic  for managing page specific elements and actions. 

For example, <span class="fp">assets/js/theme/product.js</span> corresponds to <span class="fp">templates/pages/product.html</span> and contains a `productReviewHandler()` and `bulkPricingHandler()` – these functions are implemented within a  derived `Product` class which extends an abstract class called `PageManager` (this same pattern is repeated in all <span class="fp">assets/js/theme/*.js</span> files). 

By default, all derived `PageManager` classes contain an `onReady` method functionally similar to `JQuery.ready()`. Additionally, certain pages have unique event handlers. For example the `cartUpdate` handler in <span class="fp">assets/js/cart.js</span> runs each time certain cart elements are changed. Developers can customize and enhance page behavior and functionality by editing code within these event handlers (or by creating their own event handlers). 

To demonstrate, this article describes how to add some very simple JavaScript to `product.js`.

---

<a href='#customizing-javascript_customizing' aria-hidden='true' class='block-anchor'  id='customizing-javascript_customizing'><i aria-hidden='true' class='linkify icon'></i></a>

## Modifying a Page's Javascript
In this example, we will add some "hello world" text to the product page's onReady event. We'll first add a call to the function; then, we will implement the function itself. 

In <span class="fp">assets/js/theme/product.js</span> file, add a call to `this.helloWorld()` to the bottom of the `onReady()` method (implemented in next step): 

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Hello World Statement</div>
    </div><div class="HubBlock-header-subtitle">assets/js/theme/product.js</div>
</div>

<!--
title: "Hello World Statement"
subtitle: "assets/js/theme/product.js"
lineNumbers: true
-->

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

Next, implement the `helloWorld()` function by adding it to the `Product` class, just after the closing `onReady()` bracket:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Hello World Statement</div>
    </div><div class="HubBlock-header-subtitle">assets/js/theme/product.js</div>
</div>

<!--
title: "Hello World Statement"
subtitle: "assets/js/theme/product.js"
lineNumbers: true
-->

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
  
    // Example Code
    helloWorld() {
        console.log("[assets/js/theme/product.js]: Hello World!");
    }
    // ...
}
```

In your browser, refresh any product-details pop-up or page to see your new `"Hello World"` message (If you are using the Stencil CLI and browsing to localhost, you may need to restart it for changes the most recent changes to be reflected). 

---

<a href='#customizing-javascript_bringing-handlebars' aria-hidden='true' class='block-anchor'  id='customizing-javascript_bringing-handlebars'><i aria-hidden='true' class='linkify icon'></i></a>

## Bringing in Handlebars Context

You can inject any variables from the Handlebars context into your client-side JavaScript by using the `{{inect...}}` expression like so: 

```
{{inject 'productThumbSize' theme_settings.productthumb_size}}
```

To inject `theme_settings.productthumb_size` into the product page's context, add `{{inject 'productThumbSize' theme_settings.productthumb_size}}` just under `{{#partial "page"}}` in <span class="fp">templates/pages/product.html<span>:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Context Injection</div>
    </div><div class="HubBlock-header-subtitle">templates/pages/product.html</div>
</div>

<!--
title: "Context Injection"
subtitle: "templates/pages/product.html"
lineNumbers: true
-->

```html
---
product:
    videos:
        limit: {{theme_settings.productpage_videos_count}}
    reviews:
        limit: {{theme_settings.productpage_reviews_count}}
    related_products:
        limit: {{theme_settings.productpage_related_products_count}}
    similar_by_views:
        limit: {{theme_settings.productpage_similar_by_views_count}}
---
{{#partial "page"}}

    <!-- Context Injection Example: -->
    {{inject 'productThumbSize' theme_settings.productthumb_size}}
    <!-- End Context Injection Example -->
      
    <!-- ... -->
      
{{/partial}}
{{> layout/base}}
```

The injected `productThumbSize` property can then be accessed from `product.js` by calling `this.context.productThumbSize`:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">PageManager class</div>
    </div><div class="HubBlock-header-subtitle">templates/pages/product.html</div>
</div>

<!--
title: "PageManager class"
subtitle: "templates/pages/product.html"
lineNumbers: true
-->

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

Note that the `console.log(this.context.themeImageSizes);` statement will report the configured image size, following the `"Hello World"` message previously defined in the [Customizing JavaScript for Individual Pages](#customizing-javascript_customizing) above:

```
[/assets/js/theme/product.js]: Hello World!
product.js:63 [/assets/js/theme/product.js]: 100x100
```

---

<a href='#customizing-javascript_installing-various' aria-hidden='true' class='block-anchor'  id='customizing-javascript_installing-various'><i aria-hidden='true' class='linkify icon'></i></a>

## Installing Libraries

Once you have installed the default Stencil theme, you can add custom JavaScript libraries. To see how this works, find your favorite library on GitHub – for example: https://github.com/jquery/jquery.

To install this particular library for Stencil themes, you would entering the following on the command line:

`npm install jquery`

Next, you would open <span class="fp">assets/js/theme/product.js<span>, and insert the statements excerpted below:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle">assets/js/theme/product.js</div>
</div>

<!--
title: ""
subtitle: "assets/js/theme/product.js"
lineNumbers: true
-->

```js
import $ from 'jquery';

$('.myElement').click(() => {
    alert("You clicked myElement");
});
```

As always, for specifics, refer to your chosen library’s documentation.

