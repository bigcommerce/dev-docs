<h1>Template Syntax</h1>
<div class="otp" id="no-index">
	<h3>On This Page</h3>
	<ul>
		<li><a href="#global-variables-references">Global-Variables References/a></li>
		<li><a href="#panel-references">Panel References/a></li>
		<li><a href="#snippet-references">Snippet References</a></li>
    <li><a href="#referencing-distributed-theme-assets">Referencing Distributed Theme Assets</a></li>
    <li><a href="#file-includes">File Includes</a></li>
</ul>
</div>

Each of the layout, panel, and snippet files in a theme uses variables (also called placeholders) to show external content or content fetched from the database (such as the name of a product).

Template variables are enclosed within `%%` markers. These types of variables are available for use in templates: global variables, string variables, panel references, snippet references, and file includes.



<a href='#global-variables-references' aria-hidden='true' class='block-anchor'  id='global-variables-references'><i aria-hidden='true' class='linkify icon'></i></a>

## Global-Variables References 


Global variables are used to render dynamic content into a template. Global variables are referenced using the following syntax:

<pre>%%GLOBAL_[placeholder_name]%%</pre>

For example:

<pre>%%GLOBAL_ProductName%%</pre>

Specific variables' availability depends on the layout template that you're editing. For example, the variable for a product's description is available on the product details page, but not on the category view/product listing page.



<a href='#panel-references' aria-hidden='true' class='block-anchor'  id='panel-references'><i aria-hidden='true' class='linkify icon'></i></a>

## Panel References 

Panels are the different blocks used by BigCommerce to build a page. Panels are referenced both inside layout files and inside other panel files.

Panels are referenced in templates as follows, where `[panel_name]` is a placeholder for the name of a file in the theme’s Panels directory:

<pre>%%Panel.[panel_name]%%</pre>

For example:

<pre>%%Panel.HomeFeaturedProducts%%</pre>

This panel reference will load in the content from the `Panels/HomeFeaturedProducts.html` panel file.



<a href='#snippet-references' aria-hidden='true' class='block-anchor'  id='snippet-references'><i aria-hidden='true' class='linkify icon'></i></a>

## Snippet References 

Snippets are templates containing HTML, which you can use multiple times on one page – either by using them in different parts of the template, or by including them a loop. For example, a loop might build a list of products on the page, with each product in the list being a repeated version of the same snippet.

Snippets are referenced in templates as follows:

<pre>%%SNIPPET_[snippet_name]%%</pre>

In most cases, this will correspond to a similarly named file in the theme’s Snippets directory. For example:

<pre>%%SNIPPET_HomeFeaturedProducts%%</pre>

This snippet reference will contain repeated copies of `Snippets/HomeFeaturedProductsItem.html`, one for each featured product to be shown in the list.



<a href='#referencing-distributed-theme-assets' aria-hidden='true' class='block-anchor'  id='referencing-distributed-theme-assets'><i aria-hidden='true' class='linkify icon'></i></a>

## Referencing Distributed Theme Assets 

After the Blueprint framework was first released, BigCommerce added the ability to reference theme assets that are stored remotely on a CDN (content delivery network). This section provides examples that map first-generation Blueprint syntax to updated syntax for distributed assets.

You can use WebDAV to upload your own custom theme assets (JavaScripts, stylesheets, images, fonts, etc). In your HTML, reference these assets that aren’t present in the base theme using the `ASSET` syntax:

<pre>%%ASSET_[path_to_asset]%%</pre>

This syntax will output an absolute URL like: 

<pre>http://cdn-host/templates/__custom/path_to_asset?t=timestamp`</pre>

This loads the custom asset from our CDN server, and includes a cache-busting querystring.

For example:

<pre>%%ASSET_Styles/myownstyle.css%%</pre>

...will be output as:

<pre>http://cdn-host/templates/__custom/Styles/myonwstyle.css?t=123</pre>

#### Syntax Examples 

The following tables map earlier to current syntax:

##### Assets in CSS Files 

| Previous Syntax | Updated Syntax (CDN) |
|-----------------|---------------------|
| `url(/template/images/foo.jpg)` | `url(%%ASSET_images/foo.jpg%%)` |
| `url(/templates/__custom/images/foo.jpg)` | `url(%%ASSET_images/foo.jpg%%)` |
| `url(/template/foo/bar/font.woff)` | `url(%%ASSET_foo/bar/font.woff%%)` |
| `url(../images/foo.jpg)` | `url(%%ASSET_images/foo.jpg%%)` |
| `url(icons/foo.ico)` | `url(%%ASSET_Styles/icons/foo.ico%%)` |
| `url(//mystore.com/template/images/foo.jpg)` | `url(%%ASSET_images/foo.jpg%%)` |

##### Assets in HTML Files 

| Previous Syntax | Updated Syntax (CDN) |
|---------------|----------------|
| `<img src="../images/foo.jpg" />` | `<img src="%%ASSET_images/foo.jpg%%" />` |
| `<img src="//mystore.com/template/images/foo.jpg">` | `<img src="%%ASSET_images/foo.jpg%%" />` |
| `<link href="/template/Styles/foo.css" />` | `<link href="%%ASSET_Styles/foo.css%%" />` |
| `<script src="/template/js/foo.js%%"></script>` | `<script src="%%ASSET_js/foo.js%%"></script>` |

##### Assets Outside of the /template/ Directory 

The `ASSET` variable can be used only with files and folders inside the `/template/` directory. To take advantage of a CDN's benefits, we strongly recommend moving your assets to the `/template/` directory. However, if you need to keep assets outside of the `/template/` directory, the best practice is to use _protocol-relative_, absolute or fully qualified, URLs. Here are some examples:

```
<img src="//mystore.com/content/images/foo.jpg" />
url(//mystore.com/content/images/foo.jpg")
<link href="//mystore.com/content/foo.css" rel="stylesheet" type="text/css" />
```




<a href='#file-includes' aria-hidden='true' class='block-anchor'  id='file-includes'><i aria-hidden='true' class='linkify icon'></i></a>

## File Includes 

You can include another file within a template, using file include variables. This practice is extremely useful for external files such as banners or site-network headers.

Includes are referenced within template files as follows:

<pre>
%%Include.http://www.example.com/remote_file.html%%
%%Include.https://www.example.com/secure_remote_file.html%%</pre>

Notes: Included external links will not follow redirects (http status code 301 or 302). So if a redirect is encountered, it will not include the content.

