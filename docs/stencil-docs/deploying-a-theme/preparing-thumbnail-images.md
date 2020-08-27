# Preparing Thumbnail Images

<div class="otp" id="no-index">

### On this page
- [Where merchants see your theme's thumbnail images](#where-merchants-see-your-themes-thumbnail-images)
- [General image requirements](#general-image-requirements)
- [Theme-wide composite image](#theme-wide-composite-image)
- [Variations: desktop and mobile screenshots](#variations-desktop-and-mobile-screenshots)
- [Resources](#resources)

</div>

## Displaying theme thumbnail images


A complete Stencil theme includes screenshots to display the theme on cards that appear in two locations within the BigCommerce control panel:


* **Storefront** › **My Themes**: Each individual card displays a composite which is an image that contains combination of screenshots of the theme's multiple variations.
* **Storefront** › **Themes Marketplace**: Each card displays one variation of your theme. The three variations of Cornerstone (Light, Warm, and Bold) are displayed across three separate cards.

![Desktop View of My Themes](//s3.amazonaws.com/user-content.stoplight.io/6116/1563226648470 "Desktop View of My Themes")

![Desktop View of Themes Marketplace](//s3.amazonaws.com/user-content.stoplight.io/6116/1563227303129 "Desktop View of Themes Marketplace")

![Mobile View of Themes Marketplace](//s3.amazonaws.com/user-content.stoplight.io/6116/1563227341485 "Mobile View of Themes Marketplace")

## General image requirements

All screenshots described below must meet the following specifications in order for the `stencil bundle` command to be able to process them:
* Must be saved to a supported image file type: .jpg, .jpeg, .png, or .gif.
* Must be stored in your [meta/](https://github.com/bigcommerce/cornerstone/tree/master/meta) subdirectory.
* Must be in **portrait aspect ratio**.

## Theme-wide composite image

The theme-wide composite image represents your theme in the control panel's **Storefront** › **My Themes**, which shows merchants their currently available themes, including any custom uploaded themes.


This file will normally be a mosaic of screenshots from multiple variations within your theme. It must meet the following requirements, beyond the general specifications above:

* Resolution of 600 x 760 pixels (horizontal x vertical).
* File size smaller than 2 MB.
* Arbitrary filename prefix, referenced in your [config.json](https://github.com/bigcommerce/cornerstone/blob/master/config.json) file as the `meta` object's `composed_image` key value.

Here is an example of a compliant file type and location:

`meta/composed.png`

Here is how you would reference this file within [config.json](https://github.com/bigcommerce/cornerstone/blob/master/config.json).

```js
{
  // [...]
  "meta": {
    [...]
    "composed_image": "composed.png",
    // [...]
}
```

## Variations: desktop and mobile screenshots

Each variation within your theme must be represented by two additional screenshots if you want that variation to appear in the control panel's  **Storefront** › **Theme Marketplace**, which shows merchants the themes that are available for download.

### Desktop screenshot

The first screenshot, showing your theme on a desktop viewport, must meet the following requirements beyond the general specifications above:
* Resolution of 2048 x 2600 pixels.

* File size smaller than 5 MB
* Arbitrary filename prefix, referenced in your [config.json](https://github.com/bigcommerce/cornerstone/blob/master/config.json) file as the `variations` object's `desktop_screenshot` key value.

### Mobile screenshot

The second screenshot, showing your theme on a mobile viewport, must meet the following requirements beyond the general specifications above:
* Resolution of 304 x 540 pixels (horizontal x vertical).
* File size smaller than 1 MB.
* Arbitrary filename prefix, referenced in your [config.json](https://github.com/bigcommerce/cornerstone/blob/master/config.json) file as the `variations` object's `mobile_screenshot` key value.

Below is an example showing two files of compliant types and location.

* `meta/desktop_bright.png`
* `meta/mobile_bright.png`

Here is how you would reference these files within [config.json](https://github.com/bigcommerce/cornerstone/blob/master/config.json), for a variation named `Bright`:

```js
// [...]
  "variations": [
    {
      "name": "Bright",
      "id": "bright",
      "meta": {
        "desktop_screenshot": "desktop_bright.png",
        "mobile_screenshot": "mobile_bright.jpg",
    // [...]
    }
  ]

```

## Resources

### Related articles
* [Naming Your Theme and Theme Variations](https://developer.bigcommerce.com/stencil-docs/deploying-a-theme/naming-your-theme)
* [Checking a Theme's Size](https://developer.bigcommerce.com/stencil-docs/deploying-a-theme/checking-a-themes-size)
* [Bundling and Pushing a Theme](https://developer.bigcommerce.com/stencil-docs/deploying-a-theme/bundling-and-pushing)
