# Handlebars Helpers Reference

<div class="otp" id="no-index">

### On this page
- [Custom helpers](#custom-helpers)
- [Standard helpers](#standard-helpers)
- [Contributing to helpers](#contributing-to-helpers)
- [Resources](#resources)

</div>

This is a reference for [Stencil](https://developer.bigcommerce.com/stencil-docs/getting-started/about-stencil) supported [Handlebars](https://handlebarsjs.com/) helpers. It includes [custom helper](#custom-helpers) documentation and usage examples and a list of whitelisted [standard helpers](#standard-helpers).

## Custom helpers

BigCommerce's open source helpers defined in [paper-handlebars/helpers/](https://github.com/bigcommerce/paper-handlebars/tree/master/helpers) (github).

| **Helper** | **Category** | **Description** |
| --- | --- | --- |
| [limit](#limit) | array | Limit array to second argument. |
| [pluck](#pluck) | array | Use search key to get values from collections. |
| [cdn](#cdn) | assets | Url transform for content delivery networks. |
| [money](#money) | currency | Format number length, thousands delimiter, and decimal delimiter. |
| [getFontLoaderConfig](#getFontLoaderConfig) | fonts | Returns font loader config as JSON string. |
| [getFontsCollection](#getFontsCollection) | fonts | Returns `<link>` elements for configured fonts. |
| [encodeHtmlEntities](#encodeHtmlEntities) | html | Encodes HTML entities. |
| [nl2br](#nl2br) | html | Converts newline characters to `<br>` tags. |
| [pre](#pre) | html | Renders preformatted text. |
| [resourceHints](#resourceHints) | html | Prefetch Google fonts. |
| [stylesheet](#stylesheet) | html | Renders link tag for inserting a stylesheet. |
| [lang](#lang) | i18n | Maps keys to translation files. |
| [langJson](#langJson) | i18n | Returns language translation keys as JSON string. |
| [getContentImage](#getContentImage) | images | Returns sized image URL from store `/content` directory. |
| [getContentImageSrcset](#getContentImageSrcset) | images | Returns source set of URLs for images in `/content`. |
| [getImage](#getImage) | images | Returns image URL for specified size. |
| [getImageManagerImage](#getImageManagerImage) | images | Returns sized image URL for `/product_images/uploaded_images images.. |
| [getImageManagerImageSrcset](#getImageManagerImageSrcset) | images | Returns image srcset for `/product_images/uploaded_images` images. |
| [getImageSrcset](#getImageSrcset) | images | Get single image URL or list of URLs for different sizes. |
| [any](#any) | logic | Renders block if any params are true. |
| [all](#all) | logic | Renders block if all params are true. |
| [compare](#compare) | logic | Compare values with JavaScript operators, including `typeof`. |
| [contains](#contains) | logic | Renders block if first param is in second param. |
| [for](#for) | logic | Iterate for range `a` to `b`. |
| [if](#if) | logic | Renders block if statement is true. |
| [or](#or) | logic | Renders block if on more param evaluates to true. |
| [unless](#unless) | logic | Renders block if statement is false. |
| [concat](#concat) | string | Concatenates two strings. |
| [join](#join) | string | Joins array of string items; returns a string. |
| [json](#json) | string | `JSON.stringify()`s an object. |
| [replace](#replace) | string | Replaces all isntances of first param in second param. |
| [setURLQueryParam](#setURLQueryParam) | string | Appends keys values to a URL. |
| [stripQuerystring](#stripQuerystring) | string | Remove query string |
| [toLowerCase](#toLowerCase) | string | Convert string to lowercase. |
| [truncate](#truncate) | string | Truncate a string. |
| [block](#block) | template | Defines a content block. |
| [dynamicComponent](#dynamicComponent) | template | Inserts dynamic partial at the path passed in. |
| [inject](#inject) | template | Injects key values into jsContext. |
| [jsContext](#jsContext) | template | Returns JSON for all data injected by inject helper. |
| [partial](#partial) | template | Overrides content defined by a block helper. |
| [region](#region) | template | Specifies a widget region. |
| [assignVar](#assignVar) | variables | Save value to a variable. |
| [getVar](#getVar) | variables| Get variable value. |
| [decrementVar](#decrementVar) | variables | Decrement a variable by 1. |
| [incrementVar](#incrementVar) | variables | Increment a variable by 1. |

### [{{limit}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/limit.js)

It limits the number of items returned from an array variable, and returns a new array.

#### Parameters

- `data`: {Array}
- `limit`: {Number}

#### Example

Assume that `{{cart.items}}` would return 10 items. You could use this helper to limit that behavior to only the first four items, by specifying:

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

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=limit).

### [{{pluck}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/pluck.js)

For one specified search key(s), it retrieves corresponding values from some or all elements in a specified collection.

The `pluck` helper returns the retrieved values in a comma-separated string. This helper's general form is:

```html
{{pluck ([limit] <collection> [<limit-value>]) '<search-key>'}}
```

#### Parameters

- `limit`, `limit-value`: Optional parameters to limit the number of results returned.
- `collection`: The collection to search.
- `search-key`: The string to search for.

#### Example

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

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=pluck).

### [{{cdn}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/cdn.js)

A URL transformer for content delivery networks.

#### Example

When you reference static assets that you have locally staged outside your `<theme-name>` directory and uploaded using WebDAV, place the `webdav:` prefix before each corresponding `assetPath` parameter. For example, a link like:

```html
<img src="{{cdn 'webdav:img/image.jpg'}}">
```

will be transformed to a result like:

```html
<img src="https://cdn.bcapp/3dsf74g/content/img/image.jpg">
```

The presumed WebDAV root directory is `/content/`. (So, in this example, the `image.jpg` file has been uploaded to the WebDAV `/content/` directory.) The presumed local directory is `assets/`, so you can omit that path when referencing its contained files or subdirectories.

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=cdn).

#### CDN custom endpoints

You can define custom CDN endpoints to use with the `cdn` helper. This facilitates including large, high-resolution image assets in themes, without exceeding BigCommerce's [50 MB limit](/stencil-docs/prepare-and-upload-a-theme/bundling-and-uploading#bundling_bundling-your-theme) when bundling the theme for upload to BigCommerce.

You could use a local version of the image in development, and a version on a CDN (e.g. Imgix) in production. To do so, define custom CDN endpoints in your theme's <span class="fn">config.json</span> [file](https://github.com/bigcommerce/cornerstone/blob/master/config.json), as highlighted in the example below:

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

As highlighted above, the helper is configured to rewrite *local* URLs to a `assets/cdn/` subfolder. The `stencil bundle` command will exclude this local `assets/cdn/` subfolder from the bundle that it creates. This filtering circumvents the 50 MB size limit on the resulting .zip file.

### [{{money}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/money.js)

Format number length, thousands delimiter, and decimal delimiter.

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=money).

### [{{getFontLoaderConfig}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getFontLoaderConfig.js)

Returns font loader config as JSON string.

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=getFontLoaderConfig).

### [{{getFontsCollection}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getFontsCollection.js)

Returns `<link>` elements for configured fonts.

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=getFontsCollection).

### [{{encodeHtmlEntities}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/encodeHtmlEntities.js)

Encodes HTML entities.

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=encodeHtmlEntities).

### [{{nl2br}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/nl2br.js)

Converts newline characters to `<br>` tags.

#### Example

```html
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


[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=nl2br).

### [{{pre}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/pre.js)

Renders preformatted text.

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=pre).

### [{{resourceHints}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/resourceHints.js)

Pre-fetches fonts; currently only supports Google fonts.

#### Parameters

* `returns`: Outputs a formatted `link` tag for DNS-prefetch.

#### Example
```js
{{{resourceHints}}}
//=> <link rel="dns-prefetch" href="https://fonts.gstatic.com/" >
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=resourceHints).

### [{{stylesheet}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/stylesheet.js)

It renders a link tag to insert a stylesheet into your theme. (This is required if you want Theme Editor to rewrite the stylesheet file when a merchant customizes their theme.) This helper returns an HTML string.

#### Parameters

- path: String containing the path to the theme's CSS stylesheet file.
- Other parameters are optional, appended in the form: `key="value"`.

#### Example

```html
{{{stylesheet "assets/css/style.css" class="myStylesheet"}}}
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=stylesheet).

### [{{lang}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/lang.js)

Maps keys to translation files, based on the locale indicated by the visitor’s browser. Its parameters are the following keys:

- `translationKey`: a string.
- `options`: key-value pairs.

#### Example

```html
<label class="form-label" for="search_query_adv">
  {{lang 'forms.search.query' }}
  <small>{{lang 'common.required' }}</small>
</label>
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=lang).

### [{{langJson}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/langJson.js)

Returns language translation keys as JSON string.

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=langJson).

### [{{getContentImage}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getContentImage.js)

Returns URL for an image [uploaded to `/dav/content/`](https://support.bigcommerce.com/s/article/File-Access-WebDAV).

#### Parameters

* `a` **{String}:** Image path relative to `/dav/content/`
* `width` **{Int}:** Width in pixels
* `height` **{Int}:** Height in pixels

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

### [{{getContentImageSrcset}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getContentImageSrcset.js)

Returns a `srcset` for an image [uploaded to `/dav/content/`](https://support.bigcommerce.com/s/article/File-Access-WebDAV).

#### Parameters

* `a` **{String}:** Image path relative to `/dav/content/`

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

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=getContentImageSrcset).

### [{{getImage}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getImage.js)

Returns an `<img>` tag `src` value for images of the specified size. Values for the size parameter are defined in the `settings` array in [`config.json`](https://github.com/bigcommerce/cornerstone/blob/master/config.json).

#### Parameters

- `stencilImage`: a StencilImage.
- `size`: a string referencing a key in the `theme_settings` object.
- `defaultImage` (optional): a string.

You can use the optional `defaultImage` parameter to specify an image that will be displayed in cases where the passed `stencilImage` value is null.

#### Example

```handlebars
{{getImage image "thumbnail"}}
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=getImage).

### [{{getImageManagerImage}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getImageManagerImage.js)

Returns an [Image Manager](https://support.bigcommerce.com/s/article/Using-the-Image-Manager) image URL for an image [uploaded to `/dav/product_images/uploaded_images`](https://support.bigcommerce.com/s/article/File-Access-WebDAV).

#### Parameters
* `a` **{String}:** Image path relative to `/dav/product_images/uploaded_images`
* `width` **{Int}:** Width in pixels
* `height` **{Int}:** Height in pixels

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

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=getImageManagerImage).

### [{{getImageManagerImageSrcset}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getImageManagerImageSrcset.js)

Returns an [Image Manager](https://support.bigcommerce.com/s/article/Using-the-Image-Manager) image `srcset` for an image [uploaded to `/dav/product_images/uploaded_images`](https://support.bigcommerce.com/s/article/File-Access-WebDAV).

#### Parameters
* `a` **{String}:** Image path relative to `/dav/product_images/uploaded_images`

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

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=getImageManagerImageSrcset).

### [{{getImageSrcset}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getImageSrcset.js)

The `getImageSrcset` helper is a replacement for `getImage` which allows you to generate either a single image URL (for an `<img>` `src`) or a list of image sizes for `srcset`. [Srcset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset) allows you to specify a list of sizes from which the browser may choose, based on the expected size of the image on the page, the device's pixel density, and other factors.

Similar to `getImage`, it accepts an `stencilImage` parameter, and optionally, a `defaultImage` to use as a fallback.

#### Parammeters

- `stencilImage`: a StencilImage
- `defaultImage` : a fallback image URL to use if the StencilImage is undefined.
- Image sizes specified as named parameters on the helper

You can then specify what sizes you want as named arguments on the helper.

#### Examples

**Default sizes**

By specifying `use_default_sizes=true` on the helper, a `srcset` string will be constructed with a set of sizes chosen by BigCommerce to be optimal for most uses.

```html
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

```html
{{getImageSrcset image 1x=theme_settings.zoom_size}}
{{getImageSrcset image 1x="1280x800"}}
{{getImageSrcset image 1x="1280w"}}
```

By specifying a single size as the '1x', size, you can choose to get an image at any size of your choosing. You can reference a value from the `theme_settings` object (similar to `getImage`), or you can specify your own size inline. Note that `getImageSrcset` does not require `theme_settings` keys to be wrapped in quotes; they should be referenced directly.

**Pixel density**

```html
{{getImageSrcset image 1x="1280w" 2x="2560w"}}
{{getImageSrcset image 1x="800w" 1.5x="1200w" 2x="1600w"}}
{{getImageSrcset image 1x="640x640" 2x="1280x1280"}}
```

By specifying several sizes using the pixel density descriptor, you can generate a srcset of different image resolutions for different pixel density screens as described [here](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Resolution_switching_Same_size_different_resolutions). For example, you can specify a `2x` image for Retina screens, and a `1x` image for normal screens.

As above, you can reference `theme_settings` keys or specify your own size inline.

**Inherent width**

```html
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

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=getImageSrcset).

### [{{any}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/any.js)

Renders block if one or more parameters is `true`. Parameters can be of different types (strings, numbers, arrays, or collections).

#### Example

The `any` helper is invoked as shown here:

```html
{{#any items selected=true}}
  <!-- block to display if any items have selected=true -->
{{/any}}
```

A usage example is [`templates/components/category/shop-by-price.html`](https://github.com/bigcommerce/cornerstone/blob/master/templates/components/category/shop-by-price.html), a category page in Stencil's Cornerstone base theme that does _not_ have faceted search turned on. Shoppers will see "Shop by price" filters instead of product filters.

In this component, the `{{#any...` helper is used to determine whether a shopper has selected one of the filters, and whether a "reset" button needs to be displayed:

```html
{{#any shop_by_price selected=true}}
    <li class="navList-item">
        <a href="{{category_url}}" class="navList-action">
            {{lang 'category.reset'}}
        </a>
    </li>
{{/any}}
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=any).

### [{{all}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/all.js)

Renders block if all parameters are `true`. Parameters can be of different types (strings, numbers, arrays, or collections).

#### Example

```html
{{#all items theme_settings.optionA theme_settings.optionB}}
  ... /* block to display, if all items evaluate to true */
{{/all}}
```

```html
{{#all product.custom_fields theme_settings.show_custom_fields_tabs}}
    <li class="tab">
        <a class="tab-title" href="#tab-{{dashcase (lowercase (sanitize theme_settings.pdp-custom-fields-tab-label))}}">{{sanitize theme_settings.pdp-custom-fields-tab-label}}</a>
    </li>
{{/all}}
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=all).

### [{{compare}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/compare.js)

Render block if comparison of first and third parameter returns true.

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
* `options` **{Object}:** options object
* `returns` **{String}**: Block, or if specified the inverse block is rendered if falsey.

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=compare).

### [{{contains}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/contains.js)

Renders the block if `collection` has the given `value`, using strict equality (===) for comparison, otherwise the inverse block is rendered (if specified). If a startIndex is specified and is negative, it is used as the offset from the end of the collection.

#### Params

* `collection` {Array|Object|String}: The collection to iterate over.
* `value` {any}: The value to check for.

#### Example

```handlebars
<!-- array = ['a', 'b', 'c'] -->
{{#contains array "d"}}
  This will not be rendered.
{{else}}
  This will be rendered.
{{/contains}}
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=contains).

### [{{for}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/for.js)

Repeats block for range from index `a` to element `b`.

#### Parameters

* `a`: starting integer
* `b`: ending integer

In particular, this helper is limited to 100 iterations, in order to protect against infinite loops.

The `for` helper has the following syntax, where parameters `<from>` and `<to>` are numbers, and `<context>` is an object:

#### Example

```handlebars
{{#for 1 12}}
    {{lang (concat 'common.short_months.' $index)}}
{{/for}}
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=for).

### [{{if}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/if.js)

Renders `if` block when if-statement evaluates to true; otherwise renders `else` block.

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

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=if).

### [{{or}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/or.js)

Renders block if on more param evaluates to true.

#### Parameters

The `or` operator's parameters are one or more strings, numbers, arrays, or collections. Parameters can be of mixed types.

#### Example

```handlebars
{{#or 1 0 0 0 0 0 0}}
<!-- 1 evaluates to true, so block rendered-->
{{/or}}
```

```html
{{#or options configurable_fields}}
    <a href="#" data-item-edit="{{id}}">{{lang 'cart.checkout.change'}}</a>
{{/or}}
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=or).

### [{{unless}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/unless.js)

Renders block if statement is false; does not support operators for comparison expressions.

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

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=unless).

### [{{concat}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/concat.js)

Concatenates two strings.

#### Example

```handlebars
{{concat breadcrumbs.[0].name breadcrumbs.[0].url}}
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=concat).

### [{{join}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/join.js)

Joins an array of string elements into a single string.

#### Parameters

- `values`: {Array}
- `separator`: {String}
- `limit=<number>`: An optional limit.
-
#### Example

```handlebars
{{#if facets.length '>' 2}}
    {{lang 'search.faceted.browse-by'}} {{ join (pluck facets 'title') ', ' limit=2 }} &amp; {{ toLowerCase (lang 'search.faceted.more') }}
{{/if}}
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=join).

### [{{json}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/json.js)

`JSON.stringify()`s an object.

Joins two strings.

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

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=json).

### [{{replace}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/replace.js)

Replaces all instances of first param in second param with the child block.

#### Example

Replace all instances of `%%Syndicate%%` in `page.content` with `{{> components/page/rss_feed}}`:

```html
{{#replace '%%Syndicate%%' page.content}}
    {{> components/page/rss_feed}}
{{else}}
    <p>{{{page.content}}}</p>
{{/replace}}
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=replace).

### [{{setURLQueryParam}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/setURLQueryParam.js)

Appends keys values to a URL.

#### Parameters

* `key` {String}: The query parameter key.
* `value` {Number}: The query parameter value of the stated key.
* `url` {String}: The URL of the query parameter.
* `returns` {String}: A formatted URL query parameter.

#### Example

```handlebars
{{setURLQueryParam "http://example.com/image.jpg" "c" "2"}}
<!-- => http://example.com/image.jpg?c=2 -->
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=setURLQueryParam).

### [{{stripQuerystring}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/stripQuerystring.js)

Strips query string from URL.

#### Example

```handlebars
{{stripQuerystring "http://example.com?tests=true"}}
<!-- => http://example.com -->
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=stripQuerystring).

### [{{toLowerCase}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/toLowerCase.js)

Converts string to lowercase.

#### Example

```handlebars
{{toLowerCase head.title}}
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=toLowerCase).

### [{{truncate}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/truncate.js)

Truncates a string.

#### Parameters

* `str` {String}: The string you want to truncate.
* `length` {Number}: The desired length of the returned truncated string.
* `returns` {String}: The truncated string.

#### Example

```handlebars
{{truncate "This will be truncated to only the first part of the sentence." 22}}
<!-- => This will be truncated -->
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=truncate).

### [{{block}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/block.js)

Defines a block of content; can be overwritten by a [partial](#partial).

#### Example

```html
<div class="container">
    {{#block "page"}} {{/block}}
</div>
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=block).

### [{{dynamicComponent}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/dynamicComponent.js)

Inserts dynamic partial at the path passed in.

#### Example

```handlebars
{{#each forms.create_account.address_fields }}
    {{{dynamicComponent 'components/common/forms'}}}
{{/each}}
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=dynamicComponent).

### [{{inject}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/inject.js)

Injects key values into [jsContext](#jscontext).

#### Example

```html
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

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=inject).

### [{{jsContext}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/jsContext.js)

Returns JSON for all data injected by inject helper.

#### Example

```html
{{inject "myProductName" product.title}}

<script>
var jsContext = JSON.parse({{jsContext}});
console.log(jsContext.myProductName);
// => "BigCommerce Coffee Mug"
</script>
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=jsContext).

### [{{partial}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/partial.js)

Overrides content defined by a block helper.

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

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=partial).

### [{{region}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/region.js)

Specifies a [widget](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview) region.

#### Example

```handlebars
{{{region name="home_below_menu"}}}
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=region).

### [{{assignVar}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/assignVar.js)

Save a variable for later use in the template.

#### Example

```handlebars
{{assignVar "foo" 10}}
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=assignVar).

### [{{getVar}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/getVar.js)

Get a variable set by [assignVar](#assignVar).

#### Example

```handlebars
{{getVar "foo"}}
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=getVar).

### [{{decrementVar}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/decrementVar.js)

Decrement variable assigned by [assignVar](#assignVar) by 1.

#### Example

```handlebars
{{decrementVar "foo"}}
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=decrementVar).

### [{{incrementVar}}](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/incrementVar.js)

Increment variable assigned by [assignVar](#assignVar) by 1.

#### Example

```handlebars
{{incrementVar "foo"}}
```

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?l=HTML&q=incrementVar).

## Standard helpers

Below are the standard helpers available to stencil themes and a link to it's documentation on github [@helpers/handlebars-helpers](https://github.com/helpers/handlebars-helpers).

|Helper|
|-|
|[after](https://github.com/helpers/handlebars-helpers#after)|
|[arrayify](https://github.com/helpers/handlebars-helpers#arrayify)|
|[before](https://github.com/helpers/handlebars-helpers#before)|
|[eachIndex](https://github.com/helpers/handlebars-helpers#eachIndex)|
|[filter](https://github.com/helpers/handlebars-helpers#filter)|
|[first](https://github.com/helpers/handlebars-helpers#first)|
|[forEach](https://github.com/helpers/handlebars-helpers#forEach)|
|[inArray](https://github.com/helpers/handlebars-helpers#inArray)|
|[isArray](https://github.com/helpers/handlebars-helpers#isArray)|
|[last](https://github.com/helpers/handlebars-helpers#last)|
|[lengthEqual](https://github.com/helpers/handlebars-helpers#lengthEqual)|
|[map](https://github.com/helpers/handlebars-helpers#map)|
|[some](https://github.com/helpers/handlebars-helpers#some)|
|[sort](https://github.com/helpers/handlebars-helpers#sort)|
|[sortBy](https://github.com/helpers/handlebars-helpers#sortBy)|
|[withAfter](https://github.com/helpers/handlebars-helpers#withAfter)|
|[withBefore](https://github.com/helpers/handlebars-helpers#withBefore)|
|[withFirst](https://github.com/helpers/handlebars-helpers#withFirst)|
|[withLast](https://github.com/helpers/handlebars-helpers#withLast)|
|[withSort](https://github.com/helpers/handlebars-helpers#withSort)|
|[isEmpty](https://github.com/helpers/handlebars-helpers#isEmpty)|
|[iterate](https://github.com/helpers/handlebars-helpers#iterate)|
|[length](https://github.com/helpers/handlebars-helpers#length)|
|[and](https://github.com/helpers/handlebars-helpers#and)|
|[gt](https://github.com/helpers/handlebars-helpers#gt)|
|[gte](https://github.com/helpers/handlebars-helpers#gte)|
|[has](https://github.com/helpers/handlebars-helpers#has)|
|[eq](https://github.com/helpers/handlebars-helpers#eq)|
|[ifEven](https://github.com/helpers/handlebars-helpers#ifEven)|
|[ifNth](https://github.com/helpers/handlebars-helpers#ifNth)|
|[ifOdd](https://github.com/helpers/handlebars-helpers#ifOdd)|
|[is](https://github.com/helpers/handlebars-helpers#is)|
|[isnt](https://github.com/helpers/handlebars-helpers#isnt)|
|[lt](https://github.com/helpers/handlebars-helpers#lt)|
|[lte](https://github.com/helpers/handlebars-helpers#lte)|
|[neither](https://github.com/helpers/handlebars-helpers#neither)|
|[unlessEq](https://github.com/helpers/handlebars-helpers#unlessEq)|
|[unlessGt](https://github.com/helpers/handlebars-helpers#unlessGt)|
|[unlessLt](https://github.com/helpers/handlebars-helpers#unlessLt)|
|[unlessGteq](https://github.com/helpers/handlebars-helpers#unlessGteq)|
|[unlessLteq](https://github.com/helpers/handlebars-helpers#unlessLteq)|
|[moment](https://github.com/helpers/handlebars-helpers#moment)|
|[ellipsis](https://github.com/helpers/handlebars-helpers#ellipsis)|
|[sanitize](https://github.com/helpers/handlebars-helpers#sanitize)|
|[ul](https://github.com/helpers/handlebars-helpers#ul)|
|[ol](https://github.com/helpers/handlebars-helpers#ol)|
|[thumbnailImage](https://github.com/helpers/handlebars-helpers#thumbnailImage)|
|[inflect](https://github.com/helpers/handlebars-helpers#inflect)|
|[ordinalize](https://github.com/helpers/handlebars-helpers#ordinalize)|
|[markdown](https://github.com/helpers/handlebars-helpers#markdown)|
|[add](https://github.com/helpers/handlebars-helpers#add)|
|[subtract](https://github.com/helpers/handlebars-helpers#subtract)|
|[divide](https://github.com/helpers/handlebars-helpers#divide)|
|[multiply](https://github.com/helpers/handlebars-helpers#multiply)|
|[floor](https://github.com/helpers/handlebars-helpers#floor)|
|[ceil](https://github.com/helpers/handlebars-helpers#ceil)|
|[round](https://github.com/helpers/handlebars-helpers#round)|
|[sum](https://github.com/helpers/handlebars-helpers#sum)|
|[avg](https://github.com/helpers/handlebars-helpers#avg)|
|[default](https://github.com/helpers/handlebars-helpers#default)|
|[option](https://github.com/helpers/handlebars-helpers#option)|
|[noop](https://github.com/helpers/handlebars-helpers#noop)|
|[withHash](https://github.com/helpers/handlebars-helpers#withHash)|
|[addCommas](https://github.com/helpers/handlebars-helpers#addCommas)|
|[phoneNumber](https://github.com/helpers/handlebars-helpers#phoneNumber)|
|[random](https://github.com/helpers/handlebars-helpers#random)|
|[toAbbr](https://github.com/helpers/handlebars-helpers#toAbbr)|
|[toExponential](https://github.com/helpers/handlebars-helpers#toExponential)|
|[toFixed](https://github.com/helpers/handlebars-helpers#toFixed)|
|[toFloat](https://github.com/helpers/handlebars-helpers#toFloat)|
|[toInt](https://github.com/helpers/handlebars-helpers#toInt)|
|[toPrecision](https://github.com/helpers/handlebars-helpers#toPrecision)|
|[extend](https://github.com/helpers/handlebars-helpers#extend)|
|[forIn](https://github.com/helpers/handlebars-helpers#forIn)|
|[forOwn](https://github.com/helpers/handlebars-helpers#forOwn)|
|[toPath](https://github.com/helpers/handlebars-helpers#toPath)|
|[get](https://github.com/helpers/handlebars-helpers#get)|
|[getObject](https://github.com/helpers/handlebars-helpers#getObject)|
|[hasOwn](https://github.com/helpers/handlebars-helpers#hasOwn)|
|[isObject](https://github.com/helpers/handlebars-helpers#isObject)|
|[merge](https://github.com/helpers/handlebars-helpers#merge)|
|[JSONparse](https://github.com/helpers/handlebars-helpers#JSONparse)|
|[JSONstringify](https://github.com/helpers/handlebars-helpers#JSONstringify)|
|[camelcase](https://github.com/helpers/handlebars-helpers#camelcase)|
|[capitalize](https://github.com/helpers/handlebars-helpers#capitalize)|
|[capitalizeAll](https://github.com/helpers/handlebars-helpers#capitalizeAll)|
|[center](https://github.com/helpers/handlebars-helpers#center)|
|[chop](https://github.com/helpers/handlebars-helpers#chop)|
|[dashcase](https://github.com/helpers/handlebars-helpers#dashcase)|
|[dotcase](https://github.com/helpers/handlebars-helpers#dotcase)|
|[hyphenate](https://github.com/helpers/handlebars-helpers#hyphenate)|
|[isString](https://github.com/helpers/handlebars-helpers#isString)|
|[lowercase](https://github.com/helpers/handlebars-helpers#lowercase)|
|[occurrences](https://github.com/helpers/handlebars-helpers#occurrences)|
|[pascalcase](https://github.com/helpers/handlebars-helpers#pascalcase)|
|[pathcase](https://github.com/helpers/handlebars-helpers#pathcase)|
|[plusify](https://github.com/helpers/handlebars-helpers#plusify)|
|[reverse](https://github.com/helpers/handlebars-helpers#reverse)|
|[sentence](https://github.com/helpers/handlebars-helpers#sentence)|
|[snakecase](https://github.com/helpers/handlebars-helpers#snakecase)|
|[split](https://github.com/helpers/handlebars-helpers#split)|
|[startsWith](https://github.com/helpers/handlebars-helpers#startsWith)|
|[titleize](https://github.com/helpers/handlebars-helpers#titleize)|
|[trim](https://github.com/helpers/handlebars-helpers#trim)|
|[uppercase](https://github.com/helpers/handlebars-helpers#uppercase)|
|[encodeURI](https://github.com/helpers/handlebars-helpers#encodeURI)|
|[decodeURI](https://github.com/helpers/handlebars-helpers#decodeURI)|
|[urlResolve](https://github.com/helpers/handlebars-helpers#urlResolve)|
|[urlParse](https://github.com/helpers/handlebars-helpers#urlParse)|
|[stripProtocol](https://github.com/helpers/handlebars-helpers#stripProtocol)|
|[enumerate](https://github.com/helpers/handlebars-helpers#enumerate)|
|[equals](https://github.com/helpers/handlebars-helpers#equals)|
|[getShortMonth](https://github.com/helpers/handlebars-helpers#getShortMonth)|
|[pick](https://github.com/helpers/handlebars-helpers#pick)|

## Contributing to helpers

BigCommerce's [custom handlebar's helpers](https://github.com/bigcommerce/paper-handlebars/tree/master/helpers) are open source. To contribute, make a pull request to [bigcommerce/paper-handlebars](https://github.com/bigcommerce/paper-handlebars).

## Resources
* [Widgets](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview)
* [Theme Objects](https://developer.bigcommerce.com/stencil-docs/reference-docs/global-objects-and-properties)
* [Cornerstone](https://github.com/bigcommerce/cornerstone)
* [Paper Handlebars](https://github.com/bigcommerce/paper-handlebars/tree/master/helpers)

### Additional resources
* [Handlebars.js Docs](https://handlebarsjs.com/) (handlebarsjs.com)
