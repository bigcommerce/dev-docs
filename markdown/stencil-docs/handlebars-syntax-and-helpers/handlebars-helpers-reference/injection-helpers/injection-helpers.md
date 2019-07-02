<h1>Custom Injection Helpers</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#handlebars_cdn">{{cdn}}</a></li>
    <li><a href="#handlebars_getfontscollection">{{getFontsCollection}}</a></li>
    <li><a href="#handlebars_inject-and-jscontext">{{inject}} and {{jsContext}}</a></li>
    <li><a href="#handlebars_stylesheet">{{stylesheet}}</a></li>
	</ul>
</div>

<a href='#handlebars_cdn' aria-hidden='true' class='block-anchor'  id='handlebars_cdn'><i aria-hidden='true' class='linkify icon'></i></a>

The Stencil framework provides the following custom helpers to inject various resources into a page context:

## {{cdn}}

The `cdn` helper is custom to Stencil. It is a URL transformer for content delivery networks.

When you reference static assets that you have locally staged outside your `<theme-name>` directory and uploaded using WebDAV, place the `webdav:` prefix before each corresponding `assetPath` parameter. For example, a link like:

```
<img src="{{cdn "webdav:img/image.jpg"}}">
```

...will be transformed to a result like:

```
<img src="https://cdn.bcapp/3dsf74g/content/img/image.jpg">
```

The presumed WebDAV root directory is `/content/`. (So, in this example, the `image.jpg` file has been uploaded to the WebDAV `/content/` directory.) The presumed local directory is `<theme-name>/assets/`, so you can omit that path when referencing its contained files or subdirectories.


#### CDN Custom Endpoints

You can define custom CDN endpoints to use with the `cdn` Handlebars helper. This facilitates including large, high-resolution image assets in themes, without exceeding BigCommerce's [50 MB limit](/stencil-docs/prepare-and-upload-a-theme/bundling-and-uploading) when bundling the theme for upload to BigCommerce. 

You could use a local version of the image in development, and a version on a CDN (for exampe, Imgix) in production. To do so, define custom CDN endpoints in your theme's [`config.json` file](/stencil-docs/stencil-theme-editor/config-json-metadata), as highlighted in this example:

```
{
  "name": "Cornerstone",
  "version": "1.3.5",
  "settings": {
    "homepage_new_products_count": 12,
    "homepage_featured_products_count": 8,
    "cdn": {
      "customcdn": "https://bigcommerce.customcdn.net"
          }
     }
}

 
```

After defining an endpoint, you can use the short name in the same way as you would use a `webdav:` abbreviation:

```
<img src="{{cdn "customcdn:img/image.jpg"}}" />
```

In local development, that helper would return:

<pre>&lt;img src="<b>/assets/cdn/</b>customcdn/img/image.jpg" /&gt;
</pre>

Whereas in production, it would return:

```
<img src="https://bigcommerce.customcdn.net/img/image.jpg" />
```

As highlighted above, the helper is configured to rewrite *local* URLs to a `<theme-name>/assets/cdn/` subfolder. The `stencil bundle` command will exclude this local `assets/cdn/` subfolder from the bundle that it creates. This filtering circumvents the 50 MB size limit on the resulting .zip file.




<a href='#handlebars_getfontscollection' aria-hidden='true' class='block-anchor'  id='handlebars_getfontscollection'><i aria-hidden='true' class='linkify icon'></i></a>

### {{getFontsCollection}}

The `getFontsCollection` helper is custom to Stencil. It returns a link tag that loads all selected font collections. You can optionally supply a parameter to control the `font-display` mode from this list:
- `swap`
- `auto`
- `block`
- `fallback`
- `optional`

The default mode is `swap`.

You can read more about font-display [on the Mozilla Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display).



<a href='#handlebars_inject-and-jscontext' aria-hidden='true' class='block-anchor'  id='handlebars_inject-and-jscontext'><i aria-hidden='true' class='linkify icon'></i></a>

