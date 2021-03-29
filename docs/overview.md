Stencil template objects expose dynamic page data. Not all objects are available on every page; which objects are present depends on page type. Below are instructions on viewing a page's context while developing locally and how to access that context's data via Handlebars expressions and JavaScript. For a complete template object reference, see [Models](https://developer.bigcommerce.com/stencil-docs/reference-docs/global-objects-and-properties/models).

<div class="otp" id="no-index">

### On this Page
- [Viewing a Page's Context](#viewing-a-pages-context)
- [Using Handlebars](#using-handlebars)
- [Using PageManager JavaScript](#using-pagemanager-javascript)
- [Client-Side Injection](#client-side-injection)
- [Resources](#resources)

</div>

## Viewing a Page's Context

To get the template context in plaintext JSON for a page served locally by Stencil CLI, add `debug=context` to the URL query string. To get the template context JSON ouput to a rendered page, use `debug=bar`. Example:
* `http://localhost:3000/?debug=context`
* `http://localhost:3000/?debug=bar`

Here's a javascript bookmarklet that uses the fetch API to dump the context to the console:

```js
javascript:void%20function(){fetch(window.location.pathname+%22%3Fdebug=context%22).then(function(n){n.json().then(function(n){console.log(n)})})}();
```

Source:

```js
fetch(window.location.pathname + "?debug=context")
.then(function(response) {
    response.json().then(function(data){
        console.log(data);
    })
});
```

## Using Handlebars

The templating language used by Stencil themes is Handlebars; use it in templates to access dynamic page data:

```html
{{#if page.sub_pages}}
<nav class="navBar navBar--sub">
    <ul class="navBar-section account-navigation">
    {{#each page.sub_pages}}
        <li class="navBar-item"><a class="navBar-action" href="{{url}}">{{title}}</a></li>
    {{/each}}
    </ul>
</nav>
{{/if}}
```

## Using PageManager JavaScript

JavaScript files in `assets/js/theme/` that extend the `PageManager` class have a `context` property for accessing the page context:

```js
// assets/js/theme/global.js

export default class Global extends PageManager {
    onReady() {
        cartPreview(this.context.secureBaseUrl, this.context.cartId);
        // ...
    }
    // ...
}
```

## Client-Side Injection

To use dynamic data from the template in client-side code, use the inject helper:

```html
<!-- templates/pages/category.html -->

{{inject "categoryId" category.id}}

<!-- ... -->

    var jsContext = JSON.parse({{jsContext}});
```

**client code:**

```js
// client-side code
console.log(jsContext.categoryId);
```

## Resources

* [Template Object Reference](/stencil-docs/reference-docs/global-objects-and-properties/models)