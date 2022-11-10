---
stoplight-id: agn3uhaasqd2r
---

# Early Hints

Early Hints reduces page load time and perceived latency by allowing browsers to download critical assets earlier in the request lifecycle. When a server uses Early Hints, the server indicates which site assets (such as CSS files, JS scripts, and fonts) a browser needs to render a page fully. When a client requests a site, the server responds with a `103 Early Hints` response containing the essential assets. The client begins to load these assets while the server compiles and returns the `200 OK` response to the client. 

For more details on Early Hints, see [An HTTP Status Code for Indicating Hints](https://httpwg.org/specs/rfc8297.html#introduction). Because Stencil's implementation of Early Hints relies on using the Cloudflare CDN, also read 
[Early Hints: How Cloudflare Can Improve Website Load Times by 30%](https://blog.cloudflare.com/early-hints/). 

While many of Stencil's assets are automatically optimized to use Early Hints, some assets require theme updates. The following sections detail what assets are automatically optimized and which require theme updates. 

## Theme assets that are automatically optimized

### Script Manager scripts

Developers don't need to make any theme updates to take advantage of Early Hints on Script Manager scripts that are required to render a page. 

If the store is not using the Cookie Consent feature, BigCommerce marks all scripts for preloading. 

If a store uses the Cookie Consent feature, BigCommerce only marks scripts marked as `Essential` for preloading. `Essential` scripts load on all pages for all shoppers.

### Stylesheets & Fonts

Assets loaded through the `{{stylesheet}}` or `{{getFontsCollection}}` Handlebars helpers are automatically marked for preloading.

## Theme assets that require manual updates

### Theme scripts loaded using the cdn Handlebars helper

JavaScript files within themes, such as the primary JavaScript bundle, are typically loaded using the [`{{cdn}}` helper](https://developer.bigcommerce.com/stencil-docs/ZG9jOjIyMDcxOA-handlebars-helpers-reference#cdn).

To take advantage of Early Hints, theme developers must mark the highest-priority resources within their theme for preloading by adding the `resourceHint`, `rel`, and `cors` arguments to the `{{cdn}}` helper. For detailed information, see {{cdn}} on the [Handlebars helpers reference](https://developer.bigcommerce.com/stencil-docs/ZG9jOjIyMDcxOA-handlebars-helpers-reference#cdn).

The following is an example of using the Early Hints arguments on the `{{cdn}}` helper:

<!-- https://github.com/bigcommerce/cornerstone/pull/2261/files -->

```javascript title="Before"
<script async src="{{cdn 'assets/dist/theme-bundle.head_async.js'}}"></script>
```
</br>

```javascript title="After"
<script async src="{{cdn 'assets/dist/theme-bundle.head_async.js' resourceHint='preload' as='script'}}"></script>
```

#### How to choose which scripts to preload

Developers should only mark a script for preloading if that script is responsible for painting the page and loading the above-the-fold content. Non-critical scripts should be [deferred](https://web.dev/render-blocking-resources/) instead of preloaded. 