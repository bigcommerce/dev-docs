<h1>Preparing Thumbnail Images</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#preparing_general-image">General Image Requirements</a></li>
    <li><a href="#preparing_themewide-composite">Themewide Composite Image</a></li>
    <li><a href="#preparing_variations">Theme Variations</a></li>
	</ul>
</div>

A complete Stencil theme includes screenshots to show off the theme on cards that appear in two locations within the BigCommerce Control Panel:

* **Storefront** › **My Themes** -- Each individual card displays a _themewide composite image_, which is an image that contains combination of screenshots of the theme's multiple variations. 
* **Storefront** › **Themes Marketplace** -- Each card displays one variation of your theme. The three variations of Cornerstone (Light, Warm, and Bold) are displayed across three separate cards.

### How your theme will appear in the Control Panel and Theme Marketplace
Each card contains a themewide composite image, showing all the variations of the theme in each. In this image, we see 3 variations for the Cornerstone theme and 4 for the Showroom theme.

![Desktop View My Themes](https://s3.amazonaws.com/user-content.stoplight.io/6116/1539625143199)


![Desktop View Themes Marketplace](https://s3.amazonaws.com/user-content.stoplight.io/6116/1539625143199)



![Mobile View Theme Marketplace](https://s3.amazonaws.com/user-content.stoplight.io/6116/1539625004658)


<a href='#preparing_general-image' aria-hidden='true' class='block-anchor'  id='preparing_general-image'><i aria-hidden='true' class='linkify icon'></i></a>



## General Image Requirements

Below are details about:
* how to size and save these images to stage them within your theme's directory structure
* how to reference the images in your <span class="fn"><a href="https://github.com/bigcommerce/cornerstone/blob/master/config.json">config.json</a></span> file

All screenshots described below must meet the following specifications in order for the `stencil bundle` command to be able to process them:

* Saved to a supported image file type: .jpg/.jpeg, .png, or .gif.
* Be stored in your <span class="fp"><a href="https://github.com/bigcommerce/cornerstone/tree/master/meta">{theme‑name}/meta/</a></span> subdirectory.
* Must be in **portrait aspect ratio**, with specific resolutions listed under [Themewide Composite Image](#preparing_themewide-composite) below.

<a href='#preparing_themewide-composite' aria-hidden='true' class='block-anchor'  id='preparing_themewide-composite'><i aria-hidden='true' class='linkify icon'></i></a>



## Themewide Composite Image

The themewide composite image represents your theme in the control panel's **Storefront** › **My Themes**, which shows merchants their currently available themes (including any custom uploaded themes). 

This file will normally be a mosaic of screenshots from multiple variations within your theme. It must meet the following requirements, beyond the general specifications above:

* Resolution of 600 x 760 pixels (horizontal x vertical).
* File size smaller than 2 MB.
* Arbitrary filename prefix, referenced in your <span class="fn"><a href="https://github.com/bigcommerce/cornerstone/blob/master/config.json">config.json</a></span> file as the `meta` object's `composed_image` key value

Here is an example of a compliant file type and location:

`{theme‑name}/meta/composed.png`

Here is how you would reference this file within <span class="fn"><a href="https://github.com/bigcommerce/cornerstone/blob/master/config.json">config.json</a></span>:


<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">config.json</div>
    </div><div class="HubBlock-header-subtitle">Referencing composed.png</div>
</div>

<!--
title: "config.json"
subtitle: "Referencing composed.png"
lineNumbers: true
-->

```json
{
  [...]
  "meta": {
    [...]
    "composed_image": "composed.png",	
    [...]
}
```

<a href='#preparing_variations' aria-hidden='true' class='block-anchor'  id='preparing_variations'><i aria-hidden='true' class='linkify icon'></i></a>



## Variations: Desktop/Mobile Screenshots

Each variation within your theme must be represented by two additional screenshots if you want that variation to appear in the control panel's  **Storefront** › **Themes Marketplace**, which shows merchants the themes that are available for download.

### Desktop Screenshot

The first screenshot, showing your theme on a desktop viewport, must meet the following requirements beyond the general specifications above: 
* Resolution of 2048 x 2600 pixels (horizontal x vertical).
* File size smaller than 5 MB
* Arbitrary filename prefix, referenced in your <span class="fn"><a href="https://github.com/bigcommerce/cornerstone/blob/master/config.json">config.json</a></span> file as the `variations` object's `desktop_screenshot` key value.
	
### Mobile Screenshot

The second screenshot, showing your theme on a mobile viewport, must meet the following requirements beyond the general specifications above: 
* Resolution of 304 x 540 pixels (horizontal x vertical).
* File size smaller than 1 MB.
* Arbitrary filename prefix, referenced in your <span class="fn"><a href="https://github.com/bigcommerce/cornerstone/blob/master/config.json"> config.json</a></span> file as the `variations` object's `mobile_screenshot` key value.

Below is an example showing two files of compliant types and location:

* `<theme‑name>/meta/desktop_bright.png`
* `<theme‑name>/meta/mobile_bright.png`	

Here is how you would reference these files within <span class="fn"><a href="https://github.com/bigcommerce/cornerstone/blob/master/config.json">config.json</a></span>, for a variation named `Bright`:


 

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">config.json</div>
    </div><div class="HubBlock-header-subtitle">Referencing Bright Variation</div>
</div>

<!--
title: "config.json"
subtitle: "Referencing Bright Variation"
lineNumbers: true
-->

```json
[...]
  "variations": [
    {
      "name": "Bright",
      "id": "bright",
      "meta": {
        "desktop_screenshot": "desktop_bright.png",
        "mobile_screenshot": "mobile_bright.jpg",
    [...]
    }
  ]

```



## Resources
* [Cornerstone config.json](https://github.com/bigcommerce/cornerstone/blob/master/config.json)
* [BigCommerce Marketplace](https://www.bigcommerce.com/apps/) (BigCommerce)
