# Theme Objects

 

Stencil template objects expose dynamic page data. Not all objects are available on every page; which objects are present depends on page type. Below are instructions on viewing a page’s context while developing locally and how to access that context’s data via Handlebars expressions and JavaScript. For a complete template object reference, see [Models](/stencil-docs/reference-docs/global-objects-and-properties/models).

## Viewing a page's context

To get the template context in plaintext JSON for a page served locally by Stencil CLI, add `debug=context` to the URL query string. To get the template context JSON output to a rendered page, use `debug=bar`. Example:

* `http://localhost:3000/?debug=context`
* `http://localhost:3000/?debug=bar`

Here’s a JavaScript bookmark that uses the fetch API to dump the context to the console:

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

```handlebars
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

## Client-side injection

To use dynamic data from the template in client-side code, use the inject helper:

```handlebars
<!-- templates/pages/category.html -->

{{inject "categoryId" category.id}}
```

```js
// onReady() in assets/js/theme/category.js
console.log(this.context.categoryId);
```

## Resources
* [Template Object Reference](/theme-objects)
