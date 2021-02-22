# Handlebars Helpers Reference

<div class="otp" id="no-index">

### On this page
- [Custom helpers](#custom-helpers)
- [Standard helpers](#standard-helpers)
- [Contributing to helpers](#contributing-to-helpers)
- [Resources](#resources)

</div>

This article is a reference for [Stencil](https://developer.bigcommerce.com/stencil-docs/getting-started/about-stencil) supported [Handlebars](https://handlebarsjs.com/) helpers. It includes [custom helpers](#custom-helpers) documentation and a list of whitelisted [standard helpers](#standard-helpers).

## Custom helpers

The following table contains BigCommerce's open source [Handlebars helpers](https://github.com/bigcommerce/paper-handlebars/tree/master/helpers).

| **Helper** | **Category** | **Description** |
| --- | --- | --- |
| [limit](#limit) | array | Limits array to second argument. |
| [pluck](#pluck) | array | Uses search key to get values from collections. |
| [cdn](#cdn) | assets | A URL transformer for content delivery networks. |
| [money](#money) | currency | Formats number length, thousands delimiter, and decimal delimiter. |
| [getFontLoaderConfig](#getfontloaderconfig) | fonts | Returns font-loader config as a JSON string. |
| [getFontsCollection](#getfontscollection) | fonts | Returns `<link>` elements for configured fonts. |
| [encodeHtmlEntities](#encodehtmlentities) | html | Encodes HTML entities. |
| [nl2br](#nl2br) | html | Converts newline characters to `<br>` tags. |
| [pre](#pre) | html | Renders preformatted text. |
| [resourceHints](#resourcehints) | html | Pre-fetches Google fonts. |
| [stylesheet](#stylesheet) | html | Renders a `<link>` tag for inserting a stylesheet. |
| [lang](#lang) | i18n | Maps keys to translation files. |
| [langJson](#langjson) | i18n | Returns language translation keys as a JSON string. |
| [getContentImage](#getcontentimage) | images | Returns sized image URL from store's `/content` directory. |
| [getContentImageSrcset](#getcontentimagesrcset) | images | Returns source set of URLs for images in `/content`. |
| [getImage](#getimage) | images | Returns image URL for specified size. |
| [getImageManagerImage](#getimagemanagerimage) | images | Returns sized image URL for images in `/product_images/uploaded_images`. |
| [getImageManagerImageSrcset](#getimagemanagerimagesrcset) | images | Returns image srcset for images in `/product_images/uploaded_images`. |
| [getImageSrcset](#getimagesrcset) | images | Returns single image URL or list of URLs for different sizes. |
| [any](#any) | logic | Renders block if **any** params are true. |
| [all](#all) | logic | Renders block if **all** params are true. |
| [compare](#compare) | logic | Compares values with JavaScript operators, including `typeof`. |
| [contains](#contains) | logic | Renders block if first param is in second param. |
| [for](#for) | logic | Iterates for range `a` to `b`. |
| [if](#if) | logic | Renders block if statement is true. |
| [or](#or) | logic | Renders block if one or more parameters evaluate to true. |
| [unless](#unless) | logic | Renders block if a statement evaluates to false. |
| [concat](#concat) | string | Concatenates two strings. |
| [join](#join) | string | Joins an array of string elements into one string. |
| [json](#json) | string | Converts a JavaScript object into a JSON string. |
| [occurrences](#occurrences) | string | Returns the number of occurrences of substring within the given string. |
| [replace](#replace) | string | Replaces all instances of the first parameter in the second parameter. |
| [setURLQueryParam](#seturlqueryparam) | string | Appends keys values to a URL. |
| [stripQuerystring](#stripquerystring) | string | Removes a query string. |
| [toLowerCase](#tolowercase) | string | Converts a string to lowercase. |
| [truncate](#truncate) | string | Truncates a string. |
| [block](#block) | template | Defines a content block. |
| [dynamicComponent](#dynamiccomponent) | template | Inserts a dynamic partial in the specified path. |
| [inject](#inject) | template | Injects key values into `{{jsContext}}`. |
| [jsContext](#jscontext) | template | Returns JSON for all data injected by `{{inject}}`. |
| [partial](#partial) | template | Overrides content defined by `{{block}}`. |
| [region](#region) | template | Specifies a widget region. |
| [assignVar](#assignvar) | variables | Saves value to a variable. |
| [getVar](#getvar) | variables| Returns a variable value. |
| [decrementVar](#decrementvar) | variables | Decrements a variable by 1. |
| [incrementVar](#incrementvar) | variables | Increments a variable by 1. |

### {{limit}}

```handlebars
{{limit data limit}}
```

Limits the number of items returned from an array; returns a new array.

#### Parameters

- `data` {Array}: Collection.
- `limit` {Number}: Index specifying the number of items to exclude.

#### Example

Assume that `{{cart.items}}` returns 10 items. You can use this helper to limit that behavior to only the first four items.

```handlebars
<!-- context = {var: 'This is longer than the chosen limit'} -->
{{limit var 10}}
<!-- => This is lo -->
```

```handlebars
<!-- context = {var: 'This is longer than the chosen limit'} -->
{{limit var 10}}
<!-- results in: 'This is lo' -->
```

```html
{{#each (limit cart.items 4)}}
    <li class="previewCartItem">
        <div class="previewCartItem-image">
            {{#if type '==' 'GiftCertificate'}}
                <img src="{{cdn ../../theme_settings.default_image_gift_certificate}}" alt="GiftCertificate" title="GiftCertificate">
            {{else}}
                {{> components/common/responsive-img
                    image=image
                    fallback_size=../../theme_settings.productthumb_size
                    lazyload=../../theme_settings.lazyload_mode
                    default_image=../../theme_settings.default_image_product
                }}
            {{/if}}
  ...
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/limit.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=limit)

### {{pluck}}

```handlebars
{{pluck limit collection path}}
```

Retrieves corresponding values from some or all elements in a collection using specified search key(s). Returns retrieved values in a comma-separated string.

#### Parameters

- `limit`, `limit-value`: Optional parameters to limit the number of results returned.
- `collection` {Object|Array}: Collection.
- `path` {String}: The string to search for.

#### Examples

```html
{{pluck ([limit] <collection> [<limit-value>]) '<path>'}}
```

If each category in `categories` contains an image object, use dot notation to access the image's children:

```json
categories: [
    { "id": 1, "name": "Bakeware", "image": { "data": "http://...", "alt": "Bakeware image"} },
    { "id": 2, "name": "Cookware", "image": { "data": "http://...", "alt": "Cookware image"} },
    { "id": 3, "name": "Cutlery", "image": { "data": "http://...", "alt": "Cutlery image"} }
]
```
```handlebars
{{pluck (limit categories 2) 'image.data'}}
<!-- Returns a comma-separated list of image URLs. -->
```

```json
users: [
    { "user": "barney", "age": 36, "image": { "url": "barney.jpg" } },
    { "user": "fred",   "age": 40, "image": { "url": "fred.jpg" } }
]
```

```handlebars
{{pluck users "age"}}
<!-- => 36,40 -->

{{pluck users "image.url"}}'
<!-- => barney.jpg,fred.jpg -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/pluck.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=pluck)

### {{cdn}}

```handlebars
{{cdn assetPath}}
```

A URL transformer for content delivery networks.

#### Parameters

- `assetPath` {String}: Path to the file containing static assets.

#### Example

```handlebars
{{cdn "assets/img/image.jpg"}}
<!-- => https://cdn.bcapp/3dsf74g/stencil/123/img/image.jpg -->
```

To reference static assets staged locally outside your `<theme-name>` directory and uploaded using WebDAV, place the `webdav:` prefix before each corresponding `assetPath` parameter. For example, the following link:

```html
<img src="{{cdn 'webdav:img/image.jpg'}}">
```

will be transformed to a result like this:

```html
<img src="https://cdn.bcapp/3dsf74g/content/img/image.jpg">
```

In this example, the `image.jpg` file was uploaded to the WebDAV `/content/` directory making `/content` the WebDAV root directory. Because our presumed local directory is `assets/`, we can omit that path when referencing its contained files or subdirectories.

#### CDN custom endpoints

You can define custom CDN endpoints to use with the `{{cdn}}` helper. This way you can include large, high-resolution image assets in themes without exceeding BigCommerce's [50 MB limit](/stencil-docs/prepare-and-upload-a-theme/bundling-and-uploading#bundling_bundling-your-theme) when bundling the theme for upload to BigCommerce.

You could use a local version of the image in development and a version on a CDN such as Imgix in production. To do so, define custom CDN endpoints in your theme's [`config.json` file](https://github.com/bigcommerce/cornerstone/blob/master/config.json). 

For example:

```json
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

After defining the endpoint, you can use the short name in the same way as you would use a `webdav:` protocol:

```html
<img src="{{cdn 'customcdn:img/image.jpg'}}" />
```

In local development, that helper would return:

```html
<img src="/assets/cdn/customcdn/img/image.jpg"/>
```

Whereas in production, it would return:

```html
<img src="https://bigcommerce.customcdn.net/img/image.jpg" />
```

As highlighted above, the helper is configured to rewrite *local* URLs to an `assets/cdn/` subfolder. The `stencil bundle` command will exclude this local `assets/cdn/` subfolder from the bundle that it creates. This filtering circumvents the 50 MB size limit on the resulting ZIP file.

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/cdn.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=cdn)

### {{money}}

```handlebars
{{money value n s c}}
```

Formats number length, thousands delimiter, and decimal delimiter.

#### Parameters

- `value` {Number}: The number to format.
- `n` {Integer}: Length of decimal.
- `s` {Mixed}: Thousands delimiter.
- `c` {Mixed}: Decimal delimiter.

#### Example

```handlebars
{{money 1000 2 ',' '.'}}
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/money.js)

### {{getFontLoaderConfig}}

```handlebars
{{getFontLoaderConfig fontConfig}}
```

Returns font-loader config as a JSON string.

#### Parameters

- `fontConfig` {String}: Font config in the `Google_FontName_Weight` format.

#### Example

```handlebars
{{getFontLoaderConfig 'Google_Karla_700'}}
<!-- => Karla:700 -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getFontLoaderConfig.js)

### {{getFontsCollection}}

```handlebars
{{getFontsCollection}}
```

Returns `<link>` elements for configured fonts.

#### Example

```handlebars
{{getFontsCollection}}
<!-- => <link href="https://fonts.googleapis.com/css?family=Open+Sans:,400italic,700|Karla:700|Lora:400|Volkron:|Droid:400,700|Crimson+Text:400,700&display=swap" rel="stylesheet"> -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getFontsCollection.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=getFontsCollection)

### {{encodeHtmlEntities}}

```handlebars
{{encodeHtmlEntities string args}}
```

Returns a string with HTML entities encoded. You may optionally pass additional encoding arguments.

#### Parameters

- `string` {String}: String to encode with HTML entities.
- `args` {Boolean}: Whitelist of allowed named arguments. Allowed arguments: `useNamedReferences`, `decimal`, `encodeEverything`, `allowUnsafeSymbols`. Specify `arg='true'` to use. For example, `decimal='true'`.

#### Examples

```handlebars
{{encodeHtmlEntities 'foo © bar ≠ baz 𝌆 qux'}}
<!-- => foo &#xA9; bar &#x2260; baz &#x1D306; qux -->

{{encodeHtmlEntities 'an ampersand: &'}}
<!-- => an ampersand: &#x26; -->

{{encodeHtmlEntities "foo © bar ≠ baz 𝌆 qux" useNamedReferences="true"}}
<!-- Returns a string with HTML entities encoded with named references. -->
<!-- => foo &copy; bar &ne; baz &#x1D306; qux -->

{{encodeHtmlEntities "foo © bar ≠ baz 𝌆 qux" decimal="true"}}
<!-- Returns a string with HTML entities encoded with decimal option. -->
<!-- => foo &#169; bar &#8800; baz &#119558; qux -->

{{encodeHtmlEntities "foo © bar ≠ baz 𝌆 qux" encodeEverything="true"}}
<!-- Returns a string with HTML entities encoded with encodeEverything option. -->
<!-- => &#x66;&#x6F;&#x6F;&#x20;&#xA9;&#x20;&#x62;&#x61;&#x72;&#x20;&#x2260;&#x20;&#x62;&#x61;&#x7A;&#x20;&#x1D306;&#x20;&#x71;&#x75;&#x78; -->

{{encodeHtmlEntities "foo © and & ampersand" allowUnsafeSymbols="true"}}
<!-- Returns a string with HTML entities encoded with allowUnsafeSymbols option. -->
<!-- => foo &#xA9; and & ampersand -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/encodeHtmlEntities.js)

#### Examples

```handlebars
{{nl2br text}}
```

Converts newline characters to `<br>` tags.

#### Parameters

- `text` {String}: Text to convert.

#### Example

```handlebars
{{nl2br settings.address}}
<!-- => <br>685 Market St<br>San Francisco<br>94105<br>CA<br> -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/nl2br.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=nl2br)

### {{pre}}

```handlebars
{{pre value}}
```

Renders preformatted text. This helper will escape text.

#### Parameters

- `value` {String}: Text to format.

#### Example

```handlebars
<!-- context = {var: {}} -->
{{pre var}}
<!-- => <pre>{}</pre> -->

<!-- context = {var: "<div>&\"500\"</div>"} -->
{{pre var}}
<!-- => <pre>&quot;&lt;div&gt;&amp;\\&quot;500\\&quot;&lt;/div&gt;&quot;</pre> -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/pre.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=pre)

### {{pre}}

```handlebars
{{resourceHints}}
```

Pre-fetches Google fonts. Outputs a formatted `<link>` tag for DNS-prefetch.

#### Example

```handlebars
{{resourceHints}}
<!-- => <link rel="dns-prefetch preconnect" href="https://fonts.googleapis.com" crossorigin><link rel="dns-prefetch preconnect" href="https://fonts.gstatic.com" crossorigin> -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/resourceHints.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=resourceHints)

### {{stylesheet}}

```handlebars
{{stylesheet assetPath}}
``` 

Renders a link tag to insert a stylesheet into a theme; returns an HTML string. (This is required if you want Theme Editor to rewrite the stylesheet file when a merchant customizes their theme.)

#### Parameters

- `assetPath` (String}): Filepath to the theme's CSS stylesheet file.
- `options`: You can append optional parameters as key/value pairs.

#### Example

```handlebars
{{stylesheet "assets/css/style.css" class="myStylesheet"}}
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/stylesheet.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=stylesheet)

### {{lang}}

```handlebars
{{lang translationKey}}
```

Maps keys to translation files based on the locale indicated by the visitor’s browser. 

#### Parameters

- `translationKey`{String}
- `options`: You can append optional parameters as key/value pairs.

#### Examples

```html
<label class="form-label" for="search_query_adv">
  {{lang 'forms.search.query' }}
  <small>{{lang 'common.required' }}</small>
</label>
```

```handlebars
<!-- context = {name: 'BigCommerce'} -->
{{lang 'powered_by' name=name}}
<!-- => Powered By BigCommerce -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/lang.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=lang)

### {{langJson}}

```handlebars
{{langJson keyFilter}}
```

Returns language translation keys as a JSON string.

#### Parameters

- `keyFilter` {String}: The language translation keys to render for the storefront locale/language.

#### Example

```handlebars
{{langJson 'validation_messages'}}
<!-- This will load validation messages in JSON format for the storefront locale/language. -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/langJson.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=langJson)

### {{getContentImage}}

```handlebars
{{getContentImage path width height}}
```

Returns a URL for an image uploaded to `/dav/content/`. To learn more about uploading files to your store's server, see [WebDAV](https://support.bigcommerce.com/s/article/File-Access-WebDAV).

#### Parameters

- `path` {String}: Image path relative to `/dav/content/`.
- `width` {Integer}: Width in pixels.
- `height` {Integer}: Height in pixels.

#### Example

```handlebars
<!-- Original image URL returned if no size or invalid size is passed in -->
{{getContentImage "asset.jpg"}}
<!-- => https://cdn.bcapp/3dsf74g/images/stencil/original/content/asset.jpg -->

{{getContentImage "asset.jpg" width="a" height="a"}}
<!-- => https://cdn.bcapp/3dsf74g/images/stencil/original/content/asset.jpg -->

<!-- Sized image URL returned if valid height and/or width passed in -->
{{getContentImage "asset.jpg" width=123 height=321}}
<!-- => https://cdn.bcapp/3dsf74g/images/stencil/123x321/content/asset.jpg -->

{{getContentImage "asset.jpg" width=123}}
<!-- => https://cdn.bcapp/3dsf74g/images/stencil/123w/content/folder/asset.jpg -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getContentImage.js)

### {{getContentImageSrcset}}

```handlebars
{{getContentImageSrcset path}}
```

Returns a `srcset` for an image uploaded to `/dav/content/`.

#### Parameters

- `path` {String}: Image path relative to `/dav/content/`.

#### Example

```handlebars
{{getContentImageSrcset "asset.jpg"}}
<!-- => https://cdn.bcapp/3dsf74g/images/stencil/80w/content/asset.jpg 80w, https://cdn.bcapp/3dsf74g/images/stencil/160w/content/asset.jpg 160w, https://cdn.bcapp/3dsf74g/images/stencil/320w/content/asset.jpg 320w, https://cdn.bcapp/3dsf74g/images/stencil/640w/content/asset.jpg 640w, https://cdn.bcapp/3dsf74g/images/stencil/960w/content/asset.jpg 960w, https://cdn.bcapp/3dsf74g/images/stencil/1280w/content/asset.jpg 1280w, https://cdn.bcapp/3dsf74g/images/stencil/1920w/content/asset.jpg 1920w, https://cdn.bcapp/3dsf74g/images/stencil/2560w/content/asset.jpg 2560w -->

{{getContentImageSrcset "folder/asset.jpg" width=123}}
<!-- => https://cdn.bcapp/3dsf74g/images/stencil/80w/content/folder/asset.jpg 80w, https://cdn.bcapp/3dsf74g/images/stencil/160w/content/folder/asset.jpg 160w, https://cdn.bcapp/3dsf74g/images/stencil/320w/content/folder/asset.jpg 320w, https://cdn.bcapp/3dsf74g/images/stencil/640w/content/folder/asset.jpg 640w, https://cdn.bcapp/3dsf74g/images/stencil/960w/content/folder/asset.jpg 960w, https://cdn.bcapp/3dsf74g/images/stencil/1280w/content/folder/asset.jpg 1280w, https://cdn.bcapp/3dsf74g/images/stencil/1920w/content/folder/asset.jpg 1920w, https://cdn.bcapp/3dsf74g/images/stencil/2560w/content/folder/asset.jpg 2560w -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getContentImageSrcset.js)

### {{getImage}}

```handlebars
{{getImage stencilImage size}}
```

Returns `<img>` tag `src` value for images of a specified size. Values for the size parameter are defined in the `settings` array in [`config.json`](https://github.com/bigcommerce/cornerstone/blob/master/config.json).

#### Parameters

- `stencilImage` {String}: A Stencil image.
- `size` {String}: A key in the `theme_settings` object.
- `defaultImage` {String}: Optional default image URL to use if the `stencilImage` is undefined.

#### Example

```handlebars
{{getImage image "logo"}}
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getImage.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=getImage)

### {{getImageManagerImage}}

```handlebars
{{getImageManagerImage path width height}}
```

Returns an [Image Manager](https://support.bigcommerce.com/s/article/Using-the-Image-Manager) image URL for an image uploaded to `/dav/product_images/uploaded_images`. To learn more about uploading files to your store's server, see [WebDAV](https://support.bigcommerce.com/s/article/File-Access-WebDAV).

#### Parameters

- `path` {String}: Image path relative to `/dav/product_images/uploaded_images`.
- `width` {Integer}: Width in pixels.
- `height` {Integer}: Height in pixels.

#### Example

```handlebars
<!-- Original image URL returned if no size or invalid size is passed in -->
{{getImageManagerImage "asset.jpg"}}
<!-- => https://cdn.bcapp/3dsf74g/images/stencil/original/image-manager/asset.jpg -->

<!-- height must be accompanied by width -->
{{getImageManagerImage "folder/asset.jpg" height=123}}
<!-- => https://cdn.bcapp/3dsf74g/images/stencil/original/image-manager/folder/asset.jpg -->


<!-- Sized image URL returned if valid height and/or width passed in -->
{{getImageManagerImage "asset.jpg" width=123}}
<!-- => https://cdn.bcapp/3dsf74g/images/stencil/123w/image-manager/asset.jpg -->

{{getImageManagerImage "folder/asset.jpg" width=123 height=321}}
<!-- => https://cdn.bcapp/3dsf74g/images/stencil/123x321/image-manager/folder/asset.jpg -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getImageManagerImage.js)

### {{getImageManagerImageSrcset}}

```handlebars
{{getImageManagerImageSrcset path}}
```

Returns an [Image Manager](https://support.bigcommerce.com/s/article/Using-the-Image-Manager) image `srcset` for an image uploaded to `/dav/product_images/uploaded_images`.

#### Parameters

- `path` {String}: Image path relative to `/dav/product_images/uploaded_images`.

#### Example

```handlebars
{{getImageManagerImageSrcset "asset.jpg"}}
<!-- =>
https://cdn.bcapp/3dsf74g/images/stencil/80w/image-manager/asset.jpg 80w, https://cdn.bcapp/3dsf74g/images/stencil/160w/image-manager/asset.jpg 160w, https://cdn.bcapp/3dsf74g/images/stencil/320w/image-manager/asset.jpg 320w, https://cdn.bcapp/3dsf74g/images/stencil/640w/image-manager/asset.jpg 640w, https://cdn.bcapp/3dsf74g/images/stencil/960w/image-manager/asset.jpg 960w, https://cdn.bcapp/3dsf74g/images/stencil/1280w/image-manager/asset.jpg 1280w, https://cdn.bcapp/3dsf74g/images/stencil/1920w/image-manager/asset.jpg 1920w, https://cdn.bcapp/3dsf74g/images/stencil/2560w/image-manager/asset.jpg 2560w -->

{{getImageManagerImageSrcset "folder/asset.jpg" width=123}}
 <!-- =>
https://cdn.bcapp/3dsf74g/images/stencil/80w/image-manager/folder/asset.jpg 80w, https://cdn.bcapp/3dsf74g/images/stencil/160w/image-manager/folder/asset.jpg 160w, https://cdn.bcapp/3dsf74g/images/stencil/320w/image-manager/folder/asset.jpg 320w, https://cdn.bcapp/3dsf74g/images/stencil/640w/image-manager/folder/asset.jpg 640w, https://cdn.bcapp/3dsf74g/images/stencil/960w/image-manager/folder/asset.jpg 960w, https://cdn.bcapp/3dsf74g/images/stencil/1280w/image-manager/folder/asset.jpg 1280w, https://cdn.bcapp/3dsf74g/images/stencil/1920w/image-manager/folder/asset.jpg 1920w, https://cdn.bcapp/3dsf74g/images/stencil/2560w/image-manager/folder/asset.jpg 2560w -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getImageManagerImageSrcset.js).

### {{getImageSrcset}}

```handlebars
{{getImageSrcset stencilImage size}}
```

The `getImageSrcset` helper is a replacement for [`getImage`](#getImage) which allows you to generate either a single image URL (for an `<img>` `src`) or a list of image sizes for `srcset`. Using the [srcset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset) attribute, you can specify a list of image sizes for the browser to choose from based on the expected size of the image on the page, the device's pixel density, and other factors.

#### Parameters

- `stencilImage` {String}: A Stencil image.
- `size` {String}: A key in the `theme_settings` object.
- `defaultImage` {String}: Optional default image URL to use if the `stencilImage` is undefined.

You can specify what sizes you want as named arguments on the helper.

#### Example

**Default sizes**

By specifying `use_default_sizes=true` on the helper, a `srcset` string will be constructed with a set of sizes chosen by BigCommerce to be optimal for most uses.

```handlebars
{{getImageSrcset image use_default_sizes=true}}
{{getImageSrcset image "https://place-hold.it/500x300" use_default_sizes=true}}
```

Default sizes:

```html
'80w': '80w',
'160w': '160w',
'320w': '320w',
'640w': '640w',
'960w': '960w',
'1280w': '1280w',
'1920w': '1920w',
'2560w': '2560w',
```

**Single 1x size**

```handlebars
{{getImageSrcset image 1x=theme_settings.zoom_size}}
{{getImageSrcset image 1x="1280x800"}}
{{getImageSrcset image 1x="1280w"}}
```

By specifying a single size as `1x`, you can choose any image resolution. You can reference a value from the `theme_settings` object (similar to `getImage`), or you can specify your own size inline. `getImageSrcset` does not require `theme_settings` keys to be wrapped in quotes; they should be referenced directly.

**Pixel density**

```handlebars
{{getImageSrcset image 1x="1280w" 2x="2560w"}}
{{getImageSrcset image 1x="800w" 1.5x="1200w" 2x="1600w"}}
{{getImageSrcset image 1x="640x640" 2x="1280x1280"}}
```

By specifying several sizes using the pixel density descriptor, you can generate a `srcset` of different image resolutions for different pixel density screens as described in [Resolution switching: Same size, different resolutions](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Resolution_switching_Same_size_different_resolutions). For example, you can specify a `2x` image for Retina screens, and a `1x` image for normal screens.

As above, you can reference `theme_settings` keys or specify your own size inline.

**Inherent width**

```html
<img src="{{getImage image 'default'}}" srcset="{{getImageSrcset image 100w='100w' 200w='200w' 300w='300w'}}" />

<!-- =>
<img src="https://cdn11.bigcommerce.com/s-abc123/images/stencil/640x640/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2" srcset="https://cdn11.bigcommerce.com/s-abc123/images/stencil/100w/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 100w, https://cdn11.bigcommerce.com/s-abc123/images/stencil/200w/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 200w,https://cdn11.bigcommerce.com/s-abc123/images/stencil/300w/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 300w" /> -->

<img src="{{getImageSrcSet image 1x='1000x1000'}}" srcset="{{getImageSrcset image 1x='1000x1000' 2x='2000x2000'}}" />

<!-- =>
<img src="https://cdn11.bigcommerce.com/s-abc123/images/stencil/640x640/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2" srcset="https://cdn11.bigcommerce.com/s-abc123/images/stencil/100w/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 100w, https://cdn11.bigcommerce.com/s-abc123/images/stencil/200w/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 200w,https://cdn11.bigcommerce.com/s-abc123/images/stencil/300w/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 300w" /> -->
```

By specifying several sizes using the inherent width descriptor, you can generate a `srcset` of different image resolutions based on width, which can in turn be selected by the browser based on the expected size of the image when the page is painted. It is recommended to use this together with a `sizes` attribute on the `<img>` element as described in [Resolution switching: Different sizes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Resolution_switching_Different_sizes). In Cornerstone, this is handled automatically via JavaScript.

As above, you can reference `theme_settings` keys or specify your own size inline.

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getImageSrcset.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=getImageSrcset)

### {{any}}

```handlebars
{{any arg}}
```

Renders block if one or more parameters are true. 

#### Parameters

- `arg` {String|Number|Array|Object}

#### Example

```html
{{#any items selected=true}}
  <!-- block to display if any items have selected=true -->
{{/any}}
```

A usage example is [`templates/components/category/shop-by-price.html`](https://github.com/bigcommerce/cornerstone/blob/master/templates/components/category/shop-by-price.html), a category page in Stencil's Cornerstone base theme that does _not_ have faceted search turned on. Shoppers will see **Shop by price** filters instead of product filters.

In this component, the `{{any}}` helper is used to determine whether a shopper has selected one of the filters, and whether a "reset" button needs to be displayed:

```html
{{#any shop_by_price selected=true}}
    <li class="navList-item">
        <a href="{{category_url}}" class="navList-action">
            {{lang 'category.reset'}}
        </a>
    </li>
{{/any}}
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/any.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=any)

### {{all}}

```handlebars
{{all arg}}
```

Renders block if all parameters are true. 

#### Parameters

- `arg` {String|Number|Array|Object}

#### Example

```handlebars
{{#all items theme_settings.optionA theme_settings.optionB}}
   <!-- block to display if all items evaluate to true -->
{{/all}}
```

```html
{{#all product.custom_fields theme_settings.show_custom_fields_tabs}}
    <li class="tab">
        <a class="tab-title" href="#tab-{{dashcase (lowercase (sanitize theme_settings.pdp-custom-fields-tab-label))}}">{{sanitize theme_settings.pdp-custom-fields-tab-label}}</a>
    </li>
{{/all}}
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/all.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=all)

### {{compare}}

```handlebars
{{compare a operator b}}
```

Compares values with JavaScript operators. Renders block if comparison of the first and third parameters returns true.

#### Parameters

- `a` {}
- `operator` {}: The operator to use. Operators must be enclosed in quotes: ">", "=", "<=", and so on.
  * `==`
  * `===`
  * `!=`
  * `!===`
  * `<`
  * `>`
  * `<=`
  * `>=`
  * `typeof`
- `b` {}
- `options` {Object}: Options object.
- `returns` {String}: Block, or if specified the inverse block is rendered if falsy.

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/compare.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=compare)

### {{contains}}

```handlebars
{{contains collection value}}
```

Renders block if `collection` has the given `value`, using strict equality (`===`) for comparison, otherwise the inverse block is rendered (if specified). If a `startIndex` is specified and is negative, it is used as the offset from the end of the collection.

#### Parameters

- `collection` {Array|Object|String}: The collection to iterate over.
- `value` {String|Number|Array|Object}: The value to check for.

#### Example

```handlebars
<!-- array = ['a', 'b', 'c'] -->
{{#contains array "d"}}
  This will not be rendered.
{{else}}
  This will be rendered.
{{/contains}}
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/contains.js)

### {{for}}

```handlebars
{{for a b}}
```

Repeats block for a specified range from index `a` to index `b`. To protect against infinite loops, this helper is limited to 100 iterations.

#### Parameters

- `a` {Number}: Starting number.
- `b` {Number}: Ending number.

#### Example

```handlebars
{{#for 1 12}}
    {{lang (concat 'common.short_months.' $index)}}
{{/for}}
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/for.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=for)

### {{if}}

```handlebars
{{if arg}}
```

Renders `if` block when if-statement evaluates to true; otherwise renders `else` block.

#### Parameters

- `arg` {String|Number|Array|Object}

#### Example

```html
{{#if page_type '===' 'account_order'}}
    <li class="navBar-item is-active">
        <a class="navBar-action" href="{{urls.account.orders.all}}">{{lang 'account.nav.orders'}}</a>
    </li>
{{else}}
    <li class="navBar-item is-active">{{lang 'account.nav.orders'}}</li>
{{/if}}
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/if.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=if)

### {{or}}

```handlebars
{{or arg}}
```

Renders block if one or more parameters evaluates to true.

#### Parameters

- `arg` {String|Number|Array|Object}: Parameters can be of mixed types.

#### Example

```handlebars
{{#or 1 0 0 0 0 0 0}}
<!-- 1 evaluates to true, so block is rendered-->
{{/or}}
```

```html
{{#or options configurable_fields}}
    <a href="#" data-item-edit="{{id}}">{{lang 'cart.checkout.change'}}</a>
{{/or}}
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/or.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=or)

### {{unless}}

```handlebars
{{unless arg}}
```

Renders a block if a statement is false; does not support operators for comparison expressions.

#### Parameters

- `arg` {String|Number|Array|Object}

#### Example

```html
{{#each category_results}}
<li class="category-suggestion">
    {{#each this}}
        <a href="{{url}}">{{name}}</a>
        {{#unless @last}} > {{/unless}}
    {{/each}}
</li>
{{/each}}
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/unless.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=unless)

### {{concat}}

```handlebars
{{concat value otherValue}}
```

Concatenates two strings.

#### Parameters

- `value` {String}
- `otherValue` {String}

#### Example

```handlebars
{{concat 'hello' 'world'}}
<!-- => helloworld -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/concat.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=concat)

### {{join}}

```handlebars
{{join values separator}}
```

Joins an array of string elements into a single string.

#### Parameters

- `values` {Array}
- `separator` {String}
- `limit=<number>`: An optional limit.

#### Example

```handlebars
<!-- context = {
    list: ['Mario', 'Chris', 'Mick', 'Hau', 'Cody']
} -->
{{join list " "}}
<!-- => 'Mario Chris Mick Hau Cody' -->

{{join list ", "}}
<!-- => 'Mario, Chris, Mick, Hau, Cody' -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/join.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=join)

### {{json}}

```handlebars
{{json object}}
```

Converts a JavaScript object into a JSON string.

#### Parameters

- `object` {Object}: A JavaScrip object.

#### Example

```handlebars
<!-- context = {
    object: { a: 1, b: "hello" }
} -->
{{json object}}
<!-- => '{"a":1,"b":"hello"}' -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/json.js)

### {{occurrences}}

```handlebars
{{occurrences str substring}}
```

Returns the number of occurrences of substring within the given string. 

#### Parameters

- `str` {String}
- `substring` {String}

#### Example

```handlebars
{{occurrences "foo bar foo bar baz" "foo"}}
<!-- => 2 -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/occurrences.js)

### {{replace}}

```handlebars
{{replace firstParam secondParam string}}
```

Replaces all instances of the first parameter in the second parameter with the child block.

#### Parameters

- `firstParam` {?}
- `secondParam` {?}
- `string` {String}

#### Example

```html
<!-- Replace all instances of `%%Syndicate%%` in `page.content` with `{{> components/page/rss_feed}}`. -->
{{#replace '%%Syndicate%%' page.content}}
    {{> components/page/rss_feed}}
{{else}}
    <p>{{{page.content}}}</p>
{{/replace}}
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/replace.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=replace)

### {{setURLQueryParam}}

```handlebars
{{setURLQueryParam url key value}}
```

Appends key values to a URL.

#### Parameters

- `url` {String}: The URL of the query parameter.
- `key` {String}: The query parameter key.
- `value` {Number}: The query parameter value of the stated key.

#### Example

```handlebars
{{setURLQueryParam "http://example.com/image.jpg" "c" "2"}}
<!-- results in: http://example.com/image.jpg?c=2 -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/setURLQueryParam.js).

### {{stripQuerystring}}

```handlebars
{{stripQuerystring url}}
```

Strips query string from a URL.

#### Parameters

- `url` {String}: The URL containing the query parameter.

#### Example

```handlebars
{{stripQuerystring "http://example.com?tests=true"}}
<!-- results in: http://example.com -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/stripQuerystring.js)

### {{toLowerCase}}

```handlebars
{{toLowerCase string}}
```

Converts a string to lowercase.

#### Parameters

- `string` {String}: String you want to convert.

#### Example

```handlebars
{{toLowerCase 'I Love PIZZA'}}
<!-- => i love pizza -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/toLowerCase.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=toLowerCase)

### {{truncate}}

```handlebars
{{truncate string length}}
```

Truncates a string.

#### Parameters

- `string` {String}: The string you want to truncate.
- `length` {Number}: The desired length of the returned truncated string.

#### Example

```handlebars
{{truncate "This will be truncated to only the first part of the sentence." 22}}
<!-- results in: 'This will be truncated' -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/truncate.js)

### {{block}}

```handlebars
{{block string}}
```

Defines a block of content. You can overwrite it using the [partial](#partial) helper.

#### Parameters

- `string` {String}

#### Example

```handlebars
<div class="container">
    {{#block "page"}} {{/block}}
</div>
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/block.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=block)

### {{dynamicComponent}}

```handlebars
{{dynamicComponent path}}
```

Inserts a dynamic partial in the specified path.

#### Parameters

- `path` {String}: The path to insert a dynamic component in.

#### Example

```handlebars
{{#each forms.create_account.address_fields }}
    {{{dynamicComponent 'components/common/forms'}}}
{{/each}}
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/dynamicComponent.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=dynamicComponent)

### {{inject}}

```handlebars
{{inject value object}}
```

Injects key values into the [jsContext](#jscontext) helper.

#### Parameters

- `value` {String}: The value to inject.
- `object` {Object}

#### Example

```handlebars
{{inject "myProductName" product.title}}

<script>
var jsContext = JSON.parse({{jsContext}});
console.log(jsContext.myProductName);
// results in: "BigCommerce Coffee Mug"
</script>
```

```handlebars
{{inject 'productSize' theme_settings.product_size}}
<!-- Returns a JSON representation of an object of all the keys injected. -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/inject.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?q=inject)

### {{jsContext}}

```handlebars
{{jsContext}}
```

Returns a JSON representation of the data injected by the [inject](#inject) helper.

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/jsContext.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=jsContext)

### {{partial}}

```handlebars
{{partial string}}
```

Overrides content defined by the [block](#block) helper.

#### Parameters

- `string` {String}

#### Example

```html
{{#partial "head"}}
    {{#if pagination.category.previous}}
        <link rel="prev" href="{{pagination.category.previous}}">
    {{/if}}
    {{#if pagination.category.next}}
        <link rel="next" href="{{pagination.category.next}}">
    {{/if}}
{{/partial}}
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/partial.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=jsContext)

### {{region}}

```handlebars
{{region name}}
```

Specifies a [widget](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview#widgets) region.

#### Parameters

- `name` {String}: The name of the region.

#### Example

```handlebars
<!-- context = {
    banner-top: "hello world"
    } -->
{{region name="banner-top"}}
<!-- => <div data-content-region="banner-top">hello world</div> -->
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/region.js)
- [See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=region)

### {{assignVar}}

```handlebars
{{assignVar key value}}
```

Assigns a variable for later use in the template.

#### Parameters

- `key` {String}
- `value` {String|Number}

#### Example

```handlebars
{{assignVar "foo" 10}}
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/assignVar.js)

### {{getVar}}

```handlebars
{{getVar key}}
```

Returns the variable set by [assignVar](#assignVar).

#### Parameters

- `key` {String}

#### Example

```handlebars
{{getVar "foo"}}
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getVar.js)

### {{decrementVar}}

```handlebars
{{decrementVar key}}
```

Decrements the variable set by [assignVar](#assignVar) by 1.

#### Parameters

- `key` {String}

#### Example

```handlebars
{{decrementVar "foo"}}
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/decrementVar.js)

### {{incrementVar}}

```handlebars
{{incrementVar key}}
```

Increments the variable set by [assignVar](#assignVar) by 1.

#### Parameters

- `key` {String}

#### Example

```handlebars
{{incrementVar "foo"}}
```

- [See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/incrementVar.js)

## Standard helpers

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> The information presented in this section was borrowed from [helpers/handlebars-helpers](https://github.com/helpers/handlebars-helpers).

</div>
</div>
</div>

The following table contains whitelisted standard Handlebars helpers available to all Stencil themes. Each helper is linked to its GitHub documentation including parameters and examples.

| **Helper** | **Category** | **Description** |
| --- | --- | --- |
| [after](https://github.com/helpers/handlebars-helpers#after) | array | Returns all of the items in an array after the specified index. |
| [arrayify](https://github.com/helpers/handlebars-helpers#arrayify) | array | Casts the given value to an array. |
| [before](https://github.com/helpers/handlebars-helpers#before) | array | Returns all of the items in the collection before the specified count. |
| [eachIndex](https://github.com/helpers/handlebars-helpers#eachIndex) | array |  |
| [filter](https://github.com/helpers/handlebars-helpers#filter) | array | Block helper that filters the given array and renders the block for values that evaluate to `true`, otherwise the inverse block is returned. |
| [first](https://github.com/helpers/handlebars-helpers#first) | array | Returns the first item or first `n` items of an array. |
| [forEach](https://github.com/helpers/handlebars-helpers#forEach) | array | Iterates over each item in an array and exposes the current item in the array as context to the inner block. |
| [inArray](https://github.com/helpers/handlebars-helpers#inArray) | array | Block helper that renders the block if an array has the given `value`. |
| [isArray](https://github.com/helpers/handlebars-helpers#isArray) | array | Returns `true` if value is an es5 array. |
| [last](https://github.com/helpers/handlebars-helpers#last) | array | Returns the last item, or last `n` items of an array or string. |
| [length](https://github.com/helpers/handlebars-helpers#length) | array | Returns the length of the given string or array. |
| [lengthEqual](https://github.com/helpers/handlebars-helpers#lengthEqual) | array | Returns true if the the length of the given value is equal to the given `length`. |
| [map](https://github.com/helpers/handlebars-helpers#map) | array | Returns a new array created by calling `function` on each element of the given array. |
| [some](https://github.com/helpers/handlebars-helpers#some) | array | Block helper that returns the block if the callback returns `true` for some value in the given array. |
| [sort](https://github.com/helpers/handlebars-helpers#sort) | array | Sorts the given array. If an array of objects is passed, you may optionally pass a `key` to sort on as the second argument.  |
| [sortBy](https://github.com/helpers/handlebars-helpers#sortBy) | array | Sorts an array. If an array of objects is passed, you may optionally pass a `key` to sort on as the second argument. |
| [withAfter](https://github.com/helpers/handlebars-helpers#withAfter) | array | Uses the items in the array *after* the specified index as context inside a block. |
| [withBefore](https://github.com/helpers/handlebars-helpers#withBefore) | array | Uses the items in the array *before* the specified index as context inside a block. |
| [withFirst](https://github.com/helpers/handlebars-helpers#withFirst) | array | Uses the first item in a collection inside a handlebars block expression. |
| [withLast](https://github.com/helpers/handlebars-helpers#withLast) | array | Uses the last item or `n` items in an array as context inside a block. |
| [withSort](https://github.com/helpers/handlebars-helpers#withSort) | array | Block helper that sorts a collection and exposes the sorted collection as context inside the block. |
| [isEmpty](https://github.com/helpers/handlebars-helpers#isEmpty) | collection | Inline, subexpression, or block helper that returns `true` (or the block) if the given collection is empty, or `false` (or the inverse block, if supplied) if the collection is not empty. |
| [iterate](https://github.com/helpers/handlebars-helpers#iterate) | collection | Block helper that iterates over an array or object. If an array is given, `.forEach` is called, or if an object is given, `.forOwn` is called, otherwise the inverse block is returned. |
| [and](https://github.com/helpers/handlebars-helpers#and) | comparison | Helper that renders the block if both of the given values are truthy. If an inverse block is specified it will be rendered when falsy. |
| [default](https://github.com/helpers/handlebars-helpers#default) | comparison | Returns the first value that is not undefined, otherwise the default value is returned. |
| [eq](https://github.com/helpers/handlebars-helpers#eq) | comparison | Block helper that renders a block if `a` is equal to `b`. If an inverse block is specified it will be rendered when falsy. |
| [gt](https://github.com/helpers/handlebars-helpers#gt) | comparison | Block helper that renders a block if `a` is greater than `b`. If an inverse block is specified, it will be rendered when falsy. |
| [gte](https://github.com/helpers/handlebars-helpers#gte) | comparison | Block helper that renders a block if `a` is greater than or equal to `b`. If an inverse block is specified it will be rendered when falsy. |
| [has](https://github.com/helpers/handlebars-helpers#has) | comparison | Block helper that renders a block if value has pattern. If an inverse block is specified it will be rendered when falsy. |
| [ifEven](https://github.com/helpers/handlebars-helpers#ifEven) | comparison | Returns `true` if the given value is an even number. |
| [ifNth](https://github.com/helpers/handlebars-helpers#ifNth) | comparison | Conditionally renders a block if the remainder is zero when `a` operand is divided by `b`. If an inverse block is specified it will be rendered when the remainder is not zero. |
| [ifOdd](https://github.com/helpers/handlebars-helpers#ifOdd) | comparison | Block helper that renders a block if value is an odd number. If an inverse block is specified it will be rendered when falsy. |
| [is](https://github.com/helpers/handlebars-helpers#is) | comparison | Block helper that renders a block if `a` is equal to `b`. If an inverse block is specified it will be rendered when falsy. Similar to [eq](https://github.com/helpers/handlebars-helpers#eq) but does not do strict equality.|
| [isnt](https://github.com/helpers/handlebars-helpers#isnt)| comparison | Block helper that renders a block if `a` is not equal to `b`. If an inverse block is specified it will be rendered when falsy. Similar to [unlessEq](https://github.com/helpers/handlebars-helpers#unlessEq) but does not use strict equality for comparisons. |
| [lt](https://github.com/helpers/handlebars-helpers#lt) | comparison | Block helper that renders a block if `a` is less than `b`. If an inverse block is specified it will be rendered when falsy. |
| [lte](https://github.com/helpers/handlebars-helpers#lte) | comparison | Block helper that renders a block if `a` is less than or equal to `b`. If an inverse block is specified it will be rendered when falsy.|
| [neither](https://github.com/helpers/handlebars-helpers#neither)| comparison | Block helper that renders a block if neither of the given values are truthy. If an inverse block is specified it will be rendered when falsy. |
| [unlessEq](https://github.com/helpers/handlebars-helpers#unlessEq) | comparison | Block helper that always renders the inverse block unless `a` is equal to `b`.|
| [unlessGt](https://github.com/helpers/handlebars-helpers#unlessGt) | comparison | Block helper that always renders the inverse block unless `a` is greater than `b`.|
| [unlessLt](https://github.com/helpers/handlebars-helpers#unlessLt)| comparison | Block helper that always renders the inverse block unless `a` is less than `b`. |
| [unlessGteq](https://github.com/helpers/handlebars-helpers#unlessGteq) | comparison | Block helper that always renders the inverse block unless `a` is greater than or equal to `b`. |
| [unlessLteq](https://github.com/helpers/handlebars-helpers#unlessLteq) | comparison | Block helper that always renders the inverse block unless `a` is less than or equal to `b`.|
| [moment](https://github.com/helpers/handlebars-helpers#moment)| date | Use [moment](https://momentjs.com/) as a helper. |
| [sanitize](https://github.com/helpers/handlebars-helpers#sanitize) | html | Strips HTML tags from a string, so that only the text nodes are preserved.|
| [ul](https://github.com/helpers/handlebars-helpers#ul)| html | Block helper for creating unordered lists (`<ul></ul>`). |
| [ol](https://github.com/helpers/handlebars-helpers#ol) | html | Block helper for creating ordered lists (`<ol></ol>`). |
| [thumbnailImage](https://github.com/helpers/handlebars-helpers#thumbnailImage) | html | Returns a `<figure>` with a thumbnail linked to a full picture. |
| [inflect](https://github.com/helpers/handlebars-helpers#inflect) | inflection | Returns either the singular or plural inflection of a word based on the given count. |
| [ordinalize](https://github.com/helpers/handlebars-helpers#ordinalize) | inflection | Returns an ordinalized number as a string. |
| [markdown](https://github.com/helpers/handlebars-helpers#markdown) | markdown | Block helper that converts a string of inline markdown to HTML. |
| [add](https://github.com/helpers/handlebars-helpers#add) | math | Returns the sum of `a` plus `b`. |
| [avg](https://github.com/helpers/handlebars-helpers#avg) | math| Returns the average of all numbers in the given array. |
| [ceil](https://github.com/helpers/handlebars-helpers#ceil) | math| Returns the `Math.ceil()` of the given value. |
| [divide](https://github.com/helpers/handlebars-helpers#divide) | math| Divides `a` by `b`. |
| [floor](https://github.com/helpers/handlebars-helpers#floor) | math | Returns the `Math.floor()` of the given value. |
| [multiply](https://github.com/helpers/handlebars-helpers#multiply) | math | Returns the product of `a` times `b`. |
| [random](https://github.com/helpers/handlebars-helpers#random) | math | Generates a random number between two values. |
| [round](https://github.com/helpers/handlebars-helpers#round) | math | Rounds the given number. |
| [subtract](https://github.com/helpers/handlebars-helpers#subtract) | math | Returns the product of `a` minus `b`. |
| [sum](https://github.com/helpers/handlebars-helpers#sum) | math | Returns the sum of all numbers in the given array. |
| [option](https://github.com/helpers/handlebars-helpers#option) | misc | Returns the given value of `prop` from `this.options`. |
| [noop](https://github.com/helpers/handlebars-helpers#noop) | misc | Block helper that renders the block without taking any arguments. |
| [withHash](https://github.com/helpers/handlebars-helpers#withHash) | misc| Block helper that builds the context for the block from the options hash. |
| [addCommas](https://github.com/helpers/handlebars-helpers#addCommas) | number | Adds commas to numbers. |
| [phoneNumber](https://github.com/helpers/handlebars-helpers#phoneNumber) | number | Converts a string or number to a formatted phone number. |
| [toAbbr](https://github.com/helpers/handlebars-helpers#toAbbr) | number | Abbreviates numbers to the given number of precision. This is for general numbers, not size in bytes. |
| [toExponential](https://github.com/helpers/handlebars-helpers#toExponential) | number | Returns a string representing the given number in exponential notation. |
| [toFixed](https://github.com/helpers/handlebars-helpers#toFixed) |number| Formats the given number using fixed-point notation. |
| [toFloat](https://github.com/helpers/handlebars-helpers#toFloat) | number | |
| [toInt](https://github.com/helpers/handlebars-helpers#toInt) | number | |
| [toPrecision](https://github.com/helpers/handlebars-helpers#toPrecision) |number| Returns a string representing the `Number` object to the specified precision. |
| [extend](https://github.com/helpers/handlebars-helpers#extend) | object | Extends the context with the properties of other objects. A shallow merge is performed to avoid mutating the context. |
| [forIn](https://github.com/helpers/handlebars-helpers#forIn) | object | Block helper that iterates over the properties of an object exposing each key and value on the context. |
| [forOwn](https://github.com/helpers/handlebars-helpers#forOwn) |object| Block helper that iterates over the own properties of an object, exposing each key and value on the context. |
| [toPath](https://github.com/helpers/handlebars-helpers#toPath) | object | Takes arguments and, if they are string or number, converts them to a dot-delineated object property path. |
| [get](https://github.com/helpers/handlebars-helpers#get) | object | Use property paths (`a.b.c`) to get a value or nested value from the context. Works as a regular helper or block helper. |
| [getObject](https://github.com/helpers/handlebars-helpers#getObject) |object| Use property paths (`a.b.c`) to get an object from the context. Differs from the [get](https://github.com/helpers/handlebars-helpers#get) helper in that this helper will return the actual object including the given property key. This helper does not work as a block helper. |
| [hasOwn](https://github.com/helpers/handlebars-helpers#hasOwn) | object | Returns `true` if `key` is an own, enumerable property of the given context object. |
| [isObject](https://github.com/helpers/handlebars-helpers#isObject) | object | Returns `true` if value is an object. |
| [JSONparse](https://github.com/helpers/handlebars-helpers#JSONparse) | object | Parses the given string using `JSON.parse`. |
| [JSONstringify](https://github.com/helpers/handlebars-helpers#JSONstringify) | object | Stringifies an object using `JSON.stringify`. |
| [merge](https://github.com/helpers/handlebars-helpers#merge) |object| Deeply merges the properties of the given objects with the context object. |
| [pick](https://github.com/helpers/handlebars-helpers#pick) | object | Picks properties from the context object. |
| [camelcase](https://github.com/helpers/handlebars-helpers#camelcase) |string| camelCase the characters in the given string. |
| [capitalize](https://github.com/helpers/handlebars-helpers#capitalize) | string | Capitalizes the first word in a sentence. |
| [capitalizeAll](https://github.com/helpers/handlebars-helpers#capitalizeAll) | string | Capitalizes all words in a string. |
| [center](https://github.com/helpers/handlebars-helpers#center) |string| Centers a string using non-breaking spaces. |
| [chop](https://github.com/helpers/handlebars-helpers#chop) | string | Like [trim](https://github.com/helpers/handlebars-helpers#trim), but removes both extraneous whitespace and non-word characters from the beginning and end of a string. |
| [dashcase](https://github.com/helpers/handlebars-helpers#dashcase) | string | Replaces non-word characters and periods with hyphens. |
| [dotcase](https://github.com/helpers/handlebars-helpers#dotcase) | string | `dot.case` the characters in a string. |
| [ellipsis](https://github.com/helpers/handlebars-helpers#ellipsis) | string | Truncates a string to the specified length, and appends it with an elipsis, `…`. |
| [hyphenate](https://github.com/helpers/handlebars-helpers#hyphenate) | string | Replaces spaces in a string with hyphens. |
| [isString](https://github.com/helpers/handlebars-helpers#isString) | string | Returns `true` if value is a string. |
| [lowercase](https://github.com/helpers/handlebars-helpers#lowercase) | string | Lowercase all characters in the given string. |
| [occurrences](https://github.com/helpers/handlebars-helpers#occurrences) | string | Returns the number of occurrences of `substring` within the given string. |
| [pascalcase](https://github.com/helpers/handlebars-helpers#pascalcase) | string | PascalCase the characters in a string. |
| [pathcase](https://github.com/helpers/handlebars-helpers#pathcase) | string | `path/case` the characters in a string. |
| [plusify](https://github.com/helpers/handlebars-helpers#plusify) | string | Replaces spaces in the given string with pluses. |
| [reverse](https://github.com/helpers/handlebars-helpers#reverse) | string | Reverses a string. |
| [sentence](https://github.com/helpers/handlebars-helpers#sentence) | string | Sentence case the given string. |
| [snakecase](https://github.com/helpers/handlebars-helpers#snakecase) | string | `snake_case` the characters in the given string. |
| [split](https://github.com/helpers/handlebars-helpers#split) | string | Splits a string by the given character. |
| [startsWith](https://github.com/helpers/handlebars-helpers#startsWith) | string | Tests whether a string begins with the given prefix. |
| [titleize](https://github.com/helpers/handlebars-helpers#titleize) | string | Title case the given string. |
| [trim](https://github.com/helpers/handlebars-helpers#trim) | string | Removes extraneous whitespace from the beginning and end of a string. |
| [uppercase](https://github.com/helpers/handlebars-helpers#uppercase) | string | Uppercase all of the characters in the given string. If used as a block helper it will uppercase the entire block. This helper does not support inverse blocks. |
| [encodeURI](https://github.com/helpers/handlebars-helpers#encodeURI) | url | Encodes a Uniform Resource Identifier (URI) component by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character. |
| [decodeURI](https://github.com/helpers/handlebars-helpers#decodeURI) | url | Decodes a Uniform Resource Identifier (URI) component. |
| [urlResolve](https://github.com/helpers/handlebars-helpers#urlResolve) | url | Takes a `base` URL and a `href` URL and resolves them as a browser would for an anchor tag. |
| [urlParse](https://github.com/helpers/handlebars-helpers#urlParse) | url | Parses a URL string into an object. |
| [stripProtocol](https://github.com/helpers/handlebars-helpers#stripProtocol) | url | Strips protocol from a URL. Useful for displaying media that may have an 'http' protocol on secure connections. |

## Contributing to helpers

BigCommerce's [custom Handlebars helpers](https://github.com/bigcommerce/paper-handlebars/tree/master/helpers) are open source. To contribute, make a pull request to [bigcommerce/paper-handlebars](https://github.com/bigcommerce/paper-handlebars).

## Resources

* [Widgets](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview)
* [Theme Objects](https://developer.bigcommerce.com/stencil-docs/reference-docs/global-objects-and-properties)
* [Cornerstone](https://github.com/bigcommerce/cornerstone)
* [Paper Handlebars](https://github.com/bigcommerce/paper-handlebars/tree/master/helpers)
* [Handlebars.js](https://handlebarsjs.com/)
