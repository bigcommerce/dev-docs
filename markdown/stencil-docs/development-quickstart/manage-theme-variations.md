<h1>Managing Theme Variations</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#managing_creating">Creating and Naming a New Theme Variation </a></li>
		<li><a href="#managing_changing">Changing a Theme Variation’s Font Family (config.json)</a></li>
    <li><a href="#managing_preparing">Preparing a Variation's Thumbnails</a></li>
    <li><a href="#managing_using-cli">Using Stencil CLI to Change Variations</a></li>
    <li><a href="#managing_bundling-and-uploading">Bundling and Uploading Your Theme</a></li>
	</ul>
</div>

<a href='#managing_creating' aria-hidden='true' class='block-anchor'  id='managing_creating'><i aria-hidden='true' class='linkify icon'></i></a>

## Creating and Naming a New Theme Variation  
### (Cascading Settings from <span class="fn">config.json</span>)

You define variations in your <span>{theme-name}/config.json</span> file. From the default Stencil theme’s config.json, here is the Light variation’s definition, followed by the head of the `"Bold"` variation’s definition:

<!--
title: "Naming a New Theme Variation"
subtitle: ""
lineNumbers: true
-->

```json
"variations": [
{
  "name": "Light",
  "id": "light",
  "meta": {
    "desktop_screenshot": "desktop_screenshot.jpg",
    "mobile_screenshot": "mobile_screenshot.png",
    "description": "This is the light style of the Stencil Theme",
    "demo_url": "https://stencil-light.mybigcommerce.com",
    "optimized_for": ["fashion", "image_heavy", "etc"],
    "industries": []
  },
{
  "name": "Bold",
  "id": "bold",
...
```

Try inserting a new custom variation of your own, below the `"Light"` block shown above. Your variation’s definition might look something like this:

<!--
title: "Multiple Theme Variation"
subtitle: ""
lineNumbers: true
-->

```json
"variations": [
...
{
  "name": "MyCustomVariation",
  "id": "my_custom_variation",
  "meta": {
    "desktop_screenshot": "my_custom_desktop_screenshot.jpg",
    "mobile_screenshot": "my_custom_mobile_screenshot.png",
    "description": "This is a really cool custom style of the Stencil Theme",
    "demo_url": "https://stencil-custom.mybigcommerce.com",
    "optimized_for": ["fashion", "image_heavy", "etc"],
    "industries": []
  },
{
  "name": "Bold",
  "id": "bold",
...
"variations": [
...
{
  "name": "MyCustomVariation",
  "id": "my_custom_variation",
  "meta": {
    "desktop_screenshot": "my_custom_desktop_screenshot.jpg",
    "mobile_screenshot": "my_custom_mobile_screenshot.png",
    "description": "This is a really cool custom style of the Stencil Theme",
    "demo_url": "https://stencil-custom.mybigcommerce.com",
    "optimized_for": ["fashion", "image_heavy", "etc"],
    "industries": []
  },
{
  "name": "Bold",
  "id": "bold",
...
```



<a href='#managing_changing' aria-hidden='true' class='block-anchor'  id='managing_changing'><i aria-hidden='true' class='linkify icon'></i></a>

## Changing a Theme Variation’s Font Family (config.json)

To learn more about defining variations, see the <span class="fn">config.json</span> reference for details about each key’s usage and allowable values. 
In particular, note the option to configure settings and variables that are scoped to each variation. For example, you could insert the `"settings":...”body-font-family”` block shown below to set body text throughout this variation (only) to a specific typeface/family:

<!--
title: "body-font-family"
subtitle: ""
lineNumbers: true
-->

```json
{
  "name": "MyCustomVariation",
  "id": "my_custom_variation",
  "settings": {
    ...
    "body-font-family": "MyCoolFont, AnotherFont, sans-serif",
    ...
  }
}
```



<a href='#managing_preparing' aria-hidden='true' class='block-anchor'  id='managing_preparing'><i aria-hidden='true' class='linkify icon'></i></a>

## Preparing a Variation's Thumbnails

For details on preparing screenshots that enable merchants to preview each variation – and to preview your theme as a whole – in the BigCommerce control panel and Theme Marketplace, see [Preparing Thumbnail Images](/stencil-docs/stencil-theme-editor/preparing-thumbnail-images).




<a href='#managing_using-cli' aria-hidden='true' class='block-anchor'  id='managing_using-cli'><i aria-hidden='true' class='linkify icon'></i></a>

## Using Stencil CLI to Change Variations

To locally test/debug a specific variation of your theme, launch it by invoking the Stencil CLI’s (command-line interface’s) `stencil start -v` switch. Depending on how you’ve named your variation in <span class="fn">config.json</span>, you would type something like this on the command line:

`stencil start -v MyCustomVariation`



<a href='#managing_bundling-and-uploading' aria-hidden='true' class='block-anchor'  id='managing_bundling-and-uploading'><i aria-hidden='true' class='linkify icon'></i></a>

## Bundling and Uploading Your Theme

If at this stage you are ready to bundle and upload your theme, refer to [Bundling and Uploading a Theme](/stencil-docs/prepare-and-upload-a-theme/bundling-and-uploading). 



## Resources
### Related Articles
* [Preparing Thumbnail Images](https://developer.bigcommerce.com/stencil-docs/store-design/preparing-thumbnail-images)
* [Bundling and Uploading a Theme](https://developer.bigcommerce.com/stencil-docs/prepare-and-upload-a-theme/bundling-and-uploading)

