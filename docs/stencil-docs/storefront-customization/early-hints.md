---
stoplight-id: agn3uhaasqd2r
---

# Early Hints

Early Hints reduces page load time and perceived latency by allowing browsers to download critical assets earlier in the request lifecycle. When a server uses Early Hints, the server indicates which site assets (such as CSS/JS files, images, fonts) a browser needs to fully render a page. When a client makes a request to a site, the server responds with a `103 Early Hints` response that contains the important assets. The client begins to load these assets while the server compiles and returns the `200 OK` response to the client. 

For more details on Early Hints, see [An HTTP Status Code for Indicating Hints](https://httpwg.org/specs/rfc8297.html#introduction). Because Stencil's implementation of Early Hints relies on usage of the Cloudflare CDN, also read 
[Early Hints: How Cloudflare Can Improve Website Load Times by 30%](https://blog.cloudflare.com/early-hints/). 

While many of Stencil's assets are automatically optimized to use Early Hints, some assets require theme updates. The following sections detail what assets are automatically optimized and which require theme updates. 

## Automatic

### Script Manager

Developers don't need to make any theme updates to take advantage of Early Hints on Script Manager scripts. 

#### Not using Cookie Consent

If the store is not using the Cookie Consent feature, all scripts are marked for preloading. For more information, see [Using Script Manager](https://support.bigcommerce.com/s/article/Using-Script-Manager). 

#### Using Cooking Consent

If a store is using the Cookie Consent feature, only scripts marked as `Essential` are marked for preloading. `Essential` scripts load on all pages for all shoppers.

### Stylesheets & Fonts

Assets loaded through the `{{stylesheet}}` or `{{getFontsCollection}}` handlebars helpers are marked for preloading. 

- https://developer.bigcommerce.com/stencil-docs/ZG9jOjIyMDcxOA-handlebars-helpers-reference#stylesheet
- https://developer.bigcommerce.com/stencil-docs/ZG9jOjIyMDcxOA-handlebars-helpers-reference#getfontscollection


## Manual

Theme developers should not simply mark every resource for preloading; the focus should be on resources which are critically important for painting the page and loading the above-the-fold content. For example, the Cornerstone theme uses main JavaScript bundle(s) that are necessary for the theme to function. Resources that cannot be [deferred](https://web.dev/render-blocking-resources/) (which should always be the fist priority) should be preloaded.

### Theme Scripts & other resources

JavaScript files within themes, such as the main JavaScript bundle, are typically loaded using the `{{cdn}}` helper.

In order to take advantage of early hints, theme developers need to mark the highest-priority resources within their theme for preloading by adding a new argument on the [`{{cdn}}` helper](https://developer.bigcommerce.com/stencil-docs/ZG9jOjIyMDcxOA-handlebars-helpers-reference#cdn).

Here’s an example of the changes made to Cornerstone to get these improvements:

<!-- https://github.com/bigcommerce/cornerstone/pull/2261/files -->

```javascript title="before"
<script async src="{{cdn 'assets/dist/theme-bundle.head_async.js'}}"></script>
```
</br>

```javascript title="after"
<script async src="{{cdn 'assets/dist/theme-bundle.head_async.js' resourceHint='preload' as='script'}}"></script>
```

`resourceHint`
<!-- https://github.com/bigcommerce/paper-handlebars/blob/061f730ef30b0e22103518625b658b95523a8be6/helpers/lib/resourceHints.js -->

```
 * @param {string} path - The uri to the resource.
 * @param {string} rel - any of [preload, preconnect, prerender, dns-prefetch]
 * @param {string} type? - (as attr in HTML link tag) any of [style, font, script,document] If an invalid value is provided, property won't be included
 * @param {string} cors? - (crossorigin attr in HTML tag) any of [no, anonymous, use-credentials] defaults to no when no value is provided
```

`as`

## Moving to Cloudflare

As of this writing, 80% of BigCommerce storefronts are behind Cloudflare. The remaining 20% need to move to Cloudflare to get the full benefit of this change, as Cloudflare is necessary to enable early hints. Without Cloudflare in the mix, there will only be a minor performance improvement.

<!-- Merchants need to <> -->
