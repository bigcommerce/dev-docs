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
| [getFontLoaderConfig](#getfontloaderconfig) | fonts | Returns font loader config as a JSON string. |
| [getFontsCollection](#getfontscollection) | fonts | Returns `<link>` elements for configured fonts. |
| [encodeHtmlEntities](#encodehtmlentities) | html | Encodes HTML entities. |
| [nl2br](#nl2br) | html | Converts newline characters to `<br>` tags. |
| [pre](#pre) | html | Renders preformatted text. |
| [resourceHints](#resourcehints) | html | Pre-fetches Google fonts. |
| [stylesheet](#stylesheet) | html | Renders a link tag for inserting a stylesheet. |
| [lang](#lang) | i18n | Maps keys to translation files. |
| [langJson](#langjson) | i18n | Returns language translation keys as a JSON string. |
| [getContentImage](#getcontentimage) | images | Returns sized image URL from store's `/content` directory. |
| [getContentImageSrcset](#getcontentimagesrcset) | images | Returns source set of URLs for images in `/content`. |
| [getImage](#getimage) | images | Returns image URL for specified size. |
| [getImageManagerImage](#getimagemanagerimage) | images | Returns sized image URL for images in `/product_images/uploaded_images`. |
| [getImageManagerImageSrcset](#getimagemanagerimagesrcset) | images | Returns image srcset for images in `/product_images/uploaded_images`. |
| [getImageSrcset](#getimagesrcset) | images | Returns single image URL or list of URLs for different sizes. |
| [any](#any) | logic | Renders block if any params are true. |
| [all](#all) | logic | Renders block if all params are true. |
| [compare](#compare) | logic | Compares values with JavaScript operators, including `typeof`. |
| [contains](#contains) | logic | Renders block if first param is in second param. |
| [for](#for) | logic | Iterates for range `a` to `b`. |
| [if](#if) | logic | Renders block if statement is true. |
| [or](#or) | logic | Renders block if on more parameters evaluate to true. |
| [unless](#unless) | logic | Renders block if statement is false. |
| [concat](#concat) | string | Concatenates two strings. |
| [join](#join) | string | Joins an array of string elements into one string. |
| [json](#json) | string | Converts a JavaScript object into a JSON string. |
| [replace](#replace) | string | Replaces all instances of the first parameter in the second parameter. |
| [setURLQueryParam](#seturlqueryparam) | string | Appends keys values to a URL. |
| [stripQuerystring](#stripquerystring) | string | Removes query string. |
| [toLowerCase](#tolowercase) | string | Converts a string to lowercase. |
| [truncate](#truncate) | string | Truncates a string. |
| [block](#block) | template | Defines a content block. |
| [dynamicComponent](#dynamiccomponent) | template | Inserts a dynamic partial at the specified path. |
| [inject](#inject) | template | Injects key values into `{{jsContext}}`. |
| [jsContext](#jscontext) | template | Returns JSON for all data injected by `{{inject}}`. |
| [partial](#partial) | template | Overrides content defined by a block helper. |
| [region](#region) | template | Specifies a widget region. |
| [assignVar](#assignvar) | variables | Saves value to a variable. |
| [getVar](#getvar) | variables| Returns a variable value. |
| [decrementVar](#decrementvar) | variables | Decrements a variable by 1. |
| [incrementVar](#incrementvar) | variables | Increments a variable by 1. |

### {{limit}}

Limits the number of items returned from an array; returns a new array.

#### Parameters

- `data` {Array}: Collection.
- `limit` {Number}: Index specifying the number of items to exclude.

#### Example

```handlebars
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

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/limit.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=limit).

### {{pluck}}

Using specified search key(s), retrieves corresponding values from some or all elements in a collection. Returns the retrieved values in a comma-separated string.

#### Parameters

- `limit`, `limit-value`: Optional parameters to limit the number of results returned.
- `collection` {Object|Array}: Collection.
- `path` {String}: The string to search for.

#### Example

```handlebars
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

Handlebars statement:

```html
{{pluck (limit categories 2) 'image.data'}}
<!-- Returns a comma-separated list of image URLs -->
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/pluck.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=pluck).

### {{cdn}}

A URL transformer for content delivery networks.

#### Parameters

- `assetPath` {String}: Path to the file containing static assets.

#### Example

To reference static assets staged locally outside your `<theme-name>` directory and uploaded using WebDAV, place the `webdav:` prefix before each corresponding `assetPath` parameter. For example, the following link:

```html
<img src="{{cdn 'webdav:img/image.jpg'}}">
```

will be transformed to a result like this:

```html
<img src="https://cdn.bcapp/3dsf74g/content/img/image.jpg">
```

In this example, the `image.jpg` file was uploaded to the WebDAV `/content/` directory making `/content` the WebDAV root directory. The presumed local directory is `assets/`, so you can omit that path when referencing its contained files or subdirectories.

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/cdn.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=cdn).

#### CDN custom endpoints

You can define custom CDN endpoints to use with the `{{cdn}}` helper. This way you can include large, high-resolution image assets in themes without exceeding BigCommerce's [50 MB limit](/stencil-docs/prepare-and-upload-a-theme/bundling-and-uploading#bundling_bundling-your-theme) when bundling the theme for upload to BigCommerce.

You could use a local version of the image in development, and a version on a CDN (e.g. Imgix) in production. To do so, define custom CDN endpoints in your theme's `config.json` [file](https://github.com/bigcommerce/cornerstone/blob/master/config.json), as highlighted in the example below:

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

After defining an endpoint, you can use the short name in the same way as you would use a `webdav:` abbreviation:

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

As highlighted above, the helper is configured to rewrite *local* URLs to a `assets/cdn/` subfolder. The `stencil bundle` command will exclude this local `assets/cdn/` subfolder from the bundle that it creates. This filtering circumvents the 50 MB size limit on the resulting ZIP file.

### {{money}}

Formats number length, thousands delimiter, and decimal delimiter.

#### Parameters

- `n` {Integer}: Length of decimal.
- `s` {Mixed}: Thousands delimiter.
- `c` {Mixed}: Decimal delimiter.

#### Example

```handlebars
{{money value n s c}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/money.js).

### {{getFontLoaderConfig}}

Returns font loader config as JSON string.

#### Parameters

- `filepath` {String}: Filepath to the config file.

#### Example

```handlebars
{{getFontLoaderConfig './lib/fonts'}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getFontLoaderConfig.js).

### {{getFontsCollection}}

Returns `<link>` elements for configured fonts.

#### Parameters


#### Example

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getFontsCollection.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=getFontsCollection).

### {{encodeHtmlEntities}}

Encodes HTML entities.

#### Parameters


#### Example

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/encodeHtmlEntities.js).

### {{nl2br}}

Converts newline characters to `<br>` tags.

#### Parameters

- `text` {String}: Text to convert.

#### Example

```handlebars
{{nl2br settings.address}}
```

`settings.address`:

```json
"settings": {
  "address": "\r\n685 Market St\r\nSan Francisco\r\n94105\r\nCA\r\n"
}
```

**Result:**

```html
"<br>685 Market St<br>San Francisco<br>94105<br>CA<br>"
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/nl2br.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=nl2br).

### {{pre}}

Renders preformatted text.

#### Parameters

- `text` {String}: Text to format.

#### Example

```handlebars
{{{pre "text"}}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/pre.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=pre).

### {{resourceHints}}

Pre-fetches fonts; currently only supports Google fonts.

#### Parameters

* `returns`: Outputs a formatted `link` tag for DNS-prefetch.

#### Example
```js
{{{resourceHints}}}
//=> <link rel="dns-prefetch" href="https://fonts.gstatic.com/" >
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/resourceHints.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=resourceHints).

### {{stylesheet}}

Renders a link tag to insert a stylesheet into a theme. (This is required if you want Theme Editor to rewrite the stylesheet file when a merchant customizes their theme.) This helper returns an HTML string.

#### Parameters

- `assetPath` (String}): Filepath to the theme's CSS stylesheet file.
- You can append optional parameters as `key="value"` pairs.

#### Example

```handlebars
{{{stylesheet "assets/css/style.css" class="myStylesheet"}}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/stylesheet.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=stylesheet).

### {{lang}}

Maps keys to translation files, based on the locale indicated by the visitor’s browser. 

#### Parameters

- `translationKey`{String}
- `options`: You can append optional parameters as `key="value"` pairs.

#### Example

```html
<label class="form-label" for="search_query_adv">
  {{lang 'forms.search.query' }}
  <small>{{lang 'common.required' }}</small>
</label>
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/lang.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=lang).

### {{langJson}}

Returns language translation keys as JSON string.

#### Parameters

- `keyFilter` {String}

#### Example

```handlebars
{{{langJson "keyFilter"}}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/langJson.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=langJson).

### {{getContentImage}}

Returns a URL for an image [uploaded to `/dav/content/`](https://support.bigcommerce.com/s/article/File-Access-WebDAV).

#### Parameters

- `a` {String}: Image path relative to `/dav/content/`.
- `width` {Integer}: Width in pixels.
- `height` {Integer}: Height in pixels.

#### Example

```handlebars
<!-- Original image URL returned if no size or invalid size is passed in -->
{{getContentImage "asset.jpg"}}
<!--=> https://cdn.bcapp/3dsf74g/images/stencil/original/content/asset.jpg  -->

{{getContentImage "asset.jpg" width="a" height="a"}}
<!--=> https://cdn.bcapp/3dsf74g/images/stencil/original/content/asset.jpg  -->


<!-- Sized image URL returned if valid height and/or width passed in -->
{{getContentImage "asset.jpg" width=123 height=321}}
<!--=> https://cdn.bcapp/3dsf74g/images/stencil/123x321/content/asset.jpg -->

{{getContentImage "asset.jpg" width=123}}
<!--=> https://cdn.bcapp/3dsf74g/images/stencil/123w/content/folder/asset.jpg -->
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getContentImage.js).

### {{getContentImageSrcset}}

Returns a `srcset` for an image [uploaded to `/dav/content/`](https://support.bigcommerce.com/s/article/File-Access-WebDAV).

#### Parameters

- `a` {String}: Image path relative to `/dav/content/`.

#### Example

```handlebars
{{getContentImageSrcset "asset.jpg"}}
<!--=>
https://cdn.bcapp/3dsf74g/images/stencil/80w/content/asset.jpg 80w, https://cdn.bcapp/3dsf74g/images/stencil/160w/content/asset.jpg 160w, https://cdn.bcapp/3dsf74g/images/stencil/320w/content/asset.jpg 320w, https://cdn.bcapp/3dsf74g/images/stencil/640w/content/asset.jpg 640w, https://cdn.bcapp/3dsf74g/images/stencil/960w/content/asset.jpg 960w, https://cdn.bcapp/3dsf74g/images/stencil/1280w/content/asset.jpg 1280w, https://cdn.bcapp/3dsf74g/images/stencil/1920w/content/asset.jpg 1920w, https://cdn.bcapp/3dsf74g/images/stencil/2560w/content/asset.jpg 2560w
-->

{{getContentImageSrcset "folder/asset.jpg" width=123}}
<!--=>
https://cdn.bcapp/3dsf74g/images/stencil/80w/content/folder/asset.jpg 80w, https://cdn.bcapp/3dsf74g/images/stencil/160w/content/folder/asset.jpg 160w, https://cdn.bcapp/3dsf74g/images/stencil/320w/content/folder/asset.jpg 320w, https://cdn.bcapp/3dsf74g/images/stencil/640w/content/folder/asset.jpg 640w, https://cdn.bcapp/3dsf74g/images/stencil/960w/content/folder/asset.jpg 960w, https://cdn.bcapp/3dsf74g/images/stencil/1280w/content/folder/asset.jpg 1280w, https://cdn.bcapp/3dsf74g/images/stencil/1920w/content/folder/asset.jpg 1920w, https://cdn.bcapp/3dsf74g/images/stencil/2560w/content/folder/asset.jpg 2560w
 -->
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getContentImageSrcset.js).

### {{getImage}}

Returns an `<img>` tag `src` value for images of the specified size. Values for the size parameter are defined in the `settings` array in [`config.json`](https://github.com/bigcommerce/cornerstone/blob/master/config.json).

#### Parameters

- `stencilImage` {String}: a StencilImage.
- `size` {String}: A key in the `theme_settings` object.
- `defaultImage` {String}: Optional default image URL to use if the `stencilImage` is undefined.

#### Example

```handlebars
{{getImage image "thumbnail"}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getImage.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=getImage).

### {{getImageManagerImage}}

Returns an [Image Manager](https://support.bigcommerce.com/s/article/Using-the-Image-Manager) image URL for an image [uploaded to `/dav/product_images/uploaded_images`](https://support.bigcommerce.com/s/article/File-Access-WebDAV).

#### Parameters

- `a` {String}: Image path relative to `/dav/product_images/uploaded_images`.
- `width` {Integer}: Width in pixels.
- `height` {Integer}: Height in pixels.

#### Example

```handlebars
<!-- Original image URL returned if no size or invalid size is passed in -->
{{getImageManagerImage "asset.jpg"}}
<!--=> https://cdn.bcapp/3dsf74g/images/stencil/original/image-manager/asset.jpg  -->

{{getImageManagerImage "folder/asset.jpg" height=123}} <!-- height must be accompanied by width -->
<!--=> https://cdn.bcapp/3dsf74g/images/stencil/original/image-manager/folder/asset.jpg  -->


<!-- Sized image URL returned if valid height and/or width passed in -->
{{getImageManagerImage "asset.jpg" width=123}}
<!--=> https://cdn.bcapp/3dsf74g/images/stencil/123w/image-manager/asset.jpg -->

{{getImageManagerImage "folder/asset.jpg" width=123 height=321}}
<!--=> https://cdn.bcapp/3dsf74g/images/stencil/123x321/image-manager/folder/asset.jpg -->
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getImageManagerImage.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=getImageManagerImage).

### {{getImageManagerImageSrcset}}

Returns an [Image Manager](https://support.bigcommerce.com/s/article/Using-the-Image-Manager) image `srcset` for an image [uploaded to `/dav/product_images/uploaded_images`](https://support.bigcommerce.com/s/article/File-Access-WebDAV).

#### Parameters

- `a` {String}: Image path relative to `/dav/product_images/uploaded_images`.

#### Example

```handlebars
{{getImageManagerImageSrcset "asset.jpg"}}
<!--=>
https://cdn.bcapp/3dsf74g/images/stencil/80w/image-manager/asset.jpg 80w, https://cdn.bcapp/3dsf74g/images/stencil/160w/image-manager/asset.jpg 160w, https://cdn.bcapp/3dsf74g/images/stencil/320w/image-manager/asset.jpg 320w, https://cdn.bcapp/3dsf74g/images/stencil/640w/image-manager/asset.jpg 640w, https://cdn.bcapp/3dsf74g/images/stencil/960w/image-manager/asset.jpg 960w, https://cdn.bcapp/3dsf74g/images/stencil/1280w/image-manager/asset.jpg 1280w, https://cdn.bcapp/3dsf74g/images/stencil/1920w/image-manager/asset.jpg 1920w, https://cdn.bcapp/3dsf74g/images/stencil/2560w/image-manager/asset.jpg 2560w
 -->

{{getImageManagerImageSrcset "folder/asset.jpg" width=123}}
 <!--=>
https://cdn.bcapp/3dsf74g/images/stencil/80w/image-manager/folder/asset.jpg 80w, https://cdn.bcapp/3dsf74g/images/stencil/160w/image-manager/folder/asset.jpg 160w, https://cdn.bcapp/3dsf74g/images/stencil/320w/image-manager/folder/asset.jpg 320w, https://cdn.bcapp/3dsf74g/images/stencil/640w/image-manager/folder/asset.jpg 640w, https://cdn.bcapp/3dsf74g/images/stencil/960w/image-manager/folder/asset.jpg 960w, https://cdn.bcapp/3dsf74g/images/stencil/1280w/image-manager/folder/asset.jpg 1280w, https://cdn.bcapp/3dsf74g/images/stencil/1920w/image-manager/folder/asset.jpg 1920w, https://cdn.bcapp/3dsf74g/images/stencil/2560w/image-manager/folder/asset.jpg 2560w
 -->
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getImageManagerImageSrcset.js).

### {{getImageSrcset}}

The `getImageSrcset` helper is a replacement for `getImage` which allows you to generate either a single image URL (for an `<img>` `src`) or a list of image sizes for `srcset`. [Srcset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset) allows you to specify a list of sizes from which the browser may choose, based on the expected size of the image on the page, the device's pixel density, and other factors.

#### Parameters

- `stencilImage` {String}: a StencilImage.
- `size` {String}: A key in the `theme_settings` object.
- `defaultImage` {String}: Optional default image URL to use if the `stencilImage` is undefined.

You can then specify what sizes you want as named arguments on the helper.

#### Examples

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

By specifying a single size as the '1x', size, you can choose to get an image at any size of your choosing. You can reference a value from the `theme_settings` object (similar to `getImage`), or you can specify your own size inline. Note that `getImageSrcset` does not require `theme_settings` keys to be wrapped in quotes; they should be referenced directly.

**Pixel density**

```handlebars
{{getImageSrcset image 1x="1280w" 2x="2560w"}}
{{getImageSrcset image 1x="800w" 1.5x="1200w" 2x="1600w"}}
{{getImageSrcset image 1x="640x640" 2x="1280x1280"}}
```

By specifying several sizes using the pixel density descriptor, you can generate a srcset of different image resolutions for different pixel density screens as described [here](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Resolution_switching_Same_size_different_resolutions). For example, you can specify a `2x` image for Retina screens, and a `1x` image for normal screens.

As above, you can reference `theme_settings` keys or specify your own size inline.

**Inherent width**

```handlebars
<img src="{{getImage image 'default'}}" srcset="{{getImageSrcset image 100w='100w' 200w='200w' 300w='300w'}}" />

<!-- =>
<img src="https://cdn11.bigcommerce.com/s-abc123/images/stencil/640x640/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2" srcset="https://cdn11.bigcommerce.com/s-abc123/images/stencil/100w/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 100w, https://cdn11.bigcommerce.com/s-abc123/images/stencil/200w/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 200w,https://cdn11.bigcommerce.com/s-abc123/images/stencil/300w/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 300w" />
-->

<img src="{{getImageSrcSet image 1x='1000x1000'}}" srcset="{{getImageSrcset image 1x='1000x1000' 2x='2000x2000'}}" />

<!-- =>
<img src="https://cdn11.bigcommerce.com/s-abc123/images/stencil/640x640/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2" srcset="https://cdn11.bigcommerce.com/s-abc123/images/stencil/100w/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 100w, https://cdn11.bigcommerce.com/s-abc123/images/stencil/200w/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 200w,https://cdn11.bigcommerce.com/s-abc123/images/stencil/300w/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 300w" />
-->
```

By specifying several sizes using the inherent width descriptor, you can generate a srcset of different image resolutions based on width, which can in turn be selected by the browser based on the expected size of the image when the page is painted. It is recommended to use this together with a `sizes` attribute on the `<img>` as described [here](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Resolution_switching_Different_sizes). In Cornerstone, this is handled automatically via JavaScript.

As above, you can reference `theme_settings` keys or specify your own size inline.

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getImageSrcset.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=getImageSrcset).

### {{any}}

Renders block if one or more parameters is true. 

#### Parameters

- `arg` {String|Number|Array|Object}

#### Example

The `any` helper is invoked as shown here:

```handlebars
{{#any items selected=true}}
  <!-- block to display if any items have selected=true -->
{{/any}}
```

A usage example is [`templates/components/category/shop-by-price.html`](https://github.com/bigcommerce/cornerstone/blob/master/templates/components/category/shop-by-price.html), a category page in Stencil's Cornerstone base theme that does _not_ have faceted search turned on. Shoppers will see "Shop by price" filters instead of product filters.

In this component, the `{{#any...` helper is used to determine whether a shopper has selected one of the filters, and whether a "reset" button needs to be displayed:

```handlebars
{{#any shop_by_price selected=true}}
    <li class="navList-item">
        <a href="{{category_url}}" class="navList-action">
            {{lang 'category.reset'}}
        </a>
    </li>
{{/any}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/any.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=any).

### {{all}}

Renders block if all parameters are `true`. 

#### Parameters

- `arg` {String|Number|Array|Object}

#### Example

```handlebars
{{#all items theme_settings.optionA theme_settings.optionB}}
  ... /* block to display, if all items evaluate to true */
{{/all}}
```

```handlebars
{{#all product.custom_fields theme_settings.show_custom_fields_tabs}}
    <li class="tab">
        <a class="tab-title" href="#tab-{{dashcase (lowercase (sanitize theme_settings.pdp-custom-fields-tab-label))}}">{{sanitize theme_settings.pdp-custom-fields-tab-label}}</a>
    </li>
{{/all}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/all.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=all).

### {{compare}}

Render a block if comparison of the first and third parameters returns true.
Compares values with JavaScript operators, including `typeof`. 

#### Parameters

* `a` {}
* `operator` {}: The operator to use. Operators must be enclosed in quotes: ">", "=", "<=", and so on.
  * `==`
  * `===`
  * `!=`
  * `!===`
  * `<`
  * `>`
  * `<=`
  * `>=`
  * `typeof`
* `b` {}
* `options` {Object}: Options object.
* `returns` {String}: Block, or if specified the inverse block is rendered if falsy.

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/compare.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=compare).

### {{contains}}

Renders the block if `collection` has the given `value`, using strict equality (`===`) for comparison, otherwise the inverse block is rendered (if specified). If a `startIndex` is specified and is negative, it is used as the offset from the end of the collection.

Renders block if first param is in second param.

#### Parameters

- `collection` {Array|Object|String}: The collection to iterate over.
- `value` {any}: The value to check for.

//source: https://github.com/helpers/handlebars-helpers

#### Example

```handlebars
<!-- array = ['a', 'b', 'c'] -->
{{#contains array "d"}}
  This will not be rendered.
{{else}}
  This will be rendered.
{{/contains}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/contains.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=contains).

### {{for}}

Repeats a block for a specified range from index `a` to element `b`. To protect against infinite loops, this helper is limited to 100 iterations.

#### Parameters

- `a` {Number}: Starting number.
- `b` {Number}: Ending number.
- `context` {Object}

#### Example

```handlebars
{{#for 1 12}}
    {{lang (concat 'common.short_months.' $index)}}
{{/for}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/for.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=for).

### {{if}}

Renders `if` block when if-statement evaluates to true; otherwise renders `else` block.

#### Parameters

- `arg` {String|Number|Array|Object}

#### Example

```handlebars
{{#if page_type '===' 'account_order'}}
    <li class="navBar-item is-active">
        <a class="navBar-action" href="{{urls.account.orders.all}}">{{lang 'account.nav.orders'}}</a>
    </li>
{{else}}
    <li class="navBar-item is-active">{{lang 'account.nav.orders'}}</li>
{{/if}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/if.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=if).

### {{or}}

Renders block if one or more parameters evaluates to true.

#### Parameters

- `arg` {String|Number|Array|Object}: Parameters can be of mixed types.

#### Example

```handlebars
{{#or 1 0 0 0 0 0 0}}
<!-- 1 evaluates to true, so block rendered-->
{{/or}}
```

```handlebars
{{#or options configurable_fields}}
    <a href="#" data-item-edit="{{id}}">{{lang 'cart.checkout.change'}}</a>
{{/or}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/or.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=or).

### {{unless}}

Renders a block if a statement is false; does not support operators for comparison expressions.

#### Parameters

- `arg` {String|Number|Array|Object}

#### Example

```handlebars
{{#each category_results}}
<li class="category-suggestion">
    {{#each this}}
        <a href="{{url}}">{{name}}</a>
        {{#unless @last}} > {{/unless}}
    {{/each}}
</li>
{{/each}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/unless.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=unless).

### {{concat}}

Concatenates two strings.

#### Parameters

- `value` {String}
- `otherValue` {String}

#### Example

```handlebars
{{concat breadcrumbs.[0].name breadcrumbs.[0].url}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/concat.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=concat).

### {{join}}

Joins an array of string elements into a single string.

#### Parameters

- `values` {Array}
- `separator` {String}
- `limit=<number>`: An optional limit.

#### Example

```handlebars
{{#if facets.length '>' 2}}
    {{lang 'search.faceted.browse-by'}} {{ join (pluck facets 'title') ', ' limit=2 }} &amp; {{ toLowerCase (lang 'search.faceted.more') }}
{{/if}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/join.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=join).

### {{json}}

Converts a JavaScript object into a JSON string.

#### Parameters

- `data` {Object}

#### Example

```handlebars
{{json blog}}

<!-- //=>
{
    "name": "Blog",
    "recent_posts": [{...}],
    "url": "/blog/"
}
-->
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/json.js).

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=json).

### {{replace}}

```handlebars
{{replace firstParam secondParam string}}
```

Replaces all instances of the first parameter in the second parameter with the child block.

#### Parameters

- `firstParam` {String}
- `secondParam` {?}
- `string` {String}

#### Example

```handlebars
<!-- Replace all instances of `%%Syndicate%%` in `page.content` with `{{> components/page/rss_feed}}`. -->
{{#replace '%%Syndicate%%' page.content}}
    {{> components/page/rss_feed}}
{{else}}
    <p>{{{page.content}}}</p>
{{/replace}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/replace.js).

### {{setURLQueryParam}}

```handlebars
{{setURLQueryParam url key value}}
```
Appends keys values to a URL.

#### Parameters

- `url` {String}: The URL of the query parameter.
- `key` {String}: The query parameter key.
- `value` {Number}: The query parameter value of the stated key.

#### Example

```handlebars
{{setURLQueryParam "http://example.com/image.jpg" "c" "2"}}
<!-- => http://example.com/image.jpg?c=2 -->
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/setURLQueryParam.js).

### {{stripQuerystring}}

```handlebars
{{stripQuerystring url}}
```
Strips query string from URL.

#### Parameters

- `url` {String}: The URL containing the query parameter.

#### Example

```handlebars
{{stripQuerystring "http://example.com?tests=true"}}
<!-- => http://example.com -->
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/stripQuerystring.js).

### {{toLowerCase}}

```handlebars
{{toLowerCase string}}
```
Converts string to lowercase.

#### Parameters

- `string` {String}

#### Example

```handlebars
{{toLowerCase head.title}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/toLowerCase.js).

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
<!-- => This will be truncated -->
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/truncate.js).

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

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/block.js).

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

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/dynamicComponent.js).

### {{inject}}

```handlebars
{{inject value object}}
```
Injects key values into [jsContext](#jscontext).

#### Parameters

- `value` {String}: The value to inject.
- `object` {?}

#### Example

```handlebars
{{inject "myProductName" product.title}}

<script>
var jsContext = JSON.parse({{jsContext}});
console.log(jsContext.myProductName);
// => "BigCommerce Coffee Mug"
</script>
```

```handlebars
{{inject "categoryProductsPerPage" theme_settings.categorypage_products_per_page}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/inject.js).

### {{jsContext}}

Returns JSON for all data injected by [inject](#inject) helper. Used in conjunction with `{{inject}}`.

#### Parameters

- None. (?)

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/jsContext.js).

### {{partial}}

```handlebars
{{partial string}}
```
Overrides content defined by a [block](#block) helper.

#### Parameters

- `string` {String}

#### Example

```handlebars
{{#partial "head"}}
    {{#if pagination.category.previous}}
        <link rel="prev" href="{{pagination.category.previous}}">
    {{/if}}
    {{#if pagination.category.next}}
        <link rel="next" href="{{pagination.category.next}}">
    {{/if}}
{{/partial}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/partial.js).

### {{region}}

```handlebars
{{region name}}
```
Specifies a [widget](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview#widgets) region.

#### Parameters

- `name` {String}: The name of the region.

#### Example

```handlebars
{{{region name="home_below_menu"}}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/region.js).

### {{assignVar}}

```handlebars
{{assignVar key value}}
```
Saves a variable for later use in the template.

#### Parameters

- `key` {String}
- `value` {String|Number}

#### Example

```handlebars
{{assignVar "foo" 10}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/assignVar.js).

### {{getVar}}

```handlebars
{{getVar key}}
```
Get the variable set by [assignVar](#assignVar).

#### Parameters

- `key` {String}

#### Example

```handlebars
{{getVar "foo"}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getVar.js).

### {{decrementVar}}

```handlebars
{{decrementVar key}}
```
Decrement the variable set by [assignVar](#assignVar) by 1.

#### Parameters

- `key` {String}

#### Example

```handlebars
{{decrementVar "foo"}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/decrementVar.js).

### {{incrementVar}}

```handlebars
{{incrementVar key}}
```
Increment variable set by [assignVar](#assignVar) by 1.

#### Parameters

- `key` {String}

#### Example

```handlebars
{{incrementVar "foo"}}
```

[See it in GitHub](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/incrementVar.js).

## Standard helpers

The following standard helpers are available to all Stencil themes:

* [after](https://github.com/helpers/handlebars-helpers#after)
* [arrayify](https://github.com/helpers/handlebars-helpers#arrayify)
* [before](https://github.com/helpers/handlebars-helpers#before)
* [eachIndex](https://github.com/helpers/handlebars-helpers#eachIndex)
* [filter](https://github.com/helpers/handlebars-helpers#filter)
* [first](https://github.com/helpers/handlebars-helpers#first)
* [forEach](https://github.com/helpers/handlebars-helpers#forEach)
* [inArray](https://github.com/helpers/handlebars-helpers#inArray)
* [isArray](https://github.com/helpers/handlebars-helpers#isArray)
* [last](https://github.com/helpers/handlebars-helpers#last)
* [lengthEqual](https://github.com/helpers/handlebars-helpers#lengthEqual)
* [map](https://github.com/helpers/handlebars-helpers#map)
* [some](https://github.com/helpers/handlebars-helpers#some)
* [sort](https://github.com/helpers/handlebars-helpers#sort)
* [sortBy](https://github.com/helpers/handlebars-helpers#sortBy)
* [withAfter](https://github.com/helpers/handlebars-helpers#withAfter)
* [withBefore](https://github.com/helpers/handlebars-helpers#withBefore)
* [withFirst](https://github.com/helpers/handlebars-helpers#withFirst)
* [withLast](https://github.com/helpers/handlebars-helpers#withLast)
* [withSort](https://github.com/helpers/handlebars-helpers#withSort)
* [isEmpty](https://github.com/helpers/handlebars-helpers#isEmpty)
* [iterate](https://github.com/helpers/handlebars-helpers#iterate)
* [length](https://github.com/helpers/handlebars-helpers#length)
* [and](https://github.com/helpers/handlebars-helpers#and)
* [gt](https://github.com/helpers/handlebars-helpers#gt)
* [gte](https://github.com/helpers/handlebars-helpers#gte)
* [has](https://github.com/helpers/handlebars-helpers#has)
* [eq](https://github.com/helpers/handlebars-helpers#eq)
* [ifEven](https://github.com/helpers/handlebars-helpers#ifEven)
* [ifNth](https://github.com/helpers/handlebars-helpers#ifNth)
* [ifOdd](https://github.com/helpers/handlebars-helpers#ifOdd)
* [is](https://github.com/helpers/handlebars-helpers#is)
* [isnt](https://github.com/helpers/handlebars-helpers#isnt)
* [lt](https://github.com/helpers/handlebars-helpers#lt)
* [lte](https://github.com/helpers/handlebars-helpers#lte)
* [neither](https://github.com/helpers/handlebars-helpers#neither)
* [unlessEq](https://github.com/helpers/handlebars-helpers#unlessEq)
* [unlessGt](https://github.com/helpers/handlebars-helpers#unlessGt)
* [unlessLt](https://github.com/helpers/handlebars-helpers#unlessLt)
* [unlessGteq](https://github.com/helpers/handlebars-helpers#unlessGteq)
* [unlessLteq](https://github.com/helpers/handlebars-helpers#unlessLteq)
* [moment](https://github.com/helpers/handlebars-helpers#moment)
* [ellipsis](https://github.com/helpers/handlebars-helpers#ellipsis)
* [sanitize](https://github.com/helpers/handlebars-helpers#sanitize)
* [ul](https://github.com/helpers/handlebars-helpers#ul)
* [ol](https://github.com/helpers/handlebars-helpers#ol)
* [thumbnailImage](https://github.com/helpers/handlebars-helpers#thumbnailImage)
* [inflect](https://github.com/helpers/handlebars-helpers#inflect)
* [ordinalize](https://github.com/helpers/handlebars-helpers#ordinalize)
* [markdown](https://github.com/helpers/handlebars-helpers#markdown)
* [add](https://github.com/helpers/handlebars-helpers#add)
* [subtract](https://github.com/helpers/handlebars-helpers#subtract)
* [divide](https://github.com/helpers/handlebars-helpers#divide)
* [multiply](https://github.com/helpers/handlebars-helpers#multiply)
* [floor](https://github.com/helpers/handlebars-helpers#floor)
* [ceil](https://github.com/helpers/handlebars-helpers#ceil)
* [round](https://github.com/helpers/handlebars-helpers#round)
* [sum](https://github.com/helpers/handlebars-helpers#sum)
* [avg](https://github.com/helpers/handlebars-helpers#avg)
* [default](https://github.com/helpers/handlebars-helpers#default)
* [option](https://github.com/helpers/handlebars-helpers#option)
* [noop](https://github.com/helpers/handlebars-helpers#noop)
* [withHash](https://github.com/helpers/handlebars-helpers#withHash)
* [addCommas](https://github.com/helpers/handlebars-helpers#addCommas)
* [phoneNumber](https://github.com/helpers/handlebars-helpers#phoneNumber)
* [random](https://github.com/helpers/handlebars-helpers#random)
* [toAbbr](https://github.com/helpers/handlebars-helpers#toAbbr)
* [toExponential](https://github.com/helpers/handlebars-helpers#toExponential)
* [toFixed](https://github.com/helpers/handlebars-helpers#toFixed)
* [toFloat](https://github.com/helpers/handlebars-helpers#toFloat)
* [toInt](https://github.com/helpers/handlebars-helpers#toInt)
* [toPrecision](https://github.com/helpers/handlebars-helpers#toPrecision)
* [extend](https://github.com/helpers/handlebars-helpers#extend)
* [forIn](https://github.com/helpers/handlebars-helpers#forIn)
* [forOwn](https://github.com/helpers/handlebars-helpers#forOwn)
* [toPath](https://github.com/helpers/handlebars-helpers#toPath)
* [get](https://github.com/helpers/handlebars-helpers#get)
* [getObject](https://github.com/helpers/handlebars-helpers#getObject)
* [hasOwn](https://github.com/helpers/handlebars-helpers#hasOwn)
* [isObject](https://github.com/helpers/handlebars-helpers#isObject)
* [merge](https://github.com/helpers/handlebars-helpers#merge)
* [JSONparse](https://github.com/helpers/handlebars-helpers#JSONparse)
* [JSONstringify](https://github.com/helpers/handlebars-helpers#JSONstringify)
* [camelcase](https://github.com/helpers/handlebars-helpers#camelcase)
* [capitalize](https://github.com/helpers/handlebars-helpers#capitalize)
* [capitalizeAll](https://github.com/helpers/handlebars-helpers#capitalizeAll)
* [center](https://github.com/helpers/handlebars-helpers#center)
* [chop](https://github.com/helpers/handlebars-helpers#chop)
* [dashcase](https://github.com/helpers/handlebars-helpers#dashcase)
* [dotcase](https://github.com/helpers/handlebars-helpers#dotcase)
* [hyphenate](https://github.com/helpers/handlebars-helpers#hyphenate)
* [isString](https://github.com/helpers/handlebars-helpers#isString)
* [lowercase](https://github.com/helpers/handlebars-helpers#lowercase)
* [occurrences](https://github.com/helpers/handlebars-helpers#occurrences)
* [pascalcase](https://github.com/helpers/handlebars-helpers#pascalcase)
* [pathcase](https://github.com/helpers/handlebars-helpers#pathcase)
* [plusify](https://github.com/helpers/handlebars-helpers#plusify)
* [reverse](https://github.com/helpers/handlebars-helpers#reverse)
* [sentence](https://github.com/helpers/handlebars-helpers#sentence)
* [snakecase](https://github.com/helpers/handlebars-helpers#snakecase)
* [split](https://github.com/helpers/handlebars-helpers#split)
* [startsWith](https://github.com/helpers/handlebars-helpers#startsWith)
* [titleize](https://github.com/helpers/handlebars-helpers#titleize)
* [trim](https://github.com/helpers/handlebars-helpers#trim)
* [uppercase](https://github.com/helpers/handlebars-helpers#uppercase)
* [encodeURI](https://github.com/helpers/handlebars-helpers#encodeURI)
* [decodeURI](https://github.com/helpers/handlebars-helpers#decodeURI)
* [urlResolve](https://github.com/helpers/handlebars-helpers#urlResolve)
* [urlParse](https://github.com/helpers/handlebars-helpers#urlParse)
* [stripProtocol](https://github.com/helpers/handlebars-helpers#stripProtocol)
* [enumerate](https://github.com/helpers/handlebars-helpers#enumerate)
* [equals](https://github.com/helpers/handlebars-helpers#equals)
* [getShortMonth](https://github.com/helpers/handlebars-helpers#getShortMonth)
* [pick](https://github.com/helpers/handlebars-helpers#pick)

## Contributing to helpers

BigCommerce's [custom Handlebars helpers](https://github.com/bigcommerce/paper-handlebars/tree/master/helpers) are open source. To contribute, make a pull request to [bigcommerce/paper-handlebars](https://github.com/bigcommerce/paper-handlebars).

## Resources

* [Widgets](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview)
* [Theme Objects](https://developer.bigcommerce.com/stencil-docs/reference-docs/global-objects-and-properties)
* [Cornerstone](https://github.com/bigcommerce/cornerstone)
* [Paper Handlebars](https://github.com/bigcommerce/paper-handlebars/tree/master/helpers)
* [Handlebars.js Docs](https://handlebarsjs.com/)