### {{inject}} and {{jsContext}}

Occasionally, your theme's client-side application code might need to incorporate dynamic data from the template context. Stencil provides two custom Handlebars helpers to help you achieve this: `inject`  and `jsContext`.

#### About the {{inject}} Helper

The `inject` helper collects data definitions for injection into the `jsContext` variable. It composes a JSON object containing a subset of the template context to be sent to the browser. Parameters of the `inject` helper are:

- `key`: a string.
- `value`: multiple types supported. 

An `inject` call takes this form:

```
{{inject "stringBasedKey" contextValue}}
```

#### About the {{jsContext}} Helper

The `jsContext` helper takes no parameters; it simply returns a JSON object containing all data collected by the `inject` helper. To retrieve the parsable JSON object, just call `{{jsContext}}` after all of the `{{inject}}` calls.


#### {{inject}} + {{jsContext}} Example 1

To set up the product name in your client-side app, you can do the following, if you are in the context of a product:

```
{{inject "myProductName" product.title}}

<script>
// Note the lack of quotes around the jsContext handlebars helper, it becomes a string automatically.
var jsContext = JSON.parse({{jsContext}}); 

// jsContext would output "{\"myProductName\": \"Sample Product\"}" which can feed directly into 
your JavaScript.

console.log(jsContext.myProductName); // Will output: Sample Product
</script>
```

##### Notes on Example 1

You can compose your JSON object across multiple pages to create a different set of client-side data, depending on the currently loaded template context.

The Stencil theme makes the `jsContext` available on the active page scoped. It also makes it available on the global `PageManager` objects, as `this.context`.

#### {{inject}} Example 2

The following code uses `inject` to add all product IDs into JavaScript on category pages. It resides in a theme's `<theme-name>/templates/pages/category.html` template. Note the two `inject` calls directly under the front matter:

```
---
category:
    shop_by_price: true
    products:
        limit: {{theme_settings.categorypage_products_per_page}}
---
{{inject "categoryProductsPerPage" theme_settings.categorypage_products_per_page}}
{{inject "productIds" (pluck category.products 'id')}}
{{#partial "head"}}
    {{#if pagination.category.previous}}
        <link rel="prev" href="{{pagination.category.previous}}">
    {{/if}}
    {{#if pagination.category.next}}
        <link rel="next" href="{{pagination.category.next}}">
    {{/if}}
{{/partial}}

{{#partial "page"}}

{{> components/common/breadcrumbs breadcrumbs=breadcrumbs}}
{{#if category.image}}
    <img src="{{getImage category.image 'zoom_size'}}">
{{/if}}
<h1 class="page-heading">{{category.name}}</h1>
{{{category.description}}}
{{{snippet 'categories'}}}
<div class="page">
    <aside class="page-sidebar" id="faceted-search-container">
        {{> components/category/sidebar}}
    </aside>

    <main class="page-content" id="product-listing-container">
        {{#if category.products}}
            {{> components/category/product-listing}}
        {{else}}
            <p>{{lang 'categories.no_products'}}</p>
        {{/if}}
    </main>
</div>

{{/partial}}
{{> layout/base}}
```



<a href='#handlebars_stylesheet' aria-hidden='true' class='block-anchor'  id='handlebars_stylesheet'><i aria-hidden='true' class='linkify icon'></i></a>

## {{stylesheet}}

The `stylesheet` helper is custom to Stencil. It renders a link tag to insert a stylesheet into your theme. (This is required if you want Theme Editor to rewrite the stylesheet file when a merchant customizes their theme.) This helper returns an HTML string.

#### Parameters

- path: String containing the path to the theme's CSS stylesheet file.
- Other parameters are optional, appended in the form: `key="value"`.

#### Example

```
{{{stylesheet "assets/css/style.css" class="myStylesheet"}}}
```

